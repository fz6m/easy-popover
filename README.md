# easy-popover

*version: 1.1*

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
        select: '.button' // or document.querySelector('.button')
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

#### mode: "default"

原生模式可用参数：

参数|类型|必须|说明
:-:|:-:|:-:|:-
`select`|string\|element|yes|触发弹出块的按键节点选择器
`popSelect`|string\|element|no|弹出块节点选择器，若不填默认为 `select` 同级下一个节点
`callback`|object|no|生命周期钩子

#### mode: "create"

即时创建模式可用参数：

参数|类型|必须|说明
:-:|:-:|:-:|:-
`select`|string\|element|yes|触发弹出块的按键节点选择器
`mode`|string|yes|当使用即时创建模式时，需使用 `mode: "create"`
`popHtml`|string|yes|即时创建的弹出块 HTML 文本
`selectParent`|string\|element|no|触发弹出块的父节点选择器，若不填默认为 `select` 直属父节点
`callback`|object|no|生命周期钩子
`instantly`|boolean|no|弹出块是否每次隐藏时销毁，默认为 `true` 隐藏即销毁，若置为 `false` 则只有第一次创建弹出块

#### 生命周期

你可以传入 `callback` 在适当的时机对弹出块挂载点击事件等处理逻辑：

```js
  callback: {
    // 弹出块展示前
    popShowBefore: () => { console.log('show before') },
    // 弹出块展示后
    popShow: () => { console.log('show') },
    // 弹出块隐藏后
    popHide: (e: MouseEvent) => { console.log('hide: ', e) }
  }
```

弹出块处于展示状态时，点击了弹出块以外的任意区域均会导致弹出块关闭，从而触发 `popHide` 生命周期钩子，并传入鼠标点击事件参数。

### 其他

本脚本仅对 JavaScript 逻辑予以支持，弹出块和点击触发节点的样式需要自行添加。

一般情况下，你需要对父节点予以 `position: relative` ，对弹出块予以 `position: absolute` 。

