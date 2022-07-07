---
title: Lec1 Intro
---

**HTML : HyperText Markup Language**

```html
<!doctype html>
```

doctype 用于指定版本和渲染模式

!!!note DOM 树

    表示标签树形关系的一种树。

!!! 标签分类

    - Flow
    - Metadata
    - Heading
    - Sectioning
    - Phrasing
        -  Embedded
    -  Interactive

## 文本类标签

!!! note a-链接

    - URL 的组成

    ```html
    <a href = "url"> text </a>
    <a href = "#product"> hash demo </a>
    ```

    - target：链接目标

    ```html
    <a href = "url", traget = "_self">当前窗口</a>
    <a href = "url", traget = "_blank">新窗口</a>
    ```

!!!note 引用

    - **blockquote** 长引用
    - **q** 短引用
    - **cite** 引用来源

!!!note 强调

    - **em** 强调重读
    - **strong** 强调重要性

!!!note 代码

    - **code** 代码段
    - **var** 变量名
    - **samp** 输出示例
    - **kbd** 键盘操作
    
!!!note 空白符

    - 默认情况下，浏览器会将多个连续的空格合并成一个空格。

    - 在 `<pre>` 标签中，html 会保留原格式（换行和空格）

!!!note 实体字符 Entity

    - `&nbsp` 空格
    - `&lt;` 小于号
    - `&gt;` 大于号
    - `&amp;` &

## 多媒体标签

!!!note img

    ```html
    <img src="url" alt="alternative text" width="360" height="180">
    ```

    - jpg：有损压缩、照片、色彩丰富
    - png：无损格式、颜色少、支持透明度
    - webp：体积更小、兼容性一般
    - gif：动画、体积大

!!!note video

    ```html
    <video src="url"
        autoplay
        control
        mutex
        loop >
        <track> 
    </video>
    ```

    - Webm
    - Ogg
    - MP4：最为广泛支持的格式

!!!note audio

    - 属性
        - src
          - 也可嵌套标签
        - control

## 组织页面内容

!!! note 页面的框架

    - header
    - main
    - aside
    - footer