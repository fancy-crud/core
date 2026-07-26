import type { Notification } from '@fancy-crud/core'
import { NOTIFICATION_TYPE } from '@fancy-crud/core'
import type { ToastServiceMethods } from 'primevue/toastservice'

/**
 * PrimeVue Toast message options
 * @see https://primevue.org/toast/
 */
export interface ToastMessageOptions {
  /** Severity level of the message */
  severity?: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast'
  /** Summary text (title) of the message */
  summary?: string
  /** Detail text (body) of the message */
  detail?: string
  /** Whether the message can be closed manually */
  closable?: boolean
  /** Delay in milliseconds to close the message automatically (default: 3000) */
  life?: number
  /** Key of the Toast to display the message */
  group?: string
  /** Style class of the message */
  styleClass?: string
  /** Style class of the content */
  contentStyleClass?: string
  /** Icon to display next to the message */
  icon?: string
}

/**
 * Extended notification type for PrimeVue Toast
 * The `payload` field can contain any PrimeVue Toast options
 */
export interface PrimeVueNotification extends Notification {
  payload?: ToastMessageOptions
}

// Singleton to hold the toast instance
let toastInstance: ToastServiceMethods | null = null

const severityMap: Record<string, ToastMessageOptions['severity']> = {
  [NOTIFICATION_TYPE.success]: 'success',
  [NOTIFICATION_TYPE.warning]: 'warn',
  [NOTIFICATION_TYPE.error]: 'error',
  [NOTIFICATION_TYPE.info]: 'info',
  [NOTIFICATION_TYPE.default]: 'info',
}

/**
 * Sets the global PrimeVue ToastService instance.
 * Must be called after the app is mounted and ToastService is available.
 */
export function setToastInstance(instance: ToastServiceMethods) {
  toastInstance = instance
}

/**
 * Gets the current toast instance (useful for debugging)
 */
export function getToastInstance(): ToastServiceMethods | null {
  return toastInstance
}

/**
 * Shows a toast message directly using the ToastService.
 * Can be used independently of FancyCrud.
 * 
 * @example
 * ```ts
 * import { showToast } from '@fancy-crud/wrapper-primevue'
 * 
 * showToast({
 *   severity: 'success',
 *   summary: 'Success',
 *   detail: 'Operation completed',
 *   life: 3000
 * })
 * ```
 */
export function showToast(options: ToastMessageOptions): void {
  if (!toastInstance) {
    console.warn(
      '[FancyCrud/PrimeVue] Toast service not initialized. ' +
      'Make sure to mount FwToast component or call setToastInstance() with useToast().'
    )
    return
  }

  toastInstance.add({
    life: 3000,
    closable: true,
    ...options,
  })
}

/**
 * Shows multiple toast messages at once
 * 
 * @example
 * ```ts
 * showToastMultiple([
 *   { severity: 'info', summary: 'Info', detail: 'Message 1' },
 *   { severity: 'warn', summary: 'Warning', detail: 'Message 2' }
 * ])
 * ```
 */
export function showToastMultiple(messages: ToastMessageOptions[]): void {
  if (!toastInstance) {
    console.warn('[FancyCrud/PrimeVue] Toast service not initialized.')
    return
  }

  const messagesWithDefaults = messages.map(msg => ({
    life: 3000,
    closable: true,
    ...msg,
  }))

  toastInstance.add(messagesWithDefaults as any)
}

/**
 * Removes all toast messages, optionally filtered by group
 */
export function clearToasts(group?: string): void {
  if (!toastInstance) return
  toastInstance.removeAllGroups()
}

/**
 * Removes a specific toast message by group
 */
export function clearToastGroup(group: string): void {
  if (!toastInstance) return
  toastInstance.removeGroup(group)
}

/**
 * Notification handler for PrimeVue Toast.
 * This is the object that should be passed to defineConfig({ toast: ... })
 * 
 * @param defaults - Default options applied to all toast messages
 * 
 * @example
 * ```ts
 * import { createToastHandler } from '@fancy-crud/wrapper-primevue'
 * 
 * // With custom defaults
 * const customToast = createToastHandler({
 *   life: 5000,
 *   closable: true,
 *   group: 'main'
 * })
 * 
 * defineConfig({
 *   toast: customToast
 * })
 * ```
 */
export function createToastHandler(defaults: ToastMessageOptions = {}) {
  return {
    handler: (rawNotification?: Notification) => {
      if (!rawNotification) return

      if (!toastInstance) {
        console.warn(
          '[FancyCrud/PrimeVue] Toast service not initialized. ' +
          'Make sure to mount FwToast component or call setToastInstance() with useToast().'
        )
        return
      }

      // Cast to access PrimeVue-specific payload options
      const notification = rawNotification as PrimeVueNotification
      const payload = notification.payload || {}
      
      // Determine severity: payload > mapped type > default
      const mappedSeverity = severityMap[rawNotification.type || NOTIFICATION_TYPE.default]
      const finalSeverity = payload.severity || mappedSeverity

      toastInstance.add({
        severity: finalSeverity,
        detail: rawNotification.message || '',
        life: 3000,
        closable: true,
        ...defaults,
        ...payload,
      })
    },
  }
}

/**
 * Default toast handler instance.
 * Use this for FancyCrud configuration.
 */
export const toast = createToastHandler()

/**
 * Alias for compatibility with other wrappers
 */
export const notify = createToastHandler

// Convenience functions for common toast types
export const toastHelpers = {
  /**
   * Shows a success toast
   */
  success(detail: string, summary?: string, options?: Omit<ToastMessageOptions, 'severity' | 'detail' | 'summary'>) {
    showToast({ severity: 'success', detail, summary, ...options })
  },

  /**
   * Shows an info toast
   */
  info(detail: string, summary?: string, options?: Omit<ToastMessageOptions, 'severity' | 'detail' | 'summary'>) {
    showToast({ severity: 'info', detail, summary, ...options })
  },

  /**
   * Shows a warning toast
   */
  warn(detail: string, summary?: string, options?: Omit<ToastMessageOptions, 'severity' | 'detail' | 'summary'>) {
    showToast({ severity: 'warn', detail, summary, ...options })
  },

  /**
   * Shows an error toast
   */
  error(detail: string, summary?: string, options?: Omit<ToastMessageOptions, 'severity' | 'detail' | 'summary'>) {
    showToast({ severity: 'error', detail, summary, ...options })
  },

  /**
   * Shows a secondary toast
   */
  secondary(detail: string, summary?: string, options?: Omit<ToastMessageOptions, 'severity' | 'detail' | 'summary'>) {
    showToast({ severity: 'secondary', detail, summary, ...options })
  },

  /**
   * Shows a contrast toast
   */
  contrast(detail: string, summary?: string, options?: Omit<ToastMessageOptions, 'severity' | 'detail' | 'summary'>) {
    showToast({ severity: 'contrast', detail, summary, ...options })
  },
}
