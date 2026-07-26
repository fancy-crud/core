# Nested Stack Modal System - FancyCrud Integration Plan

## Executive Summary

This document outlines the comprehensive integration strategy for making the **nested-stack-modal-system** the default modal management layer for FancyCrud, while maintaining full backward compatibility with all existing wrapper implementations (PrimeVue, Element Plus, Quasar, Vuetify, Oruga).

---

## Current Architecture Analysis

### Modal Flow in FancyCrud

```
┌─────────────────────────────────────────────────────────────┐
│ FTable.vue                                                   │
│ <f-modal v-model="displayFormDialog">                       │
│   <f-form />                                                 │
│ </f-modal>                                                   │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ packages/vue/src/common/components/FModal.vue               │
│ → Proxies to components.modal (set by config)              │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ Wrapper Modal Components (Set via setupConfig)             │
│ • FwModal (PrimeVue) → wraps Dialog                        │
│ • WeModal (Element Plus) → wraps ElDialog                  │
│ • WqModal (Quasar) → wraps QDialog                         │
│ • WvModal (Vuetify) → wraps VDialog                        │
│ • WoModal (Oruga) → wraps OModal                           │
└─────────────────────────────────────────────────────────────┘
```

### Key Characteristics

1. **v-model Pattern**: All modals use `v-model` (boolean) for open/close state
2. **Components Registry**: Wrappers register their modal via `components.modal`
3. **Defaults System**: Wrappers apply `defaults.value.modal` from core config
4. **No Stack Management**: Current system has no concept of modal stacking
5. **Two Modal Types**:
   - **Form Modal**: For CRUD operations (create/edit)
   - **Confirmation Modal**: For delete confirmations

---

## Integration Architecture

### Proposed New Flow

```
┌─────────────────────────────────────────────────────────────┐
│ FTable.vue                                                   │
│ <f-modal v-model="displayFormDialog" modal-id="form-1">    │
│   <f-form />                                                 │
│   <!-- Can nest another modal -->                           │
│   <f-modal v-model="nestedDialog" modal-id="form-2">       │
│     <f-form />                                               │
│   </f-modal>                                                 │
│ </f-modal>                                                   │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ NEW: FModalStack Layer (Base Vue Package)                  │
│ • Manages modal stack state (useModalStack)                │
│ • Handles z-index calculation                              │
│ • Manages positioning (active-first, active-left, shifted) │
│ • Provides ModalContainer & ModalOverlay                   │
│ • Auto-syncs with v-model changes                          │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ Wrapper Modal Components (Enhanced)                        │
│ • FwModal → wraps Dialog + ModalContainer                  │
│ • WeModal → wraps ElDialog + ModalContainer                │
│ • WqModal → wraps QDialog + ModalContainer                 │
│ • WvModal → wraps VDialog + ModalContainer                 │
│ • WoModal → wraps OModal + ModalContainer                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Strategy

### Phase 1: Core Integration (No Breaking Changes)

#### 1.1 Add Modal Stack to Vue Core Package

**Location**: `packages/vue/src/common/composables/useModalStack.ts`

This keeps the modal stack as a core feature of the vue package, not a separate plugin.

**Why in vue package?**
- It's a fundamental modal management feature
- No external dependency to install
- Easier to integrate with existing FModal
- All wrappers automatically get the feature

```typescript
// packages/vue/src/common/composables/useModalStack.ts
import { ref, computed } from 'vue'

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
  // Auto-open modal when v-model becomes true
  const syncWithVModel = (modalId: string, isOpen: boolean) => {
    if (isOpen && !modalStack.value.includes(modalId)) {
      openModal(modalId)
    } else if (!isOpen && modalStack.value.includes(modalId)) {
      closeModal(modalId)
    }
  }

  const openModal = (modalId: string) => {
    if (!registeredModals.value.has(modalId)) {
      console.warn(`Modal "${modalId}" not registered`)
      return
    }
    if (!modalStack.value.includes(modalId)) {
      modalStack.value.push(modalId)
    }
  }

  const closeModal = (modalId: string) => {
    const index = modalStack.value.indexOf(modalId)
    if (index !== -1) {
      modalStack.value.splice(index, 1)
    }
  }

  const goBack = () => {
    if (modalStack.value.length > 0) {
      modalStack.value.pop()
    }
  }

  const closeAllModals = () => {
    modalStack.value = []
  }

  const registerModal = (modalId: string, modalConfig: ModalConfig = {}) => {
    registeredModals.value.set(modalId, {
      id: modalId,
      ...modalConfig
    })
  }

  const unregisterModal = (modalId: string) => {
    registeredModals.value.delete(modalId)
    closeModal(modalId)
  }

  const isModalOpen = (modalId: string): boolean => {
    return modalStack.value.includes(modalId)
  }

  const getModalPosition = (modalId: string): ModalPosition => {
    const index = modalStack.value.indexOf(modalId)
    if (index === -1) return null

    const stackLength = modalStack.value.length
    
    // Latest modal (active)
    if (index === stackLength - 1) {
      return index === 0 ? 'active-first' : 'active-left'
    }
    
    // Shifted modals (background stack)
    const shiftLevel = stackLength - 1 - index
    return `shifted-${shiftLevel}`
  }

  const getModalZIndex = (modalId: string): number => {
    const index = modalStack.value.indexOf(modalId)
    return index === -1 ? config.value.baseZIndex : config.value.baseZIndex + index + 1
  }

  return {
    modalStack: computed(() => modalStack.value),
    hasModalsOpen: computed(() => modalStack.value.length > 0),
    activeModalId: computed(() => modalStack.value[modalStack.value.length - 1] || null),
    config: computed(() => config.value),
    syncWithVModel,
    openModal,
    closeModal,
    goBack,
    closeAllModals,
    registerModal,
    unregisterModal,
    isModalOpen,
    getModalPosition,
    getModalZIndex,
  }
}

