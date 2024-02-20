// export default Dismiss

declare interface Window {
  // extend the window
}

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare class Modal {
  constructor(targetEl: any, options?: any): void
  show(): void
  hide(): void
}

declare module "flowbite-datepicker/Datepicker" {
  export = Modal;
}


declare class Dismiss {
  constructor(targetEl: HTMLElement, triggerElement?: HTMLElement | null, options?: any): void
  hide(): void
}

declare class Tooltip {
  constructor(targetEl: any, triggerEl: any, options?: any): void
  hide(): void
}