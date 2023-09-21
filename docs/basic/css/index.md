# Css
## css 选择器
https://blog.windstone.cc/css/selectors/
有哪些选择器

优先级？

选择器为什么从右向左匹配？

## 层叠上下文(stacking context)
 - 在没有 z-index 值的情况下，所有的元素按照出现（在 HTML 中）的顺序层叠（这里唯一的层叠上下文是跟根元素的上下文）  
![](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context_example_1/understanding_zindex_05a.png)

 - 如果给 DIV #4 也设置一个正的 z-index 值，且这个值比给的 DIV #2 设置的值要大，则 DIV #4 会渲染在其他所有 DIV（包括 DIV #2）之上  
![](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context_example_1/understanding_zindex_05c.png)

> 在这个列子中，DIV #2 和 DIV #4 不是兄弟关系（因为它们的父元素不同）。即便如此，我们也可以通过 z-index 来控制 DIV #4 和 DIV #2 的层叠关系。这是因为，**DIV #1 和 DIV #3 没有设置 z-index 的值，所以它们不会创建层叠上下文**

- 给一个absolute的盒子，如果left和top都是10px，此时在设置margin-top: 5px; 则该盒子距离顶部的距离就是15px;

- relative的盒子，设置top和margin-top都会产生偏移量，但是各自影响不同；margin-top会影响后续兄弟元素，往下挤；而top会使整个盒子飘起来，不会影响后续兄弟元素

**设置了 opacity 小于 1 的定位元素都会隐式地生成一个层叠上下文（和给元素增加一个 z-index 值的效果相同）**

**普通流中不含有定位属性的标准块元素始终先于定位元素渲染并出现在定位元素的下层，即便它们在 HTML 结构中出现的位置晚于定位元素也是如此。**


overflow
  scroll、auto、clip什么区别？

## css 变量
