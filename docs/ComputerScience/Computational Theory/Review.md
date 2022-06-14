

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

!!! Example Other methods

    - [$\sqrt{L}$ is regular](https://cs.stackexchange.com/questions/41281/if-l-is-a-regular-language-then-so-is-sqrtl-www-in-l?noredirect=1&lq=1)
    - [Myhill–Nerode theorem](https://en.wikipedia.org/wiki/Myhill%E2%80%93Nerode_theorem)

### 正则语言的封闭性

- 并、交、补、差
- 反转，闭包
- 连接、同态、逆同态

!!! Example

    证明 $M = \bar{L_{eq}}$ 不是正则的

### 正则语言的判定性质

### 自动机的等价性和最小化



## CFG 与 CFL

- 规约和推导
- 最左推导和最右推导
    - 任何推导都有等价的最左推导和最右推导
- 文法的语言：能从初始符号推导出的所有终结符串的集合
- 句型：左句型、右句型
- 左线性文法和右线性文法，与正则语言的关系
- 语法分析树

!!! Example

    - $L_{pal}$ 回文串
        - $\epsilon,0,1$都是回文
    - Ex 5.1.1

## PDA

### 基础概念

- PDA 的图形表示：靠近栈底放在右边
- PDA 的即使描述

!!! Example

    - $\{0^n1^n2^n \mid n \geq 1\}$
    - $L_{wwr}$

### PDA 的语言

- 以终态方式接受 $L(P)$
- 以空栈方式接受 $N(P)$
    - 输入消耗完的同时堆栈为空的输入串的集合 
- 两种接受方式之间的转化
    - 从空栈方式到终结方式
      - 新增一个栈底，增加终止状态
    - 从终结方式到空栈方式
      - 新增一个栈底，终结状态移动到一个新的状态用于清空栈
    - $N(P_N) = L(P_F)$

### PDA 与 CFG

- CFG 转 PDA
  - 构造一个以空栈方式接受的 PDA
  - $P= (\{q\}, T, V\cup T, \delta, q, S)$
  - $\delta(q, \epsilon, A) = \{(q, \beta) \mid A \to \beta\}$ 
  - $\delta(q, a, a) = \{(q, \epsilon)\}$

### DPDA

- DPDA 的定义
  - $\delta(q, a, X)$ 至多有一个成员
  - $\delta(q, a, X) \neq \emptyset \Rightarrow \delta(q, \epsilon, X) \neq \emptyset$
- DPDA 的语言
  - 位于正则语言和 CFL 之间
  - 前缀性质：不存在两个不同的串 $x,y$ 使得 $x$ 是 $y$ 的前缀
  - If $L$ is regular, $L = L(P)$ for some DPDA $P$
  - $L = N(P)$ for some DPDA $P$ $\iff$ $L = L(P')$ 且有前缀性质
  - $RL \subsetneq L(P) \subsetneq CFL$, where $P$ is a DPDA
  - DPDA 的语言都有无歧义文法，但是有无歧义文法的语言不一定有 DPDA 接受

!!! Example

    - $L_{wwr}$ 是 CFL 但是不是任何 DPDA 的 $L(P)$
    - $L_{wwr}$ 有无歧义文法但是不被 DPDA 接受

!!! Example DPDA Language

    - Ex 6.4.2
    - Ex 6.4.4 : 另一个不被任何 DPDA 接受的 CFL例子

## CFL 的性质

### CNF 的构造

### Pumping Lemma

!!! Example not CFL

    - $\{0^n1^n2^n \mid n\geq 1\}$
      - 不能比较三组符号是否相等
    - $\{0^i1^j2^i3^j \mid i\geq 1 \ and \ j\geq 1\}$
      - 不能比较两对符号的数目是否分别相等，假设它们交叉给出
    - $L_{ww}$
      - 无法匹配任意长度的两个串

### 上下文无关语言的封闭性

- 并、闭包、连接、翻转
- 同态、逆同态
- $L$ is CFL, $R$ is RL, $L \setminus R$ is CFL

### CFG 的判定性质

- 测试 CFL 的空性：给定一个 CFG，判断它时候能产生至少一个串
- 测试 CFL 的成员性： CYK 算法

## TM 

### TM 的语言

- 递归可枚举语言
- 对于一个给定的图灵机 $M$，容易构造另一个新的图灵机 $M'$，它们接受的语言相同，$M'$ 一旦接受就一定会停机，但是对于 $w \notin L(M)$，对于 $w$，$M$ 不一定能停机

### TM 的设计

- 多带图灵机
- 多栈机

## 不可判定性

### 非递归可枚举语言

- 枚举二进制串：$1w$
- 图灵机编码
- 对角化语言 $L_d$
  - 非递归可枚举语言
  
### 递归可枚举但不可判定的问题

- 递归语言定义
  - 存在某个图灵机接受这个语言，并且无论接不接受都停机
- 定理：递归语言的补一定是递归语言，进一步只有如下情况
    - $L$ 和 $\bar{L}$ 都是递归的
    - $L$ 和 $\bar{L}$ 都不是 RE
    - $L$ 和 $\bar{L}$ 不是 RE，一个是RE 但不是递归

!!! Example

    - $L_u$ 是 RE 但不是递归的
    - $L_ne$ 是递归可枚举的，但是不是递归的
    - $L_e$ 是非 RE 的
    - Post对应问题是不可判定的

## 计算复杂性