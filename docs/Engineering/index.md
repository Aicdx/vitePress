# 什么是前端工程化

前端工程化是指通过工具和方法，提高前端开发效率、降低维护成本、提升代码质量的一种手段。

## 工程化带来的优势[​](https://vue3.chengpeiquan.com/engineering.html#%E5%B7%A5%E7%A8%8B%E5%8C%96%E5%B8%A6%E6%9D%A5%E7%9A%84%E4%BC%98%E5%8A%BF)

为了解决传统开发的弊端，前端也开始引入工程化开发的概念，借助工具来解决人工层面的烦琐事情。

### 开发层面的优势[​](https://vue3.chengpeiquan.com/engineering.html#%E5%BC%80%E5%8F%91%E5%B1%82%E9%9D%A2%E7%9A%84%E4%BC%98%E5%8A%BF)

在 [传统开发的弊端](https://vue3.chengpeiquan.com/engineering.html#%E4%BC%A0%E7%BB%9F%E5%BC%80%E5%8F%91%E7%9A%84%E5%BC%8A%E7%AB%AF) 里，主要列举的是开发层面的问题，工程化首要解决的当然也是在开发层面遇到的问题。

在开发层面，前端工程化有以下这些好处：

1. 引入了模块化和包的概念，作用域隔离，解决了代码冲突的问题
1. 按需导出和导入机制，让编码过程更容易定位问题
1. 自动化的代码检测流程，有问题的代码在开发过程中就可以被发现
1. 编译打包机制可以让使用开发效率更高的编码方式，比如 Vue 组件、 CSS 的各种预处理器
1. 引入了代码兼容处理的方案（ e.g. Babel ），可以让开发者自由使用更先进的 JavaScript 语句，而无需顾忌浏览器兼容性，因为最终会转换为浏览器兼容的实现版本
1. 引入了 Tree Shaking 机制，清理没有用到的代码，减少项目构建后的体积

还有非常多的体验提升，列举不完。而对应的工具，根据用途也会有非常多的选择，在后面的学习过程中，会一步一步体验到工程化带来的好处。

## 团队协作的优势[​](https://vue3.chengpeiquan.com/engineering.html#%E5%9B%A2%E9%98%9F%E5%8D%8F%E4%BD%9C%E7%9A%84%E4%BC%98%E5%8A%BF)

除了对开发者有更好的开发体验和效率提升，对于团队协作，前端工程化也带来了更多的便利，例如下面这些场景：

### 统一的项目结构[​](https://vue3.chengpeiquan.com/engineering.html#%E7%BB%9F%E4%B8%80%E7%9A%84%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84)

以前的项目结构比较看写代码的人的喜好，虽然一般在研发部门里都有 “团队规范” 这种东西，但靠自觉性去配合的事情，还是比较难做到统一，特别是项目很赶的时候。

工程化后的项目结构非常清晰和统一，以 Vue 项目来说，通过脚手架创建一个新项目之后，它除了提供能直接运行 Hello World 的基础代码之外，还具备了如下的统一目录结构：

- `src` 是源码目录
- `src/main.ts` 是入口文件
- `src/views` 是路由组件目录
- `src/components` 是子组件目录
- `src/router` 是路由目录

虽然也可以自行调整成别的结构，但根据笔者在多年的工作实际接触下来，以及从很多开源项目的代码里看到的，都是沿用脚手架创建的项目结构（不同脚手架创建的结构会有所不同，但基于同一技术栈的项目基本上都具备相同的结构）。

TIP

在 [脚手架的升级与配置](https://vue3.chengpeiquan.com/upgrade.html) 一章可以学习如何使用脚手架创建 Vue 3 项目。

### 统一的代码风格[​](https://vue3.chengpeiquan.com/engineering.html#%E7%BB%9F%E4%B8%80%E7%9A%84%E4%BB%A3%E7%A0%81%E9%A3%8E%E6%A0%BC)

不管是接手其他人的代码或者是修改自己不同时期的代码，可能都会遇到这样的情况，例如一个模板语句，上面包含了很多属性，有的人喜欢写成一行，属性多了维护起来很麻烦，需要花费较多时间辨认：

```vue
<template>
  <div class="list">
    <!-- 这个循环模板有很多属性 -->
    <div class="item" :class="{ `top-${index + 1}`: index < 3 }" v-for="(item, index)
    in list" :key="item.id" @click="handleClick(item.id)">
      <span>{{ item.text }}</span>
    </div>
    <!-- 这个循环模板有很多属性 -->
  </div>
</template>
```

而工程化配合统一的代码格式化规范，可以让不同人维护的代码，最终提交到 Git 上的时候，风格都保持一致，并且类似这种很多属性的地方，都会自动帮格式化为一个属性一行，维护起来就很方便：

```vue
<template>
  <div class="list">
    <!-- 这个循环模板有很多属性 -->
    <div
      class="item"
      :class="{ `top-${index + 1}`: index < 3 }"
      v-for="(item, index) in list"
      :key="item.id"
      @click="handleClick(item.id)"
    >
      <span>{{ item.text }}</span>
    </div>
    <!-- 这个循环模板有很多属性 -->
  </div>
</template>
```

同样的，写 JavaScript 时也会有诸如字符串用双引号还是单引号，缩进是 Tab 还是空格，如果用空格到底是要 4 个空格还是 2 个空格等一堆 “没有什么实际意义” 、但是不统一的话协作起来又很难受的问题……

在工程化项目这些问题都可以交给程序去处理，在书写代码的时候，开发者可以先按照自己的习惯书写，然后再执行命令进行格式化，或者是在提交代码的时候配合 Git Hooks 自动格式化，都可以做到统一风格。

TIP

在 [添加协作规范](https://vue3.chengpeiquan.com/upgrade.html#%E6%B7%BB%E5%8A%A0%E5%8D%8F%E4%BD%9C%E8%A7%84%E8%8C%83) 一节可以学习如何给项目添加统一的协作规范。

### 可复用的模块和组件[​](https://vue3.chengpeiquan.com/engineering.html#%E5%8F%AF%E5%A4%8D%E7%94%A8%E7%9A%84%E6%A8%A1%E5%9D%97%E5%92%8C%E7%BB%84%E4%BB%B6)

传统项目比较容易被复用的只有 JavaScript 代码和 CSS 代码，会抽离公共函数文件上传到 CDN ，然后在 HTML 页面里引入这些远程资源， HTML 代码部分通常只有由 JS 创建的比较小段的 DOM 结构。

并且通过 CDN 引入的资源，很多时候都是完整引入，可能有时候只需要用到里面的一两个功能，却要把很大的完整文件都引用进来。

这种情况下，在前端工程化里，就可以抽离成一个开箱即用的 npm 组件包，并且很多包都提供了模块化导出，配合构建工具的 Tree Shaking ，可以抽离用到的代码，没有用到的其他功能都会被抛弃，不会一起发布到生产环境。

TIP

在 [依赖包和插件](https://vue3.chengpeiquan.com/guide.html#%E4%BE%9D%E8%B5%96%E5%8C%85%E5%92%8C%E6%8F%92%E4%BB%B6) 一节可以学习如何查找和使用开箱即用的 npm 包。

### 代码健壮性有保障[​](https://vue3.chengpeiquan.com/engineering.html#%E4%BB%A3%E7%A0%81%E5%81%A5%E5%A3%AE%E6%80%A7%E6%9C%89%E4%BF%9D%E9%9A%9C)

传统的开发模式里，只能够写 JavaScript ，而在工程项目里，可以在开发环境编写带有类型系统的 TypeScript ，然后再编译为浏览器能认识的 JavaScript 。

在开发过程中，编译器会检查代码是否有问题，比如在 TypeScript 里声明了一个布尔值的变量，然后不小心将它赋值为数值：

```ts
// 声明一个布尔值变量
let bool: boolean = true

// 在 TypeScript ，不允许随意改变类型，这里会报错
bool = 3
```

编译器检测到这个行为的时候就会抛出错误：

```bash
# ...
return new TSError(diagnosticText, diagnosticCodes);
           ^
TSError: ⨯ Unable to compile TypeScript:
src/index.ts:2:1 - error TS2322: Type 'number' is not assignable to type 'boolean'.

2 bool = 3
  ~~~~
# ...
```

从而得以及时发现问题并修复，减少线上事故的发生。

### 团队开发效率高[​](https://vue3.chengpeiquan.com/engineering.html#%E5%9B%A2%E9%98%9F%E5%BC%80%E5%8F%91%E6%95%88%E7%8E%87%E9%AB%98)

在前后端合作环节，可以提前 Mock 接口与后端工程师同步开发，如果遇到跨域等安全限制，也可以进行本地代理，不受跨域困扰。

前端工程在开发过程中，还有很多可以交给程序处理的环节，像前面提到的代码格式化、代码检查，还有在部署上线的时候也可以配合 CI/CD 完成自动化流水线，不像以前改个字都要找服务端工程师去更新，可以把非常多的人力操作剥离出来交给程序。
