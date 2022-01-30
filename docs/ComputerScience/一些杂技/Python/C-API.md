---
title: Extending Python with C or C++
---

# A Simple Example

这个example的目的是写一个在python中调用c中system的module，用途如下
```
>>> import spam
>>> status = spam.system("ls -l")
```

我们应该这样引入Python的API
```cpp
#define PY_SSIZE_T_CLEAN
#include <Python.h>
```

!!!Notice
    这两行通常应该放在其它所有引用之前。

下面一步是写我们要在python中调用的C function，例子如下
```cpp
static PyObject * spam_system(PyObject *self, PyObject *args)
{
    const char *command;
    int sts;

    if (!PyArg_ParseTuple(args, "s", &command))
        return NULL;
    sts = system(command);
    return PyLong_FromLong(sts);
}
```

这里的`PyArg_ParseTuple`将PyObject经检查后由指定格式转换为C对象。

如果我们需要写一个没有返回值的函数，也就是void型的函数，对应的Python函数必须返回`None`，我们需要写下面的代码
```cpp
Py_INCREF(Py_None);
return Py_None;
```
或者用宏`Py_RETURN_TRUE`代替。

`Py_None`在C中相当于Python中的`None`。

## 错误和异常

Python解释器有这样的convention：当一个函数出现问题的时候，应该设定一个异常条件并返回错误的值。异常信息储存在解释器线程状态的三个数字之中，如果没有exception的时候，它们是`NULL`，否则它们和`sys.exc_info()`返回的Python tuple是一样的，tuple中的三个数字分别是（exception type, exception instance, traceback object)。

Python API中定义了一堆设定不同类型异常的函数。

最常用的一种是`PyErr_SetString()`。参数是一个定义好了的异常对象和一个C-string。这个C-string说明了异常发生的原因同时它被转换成了一个python string对象并存在exception的“associated value”中。

另一个常用的是`PyErr_SetFromErrno`。它只接受一个异常作为参数并根据全局变量`errno`构建associated value。

最一般的函数是`PyErr_SetObject`，它接受两个对象作为参数：异常和associated value。


## The Module's Method Table and Initialization Function

我们需要在Python中调用`span_system()`这个函数，首先要将函数的名字和地址列在一个“method table”中。

```cpp
static PyMethodDef SpamMethods[] = {
    {"system", spam_system, METH_VARARGS, "Execute a shell commmand"},
    {NULL, NULL, 0, NULL} // Sentinel item
}
```

注意那个`METH_VARARGS`，这个东西告诉interpreter对应C函数的调用方式，通常是`METH_VARARGS`和`METH_VARARGS | METH_KEYWORDS`。当使用`METH_VARARGS`的时候，这个函数except对应Python-level的用tuple传进来的蚕食，可以通过`PyArg_ParseTuple`来parsing。

`METH_KEYWORDS`这个flag让函数可以使用Keyword。

Method table 需要在一个module definition structure中引用，示例代码如下
```cpp
static struct PyModuleDef spammodule = {
    PyModuleDef_HEAD_INIT,
    "spam",   /* name of module */
    spam_doc, /* module documentation, may be NULL */
    -1,       /* size of per-interpreter state of the module,
                 or -1 if the module keeps state in global variables. */
    SpamMethods
};
```

最后，这个module definition structure应该被传到一个module's initialization function中。这个initialization function应该被声明为`PyInit_name()`，这里的name就是对应的module的名字，函数也应该被声明为`non-static`的，实例代码如下。

```cpp
PyMODINIT_FUNC
PyInit_spam(void) {
    return PyModule_Create(&spammodule);
}
```

当一个python程序`import spam`的时候，`PyInit_spam`被调用，它调用`PyModule_Create()`，这个函数会返回一个指向它创建的module object的指针，并基于对应的信息将函数什么的插入进module中。

当Embedding Python中的时候，`PyInit_spam()`这个函数不会被自动调用，除非在表`P有Import_Inittab`中有一个对应的entry。为了将module加入initialization table，需要用到`PyImport_AppendInittab()`。实例代码如下：

