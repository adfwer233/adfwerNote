---
title: xv6 Shell的代码分析
---

> ref : https://wjqwsp.github.io/2017/06/04/xv6-shell%E5%AE%9E%E7%8E%B0%E6%BA%90%E4%BB%A3%E7%A0%81%E5%88%86%E6%9E%90/

总的来说，这个 Shell 分为三个部分

- 预处理器
- 命令构造器
- 命令执行器

