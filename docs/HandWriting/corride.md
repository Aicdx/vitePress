# 柯里化

```js
    function curry(fn){
        //保留参数
        const args = Array.prototype.slice.call(arguments,1)
        //返回一个新函数
        function curried(){
            //新函数的参数
            const newArgs = Array.prototype.slice.call(arguments)
            //合并参数
            const allArgs = args.concat(newArgs)
            //递归调用
            return curry.call(null,fn,...allArgs)
        }
        // 重写toString
        curried.toString = function(){
            return fn.apply(null,args)
        }
        return curried
    }
    //使用
    const add(){
        return [...arguments].reduce((a,b) => a + b)
    }
    const addCurry = curry(add)
    console.log(addCurry(1)(2)(3))
```
