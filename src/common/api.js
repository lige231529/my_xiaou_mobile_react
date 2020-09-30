// 请求层
import $http from "./http"
import qs from "qs"
// 请求层

/**
 * 首页数据请求（两个：首页部分数据+猜你喜欢）
 */
export async function getIndex() {
    let p1 = $http.get("/Index/home")
    let p2 = $http.get("/Index/favourite")
    let res = await $http.all([p1, p2])
    let res1 = res[0].result;
    let res2 = res[1].result;
    return {
        ...res1,
        ...res2
    }
}
/**
 * 获取分类数据
 */
export async function getMenu() {
    let res = await $http.get("/Goods/goodsCategoryList")
    return res.result

}
export async function getChildMenu(pid) {
    let res = await $http.get("/Goods/goodsSecAndThirdCategoryList", { parent_id: pid })
    return res.result

}
/**
 * 列表数据请求
 * @param {*} id 分类id
 */
export async function getGoodslist(id,page,sort="goods_id",sort_asc="asc") {
    let res = await $http.get("/Goods/goodsList", { id,p:page,sort,sort_asc })
    return res.result.goods_list
}
/**
 * 
 * @param {*} 商品id 
 */
export async function getGoodinfo(id) {
    let res = await $http.get("/Goods/goodsInfo", {id})
    return res.result

}
export async function UserReg(data) {
    data = qs.stringify(data)
    let res = await $http.post("/user/reg", data, {
        'Content-Type': "application/x-www-form-urlencoded"
    })
    return res
}   
export async function UserLogin(data) {
    data = qs.stringify(data)
    let res = await $http.post("/user/login", data, {
        'Content-Type': "application/x-www-form-urlencoded"
    })
    return res
}
// 获取购物车数据
export async function GetCartList(data){
    let res  =await $http.post("/Cart/cartList",data,{
        'Content-Type': "application/x-www-form-urlencoded",
    })
    return res   
}
// 添加购物车
export async function AddCart(data){
    let res  =await $http.post("/Cart/addCart",data,{
        'Content-Type': "application/x-www-form-urlencoded",
    })
    return res   
}
// 删除购物车
export async function DelCart(data){
    let res = await $http.post("/Cart/delCart",data,{
        'Content-Type': "application/x-www-form-urlencoded",
    })
    return res
}
export async function EditCart(data){
    let res = await $http.post("/Cart/cartList",data,{
        'Content-Type': "application/x-www-form-urlencoded",
    })
    return res
}

