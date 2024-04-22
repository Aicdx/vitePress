# 问答题

## 1、说下Flutter的优缺点

优点：1、高性能，2、高保真，3、相对易学，4、热重载；

缺点：1、不支持热更新，2、生态需完善；

## 2、Flutter跨平台原理是怎么样的？

自写UI渲染引擎实现跨平台

## 3、说下移动端跨平台技术划分

1、web技术，2、原生渲染，3、自渲染技术；

## 4、简单的说下移动端跨平台技术演进

A：

## 5、蓝湖设计图有一张轮播图，宽度是 335 高度是 120，左右间隔是10， 如何使用屏幕算法适配全机型屏幕宽和高？

### 分析

- 左右间隔：设置`margin`然后左右`10`个间隔；
- 宽度：整宽减`20`，`20`就是左右的间隔；
- 高度：(宽度) * 120 / 335；

### 代码

```dart
new Container(
  height: (winWidth(context) - 20) * 120 / 335,
  width: winWidth(context) - 20,
  margin: EdgeInsets.symmetric(horizontal: 10.0),
  alignment: Alignment.center,
  decoration: BoxDecoration(
    borderRadius: BorderRadius.all(Radius.circular(4.0)),
    color: Colors.amber.withOpacity(0.5),
  ),
  child: new Text('模拟图片'),
),
```

### 效果

| !['效果'](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/940a6c6ac93842a5ad9db451c4cc6133~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=634&h=1256&s=16566&e=webp&a=1&b=fafafa) | !['效果'](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cfc0d6df9094e6a9692067992ba80d4~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1256&h=634&s=16030&e=webp&a=1&b=f9dc8d) |
| :----------------------------------------------------------------------------------------------------------------------------------------- | -----------------------------------------------------------------------------------------------------------------------------------------: |

## 6、未知数据数量有规则的列表视图，要求一行显示5个，每个间隔为10（含上下），最外边距margin左右都为20，高度为50，多出的数据继续往下排并向左对齐，适配任何机型，怎么做？

### 分析思路

- 左右间隔：设置`margin`然后左右`20`个间隔；
- 间隔和高：除最外边左右，内边都为`10`间隔，并包含上下，高度固定`50`；
- 对齐方式：对齐方式默认都为向左对齐；
- 组件：推荐`Wrap`，动态数据，依次撑开；

```dart
class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('Flutter高级进阶'),
      ),
      body: new Container(
        padding: EdgeInsets.symmetric(vertical: 20.0),// 为了保持美观给了上下价格20
        color: Colors.amber.withOpacity(0.2), // 为了验证动态撑开给了背景
        child: TestRoute(),// 主代码
      ),
    );
  }
}

class TestRoute extends StatefulWidget {
  @override
  _TestRouteState createState() => _TestRouteState();
}

class _TestRouteState extends State<TestRoute> {
  Widget buildItem(item) {
    return new Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.all(Radius.circular(4.0)), // 圆角
        color: Colors.blueAccent.withOpacity(0.5),// item颜色
      ),
      height: 50.0, // 高度
      alignment: Alignment.center, // item文本剧中
      width: (winWidth(context) - 80) / 5, // 宽度
      child: new Text('模拟'),
    );
  }

  @override
  Widget build(BuildContext context) {
    return new Container(
      width: winWidth(context) - 40, // 宽度容器算法
      margin: EdgeInsets.symmetric(horizontal: 20.0),
      child: new Wrap(
        spacing: 10.0,
        runSpacing: 10.0,
        children: [0, 1, 2, 3, 4, 5].map(buildItem).toList(),
      ),
    );
  }
}
```

| !['效果'](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee235164f3634d7996152cccd65af186~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=634&h=1256&s=18448&e=webp&a=1&b=faf5f4) | !['效果'](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f3ce1cc0e99490b9511fb72cc10c7a4~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1256&h=634&s=17790&e=webp&a=1&b=f9efeb) |
| :----------------------------------------------------------------------------------------------------------------------------------------- | -----------------------------------------------------------------------------------------------------------------------------------------: |

