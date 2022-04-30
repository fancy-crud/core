// export default Dismiss

declare interface Window {
  // extend the window
}
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}


declare class Dismiss {
  constructor(targetEl: any, options?: any): void
  hide(): void
}

declare class Tooltip {
  constructor(targetEl: any, triggerEl: any, options?: any): void
  hide(): void
}

declare class Modal {
  constructor(targetEl: any, options?: any): void
  show(): void
  hide(): void
}