/*首页数据请求*/
import {request} from "./request"　

 export function getHomeMultidata() {
   return   request({
     url:　'home/multidata'
   })
 }

 export function getHomeGoods(type,page) {
   return request( {
     url: 'home/data',
     /*params:参数*/
     params: {
       type,
       page
        }
      }
    )
 }