export type ModalPosition = 'active-first' | 'active-left' | `shifted-${number}` | null

export interface ModalConfig {
  id?: string
  [key: string]: any
}
```

#### 1.2 Update FModal to Support Stack (Optional)

**Location**: `packages/vue/src/common/components/FModal.vue`

Make modal-id optional for backward compatibility:

```vue
<script lang="ts">
import { components } from '@fancy-crud/core'
import { useModalStack } from '../composables/useModalStack'

export default defineComponent({
  props: {
    modalId: {
      type: String,
      default: null, // Optional - if not provided, no stacking
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const modalStack = props.modalId ? useModalStack() : null

    // Register modal if modalId provided
    if (props.modalId) {
      onMounted(() => modalStack?.registerModal(props.modalId!))
      onUnmounted(() => modalStack?.unregisterModal(props.modalId!))
    }

    // Sync v-model with stack
    watch(() => props.modelValue, (isOpen) => {
      if (props.modalId) {
        modalStack?.syncWithVModel(props.modalId, isOpen)
      }
    })

    // Get stack properties if modal is in stack
    const stackProps = computed(() => {
      if (!props.modalId || !modalStack) return {}
      
      return {
        'data-modal-id': props.modalId,
        'data-modal-position': modalStack.getModalPosition(props.modalId),
        'data-modal-zindex': modalStack.getModalZIndex(props.modalId),
        'data-modal-in-stack': true,
      }
    })

    return () => h(components.modal, { 
      ...props, 
      ...attrs,
      ...stackProps.value,
    }, slots)
  },
})
</script>
```

#### 1.3 Add Modal Stack Components to Vue Package

**Create these files:**
- `packages/vue/src/common/components/FModalOverlay.vue`
- `packages/vue/src/common/components/FModalContainer.vue` (optional wrapper)

These provide the visual stack management layer.

---

### Phase 2: Wrapper Integration

#### 2.1 Update Wrapper Modal Components

Each wrapper modal needs to be enhanced to support the stack system while maintaining backward compatibility.

**Example: FwModal (PrimeVue)**

```vue
<script lang="ts">
import { getDefaults } from '@fancy-crud/core'
import { useModalStack } from '@fancy-crud/vue'
import Dialog from 'primevue/dialog'

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: () => false,
    },
    modalId: {
      type: String,
      default: null, // Optional - for stack support
    },
    form: {
      type: Object as PropType<any>,
      default: () => ({}),
    },
  },
  emits: {
    'update:modelValue': (_payload: boolean) => true,
  },
  setup(props: any, { attrs, slots, emit }) {
    const modelValue = useVModel(props, 'modelValue', emit)
    const defaults = computed(getDefaults)

    // Stack management (only if modalId provided)
    const modalStack = props.modalId ? useModalStack() : null
    
    if (props.modalId) {
      onMounted(() => modalStack?.registerModal(props.modalId))
      onUnmounted(() => modalStack?.unregisterModal(props.modalId))
      
      // Sync with stack
      watch(modelValue, (isOpen) => {
        modalStack?.syncWithVModel(props.modalId, isOpen)
      })
    }

    // Stack-aware styling
    const stackStyles = computed(() => {
      if (!props.modalId || !modalStack) return {}
      
      const position = modalStack.getModalPosition(props.modalId)
      const zIndex = modalStack.getModalZIndex(props.modalId)
      
      return {
        zIndex,
        // Add position-based classes for animation
        'data-position': position,
      }
    })

    return () =>
      h(Dialog, {
        modal: true,
        ...defaults.value.modal,
        ...attrs,
        ...stackStyles.value,
        'visible': modelValue.value,
        'onUpdate:visible': (e: boolean) => modelValue.value = e,
        'header': " ",
        // Pass stack info to dialog
        'pt': {
          root: {
            style: stackStyles.value,
            'data-modal-id': props.modalId,
          }
        }
      }, slots)
  },
})
</script>

