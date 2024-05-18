#

## 浏览器相关

### 认识浏览器运行状态的JS

#### 包含： ECMAScript、DOM、BOM

```js
   (function(){
        const _class = ['js', 'browser', 'vue']

        // 向全局作用域存储变量数组 - 写 - 全局对象
        window._classArr = _class.map(item => item)

        // 获取当前页面地址 - 读 - 路由
        const _url = window.location.href

        //设置页面标题 - 写 - 浏览器tab
        document.title = '浏览器运行状态的JS'

        // 获取节点 - 读 - DOM
        const _node = document.querySelector('body')
   })(this)
```

#### DOM

#### location

```js
    //属性
    location.href => 'https://www.baidu.com/search?class=browser#comments'

    .origin       => 'https://www.baidu.com'
    .host         => 'www.baidu.com'
    .protocol     => 'https:'
    .port         => ''
    .pathname     => '/search'
    .search       => '?class=browser'
    .hash         => '#comments'

    // 函数
    location.assign('url') //跳转指定的path，替换pathname
            .replace('url') //跳转指定的path，替换当前页面
            .reload()        //刷新页面
            .toString()      //返回当前页面的url字符串

    //URL -统一资源定位符 - 标志需求文件的位置
    //URI -统一资源标识符 - 单个文件身份ID

    *面试题：
    1. location api 结合业务场景
    2. 路由相关： 跳转、操作、参数 => 业务场景
    3. url处理 - 正则 or 手写 匹配
```

#### history

```js
    //属性
    history.state =>  存储当前页面的状态
           

    // 函数
    history.back() //后退
            .forward() //前进
            .go(-1)    //后退
            .go(1)     //前进
            .pushState(state, title, url) //流转到指定的状态之上
            .replaceState(state, title, url) //替换当前历史记录

    *面试题：
    history& hash
```

#### navigator - 当前浏览器设备信息

```js
    //属性
    navigator.userAgent => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'

    .appCodeName => 'Mozilla'
    .appName     => 'Netscape'
    .appVersion  => '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    .platform    => 'Win32'
    .product     => 'Gecko'
    .userAgent   => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'

    // 函数
    navigator.cookieEnabled //是否启用cookie
            .javaEnabled() //是否启用java
            .onLine //是否在线
            .registerProtocolHandler(scheme, url, title) //注册协议处理程序
            .unregisterProtocolHandler(scheme, url) //注销协议处理程序

    *面试题：
    1. navigator.userAgent - 浏览器兼容性
    2. 剪切板、键盘输入 
```

#### screen - 屏幕信息(标识页面元素区域信息)

```js
    //属性
    screen.width => 1920
          .height => 1080
          .availWidth => 1920
          .availHeight => 1040
          .colorDepth => 24
          .pixelDepth => 24

    *面试题 - 判断区域 
        //当前可视区域大小
        全局入口
        window.innerWidth
        window.innerHeight

        文本获取
        document.documentElement.clientWidth
        document.documentElement.clientHeight
        document.body.clientWidth
        document.body.clientHeight

        //网页size => offsetHeight = clientHeight + border + padding
        document.documentElement.offsetHeight
        document.documentElement.offsetWidth
        document.body.offsetHeight
        document.body.offsetWidth

        // 定位
        scrollLeft / scrollTop // 距离左边/上边的滚动距离
        offsetLeft / offsetTop // 距离左边/上边的绝对距离

        *兼容性问题 - IE 多出2像素
```

### envet 事件模型

```js
    <div id='app'>
        <button id="btn">点击</button>
    </div>

    //冒泡 - 从内向外 button => div => body => html => document
    //捕获 - 从外向内 document => html => body => div => button

    el.addEventListener('click', function(e){
        console.log('click')
    }, useCapture) // useCapture 捕获参数，默认false

    面试
    如何阻止事件冒泡
    event.stopPropagation() //阻止事件传播，而不是默认事件发生
    event.preventDefault() //阻止默认事件发生
    // 相同节点绑定多个同类型，如何阻止
    event.stopImmediatePropagation() //阻止事件传播，阻止后续事件发生

    面试方向 => 兼容性 & 性能

    attachEvent //IE8及以下
    区别
    1. 参数不同 attachEvent - 事件名前加'on'，addEventListener - 事件名
    2. 事件触发顺序不同 attachEvent - 捕获阶段，addEventListener - 冒泡阶段
    3. 解绑 attachEvent - detachEvent，addEventListener - removeEventListener
    4. 阻断事件传播 attachEvent - returnValue = false，addEventListener - event.stopPropagation()
    5. 阻止默认值 attachEvent - returnValue = false，addEventListener - event.preventDefault()


    性能
    1. 事件委托 - 事件代理
    <ul id = 'list'>
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>

    const list = document.getElementById('list')
    list.addEventListener('click', function(e){
        if(e.target.tagName === 'LI'){
            console.log(e.target.innerHTML)
        }
    })
    //由于事件冒泡，只需要找到父元素，然后通过判断子元素，减少事件绑定
```

### 网络层

```js
    // axios
    //实例化
    const xhr = new XMLHttpRequest()
    //初始化 - open只是建立请求，不会发送
    xhr.open(method, url, async)
    //发送请求
    xhr.send(data)
    //等待接收
    xhr.onreadystatechange = function(){
        //readyState - 0 未初始化 1 启动 2 发送 3 接收 4 完成
        if(xhr.readyState === 4 && xhr.status === 200){
            console.log(xhr.responseText)
        }
    }

    // 设置超时
    xhr.timeout = 3000
    xhr.ontimeout = function(){
        console.log('请求超时')
    }
```

## 总结-浏览器原理

- 1. url => 请求资源 -网络请求 + 地址解析
- 2. 解析器 => DOM + CSSOM => layout tree => 首次布局
- 3. 阻塞的js执行
- 4. painting = > 渲染
- 5. 后置重排&重绘
