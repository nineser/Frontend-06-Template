## BNF（巴科斯范式）

Backus-Naur Form，以美国人巴科斯(Backus)和丹麦人诺尔(Naur)的名字命名的一种形式化的语法表示方法，用来描述语法的一种形式体系，是一种典型的元语言。

它不仅能严格地表示语法规则，而且所描述的语法是与上下文无关的。

它具有语法简单，表示明确，便于语法分析和编译的特点。



### BNF 表示语法规则

非终结符用尖括号括起

每条规则的左部是一个非终结符，右部是由非终结符和终结符组成的一个符号串，中间一般以 `::=` 分开。

具有相同左部的规则可以共用一个左部，各右部之间以直竖 `|` 隔开。



### BNF 常用的元字符

`::=` ：是“被定义为”的意思。

示例：`字符串 ::= 用引号包围的字符序列`，表示 字符串 就是 用引号包围的字符序列

`"..."`：终结符，即引号中的字符序列(本身)，并非指代其它字。

终结符双引号 `"` 其本身则用 `double_quote` 用来表示;

示例：`函数调用 ::= 名字 "()"` 表示 函数的调用 是 由 名字 加上左右括号字符 () 组成;

`double_quote` ：代表终结符 双引号 "。

示例：`字符串 ::= double_quote ... double_quote`，表示 字符串 是由被字符 `"` 包围的字符序列组成;

在双引号外的字代表着语法部分；示例：`基本类型 ::= 字符串 | 数字 | 布尔`，表示 字符串 或 数字 或 布尔 都是 基本类型，但 字符串、数字、布尔 具体是什么，则又由其它 规则定义;

`<...>` ：必选项

示例：`名字 ::= [姓] ` 表示 名字 中的 名 是必须要有的，但 姓 是可有可无的，即：姓 名 是 名字，名 也是 名字;

`[...]`：可选，可有可无；

示例：`名字 ::= [姓] ` 表示 名字 中的 名 是必须要有的，但 姓 是可有可无的，即：姓 名 是 名字，名 也是 名字;

`{...}`：重复，0 或 任意次重复；

示例：`AB ::= "a" {"b"}`，表示 AB 是由 一个 a 后面跟上任意数量（包括0个）个 b 组成，如 a、a b、a bb、a bbb

`(...)`：分组，用来控制表达式的优先级；

示例：`AX ::= "a" ("m"|"n")`，表示 AX 是由 一个 a 后面跟上 m 或 n 组成;

`|`：替换，即 或 的意思;

示例：`布尔 ::= "true" | "false"`，表示 true 或 false 都是 布尔;

`...`：表示各种列举或省略的代码片断;

示例：`a...z` 表示 从 a 到 z 的字符，`"..."` 表示 由 双引号 " 包围起来的任意字符;

斜体字: 表参数



## AST

抽象语法树（Abstract Syntax Tree）也称为 AST 语法树，指的是源代码语法所对应的树状结构。对于一种具体编程语言下的源代码，通过构建语法树的形式将源代码中的语句映射到树中的每一个节点上。

