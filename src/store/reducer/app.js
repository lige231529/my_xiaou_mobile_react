let haslogin = localStorage.getItem("userinfo")?true : false
let userinfo = localStorage.getItem("userinfo")?JSON.parse(localStorage.getItem("userinfo")):{}

let initState = {
    haslogin:haslogin,
    userinfo:userinfo
}
function app(state=initState,action){
    // 必须要写switch，不然会报错
    switch(action.type){
        case "SET_USERINFO":  //设置用户信息
            state.userinfo = action.payload
            state.haslogin = true
            localStorage.setItem("userinfo",JSON.stringify(action.payload))
            return state;
        case "QUIT":  //退出登录
            state.haslogin=false;
            localStorage.removeItem("userinfo")
            return state
        default:
            return state;
    }
    
}
export default app;