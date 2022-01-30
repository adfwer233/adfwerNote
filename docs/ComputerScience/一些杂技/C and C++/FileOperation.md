---
title: 一些文件操作
---

## 获取文件长度

在C中的写法
```c
uint64_t file_size(const char* filename)  
{  
    FILE *fp = fopen(filename,"r");
    if(!fp) return -1;  
    fseek(fp, 0L, SEEK_END);  
    uint64_t size = ftell(fp);  
    fclose(fp);  
    return size;  
}  
```
在C++中用`ifstream`的写法
```cpp
infile.seekg(0, std::ios::end);
int inputLength = infile.tellg();
infile.seekg(0, std::ios::beg);

auto inputBuf = new unsigned char[inputLength];

infile.read((char*)(inputBuf), inputLength);

delete[] inputBuf;
```

## seekg and tellp

- `fstream.seekg()`用来指定位置，可以是相对位置也可以是绝对位置
- `fstream.tellp()`用来获取当前位置。