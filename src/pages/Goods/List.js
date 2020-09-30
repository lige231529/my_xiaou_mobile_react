import React, { Component, Fragment } from 'react';

import Header from "../../components/Header"
import "../../assets/css/goodlist.css"
import { Link, withRouter } from 'react-router-dom';
import { getGoodslist } from "../../common/api"
import { pixImg } from "../../common/utils"


class List extends Component {
    constructor(){
        super();
        this.state = {
            toggle:true,
            goodslist:[],
            page:1,
            sort:"goods_id",
            sort_asc:"asc"
            
        }
        this.canload = true;
    }
    menutoggle = () => {
        this.setState(state => ({
            toggle: !state.toggle
        }))
    }
    //排序，点击销量、评论等
    sortChange(sort){
        // console.log(sort);
        let sort_asc= this.state.sort_asc;
        if(sort==="shop_price"){
            sort_asc=sort_asc==="asc"?"desc":"asc" //第一次点击价格升序升序的话，第二次点击价格的时候是降序
        }else{
            sort_asc="asc" //默认升序
        }
        this.setState({
            sort:sort,
            sort_asc:sort_asc,
            page:1,//当点到其他排序方式的时候，页面还回初始值
            goodslist:[] //商品数组也要清空

        },async()=>{ //重新请求数据
            this.canload = true; //可以重新加载数据
            let menuid=this.props.match.params.id;
            let res = await getGoodslist(menuid,this.state.page,this.state.sort,this.state.sort_asc)
            this.setState({
                goodslist:res
            })
            window.scroll(0,0)//重新排序的时候，还回到顶部
        })
    }
    render() {
        let { goodslist,sort,sort_asc } = this.state
        return (
            <Fragment>
                <Header title="商品列表" isback={true}>
                    <i className="icon-r iconfont icon-shaixuan"></i>
                </Header>
                <div className="container good-box">
                    <div className="fix-top">
                        <div onClick={this.sortChange.bind(this,"goods_id")}  className={sort==="goods_id"?'active':''}>最新</div>
                        <div onClick={this.sortChange.bind(this,"sales_sum")} className={sort==="sales_sum"?'active':''}>销量</div>
                        <div onClick={this.sortChange.bind(this,"comment_count")} className={sort==="comment_count"?'active':''}>评论</div>
                        <div onClick={this.sortChange.bind(this,"shop_price")} className={sort==="shop_price"?'active':''}>
                            价格
					        <span>
                                <i className={sort==="shop_price"&&sort_asc==="asc"?'iconfont icon-shengxu on':'iconfont icon-shengxu'}></i>
                                <i className={sort==="shop_price"&&sort_asc==="desc"?'iconfont icon-jiangxu on':'iconfont icon-jiangxu'}></i>
                            </span>
                        </div>
                        <div onClick={this.menutoggle}>
                            <i className={this.state.toggle ? 'iconfont icon-menu-line' : 'iconfont icon-menus'}></i>
                        </div>
                    </div>
                    <ul className={this.state.toggle ? 'goods-list active' : 'goods-list'}>
                        {
                            goodslist.map((val) => (
                                <li key={val.goods_id}>
                                    <div className="item">
                                        <div className="pic">
                                            <Link to={"/goodinfo/"+val.goods_id}>
                                                <img src={pixImg(val.goods_id)} />
                                            </Link>
                                        </div>
                                        <div className="txt">
                                        <h3 className="name"><Link to={"/goodinfo/"+val.goods_id}>{val.goods_name}</Link></h3>
                                       <h4 className="pirce">￥{val.shop_price}</h4>           
                                            <i className="iconfont icon-gouwuche"></i>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }

                    </ul>
                </div>
            </Fragment>
        );
    }
    bindWindowScroll=()=>{//监听滚动
        // 出去的距离+屏幕的高度  =  文档的高度
        let wH = window.innerHeight; // 屏幕高度
        window.onscroll=()=>{
            let dH = document.getElementById("root").offsetHeight;
            let sT = window.scrollY
            if((wH+sT)>(dH-20)){ //滚动离底部20px的时候加载
                if(!this.canload){
                    return; //不能加载的话，直接出去
                }//能加载，设置canload,防止节流
                this.canload=false
                this.setState(state=>({
                    page:state.page+1
                }),async()=>{
                    let menuid = this.props.match.params.id
                    let res = await getGoodslist(menuid,this.state.page,this.state.sort,this.state.sort_asc)
                    if(res.length<10){
                        this.canload = false;
                    }else{
                        this.canload = true
                    }
                    let list = this.state.goodslist.concat(res)
                    this.setState({
                        goodslist:list
                    })
                })
               

            }
        }


    }
    async componentDidMount() {
        let id = this.props.match.params.id
        let res = await getGoodslist(id,this.state.page,this.state.sort,this.state.sort_asc)
        this.setState({
            goodslist: res
        })
        this.bindWindowScroll()
    }
}

export default withRouter(List);
