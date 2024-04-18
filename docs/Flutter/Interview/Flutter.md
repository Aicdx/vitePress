# Flutter

## 1、介绍下Flutter的FrameWork层和Engine层，以及它们的作用

Flutter的`FrameWork`层是用Dart编写的框架（SDK），它实现了一套基础库，包含`Material`（Android风格UI）和`Cupertino`（iOS风格）的UI界面，下面是通用的`Widgets`（组件），之后是一些动画、绘制、渲染、手势库等。这个纯 Dart实现的 SDK被封装为了一个叫作 `dart:ui`的 Dart库。我们在使用 Flutter写 App的时候，直接导入这个库即可使用组件等功能。 Flutter的`Engine`层是`Skia 2D`的绘图引擎库，其前身是一个向量绘图软件，Chrome和 Android均采用 `Skia`作为绘图引擎。Skia提供了非常友好的 API，并且在图形转换、文字渲染、位图渲染方面都提供了友好、高效的表现。Skia是跨平台的，所以可以被嵌入到 Flutter的 iOS SDK中，而不用去研究 iOS闭源的 `Core Graphics / Core Animation`。Android自带了 `Skia`，所以 Flutter Android SDK要比 iOS SDK小很多。

## 2、介绍下Widget、State、Context 概念

- Widget：在Flutter中，几乎所有东西都是`Widget`。将一个`Widget`想象为一个可视化的组件（或与应用可视化方面交互的组件），当你需要构建与布局直接或间接相关的任何内容时，你正在使用`Widget`。
- Widget树：`Widget`以树结构进行组织。包含其他`Widget`的`widget`被称为父`Widget`(或`widget`容器)。包含在父`widget`中的`widget`被称为子`Widget`。
- Context：仅仅是已创建的所有`Widget`树结构中的某个`Widget`的位置引用。简而言之，将`context`作为`widget`树的一部分，其中`context`所对应的`widget`被添加到此树中。一个`context`只从属于一个`widget`，它和`widget`一样是链接在一起的，并且会形成一个`context`树。
- State：定义了`StatefulWidget`实例的行为，它包含了用于”交互/干预“`Widget`信息的行为和布局。应用于`State`的任何更改都会强制重建`Widget`。

## 3、介绍下StatelessWidget和StatefulWidget两种状态组件类

- StatelessWidget: 一旦创建就不关心任何变化，在下次构建之前都不会改变。它们除了依赖于自身的配置信息（在父节点构建时提供）外不再依赖于任何其他信息。比如典型的`Text`、`Row`、`Column`、`Container`等，都是`StatelessWidget`。它的生命周期相当简单：初始化、通过`build()`渲染。
- StatefulWidget: 在生命周期内，该类`Widget`所持有的数据可能会发生变化，这样的数据被称为`State`，这些拥有动态内部数据的Widget被称为`StatefulWidget`。比如复选框、`Button`等。`State`会与`Context`相关联，并且此关联是永久性的，`State`对象将永远不会改变其`Context`，即使可以在树结构周围移动，也仍将与该`context`相关联。当`state`与`context`关联时，`state`被视为已挂载。`StatefulWidget`由两部分组成，在初始化时必须要在`createState()`时初始化一个与之相关的`State`对象。

## 4、StatefulWidget 的生命周期是怎么样的？

Flutter的`Widget`分为`StatelessWidget`和`StatefulWidget`两种。其中，`StatelessWidget`是无状态的，`StatefulWidget`是有状态的，因此实际使用时，更多的是`StatefulWidget`。`StatefulWidget`的生命周期如下图

![''](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7afca959890649da8143d285c788875d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=451&h=314&s=5234&e=webp&b=ffffff)

- `initState()`：`Widget` 初始化当前 `State`，在当前方法中是不能获取到 `Context` 的，如想获取，可以试试 `Future.delayed()`
- `didChangeDependencies()`：在 `initState()` 后调用，`State`对象依赖关系发生变化的时候也会调用。
- `deactivate()`：当 `State` 被暂时从视图树中移除时会调用这个方法，页面切换时也会调用该方法，和Android里的 `onPause` 差不多。
- `dispose()`：`Widget` 销毁时调用。 `didUpdateWidget`：`Widget` 状态发生变化的时候调用。

## 5、说下Widgets、RenderObjects 和 Elements的关系

首先看一下这几个对象的含义及作用。

- `Widget` ：仅用于存储渲染所需要的信息。
- `RenderObject` ：负责管理布局、绘制等操作。
- `Element` ：才是这颗巨大的控件树上的实体。