<style>
/* Stack-aware animations */
[data-position="active-first"] {
  animation: slideInRight 0.5s ease-in-out;
}

[data-position="active-left"] {
  animation: slideInFromLeft 0.5s ease-in-out;
}

[data-position^="shifted-"] {
  pointer-events: none;
  transform: translateX(70%);
  transition: transform 0.5s ease-in-out;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(-25%);
  }
}
</style>
```

**Apply same pattern to:**
- `WeModal.vue` (Element Plus)
- `WqModal.vue` (Quasar)
- `WvModal.vue` (Vuetify)
- `WoModal.vue` (Oruga)

#### 2.2 Wrapper-Specific Considerations

##### PrimeVue (Dialog)
- Use `pt` (passthrough) to apply stack styles to root element
- Dialog already has good overlay support
- May need to adjust `appendTo` for proper stacking

##### Element Plus (ElDialog)
- Use `z-index` prop directly
- `append-to-body` should be enabled
- May need custom CSS for transitions

##### Quasar (QDialog)
- Use `seamless` prop for custom positioning
- Apply stack styles to QCard wrapper
- Quasar's built-in z-index management may conflict

##### Vuetify (VDialog)
- Use `z-index` prop
- VDialog has built-in overlay - may need coordination
- Use `scrim` prop for overlay control

##### Oruga (OModal)
- Most flexible - least conflicts expected
- Apply styles directly via props

---

### Phase 3: Enhanced FTable Integration

#### 3.1 Auto-Generate Modal IDs in FTable

```vue
<script lang="ts" setup>
// packages/vue/src/tables/components/FTable.vue

// Generate unique modal IDs based on table and form IDs
const formModalId = computed(() => `table-${props.id.toString()}-form`)
const deleteModalId = computed(() => `table-${props.id.toString()}-delete`)
</script>

