---
title: 一些杂技
---

### std::ostream_iterator输出

```cpp

std::cout << "t :";
std::copy(tBuffer.begin(), tBuffer.end(), std::ostream_iterator<int>(std::cout, " "));
std::cout << std::endl; // 刷新缓冲区

```

### 输出指针

```cpp
std::cout << "the pointers : " << (void*)inputBuf << ',' << (void*)tansBuffer << ',' << (void*)xansBuffer << ',' << (void*)pyansBuffer << std::endl;
```