# spring boot学习笔记

## IOC DI

- IOC: 控制反转，将对象的创建交给Spring容器，由Spring容器来负责对象的生命周期
- DI: 依赖注入，将对象的属性注入到对象中，由Spring容器来负责对象的属性的赋值
- 两者的关系：IOC是实现DI的一种方式

## 注解

@Component: 把组件/类/bean 注入到Spring容器中

这三者是为@Component的衍生
@Controller: 用于标注一个类为Spring的Controller
@Service: 用于标注一个类为Spring的Service
@Repository: 用于标注一个类为Spring的Dao

@Configuration: 用于标注一个类为Spring的配置类

### 用法

```java
//声明
@Component
public class UserService {
    public void add() {
        System.out.println("add");
    }
}
//使用时 Autowired注入
@Autowired
private UserService userService;
```

### Configuration -解决变化

- 通过@Configuration注解，将bean的创建交给Spring容器
- 是一种编程模式，用于解决变化

## IOC容器注入时机

- 在容器启动时对bean进行实例化
- 可以通过@Lazy注解来延迟加载bean,但是要注意，需要在所有引用的地方都加上@Lazy注解

## Autowired注入

- 找不到bean时，会报错，可以通过required=false来避免
- 找到一个，直接注入
- 找到多个，并不一定会报错，根据变量名来注入，或者通过@Qualifier来指定

## 面对对象中变化的应对方法

- 制定一个interface，然后让所有的类都实现这个接口--策略模式
- 一个类，利用属性解决变化
  