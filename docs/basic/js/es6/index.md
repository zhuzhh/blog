# es6

### ECMAScript 和 JavaScript 的关系
**ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现**

1996年11月，JavaScript 的创造者 Netscape 公司，决定将 JavaScript 提交给标准化组织 ECMA，
希望这种语音能成为国际标准。次年，ECMA 发布 262 号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准，并将这种语言称为 ECMAScript，这个版本就是 1.0 版。

该标准从一开始就是针对 JavaScript 语言制定的，但是之所以不叫 JavaScript，有两个原因。一是商标，Java 是 Sun 公司的商标，根据授权协议，只有 Netscape 公司可以合法地使用 JavaScript 这个名字，且 JavaScript 本身也已经被 Netscape 公司注册为商标。二是想体现这门语言的制定者是 ECMA，不是 Netscape，这样有利于保证这门语言的开放性和中立性。

### let 和 const
let 只在代码块内生效
```js
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```
变量 i 是 let 声明的，**当前的 i 只在本轮循环有效**，所以每次循环的 i 其实都是一个新的变量

另外，**for 循环还有一个特别之处，就是设置循环体变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域**
```js
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```

#### 不存在变量提升
只有在声明后才能被使用
```js
// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```
报的错是 ReferenceError

#### 暂时性死区(temporal dead zone，简称 TDZ)
只要在一个块级作用域内，使用 let 声明了一个变量，那么该变量就会"绑定(binding)"这个区域
```js
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```
在 let 声明变量 tmp 之前，都属于变量 tmp 的"死区"

"暂时性死区"也意味着typeof不再是一个百分之百安全的操作。

```js
// 不报错
var x = x;

// 报错
let x = x;
// ReferenceError: x is not defined
```
报错是因为暂时性死区。使用 let 声明变量，只要变量在没声明前使用，就会报错

es6之前，只有函数作用域以及全局作用域，es新增了块级作用域

#### 为什么需要块级作用域?
- 内层变量可能会覆盖外层变量
```js
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = 'hello world';
  }
}

f(); // undefined
```

- 用来计数的循环变量泄露为全局变量。
```js
for (var i = 0; i < s.length; i++) {
  console.log(i);
}
console.log(i); // 5
```  


#### 块级作用域和函数声明
```js
function f() { console.log('I am outside!'); } // f1

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); } // f2
  }

  f();
}());
```
分析: es6明确允许在块级作用域中声明函数，其行为类似于 let，在块级作用域之外不可引用。
据此分析，上述代码执行会得到 `I am outside!`。  
es5环境中，由于函数变量提升(提升到函数头部)，所以运行代码会得到 `I am inside!`

但是真实es6环境运行，代码会报错 —— Uncaught TypeError: f is not a function

原因是如果改变了块级作用域内声明的函数的处理规则，显然会对老代码产生很大影响。  
为了减轻因此产生的不兼容问题，ES6 在[附录 B](https://262.ecma-international.org/6.0/#sec-block-level-function-declarations-web-legacy-compatibility-semantics)里面规定，浏览器的实现可以不遵守上面的规定，有自己的行为方式。
- 块级作用域内声明的函数，类似于 var ，会提升到全局作用域或函数作用域的头部
- 同时，函数声明还会提升到所在的块级作用域头部

注意，上面三条规则只对 ES6 的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作let处理。

#### const命令
- const 一旦声明就必须立即赋值，否则会报错(`SyntaxError: Missing initializer in const declaration`)
- 只在声明的块级作用域内生效
- 不提升，且存在暂时性死区
- const 本质上保证变量指向的内存地址不变

#### 对象冻结
```js
const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
```

对象彻底冻结
```js
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```

#### 顶层对象的属性
为了保持兼容性，var 和 function 命令声明的全局变量，依旧是顶层对象的属性  
let 、const 、 class 命令声明的全局变量，不属于顶层对象的属性

#### globalThis 对象
- 浏览器顶层对象是 window ，但是 Node 和 web worker 没有 window
- Node 里面，顶层对象是global，但其他环境都不支持
- 浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self

**如何获取到全局对象？**  
- 浏览器环境
```js
// ①
function test() {
    console.log(this)
}
test() // 全局window

// ②
'use strict';
function test2() {
    console.log(this)
}
test() // undefined

// ③
new Function('return this')()
// 不管是严格模式，还是普通模式，总是会返回全局对象
// 但是如果浏览器用的 CSP，那么 eval、new Function 就无法使用了
```
- node.js模块中 this 返回的是当前慕模块
- es6模块中 this 返回的是 undefined

### 解构赋值

#### 数组的解构

**凡是可遍历的解构，都可以进行解构赋值**
```js
let [foo] = 1; // 报错
```
只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值
比如 Generator 函数，原生具有 Iterator 接口。解构赋值会依次从这个接口获取值

#### 默认值
```js
let [foo = true] = []
foo // true
```

使用严格相等(====)判断某个值是否是 undefined，默认值才会生效
```js
let [foo = true] = [null]
foo // null
```
因为null !== undefined

#### 对象解构赋值
解构后重命名
```js
let { aa: baz } = { aa: 'aaa', bb: 'bbb' };
baz // "aaa"
```
对象的解构，默认值生效的条件判断属性值严格等于(===) undefined

**由于数组本质是特殊的对象**，因此可以对数组进行对象属性的解构
```js
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
```

**特殊场景**
```js
// 字符串
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"

let {length : len} = 'hello';
len // 5

// 数值和布尔
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```