<template>
  <slot name="table-header" v-bind="tableHeaderVBind">
    <f-table-header-actions v-bind="tableHeaderVBind" />
  </slot>

  <!-- Form Modal with Stack Support -->
  <f-modal 
    v-model="table.settings.displayFormDialog" 
    v-bind="table.settings.modal" 
    :form="props.form"
    :modal-id="formModalId"
  >
    <slot name="table-form" v-bind="tableFormVBind">
      <!-- ... existing form content ... -->
    </slot>
  </f-modal>

  <!-- ... table body ... -->

  <!-- Delete Confirmation Modal with Stack Support -->
  <f-delete-confirmation-modal
    v-model="table.settings.displayConfirmationDialog"
    :modal-id="deleteModalId"
    @accept="() => props.buttons.remove.onClick()"
    @cancel="() => table.settings.rowToDelete = null"
  >
    <!-- ... existing content ... -->
  </f-delete-confirmation-modal>
</template>
```

#### 3.2 Support Nested Forms

Users can now create nested CRUD operations:

```vue
<template>
  <f-table v-bind="artistsTable">
    <!-- Main form for editing artist -->
    <template #table-form>
      <f-form v-bind="artistForm">
        <!-- Field for managing artist's albums -->
        <template #field-albums>
          <f-button @click="openAlbumsModal">Manage Albums</f-button>
          
          <!-- Nested table for albums -->
          <f-modal 
            v-model="showAlbumsModal" 
            modal-id="nested-albums-table"
          >
            <f-table v-bind="albumsTable" />
          </f-modal>
        </template>
      </f-form>
    </template>
  </f-table>
</template>
```

---

### Phase 4: Configuration & Defaults

#### 4.1 Update setupConfig to Support Modal Stack

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
    maxVisibleShifted?: number     // Default: 3 (how many background modals to show)
  }
}

export function setupConfig(config: Config) {
  // ... existing setup
  
  if (config.modalStack) {
    configureModalStack(config.modalStack)
  }
}
```

#### 4.2 Wrapper Configuration Example

```typescript
// demo-primevue/src/plugins/fancy-crud.ts

import { setupConfig } from '@fancy-crud/core'
import * as wrapperPrimevue from '@fancy-crud/wrapper-primevue'

setupConfig({
  components: wrapperPrimevue,
  modalStack: {
    enabled: true,
    baseZIndex: 1050, // PrimeVue dialogs start at 1000
    transitionDuration: 400,
  },
})
```

---

### Phase 5: Migration & Backward Compatibility

#### 5.1 Backward Compatibility Strategy

**Zero Breaking Changes:**
1. `modal-id` prop is **optional** in FModal
2. Without `modal-id`, modals work exactly as before (no stacking)
3. Existing applications continue to work without changes
4. Stack features are opt-in by adding `modal-id`

**Migration Path:**
```vue
<!-- Old (still works) -->
<f-modal v-model="isOpen">
  <f-form />
</f-modal>

<!-- New (with stacking) -->
<f-modal v-model="isOpen" modal-id="my-form">
  <f-form />
</f-modal>
```

#### 5.2 Gradual Adoption

**Phase 1**: FancyCrud core adopts stack for FTable (automatic)
- FTable auto-generates modal-ids
- Users get stacking in tables without changes

**Phase 2**: Developers adopt for custom modals (manual)
- Add `modal-id` to custom modals to enable stacking
- Opt-in feature

**Phase 3**: Ecosystem-wide (optional)
- Update documentation with best practices
- Provide examples of nested CRUD workflows
- Community packages adopt pattern

---

### Phase 6: Testing Strategy

#### 6.1 Unit Tests

