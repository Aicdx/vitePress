# vue进阶

## 模板化

### 插槽

#### 默认插槽

面试点 ：默认插槽的实现方式 => 整体插槽的聚合（父节点包裹的部分）

问题：多个默认插槽会怎么样？ => 重复“替换”渲染

#### 具名插槽

以name属性区分插槽，从而做到多个插槽的区分

面试点 => name 隐藏了一段上下文的解析

#### 作用域插槽

父组件向子组件传递数据，子组件通过插槽的方式接收数据

##### 传参

```html
<!-- // 子组件接收插槽 -->
<template>
  <div>
    <slot name="header" :slotProps="slotProps"></slot>
  </div>
</template>
<!-- 父组件传递数据 -->
<!-- vue2 -->
 <template v-slot:header="slotProps">
    {{ slotProps.user.firstName }}
  </template>
  <!-- vue3 --> 
  <!-- vue3中作用域插槽简写也可以用#header实现 -->
 <template #header="slotProps">
    {{ slotProps.user.firstName }}
  </template>
```

### 模板二次加工方案

#### watch | computed

- 使用上  - 流程 | 结果
- 原理    - 对劫持的数据进行观察，触发回调 | 收集依赖 => 数据劫持 => 触发重新计算
- once, immediate, deep:true

#### 其他方案

- 函数 - { calcAdd(header) }、 管道符（过滤器，vue3中废弃） ```{ header | calcAdd }```
- `v-text="header"`、`v-html="header"`
- 三元表达式

### JSX

## 组件化

- 抽象复用
- 精简 & 聚合
- 渲染顺序 - 父组件 create -> 子组件 create -> 子组件 mounted -> 父组件 mounted

### 混入mixin - 逻辑混入

- 应用：抽离公共逻辑（逻辑相同、模版不同）< = > extends 核心逻辑继承
- 合并策略
  - 1. 变量补充，多mixin的情况下，后者覆盖前者，但不会覆盖本体data变量 < = >  extends 单个,但依然不会覆盖本体data变量
  - 2. 生命周期钩子，在父组件和子组件之间，多mixin的情况下，按照声明顺序执行 < = > extends 父组件和子组件之间
  - 3. extends 是在mixin之前

## 插件补充拓展