## 7、如何实现点击空白区域收起键盘？

触发代码:`FocusScope.of(context).requestFocus(new FocusNode());`

## 8、无需上下文进行路由跳转原理是怎么样的？

使用`GlobalKey`调用到`NavigatorState`的方法;

## 9、为什么我的容器无论设置宽高多少都是占整个的宽高？怎么解决？

1.被约束了；2.宽高无限了；

### 解决方式

使用`UnconstrainedBox`包裹容器；

## 10、键盘弹出时底部溢出如何解决？

1.溢出部分增加滑动属性； 2.`Scaffold`的`resizeToAvoidBottomPadding: false`让其遮挡布局；

## 11、Container 设置 borderRadius 不生效怎么解决？如何导致的？

原因：`Container` 设置 `borderRadius`只对当前盒子生效；

解决方式：使用裁剪方式，如：`ClipRRect`组件；

## 12、GestureDetector 设置 onTap 不生效怎么解决？

使用`GestureDetector`的`behavior: HitTestBehavior.translucent`

## 13、如何实现动态更改 TabBar 长度？

1.控制器重新赋值；（使用`Ticker`不能是`Single`的）

2.使用`DefaultTabController`；

## 14、为何写多个动画时动画控制器使用了Ticker，类也混入了Ticker运行报错了？

有可能使用了单一的Ticker（`SingleTickerProviderStateMixin`），只能使用一次就失效了；

## 15、如何实现键盘弹出后遮住布局，而不是顶起布局？

`Scaffold`属性`resizeToAvoidBottomPadding: false`让其遮挡布局；

## 16、为何输入框输入内容之后返回到桌面，再进入app时内容被清空了？怎么解决？

可能是输入中没有做保存处理，可以使用生命周期判断，在程序暂停前让输入框取消焦点即可实现自动保存；

## 17、为何本地资源图片刚进入的时候切换到另一张出现白屏？怎么解决？

原因：切换之后才开始解析本地资源图片；

解决方案：在初始化的时候就加载指定asset图片，而不是在需要展示的时候才开始加载。

代码示例：

```dart
@override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) async {
     // _imageUrls 就是数组的Asset图片地址
      _imageUrls.forEach((image) {
        precacheImage(AssetImage(image), context);
      });
    });
  }
```

## 18、如何拦截 App 返回事件，用什么组件？

`WillPopScope`组件，用返回的`bool`来操作是否允许返回；

## 19、如何监听 App 暂停运行或不可见状态事件？

使用`WidgetsBindingObserver`观察生命周期状态；

具体：[book.flutterj.com/chapter1/li…](https://link.juejin.cn?target=http%3A%2F%2Fbook.flutterj.com%2Fchapter1%2Flife_cycle.html "http://book.flutterj.com/chapter1/life_cycle.html")

## 20、Text 的 TextOverflow.ellipsis 不生效如何解决？

让`Text`组件的所占宽度可知；

## 21、如何获取控件的大小和位置？

1、使用`Key`拿到上下文取得`findRenderObject`拿内容的尺寸数据；

2、使用`context`取得`findRenderObject`拿内容的尺寸数据；

## 22、类构造方法后面加个super表示什么意思？

调用父类的属性，可进行赋值传输；

## 23、assert( data != null, ‘no data’)是什么意思？

assert：断言；

`data != null`：data不能为空，否则触发断言错误；

no data：如果触发断言则提示的内容；

## 24、const修饰构造函数和放声明数值前分别有什么作用？

构造函数前：构造函数会在编译期和常量一起被编译；

声明数值前：一个不可变的常量，编译期就被初始化；

## 25、描述下getter setter和重写

Dart 中所有的基础类型、类等都继承 `Object` ，默认值是 `NULL`， 自带 `getter` 和 `setter` ，而如果是 `final` 或者 `const` 的话，那么它只有一个 `getter` 方法，`Object` 都支持 `getter`、`setter` 重写

## 26、Assert(断言)有什么作用？什么时候有效？

在`debug`的时候提示出断言错误让开发者知悉，只在`debug`有效；

1