```cpp

int main(int argc, char *argv[]) {

    wchar_t *program = Py_DecodeLocale(argv[0], NULL);
    if (program == NULL) {
        fprintf(stderr, "Fatal error: cannot decode argv[0]\n");
        exit(1);
    }

    /* Add a built-in module, before Py_Initialize */
    if (PyImport_AppendInittab("spam", PyInit_spam) == -1) {
        fprintf(stderr, "Error: could not extend in-built modules table\n");
        exit(1);
    }

    /* Pass argv[0] to the Python interpreter */
    Py_SetProgramName(program);

    /* Initialize the Python interpreter.  Required.
       If this step fails, it will be a fatal error. */
    Py_Initialize();

    /* Optionally import the module; alternatively,
       import can be deferred until the embedded script
       imports it. */
    PyObject *pmodule = PyImport_ImportModule("spam");
    if (!pmodule) {
        PyErr_Print();
        fprintf(stderr, "Error: could not import module 'spam'\n");
    }

    ...

    PyMem_RawFree(program);
    return 0;
}
```

## 编译和链接

有两个重要的事情：compiling and linking。

如果不用动态加载的话，或者所如果想让module变成Python interpreter的一部分，这时需要更改configuration setup并rebuild interpreter。

在Windows build extensions有两种方式，用`distutils`或者手工实现

## Calling Python Functions from C

还有一个重要的事情就是在C中调用Python中的函数。

首先，Python程序必须以某种方式传进来Python对象，这需要一个函数去做。当调用这个函数时，需要将一个指向函数对象的指针保存到一个全局变量中。例如下面的示例程序。

```cpp
static PyObject *my_callback = NULL;

static PyObject *
my_set_callback(PyObject *dummy, PyObject *args)
{
    PyObject *result = NULL;
    PyObject *temp;

    if (PyArg_ParseTuple(args, "O:set_callback", &temp)) {
        if (!PyCallable_Check(temp)) {
            PyErr_SetString(PyExc_TypeError, "parameter must be callable");
            return NULL;
        }
        Py_XINCREF(temp);         /* Add a reference to new callback */
        Py_XDECREF(my_callback);  /* Dispose of previous callback */
        my_callback = temp;       /* Remember new callback */
        /* Boilerplate to return "None" */
        Py_INCREF(Py_None);
        result = Py_None;
    }
    return result;
}
```

这个函数必须使用`METH_VARARGS`这个标签。`Py_XINCREF`和`Py_XDECREF`这两个宏用于增加或减少对应对象的引用计数，并且它们是safe for NULL的。

当我们想要调用这个函数的时候，可以调用`PyObject_CallObject`，这个函数有两个参数，类型均为指向`PyObject`的指针，一个是对应的Python函数，另一个是参数列表。参数列表必须是一个tuple，它的长度就是对应的参数的数量，没有参数的时候传进去一个NULL就行了。可以用`Py_BuildValue`来创建tuple。实例代码如下

```cpp
int arg;
PyObject *arglist;
PyObject *result;
...
arg = 123;
...
/* Time to call the callback */
arglist = Py_BuildValue("(i)", arg);
result = PyObject_CallObject(my_callback, arglist);
Py_DECREF(arglist);
```

`PyObject_CallObject()`返回一个Python object的指针，也就是对应的Python函数的返回值。这个函数还是关于它的参数"reference-count-neutral"的。

这里这个`Py_DECREF(PyObject* o)`函数的作用是将对应对象的引用计数减一，如果对应的reference count减到0，这个函数的deallocation function就会执行。这个东西要求参数不是`NULL`，如果不能确定是不是`NULL`，需要用`Py_XDECREF()`。

`PyObject_CallObject()`的返回值是"new"的：他既是一个新的对象，也是一个引用计数增加了的已经存在了的对象。

注意要检查返回值是否是`NULL`的。如果是`NULL`的话，因为这调用的是一个Python函数，如果它出错了，那么此时一定已经raising an exception。

调keyword function用`PyObject_Call()`。

## Extracting Parameters in Extension Functions

