import React, { Component, Fragment } from 'react';

import Header from "../components/Header"
import "../assets/css/menu.css"
import { Link } from 'react-router-dom';
import { getMenu, getChildMenu } from "../common/api"
import {pixHOST} from '../common/utils';
class Menu extends Component {
    constructor() {
        super()
        this.state = {
            menulist: [],
            childlist: [],
            curindex: 0,
            curid:"",
            curimg:"",
        }
    }
   
    render() {
        let { menulist, childlist, curindex,curid,curimg } = this.state
        return (
            <Fragment>
                <Header title="分类">
                    <i className="icon-r iconfont icon-sousuo1"></i>
                </Header>
                <div className="container page-content page-menu">
                    <div className="menus">
                        <ul>
                            {
                                menulist.map((val, idx) => (
                                    <li className={curindex == idx ? 'on' : ''} key={val.id} onClick={() => { this.tabChange(idx, val.id,val.image) }}>{val.mobile_name}</li>
                                ))
                            }

                        </ul>
                    </div>
                    <div className="info">
                        <div className="adv-top">
                        <Link to={'goodlist/'+curid}>
                                <img src={pixHOST(curimg)} alt="" />
                                <p>全<br />部<br /> 》</p>
                            </Link>
                        </div>
                        <div className="menu-list">
                            {
                                childlist.map(val => (
                                    <div className="items" key={val.id}>
                                        <h3 className="tit"><span>{val.mobile_name}</span></h3>
                                        <ul>
                                            {
                                                val.sub_category.map(v => (
                                                    <li key={v.id}>
                                                        <Link to={'/goodslist/'+v.id}>{v.mobile_name}</Link>
                                                    </li>
                                                ))
                                            }

                                        </ul>
                                    </div>
                                ))
                            }


                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
    async tabChange(idx, id,imgurl) {
        //idx 下标用来激活样式  id 用来请求二三级分类列表
        // console.log(idx,id);
        let child = await getChildMenu(id)
        this.setState({
            curindex: idx,
            childlist: child,
            // 轮播图  由于tabChange方法，页面一进来会渲染，点击不同的tab也会变化，所以轮播图参数写在里面即可
            curid:id,//用于点击轮播图片时进行跳转
            curimg:imgurl,//更新图片数据
        })

    }
    async componentDidMount() {
        let res = await getMenu()
        // console.log(res);
        this.setState({
            menulist: res
        })
        // console.log(res);
        
        // 页面第一次进来，先默认渲染第一项
        if(res.length){
            this.tabChange(0,res[0].id,res[0].image)
        }
    }


}

export default Menu;
