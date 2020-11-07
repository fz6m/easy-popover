/**
 * 选择器
 */
export const selection = (select: string): Element => {
  const element = document.querySelector(select)
  if (!element) {
    throw new Error('select 不能为空')
  }
  return element
}

/**
 * 隐藏类名
 */
export const uhide: string = 'u-hide'

/**
 * 添加 u-hide 隐藏类函数
 */
export const hide = (node: Element | null): void => {
  if (!node) return
  node.classList.contains(uhide) ? null : node.classList.add(uhide)
}
