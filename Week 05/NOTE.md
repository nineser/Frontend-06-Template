## Proxy 

---

Proxy这个词的原意是代理，在这里表示由它来 "代理" 某些操作。

Proxy 可以理解为：在目标对象之前架设一层 "拦截"，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。



ES6 原生提供了 Proxy 构造函数，用来生成 Proxy实例

```JavaScript
const p = new Proxy(target,handle)
/*
 * handle：包含捕捉器的占位符对象，可以译为处理器对象
 * traps：提供属性访问的方法，类似捕捉器的概念
 * target：被Proxy代理的对象
 */ 
```

```JavaScript
// 拦截所有的读取属性的操作
const proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
});

proxy.time // 35
proxy.name // 35
proxy.title // 35
```

```JavaScript
// 空 handle，无任何拦截效果
// 意味着没有被设置拦截的操作，会直接落到目标对象上
const target = {};
const handle = {};
const proxy = new Proxy(target,handle);
proxy.a = 'b';
target.a; // "b" 
```

```JavaScript
// 可以设置为对象的属性
cost object = {
  proxy: new Proxy(target,handle);
} 
```



可以使用 Proxy.revocable() 创建可以被取消的Proxy 实例。

```JavaScript
const target = {};
const handle = {};

// revocable 返回一个对象
// 该对象的proxy属性是 proxy 实例
// revoke属性是函数，用于取消 proxy 实例 
const {proxy,revoke} = Proxy.revocable(target,handle);
```



