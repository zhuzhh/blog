# Vue

### A组件state更新触发B组件渲染，中间的流程细节回答的可以

### 数组更新的实现原理

### watch 的实现原理

### computed 的实现原理
- 在 `initState`阶段，分别做了`initProps`、`initMethods`、`initData`、`initComputed`、`initWatch`
- 拿到computed，然后对其循环遍历(for in)，拿到每个computed时，优先判断是否是function，如果不是，则取其get方法
- 然后`new Watcher`，把刚才的方法作为`watcher`的`getter`参数传递过去，同时还有一个参数比较重要，就是`lazy`为`true`
- 初始化完毕

new Watcher阶段
- 创建一个watcher，会把当前当前watch(this)存放到vm.watchers里，这里收集watcher会在清理watcher时用到
- `lazy`属性赋值给`dirty`属性
- 由于是`lazy`，并不会立即执行`getter`方法
- 当模板渲染时(render函数执行)，用到了`computed`，则会触发`getter`方法执行，此时才会真正执行用户写的`computed`方法
- computed方法执行时，会收集其依赖的变量
- watcher的get方法执行完毕，会把`dirty`标记，置为`false`

数据更新阶段
- 当`computed`依赖的数据更新后，会触发其`setter`，继而执行`notify`
- `watcher` 的 `update` 方法会判断当前`watcher`是否是`lazy`，如果是的话，只会把`dirty`标记置为`true`，说明这个值脏了，下次如果要使用时，需要重新计算


### 组件通讯方式以及原理
    provide/inject
    $attrs
    $listeners
    $slots
    
### 数据更新到视图更新全流程

### diff时key的作用，以及diff的流程

### 
