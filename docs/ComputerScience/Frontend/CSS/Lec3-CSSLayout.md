---
title: Lec3 CSS Layout
---

## Flexible Box

## 定位

!!! Position 属性

    - static
    - relative
        - 相对于自己在常规流中本来应在的位置偏移
    - absolute
        - 脱离常规流，相对于最近的非 static 祖先定位
        - 不会对流内元素布局产生影响
    - fixed

    给定 left 和 right 会自动计算 width，给定 left 和 width 会忽略 right

## 堆叠层级

    - 向右为 x 轴，向下为 y 轴，垂直是 z 轴
    - `z-index`：一个整数，数越大越靠近用户
    - 堆叠上下文： Stacking Context
        - 在同一个堆叠上下文上的可以根据 `z-index` 调节堆叠关系
        - 创建有各种条件