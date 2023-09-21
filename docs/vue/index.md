# vue

### 数据更新到视图更新，整个流程是怎样的？
```Javascript
{
  data: {
    return {
      msg: 'name'
    }
  },
  methods: {
    test() {
      this.msg = '123'
    }
  }
}
```

- `msg` 修改，触发响应式的`set`方法执行
- `set`方法里触发 `dep.notify`
- `dep`的`subs`存储着
