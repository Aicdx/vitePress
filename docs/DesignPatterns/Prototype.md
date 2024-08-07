# 原型模式

原型模式（Prototype Pattern）是用于创建重复的对象，同时又能保证性能。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。

在Javascipt中，Object.create()就是原型模式的天然实现。

## Javascipt中的“类”

ES6 的类其实是原型继承的语法糖:

```javascript
class Dog {
  constructor(name ,age) {
   this.name = name
   this.age = age
  }
  
  eat() {
    console.log('肉骨头真好吃')
  }
}
```

等价于

```javascript
function Dog(name, age) {
  this.name = name
  this.age = age
  
}

Dog.prototype.eat = function() {
  console.log('肉骨头真好吃')
}
```

所以说 JavaScript 这门语言的根本就是原型模式。在 Java 等强类型语言中，原型模式的出现是为了实现类型之间的解耦。而 JavaScript 本身类型就比较模糊，不存在类型耦合的问题，所以说咱们平时根本不会刻意地去使用原型模式。因此我们此处不必强行把原型模式当作一种设计模式去理解，把它作为一种编程范式来讨论会更合适。

## 原型模式 其实就是原型范式

原型编程范式的核心思想就是`利用实例来描述对象，用实例作为定义对象和继承的基础`。在 JavaScript 中，原型编程范式的体现就是`基于原型链的继承`。这其中，对原型、原型链的理解是关键。

当试图访问一个 JavaScript 实例的属性/方法时，它首先搜索这个实例本身；当发现实例没有定义对应的属性/方法时，它会转而去搜索实例的原型对象；如果原型对象中也搜索不到，它就去搜索原型对象的原型对象，这个搜索的轨迹，就叫做原型链。

## 深拷贝

在 JavaScript 中，原型链的另一个重要用途就是实现深拷贝。

```javascript
function deepClone(obj) {
    // 如果是 值类型 或 null，则直接return
    if(typeof obj !== 'object' || obj === null) {
        return obj
    }
    
    // 定义结果对象
    let copy = {}
    
    // 如果对象是数组，则定义结果数组
    if(obj.constructor === Array) {
        copy = []
    }
    
    // 遍历对象的key
    for(let key in obj) {
        // 如果key是对象的自有属性
        if(obj.hasOwnProperty(key)) {
            // 递归调用深拷贝方法
            copy[key] = deepClone(obj[key])
        }
    }
    
    return copy
} 
```
