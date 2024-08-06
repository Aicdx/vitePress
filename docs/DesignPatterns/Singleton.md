# 单例模式的实现思路

## 构造函数

一般情况下，我们创建了一个类。可以通过new关键字来创建多个实例

```javascript
class SingleDog {
    show() {
        console.log('我是一个单例对象')
    }
}

const s1 = new SingleDog()
const s2 = new SingleDog()

// false
s1 === s2
```

楼上创建出的s1和s2很明显没有任何关系，它们只是两个不同实例。

而单例模式的要求是，在整个程序中，只有一个实例存在。无论new多少次，都应该返回同一个实例。

```javascript
class SingleDog {
    show() {
        console.log('我是一个单例对象')
    }
    static getInstance() {
        // 判断是否已经new过1个实例
        if (!SingleDog.instance) {
            // 若这个唯一的实例不存在，那么先创建它
            SingleDog.instance = new SingleDog()
        }
        // 如果这个唯一的实例已经存在，则直接返回
        return SingleDog.instance
    }
}

const s1 = SingleDog.getInstance()
const s2 = SingleDog.getInstance()

// true
s1 === s2
```

在上面的代码中，我们通过一个静态方法getInstance来实现单例模式。

## Vuex的单例模式

Vuex是一个专门为Vue.js应用开发的状态管理模式。它采用单例模式，即只有一个Vuex的实例存在。

### Store是一个“假单例”

首先，我们需要明确什么是假单例。在这里，假单例的意思是虽然没有严格遵循单例模式的设计原则，但在实际应用中仍然能够保证实例的唯一性。

```javascript
class Store {
  constructor (options = {}) {
    // ...
    this._actions = Object.create(null)
    this._mutations = Object.create(null)
    this._wrappedGetters = Object.create(null)
    this._modulesNamespaceMap = Object.create(null)
    this._subscribers = []
    this._watcherVM = new Vue()

    // 将 this 赋值给 store，这是为了在后续的函数中使用 Store 实例的上下文
    const store = this
    // 将 this 中的 dispatch 和 commit 方法解构出来，以便在后续的函数中使用
    const { dispatch, commit } = this
    // 分别为 dispatch 和 commit 方法绑定上下文
    this.dispatch = function boundDispatch (type, payload) {
      return dispatch.call(store, type, payload)
    }
    this.commit = function boundCommit (type, payload, options) {
      return commit.call(store, type, payload, options)
    }
    // ...
  }
}
```

在 Vuex 中，我们可以通过 `new Vuex.Store(options)`  调用构造函数来创建一个新的 Store 实例。而在楼上贴出的 `Store` 的 `constructor`  关键源码中，并不存在任何和单例有关的识别/拦截逻辑。

这意味着开发者可以通过 `new` 关键字创建多个 `Store` 实例，这显然不符合我们对单例模式的预期。

创建多个 `Store` 实例

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建一个 store 对象 1 号
const store1 = new Vuex.Store({
  state: { count: 0 },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})

// 创建一个 store 对象 2 号
const store2 = new Vuex.Store({
  state: { count: 0 },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})

// false，说明 store1 和 store2 是完全不同的两个 store
console.log(store1 === store2)
```

由此我们可以看出，虽然 Store 在实践中总是表现得【像个】单例一样，但它本身却并没有真地去实现单例相关的逻辑。

没有实现单例的 Store ，究竟是如何表现出单例般的行为的呢？

这就要从 Vuex 的整体设计上来分析了。

### Vuex 如何确保`Store`的单例特征

* Vuex 工作原理

`Store` 并没有实现标准的单例模式，但是却能够表现出一种类似于单例的行为。这是因为 `Vuex` 从整体设计的层面来保证了 `Store` 在同一个 `Vue` 应用中的唯一性。

具体来说，我们首先需要关注的是 `Vue.use()` 方法，这个方法允许我们给 `Vue` 应用安装像 `Vuex` 这样的插件。`Vuex` 插件是一个对象，它在内部实现了一个 `install` 方法，这个方法会在插件安装时被调用，从而把 `Store` 注入到 `Vue` 应用里去。也就是说每 `install` 一次，`Vuex` 都会尝试给 `Vue` 应用注入一个 `Store`

在 install 函数源码中，有一段和我们楼上的 getInstance() 非常相似的逻辑：

```javascript
let Vue // 这个Vue的作用和楼上的instance作用一样
...

export function install (_Vue) {
  // 判断传入的Vue实例对象是否已经被install过Vuex插件（是否有了唯一的 store）
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  // 若没有，则为这个Vue实例对象install一个唯一的Vuex
  Vue = _Vue
  // 将Vuex的初始化逻辑写进Vue的钩子函数里
  applyMixin(Vue)
}
```

这段和 `getInstance()` 非常相似的逻辑，通过判断当前 `Vue` 应用是否已经安装过 `Vuex` 插件，保证了在同一个 `Vue` 应用中只存在一个 `Vuex` 实例。

继续往下看，在 `install` 函数中，我们可以看到 `Vue` 实例被赋值为 `_Vue`，接着作为 `applyMixin(Vue)` 函数的参数触发一次 `applyMixin()` 的调用。`applyMixin()` 函数会在 `Vue` 实例的 `beforeCreate` 生命周期钩子中，将 `Store` 实例挂载到 `Vue` 实例上。这个“挂载”动作对应的是如下所示的 `vuexInit()` 函数：

```javascript
function vuexInit () {
  const options = this.$options
  // 将 store 实例挂载到 Vue 实例上
  if (options.store) {
    this.$store = typeof options.store === 'function'
      ? options.store()
      : options.store
  } else if (options.parent && options.parent.$store) {
    this.$store = options.parent.$store
  }
}
```

总结一下：`install()`函数通过拦截 `Vue.use(Vuex)` 的多次调用，保证了在同一个`Vue`应用只会安装唯一的一个`Vuex`实例；而 `vuexInit()` 函数则保证了同一个`Vue`应用只会被挂载唯一一个`Store`。这样一来，从效果上来看，`Vuex` 确实是创造了两个”单例“出来。
