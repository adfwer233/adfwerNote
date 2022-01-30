---
title: Pybind学习
---

## 简介

我们希望在Python中调用C++的代码，这时可以用Pybind。Pybind是一个Header only的库，include相应的头文件就可以使用。下面内容整理自官方文档。

## 安装

首先当然要`pip install pybind11`。

使用下面的方式在项目中安装Pybind。
```
git submodule add -b stable https://github.com/pybind/pybind11.git extern/pybind11
```

## First step

### 简单的例子
```cpp

// example.cpp

#include <pybind11/pybind11.h>

namespace py = pybind11;

int add(int i, int j) {
    return i + j;
}

PYBIND11_MODULE(example, m) {
    m.doc() = "pybind11 example plugin"; // optional module docstring

    m.def("add", &add, "A function that adds two numbers");
}

```

编译命令如下

```
c++ -O3 -Wall -shared -std=c++11 -fPIC $(python3 -m pybind11 --includes) example.cpp -o example$(python3-config --extension-suffix)
```

我们在同一个文件夹中打开Python终端，`import example`就可以使用对应的函数。

### Keyword arguments

我们可以让绑定的函数有keyword arguments

```cpp
m.def("add", &add, "A function which adds two numbers", py::arg("i"), py::arg("j"));
```
在python终端里就可以用这种Keyword arguments了
```py
example.add(i=1, j=2)
```

### 默认参数

Pybind虽然不支持直接使用c++中函数的默认参数，但是给定默认参数的操作可以通过arg来实现。
```
m.def("add", &add, "A function which adds two numbers", py::arg("i") = 1, py::arg("j") = 2);
```

默认参数的使用可以缩写，如下代码所示
```
// regular notation
m.def("add1", &add, py::arg("i") = 1, py::arg("j") = 2);
// shorthand
m.def("add2", &add, "i"_a=1, "j"_a=2);
```


### 文档功能

之前在m.doc中输入的信息可以在python终端中用`help(example)`结果大概如下所示。

```
Help on module example:

NAME
    example - pybind11 example plugin

FUNCTIONS
    add(...) method of builtins.PyCapsule instance
        add(arg0: int, arg1: int) -> int

        A function that adds two numbers

FILE
    /mnt/c/Users/ba123/Documents/WorkFolder/ComputerScience/Pybind/example.cpython-38-x86_64-linux-gnu.so
```

### Exporting variables

我们可以把c++代码中的值expose到python包中，build-in的类型会被自动转换，也可以用`py::cast`显示转换，代码如下。

```c++
PYBIND11_MODULE(example, m) {
    m.attr("the_answer") = 42;
    py::object world = py::cast("World");
    m.attr("what") = world;
}
```

## 面向对象的代码

假设我们有下面这样一个类`Pet`

```cpp
struct Pet {
    Pet(const std::string &name) : name(name) { }
    void setName(const std::string &name_) { name = name_; }
    const std::string &getName() const { return name; }

    std::string name;
};
```

在pybind中可以利用py::class_<Pet>来绑定这个类。
```cpp
PYBIND11_MODULE(example, m) {
    py::class_<Pet>(m, "Pet")
        .def(py::init<const std::string &>())
        .def("setName", &Pet::setName)
        .def("getName", &Pet::getName);
}
```
这个东西还可以写成property的形式，也就是
```cpp
py::class_<Pet>(m, "Pet")
    .def(py::init<const std::string &>())
    .def_property("name", &Pet::getName, &Pet::setName)
```
如果想要写成只读的，把后面的整成`nullptr`就行了。   

这玩意给甚至还可以用来绑定lambda表达式，一个实例如下
```cpp
py::class_<Pet>(m, "Pet")
    .def(py::init<const std::string &>())
    .def("setName", &Pet::setName)
    .def("getName", &Pet::getName)
    .def("__repr__",
        [](const Pet &a) {
            return "<example.Pet named '" + a.name + "'>";
        }
    );
```

### 类的继承

###

## 参考

- [官方文档](https://pybind11.readthedocs.io/en/stable/compiling.html)