[Proxy 支持的拦截操作](https://es6.ruanyifeng.com/#docs/proxy)

```JavaScript
handle.set()
handle.get()   // 读取属性
handle.has()   // in操作符

handle.defineProperty()
handle.setPrototypeOf()
handle.getPrototypeOf()
handle.deleteProperty()

handle.ownKeys()

handle.isExtensible()
handle.preventExtensions()
handle.getOwnPropertyDescriptor()

handle.construct() // 拦截 Proxy 实例作为构造函数调用的操作
handle.apply() // 拦截 Proxy 实例作为函数调用的操作
```



Proxy 实际上重载(overload)了点运算符，用自己的定义覆盖了语言的初始定义。

```JavaScript
const obj = {};

//对对象架设了一层拦截，重定义了属性的 get 和 set 的行为
const pxyForObj = new Proxy(obj,{
  get: function(target,propKey,receiver){
    console.log(`getting ${propKey} !`);
    return target[propKey];
  },
  set: function(target,propKey,value,receiver){
    console.log(`setting ${propKey} !`);
    target[propKey] = value;
    return target[propKey];
  }
})

console.log(pxyForObj.a);
pxyForObj.a = 0;
console.log(pxyForObj);
console.log(obj);
 
pxyForObj.a++; 
console.log(pxyForObj);

++pxyForObj.a;
console.log(pxyForObj);  
```



[对象的Proxy代理一旦被创建(即使没有设置任何拦截)，其内部定义的方法：this指向Proxy代理。](https://es6.ruanyifeng.com/#docs/proxy#this-问题)

```JavaScript
const target = {
  m: function () {
    console.log(this === proxy);
  }
};
const handler = {};

const proxy = new Proxy(target, handler);

target.m() // false
proxy.m()  // true
```

Proxy 拦截函数内部的this，指向的是handler对象。

```JavaScript
const handler = {
  get: function (target, key, receiver) {
    console.log(this === handler);
    return 'Hello, ' + key;
  },
  set: function (target, key, value) {
    console.log(this === handler);
    target[key] = value;
    return true;
  }
};

const proxy = new Proxy({}, handler);

proxy.foo
// true
// Hello, foo

proxy.foo = 1
// true
```



## 响应式对象

---

目的：只需传递一个回调函数，该函数的相关变量变化时，它能被自动调用。

1. 给要监听的对象创建proxy实例

2. 创建一个中间函数用于接收一个回调函数

1. 执行回调函数，proxy实例get方法会拦截其引用的变量

2. 将对应的变量，与对应的回调函数关联起来存储

1. 改变proxy实例的属性

1. 设置set操作的拦截，若要改变的属性被监听，执行对应回调函数



代码逻辑

```JavaScript
/*
* 传递一个函数作为回调函数
* 执行回调函数，其中引用了被代理的变量，则会被 get 拦截
* 从而知道回调函数里引用了哪些变量
*/
const effect = (cb)=>{
  cb()
  //存储回调函数与其引用的对象属性
})

const pry = (target)=>{
  set: function(){
    //若被设置的属性被监听，则执行回调函数
  },
  get: function(){
    //reactProp 存储被回调函数引用的对象属性
  }
}  
```

第一步的代码实现：当对象的属性发生变化，执行所有与 **对象相关** 的回调函数

```JavaScript
const obj = {
  a:1,
  b:2
}

const callbacks = []; //存储与cb相关的所有变量
const effect = (cb) =>{
  callbacks.push(cb);
} 

const pxyForObj = (target) =>{
  return new Proxy(target,{
    set: function(target,prop,value){
      target[prop] = value,
      console.log()
      for(const cb of callbacks){
        cb();
      }
      return target[prop];
    },
    get: function(target,prop){
      return target[prop];
    }
  })
}
```

第二步的代码实现：当对象的属性发生变化，仅仅执行与 **属性相关** 的回调函数

```JavaScript
const obj = {
  a: 1,
  b: 2,
};

const watchAttr = [];
//[[obj,attr]]
const callbacks = new Map();
//{obj:{prop:[cb1,cb2,cb3...]}}

const effect = (cb) => {
  watchAttr.length = 0;
  cb();
  for (const obj of watchAttr) {
    let o = obj[0];
    let prop = obj[1];
    if (!callbacks.has(o)) {
      callbacks.set(o, new Map());
    }
    if (!callbacks.get(o).has(prop)) {
      callbacks.get(o).set(prop, []);
    }
    callbacks.get(o).get(prop).push(cb);
  }
};

const pxy = (target) => {
  return new Proxy(target, {
    set: function (target, prop, value) {
      target[prop] = value;
      // target 发生改变后，执行对应的回调函数
      if (callbacks.has(target)) {
        if (callbacks.get(target).get(prop)) {
          for (const cb of callbacks.get(target).get(prop)) {
            console.log(prop, "changed！！！");
            cb();
          }
        }
      }

      return target[prop];
    },
    get: function (target, prop) {
      // 存储与回调函数相关的对象以及属性
      watchAttr.push([target, prop]);
      return target[prop];
    },
  });
};

const pxyOfObj = pxy(obj);
effect(() => {
  console.log(pxyOfObj.a);
  console.log(pxyOfObj.b);
});
```

第三步：观测**级联的对象**

此时的代码只是能监听一层的对象，像下面的对象还是有问题的

```JavaScript
const obj = {
  a: { c: 3 },
  b: 2,
};

/*设置监听*/

pxyOfObj.a.c = 3 //不会触发回调函数
```

因此，在get方法内，我们还应该去判断要监听的对象属性是否也为一个对象。

```JavaScript
//修改get方法
get: function (target, prop) {
  watchAttr.push([target, prop]);

  if (typeof target[prop] === "object") {
    return pxy(target[prop]);
  }

  return target[prop];
}

//修改对象与回调函数，验证结果
const obj = {
  a: { c: 3 },
  b: 2,
};
effect(() => {
  console.log(pxyOfObj.a.c);
  console.log(pxyOfObj.b);
});

```

第四步，此时代码是可以工作了的，但有个问题：

同一对象上的不同属性，**监听它们的proxy对象并不是同一个**。

为了解决这个问题，我们需要在生成proxy的函数上增加一个检测

1. 使用一个缓存proxy对象的map对象，结构如`{target:proxyToTarget}`

2. 生成新的proxy对象前，先查询

```JavaScript
const pxy = (target) => {
  if (cachePxy.has(target)) {
    console.log("skip");
    return cachePxy.get(target);
  }
  let proxy = new Proxy(target, {
    set: function (target, prop, value) {
      target[prop] = value;
      // target 发生改变后，调用回调函数
      if (callbacks.has(target)) {
        if (callbacks.get(target).get(prop)) {
          for (const cb of callbacks.get(target).get(prop)) {
            console.log(prop, "changed！！！");
            cb();
          }
        }
      }

      return target[prop];
    },
    get: function (target, prop) {
      watchAttr.push([target, prop]);

      if (typeof target[prop] === "object") {
        return pxy(target[prop]);
      }

      return target[prop];
    },
  });

  console.log(proxy);
  cachePxy.set(target, proxy);
  return proxy;
};
```



## 双向绑定

---

单向绑定就是把Model绑定到View，当用JavaScript代码更新Model时，View就会自动更新。

```HTML
**<script>
  const data = {
    name: "hana",
    age: 15
  }
</script>

          **** | |
          | |
          | |change
          | |
          ↓ ↓****
          
<div>
  <p>hello,{{name}}</p>
  <p>You are {{age}} years old</p>
</div> **
```

如果用户更新了View，Model的数据也自动被更新了，这种情况就是双向绑定。

```HTML
**<script>
  const data = {
    name: "hana",
    email: "wo@example.com"
  }
</script>

         **** ↑ ↑
          | |
          | |change
          | |
          ↓ ↓****
          
<div>
  <input name="name" type="text">
  <input name="email" type="text">
</div> **
```



### proxy 实现双向绑定

---

以调色板为例：

1. view变化，改变model

- input值变化，改变数据 **==>** 给input设置监听事件

1. model变化，改变view

- 数据变化，改变input值 **==>** 给数据创建代理实例

```HTML
<input type="range" min="0" max="255" name="" id="r" />
<input type="range" min="0" max="255" name="" id="g" />
<input type="range" min="0" max="255" name="" id="b" />
<div id="board">color <br />board</div>

```

```JavaScript
const watchAttr = [];
//[[obj,attr]]
const callbacks = new Map();
//{obj:{prop:[cb1,cb2,cb3...]}}
const cachePxy = new Map();

const effect = (cb) => {
  watchAttr.length = 0;
  cb();
  for (const obj of watchAttr) {
    let o = obj[0];
    let prop = obj[1];
    if (!callbacks.has(o)) {
      callbacks.set(o, new Map());
    }
    if (!callbacks.get(o).has(prop)) {
      callbacks.get(o).set(prop, []);
    }
    callbacks.get(o).get(prop).push(cb);
  }
};

const pxy = (target) => {
  if (cachePxy.has(target)) {
    console.log("skip");
    return cachePxy.get(target);
  }
  let proxy = new Proxy(target, {
    set: function (target, prop, value) {
      target[prop] = value;
      // target 发生改变后，调用回调函数
      if (callbacks.has(target)) {
        if (callbacks.get(target).get(prop)) {
          for (const cb of callbacks.get(target).get(prop)) {
            console.log(prop, "changed！！！");
            cb();
          }
        }
      }

      return target[prop];
    },
    get: function (target, prop) {
      watchAttr.push([target, prop]);

      if (typeof target[prop] === "object") {
        return pxy(target[prop]);
      }

      return target[prop];
    },
  });

  cachePxy.set(target, proxy);
  return proxy;
};

const color = {
  r: 0,
  g: 0,
  b: 0,
};
const po = pxy(color);

const board = document.getElementById("board");
const colorR = document.getElementById("r");
const colorG = document.getElementById("g");
const colorB = document.getElementById("b");
colorR.addEventListener("input", function (e) {
  po.r = e.target.value;
});
colorG.addEventListener("input", function (e) {
  po.g = e.target.value;
});
colorB.addEventListener("input", function (e) {
  po.b = e.target.value;
});
effect(() => {
  colorR.value = po.r;
});
effect(() => {
  colorB.value = po.b;
});
effect(() => {
  colorG.value = po.g;
});
effect(() => {
  board.style.background = `rgba(${po.r},${po.g} ,${po.b})`;
});

```

---

bind()、map() 、childnode、文本内容、range #todo