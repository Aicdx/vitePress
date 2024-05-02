#

## 模块化历程

### IIFE - 函数作用域 - 模块化的基石

```js

```

### 成熟期 CJS - CommonJS

> nodejs 制定
特性

- 1. 通过module + exports对外暴露接口
- 2. 通过require引入模块

模块组织方式

```js
    const dependencies1 = require('dependencies1')
    const dependencies2 = require('dependencies2')

    let count = 0
    const increase = () => {
        count++
    }
    const revert = () => {
        count = 0
    }
    exports.increase = increase
    exports.revert = revert

    module.exports = {
        increase,
        revert
    }

    //引用
    const {increase, revert} = require('module')
    increase()
    revert()

    const module = require('module')
    module.increase()
    module.revert()
```

> - 优点:
>CommonJs 规范在服务端率先完成了JS的模块化，解决了依赖、变量污染的问题
> - 缺点:
>
> 1. 无法在浏览器端运行
> 2. 无法异步加载模块
> 3. 无法处理循环依赖

### AMD规范

> 非同步模块的加载，允许指定回调函数 -requirejs

新增定义方式

```js
    define(['dependencies1', 'dependencies2'], function(dependencies1, dependencies2){
            let count = 0
            const increase = () => {
                count++
            }
            const revert = () => {
                count = 0
            }
            return {
                increase,
                revert
            }
        })
    
        //引用
        require(['module'], function(module){
            module.increase()
            module.revert()
        })
```

#### 面试题： 如何在AMD规范使用require引入同步模块

```js
    define(function(require){
        const module = require('module')
        module.increase()
        module.revert()
    })

    define(function(require, exports, module){
        const module = require('module')
        module.increase()
        module.revert()

        module.exports = {
            increase,
            revert
        }
    })
```

> - 优点:可以在浏览器端异步加载模块
> - 缺点: 提高了开发成本，不能按需加载，必须提前加载所有依赖

### CMD规范 - sea.js

特征: 按需加载

```js
    define(function(require, exports, module){
        //内部按需加载
        const module = require('module')
        // module.increase()
        let count = 0
        const increase = () => {
            count++
        }
        const revert = () => {
            count = 0
        }
        exports.increase = increase
        exports.revert = revert
    })

    //引用
    define(function(require){
        const module = require('module')
        module.increase()
        module.revert()
    })
```

- 优点: 按需加载，提高性能
- 缺点: 依赖打包，加载逻辑存在每个模块中

### 完全体 ESM

> ES6模块化规范
> 特点:

- 1. 通过export + import对外暴露接口

```js
    //module.js
    let count = 0
    const increase = () => {
        count++
    }
    const revert = () => {
        count = 0
    }
    export {
        increase,
        revert
    }

    //引用
    import {increase, revert} from 'module'
    increase()
    revert()
```

### 兼容AMD & CJS - UMD

```js
    (define(function(require, exports, module){
        //内部按需加载
        const module = require('module')
        // module.increase()
        let count = 0
        const increase = () => {
            count++
        }
        const revert = () => {
            count = 0
        }
        exports.increase = increase
        exports.revert = revert
    }))(typeof define === 'function' && define.amd ? define : function(factory){
        module.exports = factory(require, exports, module)
    })
```

### 更多方向 - 静态分析、预编译

```js
    <script>require.config(_FONFIG_)</script>
    //动态导入
```
