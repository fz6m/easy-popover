export type Callback = {
  popHide: (e: MouseEvent) => any
  popShowBefore: Function
  popShow: Function
}

export enum Mode {
  CREATE = 'create',
  DEFAULT = 'default'
}
