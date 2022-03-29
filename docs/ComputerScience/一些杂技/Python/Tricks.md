---
title: "杂技操作"
---

## 计算组合数

```py
from scipy.special import comb, perm

perm(3,2)
comb(3,2)

```

## 分数

### 化简分式

```py
from fractions import Fraction
Fraction(int(comb(10, 5)), 1024)
```

### 小数转成分数

```py
Fraction(1.1)
```

### 字符串转小数

```py
from decimal import Decimal
Fraction(Decimal('1.1'))
```