import React, { Component } from 'react';

import Header from "../../components/Header"
import "../../assets/css/goodinfo.css"
import { Link, withRouter } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

import { getGoodinfo } from "../../common/api"
import { pixImg } from "../../common/utils"
class Info extends Component {
    render() {
        return (
            <div className="page-goods">
                <Header title="商品详情" isback={true}>
                    <i className="icon-r iconfont icon-shaixuan"></i>
                </Header>
                <div style={{ height: '.88rem' }}></div>
                {/* 轮播图 */}
                <Swiper className="good-banner" >
                    <SwiperSlide>
                        <img className="imgs" src={require('../../assets/img/imgs/banner.png')} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className="imgs" src={require('../../assets/img/imgs/banner.png')} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className="imgs" src={require('../../assets/img/imgs/banner.png')} alt="" />
                    </SwiperSlide>
                </Swiper>
                <div className="good-desc">
                    <span className="price">￥299.00元</span>
                    <div className="tuan">
                        <i>限时团购</i>
                        <span>2天16时2分20秒</span>
                    </div>
                </div>
                <h3 className="good-name">小米充电宝小米充电宝小米充电宝小米充电宝小米充电宝小米充电宝小米充电宝</h3>
                <p className="info-txt">
                    <span>折扣：4.6折</span>
                    <span>5人评价</span>
                    <span>21人参团</span>
                </p>
                <div className="tab-box">
                    <div className="title">
                        <span>购买数量</span>
                        <i className="iconfont icon-xiangyou"></i>
                    </div>
                    <div className="box">
                        <div className="nums-box">
                            <span className="iconfont icon-jian"></span>
                            <input type="text" readonly value="1" />
                            <span className="iconfont icon-jia"></span>
                        </div>
                    </div>
                </div>
                <div className="tab-box">
                    <div className="title">
                        <span>会员专享价</span>
                        <i className="iconfont icon-xiangyou"></i>
                    </div>
                    <div className="box">
                        <ul className="hy-price">
                            <li>铜牌：<span>9折</span></li>
                            <li>金牌：<span>8折</span></li>
                            <li>钻石：<span>7折</span></li>
                        </ul>
                    </div>
                </div>
                <div className="good-store">
                    <div className="top">
                        <img src="img/imgs/dianpu.png" alt=""/>
                            <div className="txt">
                                <h3>密码阿斯蒂芬店铺</h3>
                                <p>共002件商品</p>
                            </div>
                            <a href="">进入店铺</a>
				</div>
                        <div className="bot">
                            <span>
                                宝贝描述：5.0
						<i className="iconfont icon-gaoxiao"></i>
                            </span>
                            <span>
                                卖家服务：3.0
						<i className="iconfont icon-zhongwen"></i>
                            </span>
                            <span>
                                物流服务：2.0
						<i className="iconfont icon-minzhengxinxi-dibaorenyuan"></i>
                            </span>
                        </div>
                    </div>
                <div className="good-detail">
                    <h3 className="tit">商品详情</h3>
                    <div className="box">
                        <img src="img/imgs/xq.png" alt="" />
                        <img src="img/imgs/xq.png" alt="" />
                        <img src="img/imgs/xq.png" alt="" />
                        <img src="img/imgs/xq.png" alt="" />
                        <img src="img/imgs/xq.png" alt="" />
                        <img src="img/imgs/xq.png" alt="" />
                        <img src="img/imgs/xq.png" alt="" />
                        <img src="img/imgs/xq.png" alt="" />
                        <img src="img/imgs/xq.png" alt="" />
                        <img src="img/imgs/xq.png" alt="" />
                    </div>
                </div>
                <div className="fix-bot">
                    <a href="">
                        <i className="iconfont icon-shangjia"></i>
                        <p>店铺</p>
                    </a>
                    <a href="">
                        <i className="iconfont icon-kefu"></i>
                        <p>客服</p>
                    </a>
                    <a>
                        <i className="iconfont icon-shouhouguanli"></i>
                        <p>收藏</p>
                    </a>
                    <button className="car">加入购物车</button>
                    <button className="buy">立即购买</button>
                </div>
            </div>
        );
    }
}

export default withRouter(Info);
