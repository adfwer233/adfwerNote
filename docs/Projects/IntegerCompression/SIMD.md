# SIMD

SIMD 全称 Single Instruction Multiple Data，也即“单指令多数据”。它是一个扩展指令集，使得我们能够用一条指令操作多个数据。

## 一些SSE指令

### 函数命名规定
`_<mm/mm256/mm512>_<intrin_op>_<suffix>`
这里的`<intrin_op>`为固有指令名，`<suffix>`为操作数的类型，suffix的一些规则如下

首先是前一两个字母，代表操作数种类

- p : packed，一条指令操作所有的数
- ep : extend packed，数据位数扩展，可以将低位数的数据扩展到更高位数的数据
- s : scaler，只操作最低位

后面的字母代表操作数类型

- s : 单精度浮点
- d : 双精度浮点数
- i128：有符号128bit整数
- i64：有符号64bit整数
- u64：无符号64bit整数
- i32：有符号32bit整数
- u32：无符号32bit整数
- i16：有符号16bit整数
- u16：无符号16bit整数
- i8：有符号8bit整数
- u8：无符号8bit整数

### 算术型指令
- add:加法
- adds:saturation add，使得加法的结果不会超过最大值，超过上界则返回上界
- sub:减法
- subs:饱和减，和adds同理
- mul:乘法
- mulhi：乘法并取高位结果
- mullo：乘法并取低位结果
- div：除法
- sqrt：平方根，注意这玩意有两个输入。
- rcp：倒数
- rsqrt：平方取倒
- max，min

## 一些奇怪的指令

#### _MM_SHUFFLE
这是一个