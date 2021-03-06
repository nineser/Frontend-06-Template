## 2020-11-08

- Array.prototype.fill()
  - 语法：arr.fill(value[, start[, end]])，start 默认 0，end 默认 this.length
  - 用一个固定值填充数组的起始索引到终止索引的元素(不包括终止索引)
- Array(1000) 和 new Array(1000) 的区别
  - 简单来说，简单应用上无区别；如果是代码复杂量高的，通过第一种可以节省部分时间，因为 new 需要调用 new 对象的构造器进行赋值查找。
- 插入 html 元素 与 插入 html 元素片段

```javascript
let visualMapEle = document.createDocumentFragment();
let cellEle = document.createElement("span");
mapEle.appendChild(visualMapEle);
```

- 广度优先搜索寻路
  - 数据结构可以使用队列
  * 入列
    - queue 放入 start
    * 第一遍循环
      - 把 start 周围的四个点 加进 queue
      - 逐个的把着四个点周围的点加进队列
  * 出列
    - shift 出元素
    - 如果是要找的终点，则返回 true
    * 如果不是的话，就将其周围的（上下左右）点插入队列
      - 如果是地区区域之外了（通过分别判断 X,Y），就不插入
      - 如果它已经是墙，或者已经被插入了，则也不插入
      - 走到这，那就说明它是新节点，则将其值标记为 2
      - push 推入队列
  - push 和 shift 改为 push pop 就是深度优先搜索
  - 数据结构更优的选择为使用二叉堆