```typescript
// packages/vue/tests/useModalStack.test.ts
describe('useModalStack', () => {
  test('should register and open modal', () => {
    const { registerModal, openModal, isModalOpen } = useModalStack()
    registerModal('test-modal')
    openModal('test-modal')
    expect(isModalOpen('test-modal')).toBe(true)
  })

  test('should calculate correct z-index for stacked modals', () => {
    const { registerModal, openModal, getModalZIndex } = useModalStack()
    registerModal('modal-1')
    registerModal('modal-2')
    openModal('modal-1')
    openModal('modal-2')
    expect(getModalZIndex('modal-1')).toBe(1001)
    expect(getModalZIndex('modal-2')).toBe(1002)
  })

  test('should sync with v-model', () => {
    const { registerModal, syncWithVModel, isModalOpen } = useModalStack()
    registerModal('test-modal')
    syncWithVModel('test-modal', true)
    expect(isModalOpen('test-modal')).toBe(true)
    syncWithVModel('test-modal', false)
    expect(isModalOpen('test-modal')).toBe(false)
  })
})
```

#### 6.2 Integration Tests

Test with each wrapper:
- Modal opens correctly with stack
- Z-index properly set
- Animations work smoothly
- Closing modals updates stack
- Nested modals work

#### 6.3 E2E Tests (Cypress)

```typescript
// Test nested modal workflow
describe('Nested Modal Stack', () => {
  it('should handle nested CRUD operations', () => {
    cy.visit('/table-viewer')
    
    // Open first modal (edit artist)
    cy.contains('Edit').first().click()
    cy.get('[data-modal-id="table-form"]').should('be.visible')
    
    // Open nested modal (manage albums)
    cy.contains('Manage Albums').click()
    cy.get('[data-modal-id="nested-albums-table"]').should('be.visible')
    
    // First modal should be shifted
    cy.get('[data-modal-id="table-form"]')
      .should('have.attr', 'data-position')
      .and('match', /shifted-/)
    
    // Close nested modal
    cy.get('[data-modal-id="nested-albums-table"]').find('.close-btn').click()
    
    // First modal should be active again
    cy.get('[data-modal-id="table-form"]')
      .should('have.attr', 'data-position', 'active-first')
  })
})
```

---

## Wrapper-Specific Implementation Details

### PrimeVue Implementation

```vue
<script lang="ts">
// packages/wrapper-primevue/src/common/FwModal.vue
import { getDefaults } from '@fancy-crud/core'
import { useModalStack } from '@fancy-crud/vue'
import Dialog from 'primevue/dialog'

export default defineComponent({
  props: {
    modelValue: Boolean,
    modalId: String,
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const modelValue = useVModel(props, 'modelValue', emit)
    const defaults = computed(getDefaults)
    const modalStack = props.modalId ? useModalStack() : null

    // Stack registration
    if (props.modalId) {
      onMounted(() => modalStack?.registerModal(props.modalId!))
      onUnmounted(() => modalStack?.unregisterModal(props.modalId!))
      watch(modelValue, (isOpen) => {
        modalStack?.syncWithVModel(props.modalId!, isOpen)
      })
    }

    const dialogProps = computed(() => {
      const baseProps = {
        modal: true,
        ...defaults.value.modal,
        ...attrs,
        visible: modelValue.value,
        'onUpdate:visible': (e: boolean) => modelValue.value = e,
        header: " ",
      }

      if (!props.modalId || !modalStack) return baseProps

      const zIndex = modalStack.getModalZIndex(props.modalId)
      const position = modalStack.getModalPosition(props.modalId)

      return {
        ...baseProps,
        style: { zIndex },
        pt: {
          root: {
            'data-modal-id': props.modalId,
            'data-position': position,
            class: `modal-stack-item modal-${position}`,
          },
          mask: {
            style: { zIndex: zIndex - 1 }
          }
        }
      }
    })

    return () => h(Dialog, dialogProps.value, slots)
  },
})
</script>

<style>
/* PrimeVue-specific stack styles */
.p-dialog[data-position="active-first"] {
  animation: p-modal-slide-in-right 0.5s ease-in-out;
}

.p-dialog[data-position="active-left"] {
  transform: translateX(-25%);
  animation: p-modal-slide-in-left 0.5s ease-in-out;
}

.p-dialog[data-position^="shifted-"] {
  pointer-events: none;
  transform: translateX(70%) scale(0.95);
  transition: transform 0.5s ease-in-out;
  opacity: 0.7;
}

@keyframes p-modal-slide-in-right {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

@keyframes p-modal-slide-in-left {
  from { transform: translateX(-200%); }
  to { transform: translateX(-25%); }
}

/* Prevent PrimeVue's default z-index management from conflicting */
.p-dialog.modal-stack-item {
  position: fixed !important;
}
</style>
```

