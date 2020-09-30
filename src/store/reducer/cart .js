//购物车的reducer小模块
//1  数据的初始值（相当于数据的初始化）
let initState = {
    // cartlist:[],
    storeList:[],//购物车列表数据
    total_price:{}

}
//2 一个reducer函数 它有两个参数，第一个是state数据，第二是action，处理数据的方法
function cart(state = initState,action){
    switch(action.type){
        case "SET_CART_INFO"://设置购物车的用于信息
            state.storeList = action.payload.storeList
            state.total_price = action.payload.total_price
            return state;
        case "CLEAR_CART": //清空购物车，退出的时候清空？
            state.storeList =[]
            state.total_price = {}
            return state;
        default:
            return state;
    }
}
//3 让这个reducer函数暴露出去
export default cart;
