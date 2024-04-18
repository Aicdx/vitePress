
# 状态管理 【来自老友：[i校长](https://link.juejin.cn?target=https%3A%2F%2Fwww.jianshu.com%2Fu%2F77699cd41b28 "https://www.jianshu.com/u/77699cd41b28")】

## 1、状态管理是什么？

程序=算法+数据结构 数据是程序的中心。数据结构和算法两个概念间的逻辑关系贯穿了整个程序世界，首先二者表现为不可分割的关系。其实Flutter不就是一个程序吗，那我们面临的最底层的问题还是算法和数据结构，所以我们推导出

Flutter=算法+数据结构 那状态管理是什么？我也用公式来表达一下，如下：

> Flutter状态管理=算法+数据结构+UI绑定

## 2、为什么需要状态管理？

用于解决状态更新问题，不需要`WidgetState` 被全局化，保证组件隐私，使得代码可扩展，易维护，可以动态替换UI而不影响算法逻辑，安全可靠，保持数据的稳定伸缩，性能佳，局部优化；

## 3、说下状态管理基本分类

分为局部管理和全局管理；

- 局部管理：短暂的状态，这种状态根本不需要做全局处理；
- 全局管理：即应用状态，非短暂状态，您要在应用程序的许多部分之间共享，以及希望在用户会话之间保持的状态，就是我们所说的应用程序状态（有时也称为共享状态）

## 4、状态管理的底层逻辑一般是怎么样的？

- `State`：如`StatefulWidget`、`StreamBuilder`状态管理方式；
- `InheritedWidget`专门负责`Widget`树中数据共享的功能型`Widget`：如`Provider`、`scoped_model`就是基于它开发；
- `Notification`：与`InheritedWidget`正好相反，`InheritedWidget`是从上往下传递数据，`Notification`是从下往上，但两者都在自己的`Widget`树中传递，无法跨越树传递；
- `Stream` 数据流 ：如`Bloc`、`flutter_redux`、`fish_redux`等也都基于它来做实现；

## 5、状态管理的使用原则是怎么样的？

局部管理优于全局、保持数据安全性、考虑页面重新`build`带来的影响；

## 6、使用成熟状态管理库的弊端有哪些？

增加代码复杂性、框架bug修复需要时间等待、不理解框架原理导致使用方式不对，反而带来更多问题、选型错误导致不符合应用要求、与团队风格冲突不适用；

# 进阶

## 1、flutter run实际走了哪三个命令？分别用于什么操作？

- `flutter build apk`：通过`gradle`来构建APK
- `adb install`：安装APK
- `adb am start`：启动应用

## 2、Flutter引擎启动过程中做了什么操作？

## 3、setState做了哪些工作？是如何更新UI的？

`setState` 其实是调用了 `markNeedsBuild` ，该方法内部标记此`Element` 为 `Dirty` ，然后在下一帧 `WidgetsBinding.drawFrame` 才会被绘制， `setState`并不是立即生效的。

## 4、Flutter应用启动runApp(MyApp)过程是怎么样的？

Flutter 中 `runApp` 启动入口其实是一个 `WidgetsFlutterBinding` ，它主要是通过 `BindingBase` 的子类 `GestureBinding` 、`ServicesBinding` 、 `SchedulerBinding` 、`PaintingBinding` 、`SemanticsBinding` 、 `RendererBinding` 、`WidgetsBinding` 等，通过 `mixins` 的组合而成的。

## 5.Dart虚拟机如何管理的？怎么调用？如何跟Flutter引擎交互？

Dart虚拟机拥有自己的`Isolate`，完全由虚拟机自己管理的，Flutter引擎也无法直接访问。Dart的UI相关操作，是由`Root Isolate`通过Dart的C++调用，或者是发送消息通知的方式，将UI渲染相关的任务提交到`UIRunner`执行，这样就可以跟Flutter引擎相关模块进行交互。

## 6、Isolate组成部分有哪些？分别有什么作用？

![''](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93c5268b2fdf4daf839dcc2894216d30~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=451&h=451&s=23980&e=webp&a=1&b=f8f8f8)

- `isolate`堆是运该`isolate`中代码分配的所有对象的`GC`管理的内存存储；
- `vm isolate`是一个伪`isolate`，里面包含不可变对象，比如`null`，`true`，`false`；
- `isolate`堆能引用`vm isolate`堆中的对象，但`vm isolate`不能引用`isolate`堆；
- `isolate`彼此之间不能相互引用 每个`isolate`都有一个执行dart代码的`Mutator thread`，一个处理虚拟机内部任务(比如GC, JIT等)的`helper thread`；

## 7、线程和isolate的关系是什么？

1、同一个线程在同一时间只能进入一个`isolate`，当需要进入另一个`isolate`则必须先退出当前的`isolate`；

2、一次只能有一个`Mutator`线程关联对应的`isolate`，`Mutator`线程是执行Dart代码并使用虚拟机的公共的C语言API的线程；

## 8、介绍下JIT运行模式中kernel service

是一个辅助类`isolate`，其核心工作就是`CFE`，将dart转为`Kernel`二进制，然后`VM`可直接使用`Kernel`二进制运行在主`isolate`里面运行。

![''](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b5f53f0866646228d84bf494754b5c8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=451&h=262&s=7992&e=webp&a=1&b=fcfcfc)

## 9、介绍下Dart虚拟机中通过Snapshots运行

A：

## 10、介绍下Dart虚拟机中通过AppAOT Snapshots运行

A：

## 11、图片加载流程是怎么样的？

A：

## 12、简单的说下GestureDector底层实现

A：

## 13、setState在哪种场景下可能会失效？

1、刷新方法内声明的变量；

2、刷新被`final`修饰的变量；

## 14、isolate是怎么进行通信的？实例化过程是怎么样的？

`isolate`线程之间的通信主要通过`port`来进行，这个`port`消息传递过程是异步的。

实例化一个`isolate`的过程包括：

- 1.实例化`isolate`结构体。
- 2.在堆中分配线程内存。
- 3.配置`port`等过程。

## 15、虚拟机如何运行Dart代码？

1.源码或者`Kernel`二进制(`JIT`)

2.snapshot ：

- AOT snapshot
- AppJIT snapshot

## 16、JIT运行模式中debug运行原理是怎么样的？

将dart代码转换为`kernel`二进制和执行`kernel`二进制，这两个过程也可以分离开来，在两个不同的机器执行，比如`host`机器执行编译，移动设备执行`kernel`文件。

![''](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8dcf5f5a57e4c7fa8e6aeb787c87013~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=451&h=254&s=8296&e=webp&a=1&b=fcfcfc)

## 17.默认情况下debug和release会生成哪些架构的so库？

### 图解

这个编译过程并不是`flutter tools`自身完成，而是交给另一个进程`frontend_server`来执行，它包括`CFE`和一些`flutter`专有的`kernel`转换器。 `hot reload`：热重载机制正是依赖这一点，`frontend_server`重用上一次编译中的`CFE`状态，只重新编译实际更改的部分。