`Widget`会被`inflate（填充）`到`Element`，并由`Element`管理底层渲染树。`Widget`并不会直接管理状态及渲染,而是通过`State`这个对象来管理状态。Flutter创建`Element`的可见树，相对于`Widget`来说，是可变的，通常界面开发中，我们不用直接操作`Element`,而是由框架层实现内部逻辑。就如一个UI视图树中，可能包含有多个`TextWidget`(`Widget`被使用多次)，但是放在内部视图树的视角，这些`TextWidget`都是填充到一个个独立的`Element`中。`Element`会持有`renderObject`和`widget`的实例。记住，`Widget` 只是一个配置，`RenderObject` 负责管理布局、绘制等操作。 在第一次创建 `Widget` 的时候，会对应创建一个 `Element`， 然后将该元素插入树中。如果之后 `Widget` 发生了变化，则将其与旧的 `Widget` 进行比较，并且相应地更新 `Element`。重要的是，`Element` 不会被重建，只是更新而已。

## 6、Flutter 是如何与原生Android、iOS进行通信的？

Flutter 通过 `PlatformChannel` 与原生进行交互，其中 `PlatformChannel` 分为三种：

- `BasicMessageChannel`：用于传递字符串和半结构化的信息。
- `MethodChannel`：用于传递方法调用。Flutter主动调用Native的方法，并获取相应的返回值。
- `EventChannel`：用于数据流（`event streams`）的通信。

