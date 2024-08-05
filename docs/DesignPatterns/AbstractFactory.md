#

## 简单工厂弊端

在上一节中，简单工厂函数最后的代码如下：

```js
function Factory(name , age, career){
    let work
    switch(career){
        case 'coder':
            work = ['写代码'];
        case 'manager':
            work = ['管理'];
        case 'boss':
            work = ['掌舵人'];
            // ...
    }
    return new User(name,age,career,work)
}
```

虽然目前需求没什么问题了，但是如果需求变更，比如新增一个权限字段，不同身份的角色有不同的权限，我们需要修改工厂函数，这就违背了开闭原则。

我们再复习一下开放封闭原则的内容：对拓展开放，对修改封闭。说得更准确点，软件实体（类、模块、函数）可以扩展，但是不可修改。楼上这波操作错就错在我们不是在拓展，而是在疯狂地修改。

## 抽象工厂

我们先处理一个新需求，建立一个创造手机的抽象工厂。

手机可以抽象成由 硬件HardWare和软件os组成的

```js
class MobilePhoneFactory {
    // 提供操作系统的接口
    createOS(){
        throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
    }
    // 提供硬件的接口
    createHardWare(){
        throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
    }
}
```

楼上这个类，除了约定手机流水线的通用能力之外，啥也不干

所以如果需要生产手机的话，还需要创建一个实体工厂，继承抽象工厂，实现其中的createOS和createHardWare方法。

```js
// 具体工厂继承自抽象工厂
class FakeStarFactory extends MobilePhoneFactory {
    createOS() {
        // 提供安卓系统实例
        return new AndroidOS()
    }
    createHardWare() {
        // 提供高通硬件实例
        return new QualcommHardWare()
    }
}
```

同理，创建系统和创建硬件的抽象工厂我们也要创建

```js
// 定义操作系统这类产品的抽象产品类
class OS {
    controlHardWare() {
        throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
    }
}

// 定义具体操作系统的具体产品类
class AndroidOS extends OS {
    controlHardWare() {
        console.log('我会用安卓的方式去操作硬件')
    }
}

class AppleOS extends OS {
    controlHardWare() {
        console.log('我会用🍎的方式去操作硬件')
    }
}

// 定义手机硬件这类产品的抽象产品类
class HardWare {
    // 手机硬件的共性方法，这里提取了“根据命令运转”这个共性
    operateByOrder() {
        throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
    }
}

// 定义具体硬件的具体产品类
class QualcommHardWare extends HardWare {
    operateByOrder() {
        console.log('我会用高通的方式去运转')
    }
}

class MiWare extends HardWare {
    operateByOrder() {
        console.log('我会用小米的方式去运转')
    }
}

```

好了，如此一来，当我们需要生产一台FakeStar手机时，我们只需要这样做：

```js
// 这是我的手机
const myPhone = new FakeStarFactory()
// 让它拥有操作系统
const myOS = myPhone.createOS()
// 让它拥有硬件
const myHardWare = myPhone.createHardWare()
// 启动操作系统(输出‘我会用安卓的方式去操作硬件’)
myOS.controlHardWare()
// 唤醒硬件(输出‘我会用高通的方式去运转’)
myHardWare.operateByOrder()

```

关键的时刻来了——假如有一天，FakeStar过气了，我们需要产出一款新机投入市场，这时候怎么办？我们是不是不需要对抽象工厂MobilePhoneFactory做任何修改，只需要拓展它的种类：

```js
class newStarFactory extends MobilePhoneFactory {
    createOS() {
        // 操作系统实现代码
    }
    createHardWare() {
        // 硬件实现代码
    }
}
```

这么个操作，对原有的系统不会造成任何潜在影响 所谓的“对拓展开放，对修改封闭”就这么圆满实现了。前面我们之所以要实现抽象产品类，也是同样的道理。

## 总结 抽象工厂模式的定义，是围绕一个超级工厂创建其他工厂

四个关键角色：

- 抽象工厂（抽象类，它不能被用于生成具体实例）： 用于声明最终目标产品的共性。在一个系统里，抽象工厂可以有多个（大家可以想象我们的手机厂后来被一个更大的厂收购了，这个厂里除了手机抽象类，还有平板、游戏机抽象类等等），每一个抽象工厂对应的这一类的产品，被称为“产品族”。
- 具体工厂（用于生成产品族里的一个具体的产品）： 继承自抽象工厂、实现了抽象工厂里声明的那些方法，用于创建具体的产品的类。
- 抽象产品（抽象类，它不能被用于生成具体实例）： 上面我们看到，具体工厂里实现的接口，会依赖一些类，这些类对应到各种各样的具体的细粒度产品（比如操作系统、硬件等），这些具体产品类的共性各自抽离，便对应到了各自的抽象产品类。
- 具体产品（用于生成产品族里的一个具体的产品所依赖的更细粒度的产品）： 比如我们上文中具体的一种操作系统、或具体的一种硬件等。
  