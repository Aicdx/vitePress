# 手写Promise

## finally

```js
Promise.prototype.myFinally = function (onFinally){
    return this.then(
         // 成功或者失败都会执行callback，然后将原来的结果传递下去
        value => {
            return Promise.resolve(onFinally()).then(()=>value)
        },
        reason => {
        // 如果callback出错，或者原Promise是rejected，保持rejection不变
            return Promise.resolve(onFinally().then(()=>{
                throw reason
            }))
        }
    )
}
```

## all

```js
//all
// resolve 用于成功场景，其结果可被.then()接收。
// reject 用于失败场景，其错误信息可被.catch()接收。
Promise.all = function(promises){
    return new Promise((resolve,reject)=>{
        if(!Array.isArray(promises)){
            reject(new TypeError('must be array'))
        }
        let reslut = []
        let count = 0
        if(promises.lenght === 0){
            resolve(reslut)
        }
        promises.forEach((promise,index) => {
            Promise.resolve(promise).then((value)=>{
                reslut[index] = value
                count += 1
                if(promises.lenght === count){
                    resolve(reslut)
                }
            }).catch(reject)
        });
    })
}
```
