

## FA

### DFA

- DFA 如何处理串
- DFA 的记号：转移图、转移表（$\rightarrow, *$）
  - 转移函数与扩展转移函数
- DFA 的语言

!!!Example "DFA 例子"

    - 同时有偶数个 0 和偶数个 1
    - 倒过来解释称二进制整数时被 5 整除的串的集合

!!!Warning

    - 注意输入的特殊情况

### NFA

- NFA 的形式化描述
- NFA 的扩展转移函数
- NFA 的语言 $L(A) = \lbrace w \mid \hat{\delta}(q_0, w) \cap F \neq \emptyset \rbrace$
- DFA 和 NFA 的等价性
- NFA 转 DFA 状态指数增长的例子
    - $L(N)$: 倒数第 $n$ 个符号是 1 的集合
      - 鸽巢原理

!!! Example

    - 以 01 结尾的串
    - 习题2.3.4：结尾数字在前面出现过、结尾数字在前面没有出现过

### 文本搜索

!!! Question

    - 文本搜索的 NFA
    - 文本搜索的 DFA
    - 由文本搜索的 DFA 构造对应的 NFA

### $\epsilon-$ NFA

- 新能力不会扩大 FA 接受的语言类
- $\epsilon-$NFA 的扩展转移，根据扩展转移可以定义对应语言
- 消去 $\epsilon$ 转移：利用 $\epsilon$ 闭包和子集构造


## 正则表达式与正则语言

- 三种语言运算：并、连接、闭包
  - 注意闭包的定义
  - 优先级：星、点、加
- 正则表达式的语言：采用归纳定义
- DFA 到正则表达式：状态消除法
- 正则表达式到 $\epsilon-$NFA
- 正则表达式代数定律
    - 结合律、交换律、单位元、零元、分配律
    - $\emptyset$：并运算的单位元、连接运算的零元
    - $\epsilon$：连接运算的单位元
- 检验正则表达式代数定律：把变量换成具体的符号（但是出现新运算可能失效）

!!!Example

    - 交替的 0 和 1 的串的集合：两种写法
    - Ex 3.1.1，Ex 3.1.2

## 正则语言的性质

### Pumping Lemma

!!! Example

    - $L_{01} = \{0^n 1^n \mid n\geq 1\}$
    - $L_{eq}$ 包含相同数目的 01
    - 只由 1 构成且长为素数
    - $ww$ 形式的串
        - [ww is not regular](https://cs.stackexchange.com/questions/38459/is-this-language-regular-or-non-regular-ww-w-%E2%88%88-a-b)
    - $ww^R$ 形式的串
        - [$ww^R$ is not regular](https://math.stackexchange.com/questions/786978/pumping-lemma-wwr-not-regular)
    - $w\bar{w}$形式的串：$0^n1^n$
        - [$w\bar{w}$ is not regular](https://cs.stackexchange.com/questions/120289/proof-that-language-is-not-regular-l-w-barww-in-0-1-and-barw-i)

!!! Example

    - [$\sqrt{L}$ is regular](https://cs.stackexchange.com/questions/41281/if-l-is-a-regular-language-then-so-is-sqrtl-www-in-l?noredirect=1&lq=1)

## CFG 与 CFL

## PDA

## CFL 的性质

## TM 

## 不可判定性

## 计算复杂性