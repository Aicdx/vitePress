# 手写防抖节流

## 防抖

### 用于限制某些代码在特定时间内执行的频率，通常应用于处理连续的事件触发，例如窗口的大小调整、滚动、键盘输入等。防抖函数确保实际的函数在触发事件后的一段时间内只被调用一次，如果在这段时间内事件再次被触发，则重新计时

```js
function dobounce(fn,ms){
    let timer =null
    return function(){
        const context = this
        let args = arguments
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            fn.apply(context,args)
        },ms)
    }
}
```

## 节流

### 用来确保一个函数在特定时间间隔内最多只执行一次。这对于处理诸如窗口大小调整、滚动、鼠标移动等频繁触发的事件尤其有用。通过使用节流，可以防止在短时间内过度调用高开销的函数

```js
function throttle(fn,ms){
    let timer = null
    return function(...args){
        const context = this
        if(!timer){
            timer = setTimeout(()=>{
                timer = null
                fn.apply(context,...args)
            },ms)
        }
    }
}
```
