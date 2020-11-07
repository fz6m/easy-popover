import { Callback } from '../types'
import { uhide } from '../utils'

type ClickOptions = {
  popNode: Element | null
  callback?: Callback
  popHtml?: string
  selectParentNode: Element | null
  instantly?: boolean
}

class ClickEvent {
  popNode: Element | null
  callback: Callback
  popHtml?: string
  selectParentNode: Element | null
  instantly: boolean
  created: boolean

  constructor(options: ClickOptions) {
    this.popNode = options.popNode

    this.callback = options.callback ?? {
      popHide: (e) => {},
      popShow: () => {},
      popShowBefore: () => {}
    }

    this.popHtml = options.popHtml
    this.selectParentNode = options.selectParentNode
    this.instantly = options.instantly ?? true

    this.created = false
  }

  event() {
    // 点击其他区域关闭 pop 事件
    const clickOutside = (e: MouseEvent) => {
      // click outside area
      if (!this.popNode!.contains(e.target as Node)) {
        // 关闭 pop
        this.popNode!.classList.add(uhide)
        // 清除事件
        document.removeEventListener('click', clickOutside)
        // 关闭 pop 后回调
        this.callback?.popHide?.(e)
      }
    }

    /**
     * 若为打开状态
     */
    if (this.popNode && !this.popNode.classList.contains(uhide)) {
      return
    }

    /**
     * 若为关闭状态
     */
    this.callback?.popShowBefore?.() // 打开 pop 前回调
    this.popNode!.classList.remove(uhide) // 打开 pop

    setTimeout(() => {
      // 挂载点击其他区域关闭 pop 事件
      document.addEventListener('click', clickOutside)
    }, 0)

    this.callback?.popShow?.() // 打开 pop 后回调
  }

  createEvent() {
    return this.event.bind(this)
  }
}

export default ClickEvent