### Element Plus Implementation

```vue
<script lang="ts">
// packages/wrapper-element-plus/src/common/WeModal.vue
import { getDefaults } from '@fancy-crud/core'
import { useModalStack } from '@fancy-crud/vue'
import { ElDialog } from 'element-plus'

export default defineComponent({
  props: {
    modelValue: Boolean,
    modalId: String,
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const modelValue = useVModel(props, 'modelValue', emit)
    const defaults = computed(getDefaults)
    const modalStack = props.modalId ? useModalStack() : null

    // Stack registration
    if (props.modalId) {
      onMounted(() => modalStack?.registerModal(props.modalId!))
      onUnmounted(() => modalStack?.unregisterModal(props.modalId!))
      watch(modelValue, (isOpen) => {
        modalStack?.syncWithVModel(props.modalId!, isOpen)
      })
    }

    const dialogProps = computed(() => {
      const baseProps = {
        ...defaults.value.modal,
        ...attrs,
        modelValue: modelValue.value,
        'onUpdate:modelValue': (e: boolean) => modelValue.value = e,
        'append-to-body': true,
      }

      if (!props.modalId || !modalStack) return baseProps

      const zIndex = modalStack.getModalZIndex(props.modalId)
      const position = modalStack.getModalPosition(props.modalId)

      return {
        ...baseProps,
        'z-index': zIndex,
        'custom-class': `modal-stack-item modal-${position}`,
        'data-modal-id': props.modalId,
        'data-position': position,
      }
    })

    return () => h(ElDialog, dialogProps.value, slots)
  },
})
</script>

<style>
/* Element Plus-specific stack styles */
.el-dialog.modal-stack-item[data-position="active-first"] {
  animation: el-modal-slide-in 0.5s ease-in-out;
}

.el-dialog.modal-stack-item[data-position="active-left"] {
  transform: translateX(-25%);
}

.el-dialog.modal-stack-item[data-position^="shifted-"] {
  pointer-events: none;
  transform: translateX(70%) scale(0.95);
  opacity: 0.7;
}

@keyframes el-modal-slide-in {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
</style>
```

### Quasar, Vuetify, Oruga

Apply the same pattern with library-specific adjustments.

---

## Benefits of This Approach

### 1. **Zero Breaking Changes**
- Existing code continues to work
- Stack features are opt-in
- No required migration

### 2. **Seamless Integration**
- Built into vue package (no extra dependency)
- Auto-enabled for FTable (best DX)
- Works with all wrappers

### 3. **Flexible Usage**
- Can mix stacked and non-stacked modals
- Each wrapper can customize animations
- Configuration per application

### 4. **Enhanced UX**
- Better visual hierarchy with stacking
- Smooth animations
- Support for complex nested CRUD workflows

### 5. **Maintains FancyCrud Philosophy**
- Wrapper-agnostic core
- Configuration-driven
- Progressive enhancement

---

## Potential Challenges & Solutions

### Challenge 1: Z-Index Conflicts

**Problem**: UI libraries have their own z-index management

**Solution**:
- Start stack z-index above library defaults
- Document recommended z-index ranges per wrapper
- Provide configuration to adjust base z-index

### Challenge 2: Overlay Management

**Problem**: Multiple modals = multiple overlays

