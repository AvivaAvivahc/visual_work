/*debounce防抖函数 解决刷新频繁问题*/
export function debounce(func,delay) {
  let timer = null
  return function (...args) {
    /*clearTimeout清空timer重新赋值*/
    if (timer) clearTimeout(timer)
    timer=setTimeout(() => {
      func.apply(this,args)
    },delay)
  }
}
