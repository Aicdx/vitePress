# Dart相关

## 1、Dart 当中的 「..」表示什么意思？

级连操作符

“..” 和 “.” 不同：调用`..`后返回的相当于是`this`，而`.`返回的则是该方法返回的值；

## 2、Dart 的作用域是怎么样的？

Dart没有`public`和`private`等关键词，默认就是公开的，私有变量使用下划线开头；

## 4、dart是多线程还是单线程执行？

单线程执行，多线程是使用异步来执行的；

## 5、阻塞式调用和非阻塞式调用是怎么样的？

阻塞：调用结果之前，当前线程会被挂起，调用线程只有在得到结果之后才会继续执行；

非阻塞：调用执行之后，当前线程不会停止运行，只需要过一段时间来检查有没有结果返回即可；

## 6、事件循环是什么？

将需要处理的一系列事件，放在一个事件队列（`Event Queue`）中，不断从事件队列中取出事件，并执行需要执行的代码块，直到事件被清空。

## 7、dart是值传递还是引用传递？

dart是值传递。我们每次调用函数，传递过去的都是对象的内存地址，而不是这个对象的复制。

## 8、Dart 语言有哪些重要的特性？

- Productive（生产力高，Dart的语法清晰明了，工具简单但功能强大）
- Fast（执行速度快，Dart提供提前优化编译，以在移动设备和Web上获得可预测的高性能和快速启动。）
- Portable（易于移植，Dart可编译成ARM和X86代码，这样Dart移动应用程序可以在iOS、Android和其他地方运行）
- Approachable（容易上手，充分吸收了高级语言特性，如果你已经知道C++，C语言，或者Java，你可以在短短几天内用Dart来开发）
- Reactive（响应式编程）

## 9、Dart 语言有哪些重要的概念？

- 在Dart中，一切都是对象，所有的对象都是继承自`Object`
- Dart是强类型语言，但可以用var或 `dynamic`来声明一个变量，Dart会自动推断其数据类型,`dynamic`类似c#
- 没有赋初值的变量都会有默认值`null`
- Dart支持顶层方法，如`main`方法，可以在方法内部创建方法
- Dart支持顶层变量，也支持类变量或对象变量
- Dart没有`public` `protected` `private`等关键字，如果某个变量以下划线（_）开头，代表这个变量在库中是私有的

## 10、Dart线程模型是如何执行的？

Dart 是单线程模型，运行的的流程如下图。 ![''](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f274d1e92be441bca336587745bb6416~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=210&h=226&s=3544&e=webp&b=fbfbfb)

![''](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c960b151c5e641998f772c10232135f7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=211&h=240&s=3644&e=webp&b=f9f8f7)

Dart 在单线程中是以消息循环机制来运行的，包含两个任务队列，一个是“微任务队列” `microtask queue`，另一个叫做“事件队列” `event queue`。 当Flutter应用启动后，消息循环机制便启动了。首先会按照先进先出的顺序逐个执行微任务队列中的任务，当所有微任务队列执行完后便开始执行事件队列中的任务，事件任务执行完毕后再去执行微任务，如此循环往复，生生不息。

## 11、Dart 是如何实现多任务并行的？

Dart 是单线程的，不存在多线程，那如何进行多任务并行的呢？其实，Dart的多线程和前端的多线程有很多的相似之处。Flutter的多线程主要依赖Dart的并发编程、异步和事件驱动机制。

![''](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f7f9b07b99d4ffcbd7b94918e664976~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=451&h=203&s=4662&e=webp&b=fbfafa)

简单的说，在Dart中，一个`Isolate`对象其实就是一个`isolate`执行环境的引用，一般来说我们都是通过当前的`isolate`去控制其他的`isolate`完成彼此之间的交互，而当我们想要创建一个新的`Isolate`可以使用`Isolate.spawn`方法获取返回的一个新的`isolate`对象，两个`isolate`之间使用`SendPort`相互发送消息，而`isolate`中也存在了一个与之对应的`ReceivePort`接受消息用来处理，但是我们需要注意的是，`ReceivePort`和`SendPort`在每个`isolate`都有一对，只有同一个`isolate`中的`ReceivePort`才能接受到当前类的`SendPort`发送的消息并且处理。

## 12、await for 如何使用?

`await for`是不断获取`stream`流中的数据，然后执行循环体中的操作。它一般用在直到`stream`什么时候完成，并且必须等待传递完成之后才能使用，不然就会一直阻塞。

![''](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32080284ac0e4391923b47accf80f11e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=413&h=154&s=5952&e=webp&b=2c2b2b)

## 13、Stream 有哪两种订阅模式？分别是怎么调用的？

单订阅(`single`)和多订阅（`broadcast`）。

单订阅就是只能有一个订阅者，而广播是可以有多个订阅者。这就有点类似于消息服务（`Message Service`）的处理模式。单订阅类似于点对点，在订阅者出现之前会持有数据，在订阅者出现之后就才转交给它。而广播类似于发布订阅模式，可以同时有多个订阅者，当有数据时就会传递给所有的订阅者，而不管当前是否已有订阅者存在。 `Stream` 默认处于单订阅模式，所以同一个 `stream` 上的 `listen` 和其它大多数方法只能调用一次，调用第二次就会报错。但 `Stream` 可以通过 `transform()` 方法（返回另一个 `Stream`）进行连续调用。通过 `Stream.asBroadcastStream()` 可以将一个单订阅模式的 `Stream` 转换成一个多订阅模式的 `Stream`，`isBroadcast` 属性可以判断当前 `Stream` 所处的模式。

