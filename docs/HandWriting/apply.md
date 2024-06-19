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
Function.prototype.myCall = function(context){
    context = context || window
    const funcId = Symbol('funcId');
    context[funcId] = this
    const args = [...arguments].slice(1)
    const reslut = context[funcId](...args);
    delete context[funcId];
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
Function.prototype.MyApply = function(context){
    context = context || globalThis;
    const funcId = Symbol('funcId');
    context[funcId] = this
    const reslut = arguments[1] ?context[funcId](...arguments[1]): context[funcId]()
    delete context[funcId]
    return reslut;
}
```

## bind

### 在JavaScript中，Function.prototype.bind 是一个非常实用的方法，它允许我们创建一个新函数，这个新函数会将其 this 关键字永久地绑定到传入的第一个参数，无论这个函数如何被调用。除此之外，bind 还可以预设一系列参数，这些参数将会在绑定函数真正调用时被置于实参列表前

### 实现bind

```js
Array.prototype.MyBind = function (){
    const _this = this
    //arguments 是函数内部所有参数的伪数组，需要转成数组操作
    const args= [...arguments];
    //第一项为this 后续为函数参数
    const newThis = args.shift()
    return function(){
        return _this.newApply(newThis.args)
    }
}
Function.prototype.newApply = function(context){
    if(typeof this !== 'function'){
        throw new TypeError('type error')
    }
    context = context || this
    context.fn = this
    // 临时挂载函数，执行完需要删除
    let result = arguments[1]?context.fn(...arguments[1]):context.fn()
    delete context.fn
    return result
}
//call
Function.prototype.newCall = function(context,...args){
    if(typeof this !== 'function'){
        throw new TypeError('type error')
    }
    context = context || this
    context.fn = this
    // 临时挂载函数，执行完需要删除
    let result =context.fn(...args)
    delete context.fn
    return result
}
```

### 执行

```js
const val = '123'
const obj = {
    val :'456'
}

function myFn(a,b,c,d,e){
    console.log(this.val,a,b,c,d,e)
}
// myFn(1,2,3,4,5)
// myFn.call(obj,1,2,3,4,5)
// myFn.myCall(obj,1,2,3,4,5)
// myFn.apply(obj,[1,2,3,4,5])
// myFn.MyApply(obj,[1,2,3,4,5])
myFn.MyBind(obj,1,2,3,4,5)()
// myFn.bind(obj,1,2,3,4,5)()
```