程序代码本身可以被映射成为一棵语法树，通过操纵语法树，可以精准的获得程序代码中的某个节点。JavaScript 的语法解析器[Espsrima](http://esprima.org/) 提供了一个 [在线解析的工具](http://esprima.org/demo/parse.html)，借助于这个工具，可以将JavaScript 代码解析为一个JSON文件表示的树状结构。

之所以说是抽象的，是因为抽象语法树并不会表示出真实语法出现的每一个细节。比如说，嵌套括号能被隐含在树的结构中，并不需要以节点的形式呈现。

抽象语法树在很多领域有广泛的应用，比如浏览器，智能编辑器，编译器。

抽象语法树并不依赖于源语言的语法。也就是说语法分析阶段所采用的上下文无文文法，因为在写文法时，经常会对文法进行等价的转换（消除左递归，回溯，二义性等），这样会给文法分析引入一些多余的成分，对后续阶段造成不利影响，甚至会使合个阶段变得混乱。因些，很多编译器经常要独立地构造语法分析树，为前端，后端建立一个清晰的接口。



## LL 算法

我们的代码，在计算机的分析过程中，它首先的一步就是把我们的编程代码去分词，然后就是把这些构成层层相嵌套的树形结构，然后下一步才是如何去解析和执行代码。

LL（1）

- 第一个 "L"：left to right，按照从左到右的顺序处理输入的token序列

- 第二个 "L"：leftmost derivation，从文法的最左边开始进行推导

- "(1)"：使用1个token来预测解析的方向（当然也有LL(n)）



## Generator 函数

for...of 循环可以自动遍历 Generator 函数运行时生成的 Iterator 对象，且此时不再需要调用 next 方法。

```JavaScript
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5
```

上面代码使用 for...of 循环，依次显示 5 个 yield 表达式的值。

需要注意，一旦 next 方法的返回对象的 done 属性为 true，for...of 循环就会中止，且不包含该返回对象，所以上面代码的 return 语句返回的 6，不包括在 for...of 循环之中。



## 正则表达式

**RegExp.prototype.exec()**

exec() 方法在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 [null](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)。

在设置了 [global](https:developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global) 或 [sticky](https:developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky) 标志位的情况下（如 /foo/g or /foo/y），JavaScript [RegExp](https:developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/RegExp) 对象是有状态的。他们会将上次成功匹配后的位置记录在 [lastIndex](https:developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex) 属性中。

使用此特性，exec() 可用来对单个字符串中的多次匹配结果进行逐条的遍历（包括捕获到的匹配），而相比之下， [String.prototype.match()](https:developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match) 只会返回匹配到的结果。如果你只是为了判断是否匹配（true或 false），可以使用 [RegExp.test()](https:developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) 方法，或者 [String.search()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/search) 方法。

如果匹配成功，exec() 方法返回一个数组（包含额外的属性 index 和 input），并更新正则表达式对象** 的 lastIndex 属性。完全匹配成功的文本将作为返回数组的第一项，从第二项起，后续每项都对应 **正则表达式内捕获括号里匹配成功 的文本。

```JavaScript
const regexp = /([0-9\.]+)|([\t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g;
//上述正则有7个捕获括号
//搜索文本后，返回的数组会有8项
//数组索引 0 的项此次为匹配成功的文本。
//之后从索引 i(i>0) 的项的值，都为与正则表达式中第i个括号相匹配的
```



## 四则运算的解释器

![](https://secure-static.wolai.com/static/iygnJZEibB3rsUMb8TUKKh/image.png)

### 四个步骤

1. 定义四则运算：词法定义和语法定义

2. 词法分析：把输入的字符串流变为 token

3. 语法分析：把 token 变成抽象语法树（AST）

4. 解释执行：后续遍历 AST ，执行得出结果



### 四则运算的词法定义

为了演示，只考虑数字和运算符，不考虑括号等。

Token(这里指有意义的输入，可译为标记)

- Number：0~9 的组合

- Operator：`+`、`-`、`*`、`/` 之一

- Whitespace：`<SP>`

- LineTerminator：`<LF>`、`<CR>`



### 四则运算的语法定义

语法定义多数采用 BNF。比如 JavaScript 标准里面就是一种跟 BNF 类似的自创语法。不过语法定义的核心思想不会变，都是几种结构的组合产生一个新的结构，所以语法定义也叫语法产生式。

因为加减乘除有优先级，所以我们可以认为加法是由若干个乘法再由加号或者减号连接成的。由此，可以得出以下四则运算的定义。

```纯文本
<Expression> ::=   
   <AdditiveExpression><EOF>
<AdditiveExpression> ::= 
   <MultiplicativeExpression>
   |<AdditiveExpression><+><MultiplicativeExpression>
   |<AdditiveExpression><-><MultiplicativeExpression>
<MultiplicativeExpression> ::= 
    <Number>
    |<MultiplicativeExpression><*><Number>
    |<MultiplicativeExpression></><Number>
```

其中 EOF 表代码的结束，即 End Of File。



### 词法分析

词法分析部分，我们把字符流变成 token 流。

说直白点，就是罗列所有可能出现在字符串中的字符，对其进行匹配分割分类。

词法分析有两种方案，一种是状态机，一种是正则表达式，它们是等效的。



正则表达式的实现

```JavaScript
const regexp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g;

//token name
//for convenience, the order is the same as regexp's。
const dictionary = [
  "Number",
  "Whitespace",
  "LineTerminator",
  "*",
  "/",
  "+",
  "-",
];

function tokenize(source) {
  let result = null;
  let str = source;
  while ((result = regexp.exec(str)) !== null) {
    for (let i = 1; i <= dictionary.length; ++i) {
      if (result[i]) {
        console.log(`${result[i]}  ${dictionary[i - 1]}`);
       }
     }
   }
}

tokenize("1024 + 10 * 25") 
```

结构化输出的结果：

```JavaScript
const regexp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g;

//token name
//for convenience, the order is the same as regexp's。
const dictionary = [
  "Number",
  "Whitespace",
  "LineTerminator",
  "*",
  "/",
  "+",
  "-",
];

function* tokenize(source) {
  let str = source;
  let result = null;
  let preIndex = regexp.lastIndex;

  while ((result = regexp.exec(str)) !== null) {
    //若出现不能识别的字符，中止程序
    try {
      if (regexp.lastIndex - preIndex > result[0].length) {
        throw "String contains unrecognizable characters;";
       }
     } catch (err) {
       console.warn(err);
       break;
     }
     preIndex = regexp.lastIndex;

     let token = {
      type: null,
      value: null,
     };

    for (let i = 1; i <= dictionary.length; ++i) {
       if (result[i]) {
        token.type = dictionary[i - 1];
        break;
       }
     }
     token.value = result[0];
     yield token;
    }
    yield {
        type: "EOF",
    };
}

// 每次输出都会调用一次 tokenize 函数
for (const token of tokenize("88 + 180 * 8")) {
  console.log(token);
}
```



### 语法分析

LL 生成树

```JavaScript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      const regexp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g;

      //token name
      //for convenience, the order is the same as regexp's。
      const dictionary = [
        "Number",
        "Whitespace",
        "LineTerminator",
        "*",
        "/",
        "+",
        "-",
      ];

      function* tokenize(source) {
        let str = source;
        let result = null;
        let preIndex = regexp.lastIndex;

        while ((result = regexp.exec(str)) !== null) {
          try {
            if (regexp.lastIndex - preIndex > result[0].length) {
              throw "String contains unrecognizable characters;";
            }
          } catch (err) {
            console.warn(err);
            break;
          }
          preIndex = regexp.lastIndex;

          let token = {
            type: null,
            value: null,
          };

          for (let i = 1; i <= dictionary.length; ++i) {
            if (result[i]) {
              token.type = dictionary[i - 1];
              break;
            }
          }
          token.value = result[0];
          yield token;
        }
        yield {
          type: "EOF",
        };
      }


      let source = [];
      // 每次循环都会调用一次 tokenize 函数
      for (const token of tokenize("1 + 2 * 5 + 3")) {
        if(token.type !== "Whitespace" && token.type !== "LineTerminator"){
          source.push(token);
        }
      }

      function Expression(source) {
        if(source[0].type==="AdditiveExpression" && source[1] && source[1].type
          === "EOF"){
          let node = {
            type: "Expression",
            children:[source.shift(),source.shift()]
          }
          source.unshift(node);
          return node;
        }
        AdditiveExpression(source);
        return Expression(source);
      }

      function AdditiveExpression(source) {
        if(source[0].type==="MultiplicativeExpression"){
          let node = {
            type: "AdditiveExpression",
            children: [source[0]]
          }
          source[0] = node;
          return AdditiveExpression(source);
        }
        if(source[0].type === "AdditiveExpression" && source[1] &&
          source[1].type === "+"){

          let node = {
            type : "AdditiveExpression",
            operator: "+",
            children:[]
          }

          node.children.push(source.shift());
          node.children.push(source.shift());
          MultiplicativeExpression(source);
          node.children.push(source.shift());
          source.unshift(node);
          return AdditiveExpression(source);
        }
        if(source[0].type === "AdditiveExpression" && source[1] &&
          source[1].type === "-"){

          let node = {
            type : "AdditiveExpression",
            operator: "-",
            children:[]
          }

          node.children.push(source.shift());
          node.children.push(source.shift());
          MultiplicativeExpression(source);
          node.children.push(source.shift());
          source.unshift(node);
          return AdditiveExpression(source);
        }

        if(source[0].type==="AdditiveExpression"){
          return source[0];
        }
        MultiplicativeExpression(source);
        return AdditiveExpression(source);
      }

      function MultiplicativeExpression(source){
        console.log(source);
        if(source[0].type === "Number"){
          let node = {
            type:"MultiplicativeExpression",
            children:source[0]
          };
          source[0] = node;

          return MultiplicativeExpression(source);
        }

        if(source[0].type === "MultiplicativeExpression" && source[1] &&
          source[1].type === "*"){

          let node = {
            type:"MultiplicativeExpression",
            operator: "*",
            children:[]
          }

          node.children.push(source.shift());
          node.children.push(source.shift());
          node.children.push(source.shift());
          source.unshift(node);
          return MultiplicativeExpression(source);
        }
        
        if(source[0].type === "MultiplicativeExpression" && source[1] &&
          source[1].type === "/"){

          let node = {
            type:"MultiplicativeExpression",
            operator: "/",
            children:[]
          }

          node.children.push(source.shift());
          node.children.push(source.shift());
          node.children.push(source.shift());
          source.unshift(node);
          return MultiplicativeExpression(source);
        }

        if(source[0].type === "MultiplicativeExpression"){
          return source[0];
        }
      }
      
      Expression(source);
    </script>
  </body>
</html>
```



---

reference：

- [https://zhuanlan.zhihu.com/p/112460676](https://zhuanlan.zhihu.com/p/112460676)
