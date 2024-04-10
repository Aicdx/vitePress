# 1、介绍一下JS的数据类型？

* 简单类型：Null,Number,Undefined,String,Boolean
* 复杂类型：object
* es6新增：Symbol
* 扩展：

null与undefined有什么区别 答：null 表示一个对象被定义了，值为“空值”，而undefined 表示不存在这个值。 正因为这个原因，所以使用typeof判断是，null返回的是object，而undefined返回的是undefined。(判断两者时需要使用===严格判断)

Boolean类型在进行判断的时候设置为 0、-0、null、""、false、undefined 或 NaN，则该对象设置为 false。否则设置为 true（即使 value 参数是字符串 "false"）

## 2、如何判断一个变量为数组

* 1、instanceof方法：

    instanceof运算符是是用来测试一个对象是否在其原型链原型构造函数的属性。

    ```js
    var arr = []; 
    arr instanceof Array; // true
    ```

* 2、constructor方法：

    constructor 属性返回对创建此对象的数组函数的引用，就是返回对象相对应的构造函数。var

    ```js
    arr = []; 
    arr.constructor == Array; //true复制代码
    ```

* 3、特性判断法

    利用判断数组独有的length和splice方法，但是这是不靠谱的，因为对象也能添加方法和属性。那怎么办了，有一个办法，可以利用数组的length属性没法枚举来判断。function isArray(object){

    ```js
    function isArray(object){
      return  object && typeof object==='object' &&    
      typeof object.length==='number' &&  
      typeof object.splice==='function' &&    
       //判断length属性是否是可枚举的 对于数组 将得到false  
      !(object.propertyIsEnumerable('length'));
    }
    ```

* 4、最简单的方法

   这种写法，是 jQuery 正在使用的，淘宝的 kissy 也是使用这种方式。

    ```js
    Object.prototype.toString.call(value) == '[object Array]'
    // 利用这个方法，可以写一个返回数据类型的方法
    var isType = function (obj) {
         return Object.prototype.toString.call(obj).slice(8,-1); 
    }
    ```

* 5、ES5新增方法

    ```js
    isArray()var a = new Array(123);
    var b = new Date();
    console.log(Array.isArray(a)); //true
    console.log(Array.isArray(b)); //false
    ```

#### 扩展：
使用instaceof和construcor，被判断的array必须是在当前页面声明的。比如，一个页面（父页面）有一个框架，框架中引用了一个页面（子页面），在子页面中声明了一个array，并将其赋值给父页面的一个变量，这时判断该变量，Array == object.constructor;会返回false。

最简单的方法，在IE6下判断null和undefined，有一些bug，判断undefined和null均为Object，(并不是bug，是在ES3的标准下返回的就为Object)

## 4、map与forEach的区别？

* forEach方法，是最基本的方法，就是遍历与循环，默认有3个传参：分别是遍历的数组内容item、数组索引index、和当前遍历数组Array。另外，除去第一个必须的回调函数参数，还可以接受一个上下文参数(改变回调函数的this指向)；并且forEach不会遍历空元素。
* map方法，基本用法与forEach一致，但是不同的，它会返回一个新的数组，所以在callback需要有return值，如果没有，会返回undefined。(从字面理解，map就是映射的意思)
* filter方法，用法和map很相似，从字面理解，就是过滤、筛选的意思。但是函数的callback需要返回布尔值true或false，并且返回值只需要为弱等==即可。
* some 方法，对数组中每一项运行指定函数，如果该函数对任一项返回true，则返回true。(一旦遇到true，就会中断循环，返回true，类似于||判断)
* every方法，对数组中的每一项运行给定函数，如果该函数对每一项返回true，则返回true。(一旦遇到false，就会中断循环，返回false，类似于&&判断)
* indexOf方法，与字符串中的indexOf类似，返回数组索引值，如果没有匹配，则会返回-1，第二个参数为可选，表示从当前位置开始搜索。
* lastIndexOf方法，与indexOf相似，只是是从数组的末尾开始查找，而第二个参数的默认值是array.length - 1。
* reduce方法，字面意思应该是‘减少’，但是实际是‘递归’的意思。实际就是应用一个函数针对数组的两个值(从左到右)，以减至一个值。它的callback接收4个参数：之前值(上一次循环返回的值)、当前值、索引值以及数组本身。initialValue参数可选，表示初始值。
* reduceRight方法，与reduce方法类似，只是从数组的末尾开始实现。
