import React, { Component, Fragment } from 'react';
import Header from "../../components/Header"
import "../../assets/css/reg.css"
import { Link, withRouter } from 'react-router-dom';
import {UserReg} from "../../common/api"

class Reg extends Component {
    constructor(){
        super();
        this.state = {
            forminfo: {
                username: "15137895035",
                password: "123",
                password2: "123"
            },
            isshow:false,//输入框后面小图标的是否显示
        }

    }
    // 事件对象ev必须在所有参数的最后边
    // 第五步：绑定事件，修改输入框的值
    singleChange(attr, ev) {
        // console.log(attr);    //attr是绑定的字段：username,password,password2
        // console.log(ev.target.value);   //input输入框的值
        let newval = ev.target.value;//先把值存起来，因为setState的方法是异步的，如果不存的话，还没获取到value,它就释放了
        let isshow = false;//由于state中的isshow，修改比较麻烦，所以再定义一个，然后一起修改
        if(attr==="username" && newval){
            isshow=true
        }
        this.setState((state)=>({
            forminfo:{
                ...state.forminfo,
                [attr]:newval
            },
            isshow:isshow
        }))
    }
    toggleEye(str){
        // 找到原生的dom节点
        let iptdom = this['pwd'+str] 
        let eyedom = this['eye'+str]
        // console.log(iptdom);
        // console.log(eyedom);
        iptdom.type= iptdom.type==="text"?"password":"text"
        eyedom.className=eyedom.className==="iconfont icon-biyan"?"iconfont icon-icon-eye-open":"iconfont icon-biyan"
    }
    clearUsername=()=>{
        this.setState((state)=>({
            forminfo:{
                ...state.forminfo,
                username:""
            },
            isshow:false
        }))
    }
submit= async()=>{
    let res  = await UserReg(this.state.forminfo)
    if(res.status=="-1"){
        alert(res.msg)
    }else{
        alert(res.msg)
        this.props.history.goBack()//history跳转
    }
   
}

    // 能修改了，说明绑定成功了，不然都输入不进去
    render() {
        // 第二步：解构state,或state中的数据
        let { username, password, password2 } = this.state.forminfo
        let {isshow} = this.state
        return (
            <Fragment>
                <Header title="注册" isback={true}></Header>
                <div className="container reg">
                    <div className="reg-box">
                        <div className="items">
                            {/* 第三步：绑定value */}
                            {/* 第四步：绑定事件onChange */}
                            <label><i className="iconfont icon-shouji"></i></label>
                            <input type="text" placeholder="请输入手机号" value={username} onChange={this.singleChange.bind(this, "username")} />
                            {
                                isshow?<span onClick={this.clearUsername}><i className="iconfont icon-guanbi"></i></span>:""
                            }
                        </div>
                        <div className="items">   
                            {/* 第六步：密码框的睁眼与开眼input和i标签 都要获得，通过ref */}  
                            <label><i className="iconfont icon-iconfontmima"></i></label>
                            <input type="password" placeholder="请输入密码" value={password} onChange={this.singleChange.bind(this, "password")} ref={(node)=>{this.pwd1=node}}/>
                            <span onClick={()=>this.toggleEye("1")}><i className="iconfont icon-biyan" ref={(node)=>{this.eye1=node}}></i></span>
                        </div>
                        <div className="items">
                            <label><i className="iconfont icon-iconfontmima"></i></label>
                            <input type="password" placeholder="请确认密码" value={password2} onChange={this.singleChange.bind(this, "password2")} ref={(node)=>{this.pwd2=node}}/>
                            <span onClick={()=>this.toggleEye("2")}><i className="iconfont icon-biyan" ref={(node)=>{this.eye2=node}}></i></span>
                        </div>
                        <button onClick={this.submit}>立即注册</button>
                        <p>
                            <Link to="/login">已有账号？立即登录</Link>
                        </p>
                    </div>
                </div>
            </Fragment>
        );
    }
}


export default withRouter(Reg);
