#

## 作用域 + 上下文

- 函数提升：函数会事先在执行环境下声明
- 变量提升：使用var声明的变量会提前声明，var a= 'a' 的情况会在执行环境前声明 var a = undefined
- 向上寻找：作用域向上查找

### 这几种作用域查找方式就形成了作用域链

```js
    function teacher(){
        let d = 'yy'
        console.log(d)
    }
    if(true){
        let e = 111
        let f =222
        console.log(e,f)
    }
    console.log(d)
    console.log(e)
    console.log(d)
```

- 两个都拥有独立作用域 =》 函数作用域和块级作用域
- 改用var 仅函数作用域可以隔离变量

### 从而引进js module => 函数

```js
(function ef(){
    var e =111
    var f = 222
    return {
        e,f
    }
}())
// var g = e+f
var g =ef()
//IIFE 函数体后加（）并包裹（）内代表立刻执行无需调用
```

## this 上下文context

- 我家门前有条河，河上有座桥， 河里有群鸭
- 我家门前有条河， ‘this’上有座桥， ‘this’有群鸭
- 面试题：
  => this是执行的时候动态读取上下文，而不是创建的时候决定的

  考察重点：各使用态中的指针指向

### 函数中的直接调用 -this 指向执行全局

```js
    function zhuawa(){
        console.log(this)
    }
    zhuawa()
```

### 隐式绑定

```js
    function fn(){
        console.log('隐式绑定',this.a)
    }
    const obj = {
        a:1,
        fn
    }
    obj.fn = fn
    obj.fn()
    //结果 '隐式绑定',1
    //obj调用fn，这时this指向obj
```

### 面试题

```js
    const foo = {
        bar:10
        fn: function(){
            console(this.bar)
            console(this)
        }
    }
    let fn1 = foo.fn
    fn1()
    //结果 undefined this指向window 这时执行环境为window，因为fn1把fn从foo取出来了

    //追问 如何改变属性的指向
    const o1 = {
        text:'o1'
        fn: function(){
            console('o1_this',this)
            return this.text
        }
    }
     const o2 = {
        text:'o2'
        fn: function(){
            return o1.fn()
        }
    }
     const o3 = {
        text:'o3'
        fn: function(){
            let fn = o1.fn
            return fn()
        }
    }
    // o1 o1 undefined（o3中,新建的fn指向window，没有text）
```

#### 追问： 要输出o2fn => o2

```js
    //1、主动改变this -bind call apply
    o2.fn.call(o2)
    //2、借用函数，调用在本地
    const o2 = {
        text: 'o2',
        fn:o1.fn
    }
    o2.fn()
    //这时fn的作用域就是o2了
```

#### 追问： call bind apply的区别

- 1. call < = > apply 传参不同 依次传参 | 数组传入
- 2. bind 直接返回不同

#### bind原理 | 手写bind

- 原理或者手写题目，解题思路
- 1. 说明原理，写下注释
- 2. 根据注释，补全代码

```js
    //1.需求：手写bind => bind 位置（挂载点） => Function.prototype
    Function.prototype.newBind = function(){
         //2 bind是什么？
         const _this = this
        //  arguments是一个函数内部所有参数的伪数组，需要转成数组进行操作
        const args = Array.prototype.slice.call(arguments)
        // 输入：args，第一项是this，后续为函数传参
        const newThis = args.shift()
        // 返回：返回一个函数 => 返回一个函数 => 这个函数返回原函数的结果并且继承传参
        return function(){
            return _this.newApply(newThis, args)
        }
    }
    Function.prototype.newApply() = function(context){
        //边缘检测
        if(typeof this !== function){
            throw new TypeError('type error')
        }
        //兜底
        context = context || this
        //执行函数替换
        context.fn = this
        //临时挂载执行fn => 销毁临时挂载
        let reslut = arguments[1] ? contenx.fn(...arguments[1]):context.fn()
        delete context.fn
        //返回结果
        return result
    }
   
```

### 闭包 帮助变量逃逸作用域

```js
function mail(){
    let content = 'mail'
    return function (){
        console.log(content)
    }
}
const envelop = mail()
```