## 14、dart中mixin机制是怎么样的？

`mixin` 是Dart 2.1 加入的特性，以前版本通常使用`abstract class`代替。简单来说，`mixin`是为了解决继承方面的问题而引入的机制，Dart为了支持多重继承，引入了`mixin`关键字，它最大的特殊处在于：`mixin`定义的类不能有构造方法，这样可以避免继承多个类而产生的父类构造方法冲突。 `mixins`的对象是类，`mixins`绝不是继承，也不是接口，而是一种全新的特性，可以`mixins`多个类，`mixins`的使用需要满足一定条件。

## 15、JIT 与 AOT分别是什么？

借助于先进的工具链和编译器，Dart 是少数同时支持 JIT（Just In Time，即时编译）和 AOT（Ahead of Time，运行前编译）的语言之一。那，到底什么是 JIT 和 AOT 呢？语言在运行之前通常都需要编译，JIT 和 AOT 则是最常见的两种编译模式。JIT 在运行时即时编译，在开发周期中使用，可以动态下发和执行代码，开发测试效率高，但运行速度和执行性能则会因为运行时即时编译受到影响。AOT 即提前编译，可以生成被直接执行的二进制代码，运行速度快、执行性能表现好，但每次执行前都需要提前编译，开发测试效率低。

## 16、Dart的内存分配与垃圾回收是怎么样的？

Dart VM 的内存分配策略比较简单，创建对象时只需要在堆上移动指针，内存增长始终是线性的，省去了查找可用内存的过程。在 Dart 中，并发是通过 `Isolate` 实现的。`Isolate` 是类似于线程但不共享内存，独立运行的 `worker`。这样的机制，就可以让 Dart 实现无锁的快速分配。Dart 的垃圾回收，则是采用了多生代算法。新生代在回收内存时采用“半空间”机制，触发垃圾回收时，Dart 会将当前半空间中的“活跃”对象拷贝到备用空间，然后整体释放当前空间的所有内存。回收过程中，Dart 只需要操作少量的“活跃”对象，没有引用的大量“死亡”对象则被忽略，这样的回收机制很适合 Flutter 框架中大量 Widget 销毁重建的场景。

## 17、使用mixins的条件是什么？

因为`mixins`使用的条件，随着Dart版本一直在变，这里讲的是Dart2.1中使用`mixins`的条件：

- `mixins`类只能继承自`object mixins`类不能有构造函数
- 一个类可以`mixins`多个`mixins`类
- 可以`mixins`多个类，不破坏Flutter的单继承

## 18、mixin 怎么指定异常类型？

`on`关键字可用于指定异常类型。 `on`只能用于被`mixins`标记的类，例如`mixins X on A`，意思是要`mixins X`的话，得先接口实现或者继承`A`。这里`A`可以是类，也可以是接口，但是在`mixins`的时候用法有区别.

`on` 一个类：

![''](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86c62a93cf784214ae59b50888d5503e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=144&h=161&s=1982&e=webp&b=2c2c2b) `on` 的是一个接口： 得首先实现这个接口，然后再用`mix`

![''](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29fb0618886c4859808ca0128ee4ca0a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=163&h=197&s=2864&e=webp&b=2d2c2c)

## 19、main future mirotask 的执行顺序是怎样的?

普通代码都是同步执行的，结束后会开始检查`microtask`中是否有任务，若有则执行，执行完继续检查`microtask`，直到`microtask`列队为空。最后会去执行`event`队列（`future`）。

## 20、Future和Isolate有什么区别？

`future`是异步编程，调用本身立即返回，并在稍后的某个时候执行完成时再获得返回结果。在普通代码中可以使用`await` 等待一个异步调用结束。 `isolate`是并发编程，Dart有并发时的共享状态，所有Dart代码都在`isolate`中运行，包括最初的`main()`。每个`isolate`都有它自己的堆内存，意味着其中所有内存数据，包括全局数据，都仅对该`isolate`可见，它们之间的通信只能通过传递消息的机制完成，消息则通过端口(`port`)收发。`isolate`只是一个概念，具体取决于如何实现，比如在`Dart VM`中一个`isolate`可能会是一个线程，在Web中可能会是一个`Web Worker`。

## 21、Stream 与 Future是什么关系？

`Stream` 和 `Future` 是 Dart 异步处理的核心 API。`Future` 表示稍后获得的一个数据，所有异步的操作的返回值都用 `Future` 来表示。但是 `Future` 只能表示一次异步获得的数据。而 `Stream` 表示多次异步获得的数据。比如界面上的按钮可能会被用户点击多次，所以按钮上的点击事件（`onClick`）就是一个 `Stream` 。简单地说，`Future`将返回一个值，而`Stream`将返回多次值。Dart 中统一使用 `Stream` 处理异步事件流。`Stream` 和一般的集合类似，都是一组数据，只不过一个是异步推送，一个是同步拉取。
