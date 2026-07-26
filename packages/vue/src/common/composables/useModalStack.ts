import { ref, computed, onMounted, onUnmounted } from 'vue'

export type ModalPosition = 'active-first' | 'active-left' | 'active-right' | `shifted-${number}` | `shifted-left-${number}` | null
export type ModalStackPosition = 'left' | 'center' | 'right'

export interface ModalConfig {
  id?: string
  position?: ModalStackPosition // Where the modal appears and stacks
  [key: string]: any
}

export interface ModalStackConfig {
  baseZIndex?: number
  overlayZIndex?: number
  transitionDuration?: number
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
}

// Global modal state
const modalStack = ref<string[]>([])
const registeredModals = ref(new Map<string, ModalConfig>())
const config = ref<ModalStackConfig>({
  baseZIndex: 1000,
  overlayZIndex: 999,
  transitionDuration: 500,
  closeOnOverlayClick: true,
  closeOnEscape: true,
})

export function configureModalStack(newConfig: Partial<ModalStackConfig>) {
  Object.assign(config.value, newConfig)
}

export function useModalStack() {
  /**
   * Open a modal by adding it to the stack
   */
  const openModal = (modalId: string) => {
    const modal = registeredModals.value.get(modalId)
    if (!modal) {
      console.warn(`Modal "${modalId}" not registered`)
      return
    }

    // Add to stack if not already there
    if (!modalStack.value.includes(modalId)) {
      modalStack.value.push(modalId)
    }
  }

  /**
   * Close a specific modal by removing it from the stack
   */
  const closeModal = (modalId: string) => {
    const index = modalStack.value.indexOf(modalId)
    if (index !== -1) {
      modalStack.value.splice(index, 1)
    }
  }

  /**
   * Go back - close the topmost modal
   */
  const goBack = () => {
    if (modalStack.value.length > 0) {
      modalStack.value.pop()
    }
  }

  /**
   * Close all modals - clear the stack
   */
  const closeAllModals = () => {
    modalStack.value = []
  }

  /**
   * Register a modal in the system
   */
  const registerModal = (modalId: string, modalConfig: ModalConfig = {}) => {
    registeredModals.value.set(modalId, {
      id: modalId,
      ...modalConfig,
    })
  }

  /**
   * Unregister a modal (typically on unmount)
   */
  const unregisterModal = (modalId: string) => {
    registeredModals.value.delete(modalId)
    closeModal(modalId)
  }

  /**
   * Check if a modal is currently open (in the stack)
   */
  const isModalOpen = (modalId: string): boolean => {
    return modalStack.value.includes(modalId)
  }

  /**
   * Get the position state of a modal for animation purposes
   */
  const getModalPosition = (modalId: string): ModalPosition => {
    const index = modalStack.value.indexOf(modalId)
    if (index === -1) return null

    const stackLength = modalStack.value.length
    const modalConfig = registeredModals.value.get(modalId)
    const modalPosition = modalConfig?.position || 'center' // Default to center

    // Latest modal (active)
    if (index === stackLength - 1) {
      if (index === 0) {
        // First modal - always center position regardless of config
        return 'active-first'
      }
      else {
        // Subsequent modals - position depends on config
        if (modalPosition === 'left') {
          return 'active-left'
        }
        else if (modalPosition === 'center') {
          return 'active-first' // Center modals stay centered
        }
        else {
          // Right position (default)
          return 'active-right'
        }
      }
    }

    // Shifted modals (background stack) - unlimited nesting
    const shiftLevel = stackLength - 1 - index
    
    // Stack direction depends on modal position
    if (modalPosition === 'left') {
      // Left modals stack to the left (opposite direction)
      return `shifted-left-${shiftLevel}`
    }
    else {
      // Right and center modals stack to the right
      return `shifted-${shiftLevel}`
    }
  }

  /**
   * Calculate z-index for a modal based on its position in the stack
   */
  const getModalZIndex = (modalId: string): number => {
    const index = modalStack.value.indexOf(modalId)
    return index === -1 ? config.value.baseZIndex! : config.value.baseZIndex! + index + 1
  }

  /**
   * Get the configured stack position for a modal (left/center/right)
   */
  const getModalStackPosition = (modalId: string): ModalStackPosition => {
    const modalConfig = registeredModals.value.get(modalId)
    return modalConfig?.position || 'center'
  }

  /**
   * Sync modal state with v-model changes
   * Call this when v-model changes to keep stack in sync
   */
  const syncWithVModel = (modalId: string, isOpen: boolean) => {
    if (isOpen && !modalStack.value.includes(modalId)) {
      openModal(modalId)
    }
    else if (!isOpen && modalStack.value.includes(modalId)) {
      closeModal(modalId)
    }
  }

  return {
    // State
    modalStack: computed(() => modalStack.value),
    hasModalsOpen: computed(() => modalStack.value.length > 0),
    activeModalId: computed(() => modalStack.value[modalStack.value.length - 1] || null),
    config: computed(() => config.value),

    // Actions
    openModal,
    closeModal,
    goBack,
    closeAllModals,
    registerModal,
    unregisterModal,

    // Getters
    isModalOpen,
    getModalPosition,
    getModalZIndex,
    getModalStackPosition,

    // Sync
    syncWithVModel,
  }
}

/**
 * Composable hook for components that need modal stack awareness
 * Automatically registers/unregisters the modal
 */
export function useModalStackAware(modalId: string, modalConfig: ModalConfig = {}) {
  const stack = useModalStack()

  onMounted(() => {
    stack.registerModal(modalId, modalConfig)
  })

  onUnmounted(() => {
    stack.unregisterModal(modalId)
  })

  return stack
}

