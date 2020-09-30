import React, { Component } from 'react';

import "../../assets/css/user.css"
import { Link } from 'react-router-dom';
import { quit } from "../../actions/app"
import {pixHOST} from "../../common/utils"
class User extends Component {
    constructor() {
        super()
        let state = this.$store.getState()
        console.log(state.app);
        
        this.state = {
            haslogin: state.app.haslogin,
            userinfo: state.app.userinfo
        }

    }
    render() {
        let { haslogin, userinfo } = this.state
        return (
            <div className="page-user">
                <img className="user-bg" src={require("../../assets/img/icons/user_bg.png")} alt="" />
                <div className="user-top">
                    <div className="user-header">
                        <span>{haslogin? userinfo.leval_name:"会员等级"} </span>
                        <h3>个人中心</h3>
                        <i className="iconfont icon-shezhi"></i>
                    </div>
                    <h4 className="nickname">{haslogin?userinfo.nickname:<Link to="/login?/user">请登录</Link>} </h4>
                    <div className="order-info">
                        <div className="user-icon">
                            {
                                !haslogin? //没登录显示默认图片
                                <Link to="/login?/user"><img src={require("../../assets/img/icons/default.png")} /></Link>
                                :userinfo.head_pic?<img src={pixHOST(userinfo.head_pic)} />
                                    :<img src={require("../../assets/img/icons/default.png")} />
                            }
                            <img src={require("../../assets/img/imgs/watch.jpg")} />
                        </div>
                        <ul>
                            <li>
                                <Link to="">
                                    <i>0</i>
                                    <p>我的订单</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="/user/love">
                                    <i>0</i>
                                    <p>我的收藏</p>
                                </Link>
                            </li>
                            <li>
                                <Link to="">
                                    <i>0</i>
                                    <p>我的评价</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* <!-- 钱包信息 --> */}
                <ul className="qianbao">
                    <li>
                        <Link to="">
                            <h3>￥200.200</h3>
                            <p>余额</p>
                        </Link>
                    </li>
                    <li className="center">
                        <Link to="">
                            <h3>2</h3>
                            <p>优惠券</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <h3>1200</h3>
                            <p>积分</p>
                        </Link>
                    </li>
                </ul>
                {/* <!-- 菜单信息 --> */}
                <ul className="menu-list">
                    <li>
                        <Link to="">
                            <span className="color-1"><i className="iconfont icon-qiandai"></i></span>
                            <div className="info">
                                <p>我的钱包</p>
                                <label>查看我的钱包 <i className="iconfont icon-xiangyou"></i></label>
                            </div>
                        </Link>
                    </li>
                </ul>
                <ul className="menu-list">
                    <li>
                        <Link to="">
                            <span className="color-2"><i className="iconfont icon-dingdan"></i></span>
                            <div className="info">
                                <p>全部订单</p>
                                <label>查看订单 <i className="iconfont icon-xiangyou"></i></label>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <span className="color-3"><i className="iconfont icon-youhuiquan"></i></span>
                            <div className="info">
                                <p>优惠券</p>
                                <label> <i className="iconfont icon-xiangyou"></i></label>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <span className="color-4"><i className="iconfont icon-daipingjia"></i></span>
                            <div className="info">
                                <p>我的评价</p>
                                <label> <i className="iconfont icon-xiangyou"></i></label>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/user/love">
                            <span className="color-5"><i className="iconfont icon-shouhouguanli"></i></span>
                            <div className="info">
                                <p>我的收藏</p>
                                <label> <i className="iconfont icon-xiangyou"></i></label>
                            </div>
                        </Link>
                    </li>
                </ul>
                <ul className="menu-list">
                    <li>
                        <Link to="/user/address">
                            <span className="color-6"><i className="iconfont icon-dizhi"></i></span>
                            <div className="info">
                                <p>地址管理</p>
                                <label> <i className="iconfont icon-xiangyou"></i></label>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <span className="color-7"><i className="iconfont icon-pinglun"></i></span>
                            <div className="info">
                                <p>我的留言</p>
                                <label> <i className="iconfont icon-xiangyou"></i></label>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <span className="color-8"><i className="iconfont icon-shouhouguanli1"></i></span>
                            <div className="info">
                                <p>售后服务</p>
                                <label> <i className="iconfont icon-xiangyou"></i></label>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <span className="color-9"><i className="iconfont icon-shanghupiliangruzhu"></i></span>
                            <div className="info">
                                <p>申请入驻</p>
                                <label> <i className="iconfont icon-xiangyou"></i></label>
                            </div>
                        </Link>
                    </li>
                </ul>
                {
                    haslogin?
                    <ul className="menu-list">
                    <li>
                        <a>
                            <span className="color-10"><i className="iconfont icon-zhuxiao"></i></span>
                            <div className="info" onClick={quit}>
                                <p>注销登录</p>
                                <label> </label>
                            </div>
                        </a>
                    </li>
                </ul>:""
                }
            </div>
        );
    }
    // 退出的时候，页面要重新渲染
    componentDidMount(){
        this.unsubscribe =this.$store.subscribe(()=>{
            let state = this.$store.getState();
            this.setState({
                userinfo:state.app.userinfo,
                haslogin:state.app.haslogin
            })
        })
    } 
    componentWillUnmount(){
        this.unsubscribe()
    }
}

export default User;
