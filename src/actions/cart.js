import store from "../store"
import qs from "qs"
// 相当于状态层 store
import {GetCartList,AddCart,DelCart,EditCart} from "../common/api"  //状态层调用请求层
//获取购物车数据
export async function get_cart_list(){  
    let userinfo=JSON.parse(localStorage.getItem("userinfo"))
    let unique_id  =userinfo.user_id
    let data = qs.stringify({
        unique_id:unique_id
    })
    let res = await GetCartList(data)
    // console.log(res);  
    if(res.status===1){
        let storeList = res.result.storeList;
        let total_price = res.result.total_price
        store.dispatch({
            type:"SET_CART_INFO",
            payload:{storeList,total_price}
        })
    } 
}
/**
 * 添加购物车
 * @param {*} goods_id   商品id
 * @param {*} goods_num  商品数量
 * @param {*} unique_id  用户的ID，就是user_id字段内容(不需要传，从本地存储中获取)
 */
export async function add_cart(goods_id,goods_num){
    // 没有登录，不能加入购物车
    let userinfo = localStorage.getItem('userinfo');
    if(!userinfo){
        alert('请登录')
        return false;
    }
     userinfo = JSON.parse(localStorage.getItem("userinfo"))
    let unique_id = userinfo.user_id
    let data = qs.stringify({
        goods_id,
        goods_num,
        unique_id,
    })
    let res =await AddCart(data)
    // 添加成功之后请求列表，更新渲染，页面，包括购物车车右上角，数量
    get_cart_list()
    if(res.status===1){
        get_cart_list()
    }else{
        alert(res.msg)
    }
    return res
}
/**
 * 删除购物车
 * @param {*} ids 该条购物车商品记录的id
 * @param {*} unique_id  用户的ID，就是user_id字段内容(不需要传，从本地存储中获取)
 */
export async function del_cart(ids){
    let unique_id = JSON.parse(localStorage.getItem("userinfo")).unique_id
    let data=qs.stringify({
        ids,
        unique_id
    })
    let res = await DelCart(data)
    get_cart_list()
    if(res.status===1){//删除成功，重新获取列表
        get_cart_list()
    }else{
        alert(res.msg)
    }
    return res
}

export async function edit_cart(goodsNum,selected,cartID){
    goodsNum=goodsNum===0?1:goodsNum
    let cart_form_data= [{goodsNum,selected,cartID}]
    cart_form_data = JSON.stringify(cart_form_data)
    let unique_id = JSON.parse(localStorage.getItem("userinfo")).unique_id
    let data = qs.stringify({
        unique_id,
        cart_form_data
    })
    let res = await EditCart(data)
    get_cart_list()
    if(res.status===1){//删除成功，重新获取列表
        get_cart_list()
    }else{
        alert(res.msg)
    }
    
    return res
}