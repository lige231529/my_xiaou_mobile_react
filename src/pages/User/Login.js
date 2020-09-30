import React, { Component, Fragment } from 'react';
import Header from "../../components/Header"
import "../../assets/css/login.css"
import { Link, withRouter } from 'react-router-dom';
import { UserLogin } from "../../common/api"
class Login extends Component {
    constructor() {
        super()
        this.state = {
            forminfo: {
                username: "15137895035",
                password: "123"
            }
        }
    }
    singleChange(attr, ev) {
        // 绑定
        let newval = ev.target.value;
        this.setState((state) => ({
            forminfo: {
                ...state.forminfo,
                [attr]: newval
            }
        }))
    }
    submit = async () => {
        let res = await UserLogin(this.state.forminfo)
        localStorage.setItem("userinfo", JSON.stringify(res.result))
        if (res.status == "-1") {
            alert(res.msg)
        } else {
            // alert(res.msg)
            // console.log(this.props);
            this.$store.dispatch({
                type:"SET_USERINFO",
                payload:res.result
            })
            let url = this.props.location.search.substr(1, this.props.location.search.length)
            this.props.history.replace(url)
        }
    }
    render() {
        let { username, password } = this.state.forminfo
        return (
            <Fragment>
                <Header title="登录" isback={true}></Header>
                <div className="container login">
                    <img className="logo" src={require('../../assets/img/icons/logo.png')} alt="" />
                    <div className="login-box">
                        <div className="items">
                            <label>账号：</label>
                            <input type="text" placeholder="请输入用户名/手机号" value={username} onChange={this.singleChange.bind(this, "username")} />
                        </div>
                        <div className="items">
                            <label>密码：</label>
                            <input type="text" placeholder="请输入账号密码" value={password} onChange={this.singleChange.bind(this, "password")} />
                        </div>
                        <button onClick={this.submit}>登录</button>
                        <p>
                            <Link to="/reg">免费注册</Link>
                            <a href="password-forget.html">忘记密码？</a>
                        </p>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(Login);
