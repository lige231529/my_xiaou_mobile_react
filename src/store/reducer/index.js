// 根reducer模块
//将其他 子reducer模块 导入进来，导入redux的combineReducers的方法，传入一个对象
import {combineReducers} from "redux"
import app from "./app"
import cart from "./cart "
let reducer = combineReducers({
    app,cart
})
export default reducer;