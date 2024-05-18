#

## 函数式

### 函数式编程的出现

*发展历史：命令式 => 面向对象 => 函数式

### 函数式编程的特点

#### 函数式编程原理

- 加法结合律 => 1 + (2 + 3) = (1 + 2) + 3
- 拆分原子函数 => 组合函数 => 函数式编程

#### 理论思想

- 函数是一等公民 => 逻辑实现的基本单元
- 声明式编程 => 逻辑实现的基本方式
- 传参 => 返回参数:惰性函数、 传入参数： 柯里化
- 纯函数 => 无副作用,执行多次结果一致

#### 惰性函数

```js
    // test(1) test(2) test(3)
    let startCourse = name => {
        if(name === 'js'){
            return startJsCourse('js')
        } else if(name === 'css'){
            return startCssCourse('css')
        } else if(name === 'html'){
            return startHtmlCourse('html')
        }
    }
    startCourse('js')()
```

#### 无状态 &无副作用

- a. 无状态 => 幂等性 => 不可操作和改变元数据
- b. 无副作用 => 不会对外部环境产生影响

```js
    const _class = {
        name: 'objective'
    }
    // 改了外部变量，有副作用
    const score = str = > _class.name = _class.name + str
    //有状态
    const score = obj => obj.name += 1

    // 正确写法
    const score = name => name + 1
    _class.name = score(_class.name)

    const changeClass = (obj,name) = > ({...obj, name})
```

#### 柯里化 - 加工 & 组装

```js
    // f(x,y,z) => f(x)(y)(z)
    const sum = (x,y) => {
        return x + y
    }
    sum(1,2)
    const sum = x => {
        return y => {
            return x + y
        }
    }
    sum(1)(2)

    // 流程 = 加工 + 组装
    const fetch = ajax(method, url, data)
    const fetch = ajax.get(method)
    const request = fetch(url)
    合并组合(fentch, request)
```

- 面试题: 手写构造可拆分的传参累加函数 - add(1)(2)(3) = 6

```js
    //1.构造柯里化结构
    //2.传入参数 args
    //3.传入参数无限拓展 => 递归 => 返回递归函数本身
    //4.主功能区 => 累加
    //5.组装输出
    const add = () => {
        // 包含所有参数
        let args = Array.prototype.slice.call(arguments)

        // 内层结构
        let inner = () => {
            // 当前参数与之前参数合并
            args.push(...arguments)
            return inner
        }
        inner.toString = () => {
            return args.reduce((a,b) => a + b)
        }
        //输出函数
        return inner
    }
    '' + add(1)(2)(3)
```

#### 组装

```js
    const compose = (f,g) => x => f(g(x))
    const add = x => x + 1
    const mul = x => x * 2
    const addMul = compose(add,mul)
    addMul(1)
```

#### 实际实现

```js
    //命令式
    trim(reverse(toUpperCase('hello')))
    //对象式
    'hello'.toUpperCase().reverse().trim()
    //函数式
    compose(trim,reverse,toUpperCase)('hello')
    pipe(toUpperCase,reverse,trim)('hello')
```

### BOX和函子

```js
    
```
