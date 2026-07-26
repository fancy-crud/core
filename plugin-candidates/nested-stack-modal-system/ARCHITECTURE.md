# Nested Stack Modal System - Architecture Overview

This document provides visual diagrams and architecture details for understanding how the modal stack system integrates with FancyCrud.

---

## 🏛️ Current Architecture (Before Integration)

### Component Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                        Application Layer                         │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ FTable Component                                           │ │
│  │                                                             │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │ FModal (v-model="displayFormDialog")                 │ │ │
│  │  │                                                       │ │ │
│  │  │  ┌─────────────────────────────────────────────────┐ │ │ │
│  │  │  │ FForm (CRUD operations)                         │ │ │ │
│  │  │  │                                                  │ │ │ │
│  │  │  │  • Create new record                            │ │ │ │
│  │  │  │  • Edit existing record                         │ │ │ │
│  │  │  │  • View record details                          │ │ │ │
│  │  │  └─────────────────────────────────────────────────┘ │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                                                             │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │ FDeleteConfirmationModal                             │ │ │
│  │  │ (v-model="displayConfirmationDialog")                │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      Vue Components Layer                        │
│                    (@fancy-crud/vue package)                     │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ FModal.vue                                                 │ │
│  │                                                             │ │
│  │  setup() {                                                 │ │
│  │    return () => h(components.modal, props, slots)         │ │
│  │  }                                                         │ │
│  │                                                             │ │
│  │  • Acts as proxy to wrapper modal                         │ │
│  │  • No modal management logic                              │ │
│  │  • No z-index management                                  │ │
│  │  • No stacking support                                    │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↓
            (components.modal set via setupConfig)
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                       Wrapper Layer                              │
│            (UI library-specific implementations)                 │
│                                                                   │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐ │
│  │  FwModal     │  WeModal     │  WqModal     │  WvModal     │ │
│  │  (PrimeVue)  │ (ElementPlus)│  (Quasar)    │  (Vuetify)   │ │
│  ├──────────────┼──────────────┼──────────────┼──────────────┤ │
│  │              │              │              │              │ │
│  │  h(Dialog)   │ h(ElDialog)  │ h(QDialog)   │ h(VDialog)   │ │
│  │              │              │              │              │ │
│  └──────────────┴──────────────┴──────────────┴──────────────┘ │
│                                                                   │
│  • Each wraps its UI library modal component                    │
│  • Manages v-model (open/close state)                           │
│  • Applies defaults from core config                            │
│  • No coordination between modals                               │
│  • Z-index conflicts possible                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Current Limitations

❌ **No Modal Stacking** - Opening multiple modals causes:
- Z-index conflicts
- Overlays stacking on each other
- No visual hierarchy
- Confusion about which modal is active

❌ **No Nested Modals** - Cannot have:
- Form within a form
- Table within a form
- Related data editing

❌ **No Modal Navigation** - Cannot:
- Go back to previous modal
- Maintain modal history
- Show which modals are open

---

## 🚀 Proposed Architecture (After Integration)

