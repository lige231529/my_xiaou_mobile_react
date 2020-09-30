import React, { Component, Fragment } from 'react';


import Header from "../components/Header"
import "../assets/css/car.css"
import { Link } from 'react-router-dom';
import { pixImg } from "../common/utils"

import { get_cart_list, del_cart, edit_cart } from "../actions/cart"
class Cart extends Component {
    constructor() {
        super()
        let state = this.$store.getState()
        // console.log(state.app);
        this.state = {
            haslogin: state.app.haslogin,
            userinfo: state.app.userinfo,
            storeList: state.cart.storeList,
            total_price: state.cart.total_price
        }


    }
    render() {
        let { haslogin, storeList, total_price } = this.state;
        //出力全选，判断每个商品的selected是否都为真，但是这个字段不在一个数组中，而是在storeList 的cartList中
        let allCartList = []
        if(storeList.length){
            storeList.forEach(val=>{
                allCartList=allCartList.concat(val.cartList)
            }) 
        } 

        let allCheck = false//如果一个也没有选，就是false(防止报错)
        allCheck = allCartList.every(val => val.selected === "1")
        // console.log(allCheck);     
        return (
            <Fragment>
                <Header title="购物车">
                    <i className="icon-r iconfont icon-sousuo1"></i>
                </Header>
                <div className="container page-content page-car">
                    {
                        // 没有登录
                        !haslogin ?
                            <div className="info" >
                                <img src={require("../assets/img/icons/icon-empty.jpg")} alt="" />
                                <p>登录后查看购物车中的商品</p>
                                <Link to="/logi?cart">登录</Link>
                            </div>
                            : !storeList.length ? //登录了，没数据，购物车是空的
                                <div className="info" >
                                    <img src={require("../assets/img/icons/icon-empty.jpg")} alt="" />
                                    <p>您的购物车有点寂寞</p>
                                    <Link to="/menu">马上逛逛</Link>
                                </div>
                                : <div className="car-box">
                                    {/* 登陆了，有数据，购物车有加购 */}
                                    <div className="car-list">
                                        {
                                            storeList.map(val => (
                                                <div className="item" key={val.store_id}>
                                                    <div className="tit">
                                                        {/* 跳转到店铺信息 */}
                                                        <Link to={'/store/' + val.store_id}>
                                                            <i className="iconfont icon-shangjia"></i>供货商：{val.store_name}
                                                        </Link>
                                                    </div>
                                                    <ul>
                                                        {
                                                            val.cartList.map(v => (
                                                                <li key={v.goods_id}>
                                                                    {/* 点击小对号，切换选中与未选中 */}
                                                                    {
                                                                        v.selected === "1" ?
                                                                            <div className="check" onClick={()=>edit_cart(v.goods_num,"0",v.id)}>
                                                                                <i className='iconfont icon-quan-dui active'></i>
                                                                            </div>
                                                                            : <div className="check" onClick={()=>edit_cart(v.goods_num,"1",v.id)}>
                                                                                <i className='iconfont icon-quan'></i>
                                                                            </div>
                                                                    }


                                                                    <div className="text">
                                                                        <Link className="pic" to={'/goodinfo/' + v.goods_id}>
                                                                            <img src={pixImg(v.goods_id)} alt="" />
                                                                        </Link>
                                                                        <div className="desc">
                                                                            <h3 className="t">{v.goods_name}</h3>
                                                                            <div className="nums-box">
                                                                                <span className="iconfont icon-jian" onClick={()=>edit_cart(v.goods_num*1-1,v.selected,v.id)}></span>
                                                                                {/* <input type="text" defaultValue={v.goods_num} /> */}
                                                                                <input type="text" value={v.goods_num} />
                                                                                <span className="iconfont icon-jia" onClick={()=>edit_cart(v.goods_num*1+1,v.selected,v.id)}></span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="price">
                                                                        <h3><s>¥{v.market_price} </s></h3>
                                                                        <h4>¥{v.goods_price}</h4>

                                                                        <i onClick={() => del_cart(v.id)} className="iconfont icon-shanchu"></i>

                                                                    </div>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            ))
                                        }

                                    </div>

                                    <div className="car-bot">
                                        <label>
                                            <i className={allCheck ? 'iconfont icon-quan-dui active' : 'iconfont icon-quan'}></i>
                                全选
                            </label>
                                        <div className="rt">
                                            <div className="t">
                                                {/* {total_price.num} */}
                                                <h3>总计：¥{total_price.total_fee}元</h3>
                                                <p>不含运费</p>
                                            </div>
                                            <a>去结算</a>
                                        </div>
                                    </div>
                                </div>

                    }
                </div>
            </Fragment>
        );
    }
    componentDidMount() {
        if (this.state.haslogin) {
            get_cart_list() //视图层调用状态层
        }
        this.unsubscribe = this.$store.subscribe(() => {
            let state = this.$store.getState()
            this.setState({
                haslogin: state.app.haslogin,
                userinfo: state.app.userinfo,
                storeList: state.cart.storeList,
                total_price: state.cart.total_price
            })
        })

    }
    componentWillUnmount() {
        this.unsubscribe();
    }
}

export default Cart;
