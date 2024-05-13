#

## 浅拷贝

```js
    Object.assign(obj1,obj2)
    srr.slice()

    //手写实现
    function shallowCopy(object){
        if(!object || typeof object !== 'object'){
            return
        }
        let rusult = Array.isArray(object) ? [] : {}

        for(let key in object){
            if(object.hasOwnProperty(key)){
                result[key] = object[key]
            }
        }
        return result
    }
```

## 深拷贝

```js
    JOSN.pase(JSON.stringify(obj))

    // 手写
    function deepCopy(obj){
        if(!obj || typeof obj !== 'object'){
            return
        }
        let result = Array.isArray(obj)?[]:{}
        for(let key in obj){
            if(obj.hasOwnProprty[key]){
                result[key] = typeof obj[key] === 'object'
                    ? deepCoyp(obj[key])
                    :obj[key]
            }
        }
        return result
    }
```