### Enhanced Component Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                        Application Layer                         │
│                     (User's application)                         │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ FTable Component                                           │ │
│  │                                                             │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │ FModal                                                │ │ │
│  │  │ v-model="displayFormDialog"                          │ │ │
│  │  │ modal-id="table-123-form" ← Auto-generated          │ │ │
│  │  │                                                       │ │ │
│  │  │  ┌─────────────────────────────────────────────────┐ │ │ │
│  │  │  │ FForm (Edit Artist)                             │ │ │ │
│  │  │  │                                                  │ │ │ │
│  │  │  │  ┌────────────────────────────────────────────┐ │ │ │ │
│  │  │  │  │ FModal (Nested!)                           │ │ │ │ │
│  │  │  │  │ v-model="showAlbums"                       │ │ │ │ │
│  │  │  │  │ modal-id="nested-albums-table"            │ │ │ │ │
│  │  │  │  │                                            │ │ │ │ │
│  │  │  │  │  ┌─────────────────────────────────────┐  │ │ │ │ │
│  │  │  │  │  │ FTable (Manage Albums)              │  │ │ │ │ │
│  │  │  │  │  │                                      │  │ │ │ │ │
│  │  │  │  │  │  Can nest further!                  │  │ │ │ │ │
│  │  │  │  │  └─────────────────────────────────────┘  │ │ │ │ │
│  │  │  │  └────────────────────────────────────────────┘ │ │ │ │
│  │  │  └─────────────────────────────────────────────────┘ │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   Vue Components Layer (NEW!)                    │
│                    (@fancy-crud/vue package)                     │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ FModal.vue (Enhanced)                                      │ │
│  │                                                             │ │
│  │  props: { modalId, modelValue }                           │ │
│  │                                                             │ │
│  │  setup() {                                                 │ │
│  │    // NEW: Stack management                               │ │
│  │    const modalStack = modalId ? useModalStack() : null    │ │
│  │                                                             │ │
│  │    // Register with stack                                 │ │
│  │    onMounted(() => modalStack?.registerModal(modalId))   │ │
│  │                                                             │ │
│  │    // Sync v-model with stack                             │ │
│  │    watch(modelValue, (isOpen) => {                        │ │
│  │      modalStack?.syncWithVModel(modalId, isOpen)         │ │
│  │    })                                                      │ │
│  │                                                             │ │
│  │    // Get stack properties                                │ │
│  │    const position = modalStack?.getModalPosition(modalId) │ │
│  │    const zIndex = modalStack?.getModalZIndex(modalId)     │ │
│  │                                                             │ │
│  │    return () => h(components.modal, {                     │ │
│  │      ...props,                                            │ │
│  │      'data-position': position,                           │ │
│  │      'data-zindex': zIndex,                               │ │
│  │    }, slots)                                              │ │
│  │  }                                                         │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ useModalStack() Composable (NEW!)                         │ │
│  │                                                             │ │
│  │  • Global modal state management                          │ │
│  │  • Modal registration/unregistration                      │ │
│  │  • Stack tracking (array of modal IDs)                    │ │
│  │  • Position calculation (active-first, active-left, ...)  │ │
│  │  • Z-index calculation (base + stack position)            │ │
│  │  • Navigation (openModal, closeModal, goBack)             │ │
│  │  • V-model synchronization                                │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                (Passes stack info to wrapper)
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  Wrapper Layer (Enhanced)                        │
│            (UI library-specific implementations)                 │
│                                                                   │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐ │
│  │  FwModal     │  WeModal     │  WqModal     │  WvModal     │ │
│  │  (PrimeVue)  │ (ElementPlus)│  (Quasar)    │  (Vuetify)   │ │
│  ├──────────────┼──────────────┼──────────────┼──────────────┤ │
│  │              │              │              │              │ │
│  │ setup() {    │ setup() {    │ setup() {    │ setup() {    │ │
│  │   // Stack   │   // Stack   │   // Stack   │   // Stack   │ │
│  │   const pos  │   const pos  │   const pos  │   const pos  │ │
│  │   const z    │   const z    │   const z    │   const z    │ │
│  │              │              │              │              │ │
│  │   h(Dialog,  │  h(ElDialog, │  h(QDialog,  │  h(VDialog,  │ │
│  │     {        │     {        │     {        │     {        │ │
│  │      zIndex: │     zIndex:  │     style:{  │     zIndex:  │ │
│  │         z,   │         z,   │      zIndex  │         z,   │ │
│  │      pt: {   │     class:   │     },       │     class:   │ │
│  │        ...   │      pos,    │     class:   │      pos,    │ │
│  │      }       │     ...      │      pos,    │     ...      │ │
│  │     }        │     }        │     ...      │     }        │ │
│  │   )          │   )          │     }        │   )          │ │
│  │ }            │ }            │   )          │ }            │ │
│  │              │              │ }            │              │ │
│  └──────────────┴──────────────┴──────────────┴──────────────┘ │
│                                                                   │
│  • Each wrapper enhanced with stack awareness                   │
│  • Applies z-index from stack                                   │
│  • Applies position-based classes for animations                │
│  • Coordinates with other modals via shared stack               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Modal Stack State Flow

### Stack State Management

```
┌─────────────────────────────────────────────────────────────────┐
│                     Global Modal Stack State                     │
│                   (Reactive Vue Ref in composable)               │
│                                                                   │
│   modalStack = ref<string[]>([])                                │
│   registeredModals = ref<Map<string, ModalConfig>>(new Map())   │
│                                                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ Stack Timeline (LIFO - Last In, First Out)              │   │
│   │                                                          │   │
│   │ T0: []                                                   │   │
│   │     Empty state - no modals                             │   │
│   │                                                          │   │
│   │ T1: ['modal-1']                                         │   │
│   │     First modal opens                                   │   │
│   │     Position: active-first (center)                     │   │
│   │     Z-index: 1001                                       │   │
│   │                                                          │   │
│   │ T2: ['modal-1', 'modal-2']                              │   │
│   │     Second modal opens                                  │   │
│   │     modal-1: shifted-1 (background), Z: 1001           │   │
│   │     modal-2: active-left (foreground), Z: 1002         │   │
│   │                                                          │   │
│   │ T3: ['modal-1', 'modal-2', 'modal-3']                   │   │
│   │     Third modal opens                                   │   │
│   │     modal-1: shifted-2 (background), Z: 1001           │   │
│   │     modal-2: shifted-1 (background), Z: 1002           │   │
│   │     modal-3: active-left (foreground), Z: 1003         │   │
│   │                                                          │   │
│   │ T4: ['modal-1', 'modal-2']                              │   │
│   │     goBack() called - modal-3 closes                    │   │
│   │     modal-1: shifted-1 (background), Z: 1001           │   │
│   │     modal-2: active-left (foreground), Z: 1002         │   │
│   │                                                          │   │
│   │ T5: ['modal-1']                                         │   │
│   │     goBack() again - modal-2 closes                     │   │
│   │     modal-1: active-first (center), Z: 1001            │   │
│   │                                                          │   │
│   │ T6: []                                                   │   │
│   │     closeAllModals() or goBack() final                  │   │
│   │     Back to empty state                                 │   │
│   └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Position Calculation Logic

```typescript
function getModalPosition(modalId: string): ModalPosition {
  const stack = modalStack.value
  const index = stack.indexOf(modalId)
  
  if (index === -1) return null  // Not in stack
  
  const isLast = index === stack.length - 1
  
  if (isLast) {
    // Active (top) modal
    return index === 0 ? 'active-first' : 'active-left'
  } else {
    // Background (shifted) modal
    const shiftLevel = stack.length - 1 - index
    return `shifted-${shiftLevel}`
  }
}

// Examples:
// Stack: ['A']
// A: index=0, isLast=true → 'active-first'

// Stack: ['A', 'B']
// A: index=0, isLast=false, shiftLevel=1 → 'shifted-1'
// B: index=1, isLast=true → 'active-left'

// Stack: ['A', 'B', 'C']
// A: index=0, shiftLevel=2 → 'shifted-2'
// B: index=1, shiftLevel=1 → 'shifted-1'
// C: index=2, isLast=true → 'active-left'
```

### Z-Index Calculation

```typescript
function getModalZIndex(modalId: string): number {
  const stack = modalStack.value
  const index = stack.indexOf(modalId)
  const baseZIndex = config.value.baseZIndex // Default: 1000
  
  if (index === -1) return baseZIndex
  
  return baseZIndex + index + 1
}

// Examples (baseZIndex = 1000):
// Stack: ['A']        → A: 1001
// Stack: ['A', 'B']   → A: 1001, B: 1002
// Stack: ['A','B','C'] → A: 1001, B: 1002, C: 1003

// Overlay always at baseZIndex (1000)
// So all modals appear above overlay
```

---

## 🎨 Visual States & Animations

### Position States Visualization

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Browser Viewport                             │
│                                                                       │
│                                                                       │
│  [active-first]                                                      │
│  ┌──────────────────────────┐                                       │
│  │                           │                                       │
│  │  First Modal              │                                       │
│  │  (Center position)        │                                       │
│  │                           │                                       │
│  │  • Slides from right      │                                       │
│  │  • 100% → 0%              │                                       │
│  └──────────────────────────┘                                       │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                  [shifted-1]  [active-left]                         │
│  ┌─────────────┐              ┌──────────────────────┐             │
│  │ First       │              │ Second Modal         │             │
│  │ (70% right) │              │ (25% left of center) │             │
│  │             │              │                      │             │
│  │ • Opacity   │              │ • Slides from left   │             │
│  │   0.7       │              │ • -200% → -25%       │             │
│  │ • No click  │              │ • Fully interactive  │             │
│  └─────────────┘              └──────────────────────┘             │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│       [sh-2]   [sh-1]         [active-left]                         │
│  ┌──┐  ┌────┐                 ┌──────────────────────┐             │
│  │ 1│  │ 2  │                 │ Third Modal          │             │
│  │  │  │    │                 │ (25% left of center) │             │
│  └──┘  └────┘                 └──────────────────────┘             │
│  75%    70%                                                          │
│                                                                       │
│  Carousel effect - modals stack to the right                        │
│  Each shifted modal is 5% further right                             │
└─────────────────────────────────────────────────────────────────────┘
```

### Animation Transitions

```
Opening First Modal:
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │           ┌─│     │ ┌─────────┐ │
│             │ →   │           │ │ →   │ │ Modal 1 │ │
│  Off-screen │     │ Sliding ──│─│     │ │ (Center)│ │
│  (Right)    │     │           │ │     │ └─────────┘ │
│ Transform:  │     │ Transform:│ │     │ Transform:  │
│ X=100%      │     │ X=50%     │ │     │ X=0%        │
└─────────────┘     └─────────────┘     └─────────────┘
   State: 0ms         State: 250ms        State: 500ms
   
Opening Second Modal (First shifts right, Second slides from left):
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ ┌─────────┐ │     │  ┌────┐     │     │ ┌─┐    ┌──┐│
│ │ Modal 1 │ │ →   │  │ M1 │  ┌──│ →   │ │1│    │ 2││
│ │ (Center)│ │     │  │    │  │ 2│     │ │ │    │  ││
│ └─────────┘ │     │  └────┘  │  │     │ └─┘    └──┘│
│             │     │           └──│     │             │
│ M1: X=0%    │     │ M1: X=35%  │ │     │ M1: X=70%  │
│             │     │ M2: X=-100%│ │     │ M2: X=-25% │
└─────────────┘     └─────────────┘     └─────────────┘
   State: 0ms         State: 250ms        State: 500ms

Closing Modal (goBack):
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ ┌─┐    ┌──┐│     │  ┌────┐  ┌──│     │ ┌─────────┐ │
│ │1│    │ 2││ →   │  │ M1 │  │ 2│ →   │ │ Modal 1 │ │
│ │ │    │  ││     │  │    │  └──│     │ │ (Center)│ │
│ └─┘    └──┘│     │  └────┘     │     │ └─────────┘ │
│             │     │             │     │             │
│ M1: X=70%   │     │ M1: X=35%  │     │ M1: X=0%    │
│ M2: X=-25%  │     │ M2: X=-100%│     │ M2: closed  │
└─────────────┘     └─────────────┘     └─────────────┘
   State: 0ms         State: 250ms        State: 500ms
```

---

## 🔌 Integration Points

### 1. Core Config Integration

```typescript
// packages/core/src/config/config.ts
export interface Config {
  // ... existing config
  modalStack?: {
    enabled?: boolean              // Default: true
    baseZIndex?: number            // Default: 1000
    overlayZIndex?: number         // Default: 999
    transitionDuration?: number    // Default: 500ms
    closeOnOverlayClick?: boolean  // Default: true
    closeOnEscape?: boolean        // Default: true
  }
}
```

### 2. Vue Package Integration

```typescript
// packages/vue/src/common/composables/index.ts
export { useModalStack, configureModalStack } from './useModalStack'

// packages/vue/src/common/components/index.ts
export { default as FModal } from './FModal.vue'
export { default as FModalOverlay } from './FModalOverlay.vue'
```

### 3. Wrapper Integration Points

Each wrapper enhances their modal component:

```vue
<!-- packages/wrapper-*/src/common/Fw|We|Wq|Wv|WoModal.vue -->
<script lang="ts">
import { useModalStack } from '@fancy-crud/vue'

export default defineComponent({
  props: {
    modalId: String,  // NEW: Optional prop for stack
    modelValue: Boolean,
    // ... other props
  },
  setup(props, { attrs, slots, emit }) {
    // Stack integration
    const modalStack = props.modalId ? useModalStack() : null
    
    // Stack registration
    if (props.modalId) {
      onMounted(() => modalStack?.registerModal(props.modalId))
      onUnmounted(() => modalStack?.unregisterModal(props.modalId))
    }
    
    // Get stack properties
    const stackProps = computed(() => {
      if (!modalStack) return {}
      return {
        zIndex: modalStack.getModalZIndex(props.modalId),
        position: modalStack.getModalPosition(props.modalId),
      }
    })
    
    // Apply to UI library modal
    return () => h(UILibraryModal, {
      ...props,
      ...attrs,
      ...stackProps.value,
    }, slots)
  }
})
</script>
```

### 4. FTable Integration

```vue
<!-- packages/vue/src/tables/components/FTable.vue -->
<script setup>
// Auto-generate unique modal IDs
const formModalId = computed(() => 
  `table-${props.id.toString()}-form`
)
const deleteModalId = computed(() => 
  `table-${props.id.toString()}-delete`
)
</script>

<template>
  <f-modal 
    v-model="displayFormDialog" 
    :modal-id="formModalId"
  >
    <f-form />
  </f-modal>
  
  <f-delete-confirmation-modal
    v-model="displayConfirmationDialog"
    :modal-id="deleteModalId"
  />
</template>
```

---

## 📊 Data Flow Diagram

```
User Action (Click "Edit")
         │
         ▼
┌──────────────────────┐
│ table.displayForm... │ = true
│ (v-model changes)    │
└──────────┬───────────┘
           │
           ▼
┌────────────────────────────────┐
│ FModal Watch Trigger           │
│ watch(modelValue, (isOpen) => {│
│   modalStack.syncWithVModel()  │
│ })                             │
└───────────┬────────────────────┘
            │
            ▼
┌──────────────────────────────────┐
│ useModalStack.syncWithVModel()   │
│ • Checks if modal registered     │
│ • Adds to modalStack array       │
│ • Triggers reactive updates      │
└───────────┬──────────────────────┘
            │
            ├──────────────────────────────┐
            │                              │
            ▼                              ▼
┌─────────────────────────┐   ┌────────────────────────┐
│ modalStack.value changes│   │ Computed props update  │
│ ['modal-1']             │   │ • position: computed   │
└───────────┬─────────────┘   │ • zIndex: computed     │
            │                  └────────┬───────────────┘
            │                           │
            └───────────┬───────────────┘
                        │
                        ▼
            ┌────────────────────────┐
            │ FModal re-renders      │
            │ with new stack props   │
            └────────┬───────────────┘
                     │
                     ▼
            ┌─────────────────────────┐
            │ Wrapper Modal receives  │
            │ • zIndex: 1001          │
            │ • position: active-first│
            └────────┬────────────────┘
                     │
                     ▼
            ┌──────────────────────────┐
            │ UI Library Modal renders │
            │ with correct z-index and │
            │ CSS classes for animation│
            └──────────────────────────┘
```

---

## 🎯 Key Design Principles

### 1. **Backward Compatibility**
- `modal-id` is optional
- Without it, modals work exactly as before
- No breaking changes to existing code

### 2. **Separation of Concerns**
- **Stack Management**: Vue package (useModalStack)
- **UI Rendering**: Wrapper packages (FwModal, etc.)
- **Business Logic**: User's application

### 3. **Progressive Enhancement**
- Basic modals work without stack
- Add `modal-id` to enable stacking
- Stack features layered on top

### 4. **Framework Agnostic**
- Core stack logic independent of UI library
- Wrappers adapt stack to their UI library
- Consistent API across all wrappers

### 5. **Performance First**
- CSS transforms (hardware accelerated)
- Reactive updates (only affected modals)
- Minimal re-renders

---

## 🔍 Implementation Checklist

### Core Package (@fancy-crud/core)
- [ ] Add `modalStack` config interface
- [ ] Update `setupConfig` to handle modal stack config
- [ ] Add defaults for modal stack
- [ ] Update TypeScript types

### Vue Package (@fancy-crud/vue)
- [ ] Create `useModalStack` composable
- [ ] Add tests for composable
- [ ] Update `FModal.vue` with `modal-id` prop
- [ ] Add `FModalOverlay.vue` (optional)
- [ ] Update exports in index.ts
- [ ] Update TypeScript types

### Wrapper Packages (All 5)
- [ ] **PrimeVue**: Update FwModal.vue
- [ ] **Element Plus**: Update WeModal.vue
- [ ] **Quasar**: Update WqModal.vue
- [ ] **Vuetify**: Update WvModal.vue
- [ ] **Oruga**: Update WoModal.vue

### FTable Component
- [ ] Auto-generate modal IDs
- [ ] Pass modal-id to FModal
- [ ] Test nested scenarios

### Testing
- [ ] Unit tests for useModalStack
- [ ] Integration tests for each wrapper
- [ ] E2E tests for nested modals
- [ ] Accessibility tests
- [ ] Performance tests

### Documentation
- [ ] API reference
- [ ] User guide
- [ ] Migration guide
- [ ] Examples for each wrapper
- [ ] Video tutorials

---

*This architecture document provides a comprehensive view of how the modal stack system integrates with FancyCrud's existing architecture while maintaining backward compatibility and providing a smooth upgrade path.*

