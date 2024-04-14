# webpack 与其他工具的差异

## webpack与grunt gulp的差异

- grunt 和 gulp 是一种能够优化前端工作流程的工具，而 webpack 是一种模块化的解决方案，不仅能够优化前端工作流程，还能够优化模块之间的依赖关系。
- webpack 专注于模块打包，而 grunt 和 gulp 更侧重于任务流程。
- webpack 更适合大型项目，而 grunt 和 gulp 更适合中小型项目。
- webpack 的优势在于模块化，能够将一个复杂的项目依赖树拆分成块，并按需加载。
- grunt 和 gulp 的优势在于插件丰富，能够通过配置一系列的插件来完成相应的任务。

而现在主流的方式是用 npm scripts 来替代 grunt 和 gulp，因为 npm scripts 的性能更好，更简单

## webpack与rollup的差异

- webpack 和 rollup 都是模块打包工具，但是面向的场景不同。webpack 的主要场景是 Web 应用程序，而 rollup 的主要场景是 JavaScript 库。
- webpack 适用于大型复杂项目: webpack有强大的loader和plugin生态系统，能够处理各种资源，能够实现代码分割、懒加载、热更新等功能。打包后的文件实际上是一个立即执行函数，这个函数接受一个对象作为参数，键为模块的路径，值为模块的代码。这种方式适合浏览器环境。
- rollup 适用于打包库文件: 如vue3，d3等。将各个模块打包进一个文件中，并通过tree-shaking的方式去除无用代码，可以最大程度减少文件体积，但是没有像webpack那样的loader和plugin生态系统，更加聚焦于库的打包。

## Vite[​](https://vue3.chengpeiquan.com/engineering.html#vite)

Vite 的作者也是熟悉的 Vue 作者尤雨溪，它是一个基于 ESM 实现的构建工具，主打更轻、更快的开发体验，主要面向现代浏览器，于 2021 年推出 2.x 版本之后，进入了一个飞速发展的时代，目前市场上的 npm 包基本都对 Vite 做了支持，用来做业务已经没有问题了。

毫秒级的开发服务启动和热重载，对 TypeScript 、 CSS 预处理器等常用开发工具都提供了开箱即用的支持，也兼容海量的 npm 包，如果是先用 Webpack 再用的 Vite ，会很快就喜欢上它！

点击访问：[Vite 官网](https://cn.vitejs.dev/)

在升级与配置一章里的 [使用 Vite 创建项目](https://vue3.chengpeiquan.com/upgrade.html#%E4%BD%BF%E7%94%A8-vite-%E5%88%9B%E5%BB%BA%E9%A1%B9%E7%9B%AE-new) 会指导如何使用流行脚手架创建一个基于 Vite 的 Vue 项目。

## 两者的区别[​](https://vue3.chengpeiquan.com/engineering.html#%E4%B8%A4%E8%80%85%E7%9A%84%E5%8C%BA%E5%88%AB)

在开发流程上， Webpack 会先打包，再启动开发服务器，访问开发服务器时，会把打包好的结果直接给过去，下面是 Webpack 使用的 bundler 机制的工作流程。

Vite 是基于浏览器原生的 ES Module ，所以不需要预先打包，而是直接启动开发服务器，请求到对应的模块的时候再进行编译，下面是 Vite 使用的 ESM 机制的工作流程。

所以当项目体积越大的时候，在开发启动速度上， Vite 和 Webpack 的差距会越来越大。

可以点击 Vite 官网的这篇文章： [为什么选 Vite](https://cn.vitejs.dev/guide/why.html) 了解更多的技术细节。

构建方面，为了更好的加载体验，以及 Tree Shaking 按需打包 、懒加载和 Chunk 分割利于缓存，两者都需要进行打包；但由于 Vite 是面向现代浏览器，所以如果项目有兼容低版本浏览器的需求的话，建议还是用 Webpack 来打包，否则， Vite 是目前的更优解。


## 3