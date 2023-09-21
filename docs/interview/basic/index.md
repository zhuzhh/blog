# 基础知识

### slice splice split 的区别?

### for in/of 区别？
for of不能遍历对象，只能遍历实现了Iterator接口的，比如Set、Map、String、Array；遍历数组时，拿到的是数组的每个item  
for in适合遍历对象，循环遍历对象时，key拿到的是属性；如果遍历数组时，key拿到的是数组的下标

### commonjs、es6 module区别?
- commonjs 是值的拷贝；es6 module是值的引用
- commonjs 是运行时加载；es6 module是编译时输出
- commonjs 是导出单个值；es6 module可以导出多个值
- commonjs 是动态导入；es6 module是静态导入
- commonjs 的this是当前模块；es6 module的this是undefined

### 说说js里的继承以及优缺点
```JavaScript
function Person() {
  this.arr = [1, 2, 3, 4]
  this.name = 'zzh'
}
Person.prototype.sayHi = function () {
 console.log(this.name)
}
function Child() {}
```
- 原型链继承
```javascript
Child.prototype = new Person()
```
致命缺点: 引用类型值的原型会被所有实例共享， 如果某个子类实例，修改了`this.arr`，所有实例都会被影响

- 构造函数继承
```javascript
function Child() {
  Person.call(this)
}
```
优点: 没有上面说的原型属性不会被共享  
缺点: 不能继承父级prototype上的属性

- 组合继承
```javascript
function Child() {
  Person.call(this)
}
Child.prototype = new Person()
```
优点: 解决了构造函数继承中不能继承父类prototype的问题  
缺点: 1、`Person` 被执行了两次  
2、它在child的prototype上添加了父类的属性和方法；
下面demo为例，`child`实例会存在两个`sayHi`方法 
```javascript
function Person() {
  this.sayHi = function () {
    console.log(this.name)
  }
}
Person.prototype.name = 'zzh'
function Child() {
  Person.call(this)
}
Child.prototype = new Person()
const child = new Child()
// child下有一个sayHi，原型里面也有一个sayHi
```
- 寄生组合继承
```javascript
function Child() {
  Person.call(this)
}
Child.prototype = Object.create(Person.prototype)
Child.prototype.constructor = Child
```
缺点: 原先在`Child`的`prototype`定义的内容，会被覆盖掉

### Object.create() 做了什么
Object.create 会创建一个空的对象，并指定其prototype
```javascript
var pro = {
  getnName() {}
}
const obj = Object.create(pro)
```
会把`getName`放在`obj`的原型上去

### tree shaking的原理是？

### 异步任务串行、并发schduler 调度器设计

**异步任务串行**
- https://www.php1.cn/detail/Javascript_YiBuL_c86241eb.html
}
```
}Javascript
const taskA = () => new Promise((resolve, reject) => {
 setTimeout(() => {
  console.log('run task A')
  resolve()
 }, 100)
})
const taskB = () => new Promise((resolve, reject) => {
 setTimeout(() => {
  console.log('run task B')
  resolve()
 }, 50)
})
const taskC = () => new Promise((resolve, reject) => {
 setTimeout(() => {
  console.log('run task C')
  resolve()
 }, 150)
})

// 使用promise串联
function runTasks() {
  taskA().then(taskB).then(taskC)
}

// 未知个数
async function runTasks(tasks) {
  for (let i =0; i >= tasks.length; i++) {
    await tasks[i]()
  }
}

// 异步任务串行执行器
function async(tasks) {
  const len = tasks.length
  let index = 0
  const next = () => {
    if (index >= len) return
    const task = tasks[index++]
    task(next)
  }
  next()
}
async([
  next => setTimeout(() => { console.log('taskA ...'); next() }, 100),
  next => setTimeout(() => { console.log('taskB ...'); next() }, 50),
  next => setTimeout(() => { console.log('taskC ...'); next() }, 30)
])
```

### mpx 运行时优化，做了哪些事情?
在编译阶段，提取模板中使用了哪些变量
然后使用bind-this进行改造  
比如  
<view>{{ message }}</view>  
经过改造后是  
this._c('message', this.message)  
这端代码会被放在render函数中，在组件或页面created时，会执行这个render函数。  
这个作用就是在模板中使用的变量，那当组件初始化时，会把这个数据一股脑的setData过去，用户页面渲染
这时，页面用到的数据会存在在miniRenderData中，以供下次数据更新时，做diff使用  
当数据更新时，同样也会走一次render函数收集依赖的过程，拿到最新的依赖数据，数据拿到后，就需要去和miniRenderData
的数据做比较，对比出哪些字段变了，提取出来，再次去触发setData  
另外这个触发setData执行时机，也不是立即执行的，是放在了nextTick执行的，依赖了Promise.resolve实现的


