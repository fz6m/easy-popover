# easy-popover

简单易用的 popover 弹出块初始化器，支持弹出块即时创建与原生使用，这将极大提高对老旧代码的补丁效率。

### 使用

#### 引入

```html
<head>
  <!-- ... -->
  <script src="https://cdn.jsdelivr.net/gh/fz6m/easy-popover@1.0/dist/easy-popover.min.js"></script>
</head>
```

#### 使用

 * 原生使用 ( 已有 pop 弹出块节点 )

```html
  <div class="parent">

    <div class="button">点我打开弹出块</div>
    <div class="pop">弹出块内容</div>

  </div>

  <script>

    var option = {
        select: '.button'
      }
    EasyPopover.init(option)

  </script>
```

 * 即时创建 ( 无 pop 弹出块节点 )

```html
  <div class="parent">

      <div class="button">点我打开弹出块</div>

  </div>

  <script>

    var option = {
        select: '.button',
        mode: 'create',
        popHtml: '<div class="pop">弹出块内容</div>'
      }
    EasyPopover.init(option)

  </script>
```

### 选项

#### mode: default

原生模式可用参数：

参数|类型|必须性|说明
:-:|:-:|:-:|:-
`select`|string|yes|触发弹出块的按键节点选择器
`popSelect`|string|no|弹出块节点选择器，若不填默认为 `select` 下一个节点
`callback`|object|no|生命周期钩子

#### mode: create

即时创建模式可用参数：

参数|类型|必须性|说明
:-:|:-:|:-:|:-
`select`|string|yes|触发弹出块的按键节点选择器
`mode`|string|yes|当使用即时创建模式时，需使用 `create`
`popHtml`|string|yes|即时创建的弹出块 HTML 文本
`selectParent`|string|no|触发弹出块的父节点选择器，若不填默认为 `select` 直属父节点
`callback`|object|no|生命周期钩子
`instantly`|boolean|no|弹出块是否每次隐藏时销毁，默认为 `true` 隐藏即销毁，若置为 `false` 则只有第一次创建弹出块

### 其他

本脚本仅对 JavaScript 逻辑予以支持，弹出块和点击触发节点的样式需要自行添加。

一般情况下，你需要对父节点予以 `position: relative` ，对弹出块予以 `position: absolute` 。

