// 工具函数
export  function pixImg(goods_id,w=240,h=240){
  return  `http://122.51.249.55:3000/index.php/Api/Goods/goodsThumImages?goods_id=${goods_id}&width=${w}&height=${h}`
}
export  function pixHOST(imgurl){
  return `http://122.51.249.55:3000${imgurl}`
}