**Solution**:
- Use single shared overlay managed by stack
- Disable individual modal overlays when in stack
- Or: Layer overlays with progressive opacity

### Challenge 3: Animation Conflicts

**Problem**: Library animations vs stack animations

**Solution**:
- Disable library animations when in stack
- Use CSS transitions on wrapper level
- Allow per-wrapper animation customization

### Challenge 4: Mobile Responsiveness

**Problem**: Stack animations don't work well on mobile

**Solution**:
- Detect viewport size
- On mobile: stack vertically or disable stacking
- Provide mobile-specific animations

### Challenge 5: Accessibility

**Problem**: Screen readers and focus management

**Solution**:
- Trap focus in active (top) modal only
- Update ARIA attributes based on position
- Announce modal changes to screen readers
- Manage focus restoration on close

---

## Documentation Requirements

### 1. User Guide
- How to enable modal stacking
- Examples with FTable
- Nested CRUD workflows
- Configuration options

### 2. Wrapper Guide
- How each wrapper implements stacking
- Wrapper-specific considerations
- Custom animation examples

### 3. Migration Guide
- How to adopt stacking (opt-in)
- Performance considerations
- Best practices

### 4. API Reference
- useModalStack API
- FModal props
- Configuration options
- Events and callbacks

---

## Implementation Timeline

### Sprint 1: Foundation (Week 1-2)
- ✅ Create useModalStack composable in vue package
- ✅ Add optional modal-id support to FModal
- ✅ Write unit tests
- ✅ Update core Config interface

### Sprint 2: Wrapper Integration (Week 3-4)
- ⏳ Update FwModal (PrimeVue) with stack support
- ⏳ Update WeModal (Element Plus) with stack support
- ⏳ Update WqModal (Quasar) with stack support
- ⏳ Update WvModal (Vuetify) with stack support
- ⏳ Update WoModal (Oruga) with stack support

### Sprint 3: FTable Integration (Week 5)
- ⏳ Auto-generate modal IDs in FTable
- ⏳ Test nested table scenarios
- ⏳ Update delete confirmation modal

### Sprint 4: Testing & Polish (Week 6)
- ⏳ Integration tests for each wrapper
- ⏳ E2E tests for nested workflows
- ⏳ Accessibility testing
- ⏳ Mobile responsiveness testing

### Sprint 5: Documentation (Week 7)
- ⏳ Write user guide
- ⏳ Write wrapper integration guide
- ⏳ Create demo examples
- ⏳ Update existing demos

### Sprint 6: Release (Week 8)
- ⏳ Beta release to testers
- ⏳ Fix bugs and polish
- ⏳ Final release
- ⏳ Announcement and marketing

---

## Success Criteria

### Technical
- [ ] All wrappers support modal stacking
- [ ] Zero breaking changes in existing code
- [ ] < 5KB bundle size increase
- [ ] > 90% test coverage
- [ ] Passes accessibility audit

### User Experience
- [ ] Smooth animations (60fps)
- [ ] Intuitive navigation (back button, ESC)
- [ ] Works on mobile and desktop
- [ ] Clear visual hierarchy

### Documentation
- [ ] Comprehensive API docs
- [ ] Multiple working examples
- [ ] Migration guide (even though minimal)
- [ ] Video tutorials

### Adoption
- [ ] Used in at least 2 demo applications
- [ ] Community feedback incorporated
- [ ] No major bugs reported

---

## Conclusion

This integration strategy transforms the nested-stack-modal-system into the default modal management layer for FancyCrud while maintaining 100% backward compatibility. By building it into the vue package and leveraging the existing wrapper architecture, we create a seamless experience that enhances the framework without disrupting existing applications.

The opt-in nature means developers can adopt the feature at their own pace, while FTable automatically benefits from improved modal management. This approach respects FancyCrud's philosophy of being configuration-driven, wrapper-agnostic, and developer-friendly.

