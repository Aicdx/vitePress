# 简单工厂-变与不变

## 构造器

构造器模式是创建对象的模式，它将对象的创建过程封装在一个方法中，并将对象的创建逻辑与客户端代码分离。

### 举个例子

假如我们现在要创建一个用户对象，可以简单写出以下代码

```js
const lilei = {
    name:'lilei',
    age:25,
    career:'coder'
}
```

但是当你需要批量创建用户时，这时候就要用到构造器了

```js
// 构造器
function User (name,age,career) {
    this.name = name;
    this.age = age;
    this.career = career;
}
const userList = [
    {
        name:'lilei',
        age:25,
        career:'coder'
    },
    {
        name:'lilei1',
        age:25,
        career:'coder'
    },
    {
        name:'lilei2',
        age:25,
        career:'coder'
    }
    ]
// const lilei = new User('lilei',25,'coder')
const createUser = () =>{
    userList.map(user=>{
        const aa = new User(user.name,user.age,user.career)
    
        console.table(aa)
    })
}
```

* 在创建一个user过程中，谁变了，谁不变？

很明显，变的是每个user的姓名、年龄、工种这些值，这是用户的个性，不变的是每个员工都具备姓名、年龄、工种这些属性，这是用户的共性。

* 那么构造器做了什么？

构造器是不是将 name、age、career 赋值给对象的过程封装，确保了每个对象都具备这些属性，确保了共性的不变，同时将 name、age、career 各自的取值操作开放，确保了个性的灵活？

如果在使用构造器模式的时候，我们本质上是去抽象了每个对象实例的变与不变。那么使用工厂模式时，我们要做的就是去抽象不同构造函数（类）之间的变与不变。

## 工厂模式

假如这时候我们的需求变更，需要新增一个字段，需要根据career判断对应work职责，当前User不足以满足新需求了，我们需要一个更加灵活的工厂模式。

```js
function User(name , age, career, work){
    this.name = name
    this.age = age
    this.career = career 
    this.work = work
}

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

const userList1 = [
    {
        name:'lilei',
        age:25,
        career:'coder'
    },
    {
        name:'lilei1',
        age:25,
        career:'manager'
    },
    {
        name:'lilei2',
        age:25,
        career:'boss'
    }
]

const createUser1 = () =>{
    userList.map(user=>{
        const aa = new Factory(user.name,user.age,user.career)
    
        console.log(JSON.stringify(aa))
    })
}
```

### 什么是工厂模式

工厂模式其实就是将创建对象的过程单独封装。它很像我们去餐馆点菜：比如说点一份西红柿炒蛋，我们不用关心西红柿怎么切、怎么打鸡蛋这些菜品制作过程中的问题，我们只关心摆上桌那道菜。在工厂模式里，我传参这个过程就是点菜，工厂函数里面运转的逻辑就相当于炒菜的厨师和上桌的服务员做掉的那部分工作——这部分工作我们同样不用关心，我们只要能拿到工厂交付给我们的实例结果就行了

## 总结：工厂模式的目的，就是为了实现无脑传参
