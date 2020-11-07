import { selection, hide } from '../utils'
import { Mode, Callback } from '../types'
import ClickEvent from '../event'

export type PopOtions = {
  select: string
  selectParent?: string
  popSelect?: string
  callback?: Callback
  mode?: Mode
  popHtml?: string
  instantly?: boolean
}

class PopCreate {
  node: Element
  popNode?: Element | null
  clickEvent: ClickEvent
  mode: Mode
  callback?: Callback

  constructor(options: PopOtions) {
    this.mode = options.mode ?? Mode.DEFAULT
    this.callback = options.callback

    this.node = selection(options.select)
    this.popNode = options.popSelect
      ? selection(options.popSelect)
      : this.node.nextElementSibling

    const selectParentNode = options.selectParent
      ? selection(options.selectParent)
      : this.node.parentElement

    this.clickEvent = new ClickEvent({
      popNode: this.popNode, // 当为 CREATE 模式时 popNode 为空
      callback: options.callback,
      popHtml: options.popHtml,
      instantly: options.instantly,
      selectParentNode
    })
  }

  init() {
    /**
     * 默认模式
     */
    if (this.mode === Mode.DEFAULT) {
      hide(this.popNode as Element) // 隐藏 pop
      const event = this.clickEvent.createEvent()
      this.node.addEventListener('click', event)
    }

    /**
     * 创建模式
     */
    if (this.mode === Mode.CREATE) {
      const eventClass = this.clickEvent
      // 置空 pop
      eventClass.popNode = null
      // 猴子补丁
      const popHide = eventClass.callback?.popHide
      const popShowBefore = eventClass.callback?.popShowBefore

      /**
       * 创建 pop 节点到触发事件 node 后
       */
      const newPopShowBefore = function () {
        if (!this.created || this.instantly) {
          const el = document.createElement('div')
          el.innerHTML = this.popHtml as string
          this.popNode = el.firstElementChild as Element
          // 添加 u-hide 隐藏类
          hide(this.popNode)
          this.selectParentNode!.append(this.popNode)
          this.created = true
        }
        // 执行回调
        popShowBefore && popShowBefore.call(this)
      }
      /**
       * 销毁 node（若需要）
       */
      const newPopHide = function (e: MouseEvent) {
        if (this.instantly) {
          this.selectParentNode!.removeChild(this.popNode as Element)
          this.popNode = null
        }
        popHide && popHide.call(this, e)
      }

      eventClass.callback.popHide = newPopHide.bind(eventClass)
      eventClass.callback.popShowBefore = newPopShowBefore.bind(eventClass)

      const event = eventClass.createEvent()
      this.node.addEventListener('click', event)
    }
  }
}

export default PopCreate