关于原理：[www.jianshu.com/p/39575a90e…](https://link.juejin.cn?target=https%3A%2F%2Fwww.jianshu.com%2Fp%2F39575a90e820 "https://www.jianshu.com/p/39575a90e820")

## 7、简述下Flutter 的热重载

Flutter 的热重载是基于 JIT 编译模式的代码增量同步。由于 JIT 属于动态编译，能够将 Dart 代码编译成生成中间代码，让 `Dart VM` 在运行时解释执行，因此可以通过动态更新中间代码实现增量同步。

热重载的流程可以分为 5 步，包括：扫描工程改动、增量编译、推送更新、代码合并、`Widget` 重建。

Flutter 在接收到代码变更后，并不会让 App 重新启动执行，而只会触发 `Widget` 树的重新绘制，因此可以保持改动前的状态，大大缩短了从代码修改到看到修改产生的变化之间所需要的时间。

另一方面，由于涉及到状态的保存与恢复，涉及状态兼容与状态初始化的场景，热重载是无法支持的，如改动前后 `Widget` 状态无法兼容、全局变量与静态属性的更改、`main` 方法里的更改、`initState` 方法里的更改、枚举和泛型的更改等。

可以发现，热重载提高了调试 UI 的效率，非常适合写界面样式这样需要反复查看修改效果的场景。但由于其状态保存的机制所限，热重载本身也有一些无法支持的边界。

## 8、说下Flutter 和其他跨平台方案的本质区别

React Native 之类的框架，只是通过 JavaScript 虚拟机扩展调用系统组件，由 Android 和 iOS 系统进行组件的渲染；

Flutter 则是自己完成了组件渲染的闭环。那么，Flutter 是怎么完成组件渲染的呢？这需要从图像显示的基本原理说起。在计算机系统中，图像的显示需要 CPU、GPU 和显示器一起配合完成：CPU 负责图像数据计算，GPU 负责图像数据渲染，而显示器则负责最终图像显示。CPU 把计算好的、需要显示的内容交给 GPU，由 GPU 完成渲染后放入帧缓冲区，随后视频控制器根据垂直同步信号（VSync）以每秒 60 次的速度，从帧缓冲区读取帧数据交由显示器完成图像显示。操作系统在呈现图像时遵循了这种机制，而 Flutter 作为跨平台开发框架也采用了这种底层方案。下面有一张更为详尽的示意图来解释 Flutter 的绘制原理。

![''](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68ac27af06464f3eb67f359b4f1f95d0~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=413&h=100&s=6592&e=webp&a=1&b=f4f4c6)

Flutter 绘制原理可以看到，Flutter 关注如何尽可能快地在两个硬件时钟的 `VSync` 信号之间计算并合成视图数据，然后通过 `Skia` 交给 GPU 渲染：UI 线程使用 Dart 来构建视图结构数据，这些数据会在 GPU 线程进行图层合成，随后交给 `Skia` 引擎加工成 GPU 数据，而这些数据会通过 `OpenGL` 最终提供给 GPU 渲染。

## 9、Widget 唯一标识Key有哪几种？

在flutter中，每个`widget`都是被唯一标识的。这个唯一标识在`build`或`renderin`g阶段由框架定义。该标识对应于可选的`Key`参数，如果省略，Flutter将会自动生成一个。

在flutter中，主要有4种类型的`Key`：`GlobalKey`（确保生成的Key在整个应用中唯一，是很昂贵的，允许`element`在树周围移动或变更父节点而不会丢失状态）、`LocalKey`、`UniqueKey`、`ObjectKey`。

## 10、什么是Navigator? MaterialApp做了什么？

`Navigator`是在Flutter中负责管理维护页面堆栈的导航器。

`MaterialApp`在需要的时候，会自动为我们创建`Navigator`。

`Navigator.of(context)`，会使用`context`来向上遍历`Element`树，找到`MaterialApp`提供的`_NavigatorState`再调用其`push/pop`方法完成导航操作。

## 11、Flutter动画类型有哪些？

- 补间动画：给定初值与终值，系统自动补齐中间帧的动画
- 物理动画：遵循物理学定律的动画，实现了弹簧、阻尼、重力三种物理效果

在应用使用过程中常见动画模式：

- 动画列表或者网格：例如元素的添加或者删除操作；
- 转场动画`Shared element transition`：例如从当前页面打开另一页面的过渡动画；
- 交错动画`Staggered animations`：比如部分或者完全交错的动画。

## 12、Flutter是怎么完成组件渲染的?

A：

## 13、Flutter绘制流程是怎么样的？

A：

## 14、如何统一管理错误页面？

在`main`方法修改`ErrorWidget.builder` 来自定义一个属于自己的`Widget`；

如：

```dart
  /// 自定义报错页面
  ErrorWidget.builder = (FlutterErrorDetails flutterErrorDetails) {
    debugPrint(flutterErrorDetails.toString());
    return new Center(child: new Text("App错误，快去反馈给作者!"));
  };
```

## 15、Flutter 中存在哪四大线程？

Flutter 中存在四大线程，分别为 `UI Runner`、`GPU Runner`、`IO Runner`， `Platform Runner` （原生主线程） ，同时在 Flutter 中可以通过 `isolate` 或者 `compute` 执行真正的跨线程异步操作。

## 16、PlatformView的作用有哪些？

Flutter 中通过 `PlatformView` 可以嵌套原生 `View` 到 `Flutter UI` 中；

## 17、PlatformView使用了哪些东西来实现？

`Presentation`、`VirtualDisplay` 、 `Surface` 等；

## 18、PlatformView大致原理是怎么样的？

使用了类似副屏显示的技术，`VirtualDisplay` 类代表一个虚拟显示器，调用 `DisplayManager` 的 `createVirtualDisplay()` 方法，将虚拟显示器的内容渲染在一个 `Surface` 控件上，然后将 `Surface` 的 `id`通知给 Dart，让 `engine` 绘制时，在内存中找到对应的 `Surface` 画面内存数据，然后绘制出来。 实时控件截图渲染显示技术。

## 19、Flutter 的 Debug 和 release 分别是在什么模式下运行的？

Flutter 的 `Debug` 下是 `JIT` 模式，`release`下是`AOT`模式。

## 20、Platform Channel有哪几种通信方式？分别是用于什么操作？

- `BasicMessageChannel` ：用于传递字符串和半结构化的信息。
- `MethodChannel` ：用于传递方法调用（`method invocation`）。
- `EventChannel`: 用于数据流（`event streams`）的通信。

## 21、RenderObject布局相关方法调用顺序是怎么样的？

`layout` -> `performResize` -> `performLayout` -> `markNeedsPaint` , 但是用户一般不会直接调用 `layout`，而是通过 `markNeedsLayout` ，具体流程如下：

![''](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52c3ec775725435e9fc9c7a8dbbd3b3f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=451&h=244&s=4214&e=webp&b=fbfafa)

## 22、RenderObject如何使得页面重绘？流程是怎么样的？

`RenderObject` 在 `attch/layout` 之后会通过 `markNeedsPaint();` 使得页面重绘，流程大概如下：

![''](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a47cf8a963554a0481f1dcfdeb9b163b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=451&h=112&s=3696&e=webp&b=fbfbfb)

通过`isRepaintBoundary` 往上确定了更新区域，通过 `requestVisualUpdate` 方法触发更新往下绘制。

## 23、Flutter存在哪几棵树？他们有什么关系？

Flutter 中存在 `Widget` 、 `Element` 、`RenderObject` 、`Layer` 四棵树，其中 `Widget` 与 `Element` 是一对多的关系 ，

## 24、简述下Flutter的线程管理模型

默认情况下，`Flutter Engine`层会创建一个`Isolate`，并且Dart代码默认就运行在这个主`Isolate`上。必要时可以使用`spawnUri`和`spawn`两种方式来创建新的`Isolate`，在Flutter中，新创建的`Isolate`由Flutter进行统一的管理。 事实上，`Flutter Engine`自己不创建和管理线程，`Flutter Engine`线程的创建和管理是`Embeder`负责的，`Embeder`指的是将引擎移植到平台的中间层代码，`Flutter Engine`层的架构示意图如下图所示。

![''](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/899b0e4da5ef4b2db2e592809d1ca37f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=451&h=217&s=4176&e=webp&b=fcfcfc)

在Flutter的架构中，`Embeder`提供四个`Task Runner`，分别是`Platform Task Runner`、`UI Task Runner Thread`、`GPU Task Runner`和`IO Task Runner`，每个`Task Runner`负责不同的任务，`Flutter Engine`不在乎`Task Runner`运行在哪个线程，但是它需要线程在整个生命周期里面保持稳定
