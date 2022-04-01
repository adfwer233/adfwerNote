---
title: Numpy C-API
---

# 环境配置

首先找到Python的include files，并加入IntelliSense的path中。还要找到numpy的include files，在site-packages里面。

我们可以这样调用Python的C++包
```cpp
#include <Python.h>
```

下面是一些numpy的include
```cpp
#include <Python.h>
#include <numpy/arrayobject.h>
```

## How to extend Numpy

### “主函数”

### 定义函数

这一节考虑`mymethods`的编写，它通常static声明为一个`PyMethodDef`的数组，官方文档的例子如下。

```cpp
static PyMethodDef mymethods[] = {
    { nokeywordfunc,nokeyword_cfunc,
      METH_VARARGS,
      Doc string},
    { keywordfunc, keyword_cfunc,
      METH_VARARGS|METH_KEYWORDS,
      Doc string},
    {NULL, NULL, 0, NULL} /* Sentinel */
}
```

每一个`PyMethodDef`对象需要包含以下东西

- 在Python中的名字
- 对应在C中的函数名字
- flags indicating 函数是否要接受keyword
- 函数的docstring

值得注意的是最后需要整一个`NULL`作为哨兵结点。

### 没有Keyword arguments的函数

不接受keyword arguments的函数需要向下面这样写
```cpp
static PyObject*
nokeyword_cfunc (PyObject *dummy, PyObject *args)
{
    /* convert Python arguments */
    /* do function */
    /* return something */
}
```

这里的这个`args`包含传进来的所有参数，放在一个tuple中。常用的两个处理方式如下

- `PyArg_ParseTuple (args, format_string, addresses_to_C_variables…)`
- `PyArg_UnpackTuple (tuple, “name”, min, max, …)`

下面是一个用`PyArg_ParseTuple`的例子
```cpp
PyObject *input;
PyArray_Descr *dtype;
if (!PyArg_ParseTuple(args, "OO&", &input, PyArray_DescrConverter, &dtype)) return NULL;
```
在这个例子中，如果转换成功，`dtype`中会有一个新的指向一个`PyArray_Descr*`对象的引用，然而`input`中会有一个*borrowed*的引用。


