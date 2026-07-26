import { ref, computed } from 'vue'

// Global modal state
const modalStack = ref([])
const registeredModals = ref(new Map())

export function useModalStack() {
  const openModal = (modalId) => {
    const modal = registeredModals.value.get(modalId)
    if (!modal) {
      console.warn(`Modal "${modalId}" not registered`)
      return
    }

    // Add to stack
    modalStack.value.push(modalId)
  }

  const goBack = () => {
    if (modalStack.value.length <= 1) return
    
    // Remove current modal
    modalStack.value.pop()
  }

  const closeAllModals = () => {
    modalStack.value = []
  }

  const registerModal = (modalId, modalConfig = {}) => {
    registeredModals.value.set(modalId, {
      id: modalId,
      ...modalConfig
    })
  }

  const unregisterModal = (modalId) => {
    registeredModals.value.delete(modalId)
  }

  const isModalOpen = (modalId) => {
    return modalStack.value.includes(modalId)
  }

  const getModalPosition = (modalId) => {
    const index = modalStack.value.indexOf(modalId)
    if (index === -1) return null

    const stackLength = modalStack.value.length
    
    // Latest modal (active)
    if (index === stackLength - 1) {
      if (index === 0) {
        // First modal - center position
        return 'active-first'
      } else {
        // Subsequent modals - came from left
        return 'active-left'
      }
    }
    
    // Shifted modals (background stack) - no limit on nesting depth!
    const shiftLevel = stackLength - 1 - index
    return `shifted-${shiftLevel}`
  }

  const getModalZIndex = (modalId) => {
    const index = modalStack.value.indexOf(modalId)
    return index === -1 ? 20 : 30 + index + 1
  }

  return {
    modalStack: computed(() => modalStack.value),
    hasModalsOpen: computed(() => modalStack.value.length > 0),
    activeModalId: computed(() => modalStack.value[modalStack.value.length - 1] || null),
    openModal,
    goBack,
    closeAllModals,
    registerModal,
    unregisterModal,
    isModalOpen,
    getModalPosition,
    getModalZIndex
  }
}

