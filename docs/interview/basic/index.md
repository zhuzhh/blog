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

### 垃圾回收机制
js数据的存储，基础数据类型是存放在栈中，引用数据类型存在在堆中
当执行一个函数时，js引擎会创建执行上下文，将函数执行上下文压入栈中，然后会有一个指向当前执行状态的指针(ESP)，当一个函数执行完毕后，该指针会下移，
这个下移的操作，就会销毁函数执行上下文。  
**堆中的数据回收**  
不管什么垃圾回收器，其流程都是一样的
- 标记空间中哪些可回收，哪些不可回收
- 标记完成之后，统一清理内存
- 内存整理，把不连续的内存空间，内存碎片
在 V8 中会把堆分为新生代和老生代两个区域，新生代中存放的是生存时间短的对象，老生代中存放的生存时间久的对象。
新生区会被平分为两个区域，一个是对象区域、一个是空闲区域
当对象区域快满的时候，会进行一次垃圾回收，首先是对垃圾做标记，然后把存活的对象，复制到空闲区域中；那这个过程不会造成内存碎片
然后二者角色翻转
在新生代经过多次回收，仍旧存活的对象，会晋升到老生区

**老生区**
老生区采用标记清除的算法，是从根开始遍历，能访问到的，算是存活的对象，不能访问到的，就是垃圾数据
清理完垃圾数据后，会存在内存碎片(不连续的内存)

处理这些内存碎片，使用到的是标记整理算法

**全停顿**
垃圾回收期间，js是暂停执行的，内存越大时，这个暂停时长越长
为了处理因为垃圾回收造成的卡顿，v8将标记的过程，分为一个一个子的标记过程，同时垃圾回收标记和js交替执行，只到标记完成
这个过程被称为增量标记


### 浏览器页面渲染过程

## 浏览器的缓存机制
https://segmentfault.com/a/1190000017004307


### Object.getOwnPropertyNames、Object.keys 区别
都会返回对象下的属性，不会返回原型链上的属性  
区别:  
- Object.keys 返回可枚举的  
- Object.getOwnPropertyNames 返回所有的

### 防抖、节流
防抖: n秒内只执行一次，如果在n秒内高频调用该函数，则会重置时间
```javascript
function debounce (fn, wait) {
  let timer = null
  return function debounced (_this, ...args) {
    const context = _this
    if (timer) clearTimeout(timer)
    timer = setTimeout(function (args) {
      fn.apply(_this, args)
      timer = null
    }, wait)
  }
}

// immediate 版本
function debounce (fn, wait, immdiate) {
  let timer = null
  function debounced (_this, ...args) {
    const context = _this
    if (immdiate) {
      if (timer) {
        clearTimeout(timer)
      } else {
        fn.apply(_this, args)
      }
      timer = setTimeout(function () {
        timer = null
      }, wait)
    } else {
      if (timer) clearTimeout(timer)
      timer = setTimeout(function () {
        fn.apply(_this, args)
      })
    }
  }
}
```
节流: n秒内只执行一次，如果n秒内高频调用该函数，只有一次生效
```javascript
function throttle (fn, wait) {
  const start = Date.now()
  return function throttled (_this, ...args) {
    const context = _this
    const end = Date.now()
    if (end - start > wait) {
      fn.apply(context, args)
      start = Date.now()
    }
  }
}
// 指定调用在函节流开始前执行
function throttle (fn, wait, leading) {
  let waiting = false
  let lastArgs = undefined

  function exec (_this, ...args) {
    let context = _this
    if (leading) {
      fn.apply(context, args)
    }
    waiting = true
    setTimeout(function () {
      waiting = false
      if (lastArgs) {
        fn.apply(context, lastArgs)
        lastArgs = undefined
      }
    })
  }

  return function throttle (args) {
    if (waiting) {
      lastArgs = args
    } else {
      exec()
    }
  }
}
```

### 柯里化
