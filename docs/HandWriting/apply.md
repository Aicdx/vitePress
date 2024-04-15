# 手写call apply  bind

## call

### 我们可通过call()方法在指定this指向和传递若干个参数的条件下调用某个函数（function）

### 例如

```js
var obj = {
    val: '2021'
}
function testCall(){
    console.log(this.val);
}
testCall.call(obj);
// 2021
```

### 实现

```js
Array.prototype.myCall = function(context,...args){
    context = context || window
    const funcId = Symbol('funcId')
    context[funcId] = this
    const reslut = context[funcId](...args)
    delete context[...args]
    return reslut
}
```

## apply

### apply和call的作用类似，只不过传递参数时，apply要将所有参数放到一个数组中

```js
var obj = {
    val: '2021'
}
function testCall(name, age){
    console.log(this.val, 'name' + name, 'age' + age);
    return this.val;
}
console.log(testCall.apply(obj, ['小明', '18']));
```

### 实现apply

```js
Array.prototype.MyApply= function(context,args = []){
    context = context || window
    const funcId = Symbol('funcId')
    context[funcId] = this
    const result = context[funcId](...args)
    delete context[funcId]
    return result
}
```

## bind

### 在JavaScript中，Function.prototype.bind 是一个非常实用的方法，它允许我们创建一个新函数，这个新函数会将其 this 关键字永久地绑定到传入的第一个参数，无论这个函数如何被调用。除此之外，bind 还可以预设一系列参数，这些参数将会在绑定函数真正调用时被置于实参列表前

### 实现bind

```js
Array.prototype.MyBind = function (context,...args){
    context = context || window
    const fn = this
    function newFn(...newArgs){
        if(this instanceof newFn){// new newFn 的情况
            return new newFn(...args,...newArgs)
        }
        return fn.call(...args,...newArgs)
    }
    newFn.prototype = Object.create(fn.prototype)
    return newFn
}
```
