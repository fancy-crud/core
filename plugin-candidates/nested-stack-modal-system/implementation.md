# Nested Stack Modal System - Plugin Implementation Plan

## Overview

This document outlines the implementation plan for converting the **nested-stack-modal-system** into a reusable plugin for the fancy-crud ecosystem. The plugin will provide a sophisticated modal stacking system with smooth animations, unlimited nesting, and responsive behavior.

> **⚠️ IMPORTANT**: See [FANCY_CRUD_INTEGRATION.md](./FANCY_CRUD_INTEGRATION.md) for the comprehensive plan to integrate this as the **default modal system** for FancyCrud, including full wrapper compatibility strategy.

This document focuses on the standalone plugin approach, while FANCY_CRUD_INTEGRATION.md covers making it a core feature of the vue package with full wrapper integration.

## Current System Analysis

### Existing Components

1. **`useModalStack.js`** (Composable)
   - Manages global modal state using Vue 3 reactivity
   - Handles modal registration/unregistration
   - Manages modal stack (LIFO structure)
   - Calculates dynamic positioning and z-index
   - Provides navigation (open, goBack, closeAll)

2. **`ModalContainer.vue`** (Component)
   - Modal wrapper with positioning and animation logic
   - Handles smooth transitions between states
   - Supports three position types:
     - `active-first`: First/center modal
     - `active-left`: Subsequent active modals (slide from left)
     - `shifted-N`: Background stacked modals with carousel effect
   - Responsive design (mobile vs desktop)
   - Dynamic transform calculations for unlimited nesting

3. **`ModalOverlay.vue`** (Component)
   - Backdrop overlay with fade transition
   - Click-to-close on overlay (only when single modal open)
   - Managed visibility based on modal stack

### Key Features

- ✅ **Unlimited modal nesting** - No hardcoded limits on stack depth
- ✅ **Smooth animations** - CSS transitions with proper timing
- ✅ **Dynamic z-index management** - Auto-calculated based on stack position
- ✅ **Carousel effect** - Background modals shift right progressively
- ✅ **Navigation system** - Forward (open) and backward (goBack) navigation
- ✅ **Responsive behavior** - Different layouts for mobile and desktop
- ✅ **Global state management** - Centralized modal state
- ✅ **Registration system** - Modals auto-register on mount

---

## Plugin Architecture

### Package Structure

```
packages/plugin-modal-stack/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── postcss.config.js
├── tailwind.config.js (optional)
├── README.md
├── src/
│   ├── index.ts                    # Main entry point
│   ├── composables/
│   │   └── useModalStack.ts       # Converted from .js to .ts
│   ├── components/
│   │   ├── ModalContainer.vue
│   │   └── ModalOverlay.vue
│   ├── types/
│   │   └── index.ts               # TypeScript type definitions
│   └── styles/
│       └── modal-stack.css        # Optional: extracted styles
└── dist/                           # Build output
```

---

## Implementation Steps

### Phase 1: Setup & Configuration

#### 1.1 Create Package Structure

- [ ] Create `packages/plugin-modal-stack/` directory
- [ ] Initialize package.json with proper metadata
- [ ] Setup TypeScript configuration
- [ ] Configure Vite for library build
- [ ] Setup PostCSS/Tailwind if needed

#### 1.2 Package Configuration

**package.json** example:

```json
{
  "name": "@fancy-crud/plugin-modal-stack",
  "version": "0.0.0",
  "description": "Advanced nested modal stack system with carousel animations for fancy-crud",
  "private": false,
  "author": {
    "name": "Christopher A. Flores",
    "url": "https://github.com/cafadev"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/fancy-crud/core",
    "directory": "packages/plugin-modal-stack"
  },
  "license": "MIT",
  "main": "dist/fancy-crud-plugin-modal-stack.mjs",
  "module": "dist/fancy-crud-plugin-modal-stack.mjs",
  "types": "dist/src/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "vite build && tsc && tsc-alias --verbose -p ./tsconfig.json"
  },
  "peerDependencies": {
    "vue": "^3.3.0"
  },
  "devDependencies": {
    "vue": "^3.4.0",
    "@vitejs/plugin-vue": "^5.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  },
  "keywords": [
    "modal",
    "stack",
    "dialog",
    "carousel",
    "vue",
    "vue3",
    "fancy-crud",
    "ui-components"
  ]
}
```

**vite.config.ts** example:

```typescript
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { name } from './package.json'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  build: {
    lib: {
      name,
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: 'fancy-crud-plugin-modal-stack',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        },
      },
    },
  },
})
```

---

### Phase 2: Code Migration & TypeScript Conversion

#### 2.1 Convert Composable to TypeScript

**Tasks:**
- [ ] Convert `useModalStack.js` to `useModalStack.ts`
- [ ] Add proper TypeScript types and interfaces
- [ ] Add JSDoc comments for better DX
- [ ] Export types for consumer usage

**Key improvements:**

```typescript
// src/types/index.ts
export interface ModalConfig {
  id: string
  [key: string]: any // Allow custom configuration
}

export type ModalPosition = 
  | 'active-first' 
  | 'active-left' 
  | `shifted-${number}` 
  | null

export interface UseModalStackReturn {
  modalStack: Readonly<Ref<string[]>>
  hasModalsOpen: Readonly<Ref<boolean>>
  activeModalId: Readonly<Ref<string | null>>
  openModal: (modalId: string) => void
  goBack: () => void
  closeAllModals: () => void
  registerModal: (modalId: string, config?: Partial<ModalConfig>) => void
  unregisterModal: (modalId: string) => void
  isModalOpen: (modalId: string) => boolean
  getModalPosition: (modalId: string) => ModalPosition
  getModalZIndex: (modalId: string) => number
}
```

#### 2.2 Migrate Vue Components

**Tasks:**
- [ ] Copy `ModalContainer.vue` to `src/components/`
- [ ] Copy `ModalOverlay.vue` to `src/components/`
- [ ] Add TypeScript to `<script setup lang="ts">`
- [ ] Fix import paths (change from `@/composables` to relative)
- [ ] Add proper prop types using TypeScript
- [ ] Extract and document component props/emits

**Component improvements:**

```vue
<!-- src/components/ModalContainer.vue -->
<script setup lang="ts">
import { computed, watch, ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useModalStack } from '../composables/useModalStack'
import type { CSSProperties } from 'vue'

// Define props with proper types
interface Props {
  modalId: string
}

const props = defineProps<Props>()

// ... rest of implementation
</script>
```

---

### Phase 3: Plugin API Design

#### 3.1 Create Main Entry Point

**src/index.ts:**

```typescript
// Export everything for flexibility
export { useModalStack } from './composables/useModalStack'
export { default as ModalContainer } from './components/ModalContainer.vue'
export { default as ModalOverlay } from './components/ModalOverlay.vue'

// Export types
export type {
  ModalConfig,
  ModalPosition,
  UseModalStackReturn
} from './types'

// Optional: Vue plugin interface for global registration
import type { App } from 'vue'
import ModalContainer from './components/ModalContainer.vue'
import ModalOverlay from './components/ModalOverlay.vue'

export interface ModalStackPluginOptions {
  // Future: configuration options
  prefix?: string // Component name prefix
}

export const ModalStackPlugin = {
  install(app: App, options: ModalStackPluginOptions = {}) {
    const prefix = options.prefix || 'Modal'
    
    // Optionally register components globally
    app.component(`${prefix}Container`, ModalContainer)
    app.component(`${prefix}Overlay`, ModalOverlay)
  }
}

// Default export for convenience
export default ModalStackPlugin
```

---

### Phase 4: Styling Strategy

#### 4.1 Style Extraction Options

**Option A: Scoped Styles (Current Approach)**
- Keep styles in SFC `<style scoped>` blocks
- Pros: Component encapsulation, no style conflicts
- Cons: Harder to customize, increases bundle size

**Option B: External CSS File**
- Extract to `src/styles/modal-stack.css`
- Import in components or let user import
- Pros: Easy customization, tree-shakeable
- Cons: User must remember to import

**Option C: Hybrid Approach (Recommended)**
- Keep critical styles scoped
- Expose CSS custom properties for theming
- Optional external stylesheet for base styles

**Example (Recommended):**

```vue
<!-- src/components/ModalContainer.vue -->
<style scoped>
.modal-container {
  /* Use CSS custom properties for theming */
  --modal-transition-duration: var(--modal-stack-transition, 0.5s);
  --modal-max-width: var(--modal-stack-max-width, 40rem);
  --modal-border-radius: var(--modal-stack-radius, 1.5rem);
  
  transition: transform var(--modal-transition-duration) ease-in-out;
  max-width: var(--modal-max-width);
  border-radius: var(--modal-border-radius);
  
  /* ... rest of styles */
}
</style>
```

#### 4.2 Tailwind CSS Consideration

**Current implementation uses Tailwind classes:**
- `bg-white`, `p-6`, `md:p-8`, `rounded-3xl`, `shadow-2xl`, etc.

**Options:**
1. **Keep Tailwind** - Require Tailwind as peer dependency
2. **Remove Tailwind** - Convert to vanilla CSS
3. **Optional Tailwind** - Provide both variants

**Recommendation:** Option 2 (Remove Tailwind dependency)
- Convert Tailwind classes to CSS
- Makes plugin framework-agnostic
- Reduces peer dependencies

---

### Phase 5: Enhanced Features & API

#### 5.1 Additional Features to Consider

**A. Modal Events System**

```typescript
// Add event emitters
export interface ModalStackEvents {
  onModalOpen?: (modalId: string) => void
  onModalClose?: (modalId: string) => void
  onStackChange?: (stack: string[]) => void
}

// In useModalStack
const events = ref<ModalStackEvents>({})

const openModal = (modalId: string) => {
  modalStack.value.push(modalId)
  events.value.onModalOpen?.(modalId)
  events.value.onStackChange?.(modalStack.value)
}
```

**B. Programmatic Modal Content**

```typescript
// Support dynamic modal content
export interface DynamicModal {
  id: string
  component: Component
  props?: Record<string, any>
}

const openDynamicModal = (modal: DynamicModal) => {
  // Register and open modal with component
}
```

**C. Transition Customization**

```typescript
export interface TransitionConfig {
  duration?: number
  timingFunction?: string
  enterFrom?: string
  leaveTo?: string
}

const openModal = (
  modalId: string, 
  transition?: TransitionConfig
) => {
  // Apply custom transitions
}
```

**D. Keyboard Navigation**

```typescript
// Add keyboard shortcuts
- ESC: Go back one modal or close all
- Ctrl+ESC: Close all modals
```

**E. Focus Management**

```typescript
// Trap focus in active modal
// Restore focus on modal close
```

#### 5.2 Configuration API

```typescript
// src/composables/useModalStack.ts
export interface ModalStackConfig {
  baseZIndex?: number          // Default: 30
  overlayZIndex?: number        // Default: 20
  transitionDuration?: number   // Default: 500ms
  maxVisibleModals?: number     // Default: unlimited
  closeOnOverlayClick?: boolean // Default: true
  closeOnEscape?: boolean       // Default: true
}

let globalConfig: ModalStackConfig = {
  baseZIndex: 30,
  overlayZIndex: 20,
  // ...defaults
}

export function configureModalStack(config: Partial<ModalStackConfig>) {
  globalConfig = { ...globalConfig, ...config }
}
```

---

### Phase 6: Documentation & Examples

#### 6.1 README.md Structure

```markdown
# @fancy-crud/plugin-modal-stack

Advanced nested modal stack system with smooth carousel animations.

## Features
- ✨ Unlimited modal nesting
- 🎨 Smooth carousel animations
- 📱 Responsive design
- ⌨️ Keyboard navigation
- 🎯 TypeScript support
- 🎛️ Fully customizable

## Installation

\`\`\`bash
npm install @fancy-crud/plugin-modal-stack
# or
yarn add @fancy-crud/plugin-modal-stack
# or
pnpm add @fancy-crud/plugin-modal-stack
\`\`\`

## Basic Usage

### Option 1: Composable API (Recommended)

\`\`\`vue
<script setup>
import { useModalStack } from '@fancy-crud/plugin-modal-stack'
import { ModalContainer, ModalOverlay } from '@fancy-crud/plugin-modal-stack'

const { openModal, goBack, closeAllModals } = useModalStack()

function openFirstModal() {
  openModal('modal-1')
}

function openSecondModal() {
  openModal('modal-2')
}
</script>

<template>
  <div>
    <button @click="openFirstModal">Open Modal</button>
    
    <ModalOverlay>
      <!-- First Modal -->
      <ModalContainer modal-id="modal-1">
        <h2>First Modal</h2>
        <button @click="openSecondModal">Open Nested Modal</button>
        <button @click="closeAllModals">Close</button>
      </ModalContainer>
      
      <!-- Nested Modal -->
      <ModalContainer modal-id="modal-2">
        <h2>Nested Modal</h2>
        <button @click="goBack">Go Back</button>
      </ModalContainer>
    </ModalOverlay>
  </div>
</template>
\`\`\`

### Option 2: Vue Plugin (Global Registration)

\`\`\`js
// main.ts
import { createApp } from 'vue'
import ModalStackPlugin from '@fancy-crud/plugin-modal-stack'

const app = createApp(App)
app.use(ModalStackPlugin, {
  prefix: 'Modal' // Optional: customize component names
})
\`\`\`

## Advanced Usage

[... detailed examples ...]

## API Reference

[... complete API docs ...]

## Customization

[... theming guide ...]

## License

MIT
```

#### 6.2 Example Implementations

Create examples in:
- `examples/basic/` - Simple modal usage
- `examples/nested/` - Deep nesting example
- `examples/dynamic/` - Dynamic modal content
- `examples/custom-styles/` - Theming example

---

### Phase 7: Testing Strategy

#### 7.1 Unit Tests

```typescript
// tests/useModalStack.test.ts
describe('useModalStack', () => {
  test('should open modal', () => {
    const { openModal, isModalOpen } = useModalStack()
    openModal('test-modal')
    expect(isModalOpen('test-modal')).toBe(true)
  })
  
  test('should calculate correct z-index', () => {
    // ...
  })
  
  test('should handle go back', () => {
    // ...
  })
})
```

#### 7.2 Component Tests

```typescript
// tests/ModalContainer.test.ts
describe('ModalContainer', () => {
  test('should render when modal is open', () => {
    // ...
  })
  
  test('should apply correct position classes', () => {
    // ...
  })
})
```

#### 7.3 Integration Tests

- Test modal stacking behavior
- Test animations and transitions
- Test keyboard navigation
- Test accessibility

---

### Phase 8: Integration with fancy-crud

#### 8.1 Demo Application

Create demo in `demo-modal-stack/` or add to existing demos:

```
demo-primevue/src/viewer/ModalStackViewer.vue
```

#### 8.2 Compatibility with FModal

Consider integration with existing `FModal` component:

```typescript
// Extend FModal to support modal stack
import { useModalStack } from '@fancy-crud/plugin-modal-stack'

export function useFModalStack() {
  const modalStack = useModalStack()
  
  return {
    ...modalStack,
    // Add FModal-specific enhancements
  }
}
```

---

## Implementation Timeline

### Sprint 1: Foundation (Week 1)
- ✅ Create package structure
- ✅ Setup build configuration
- ✅ Convert composable to TypeScript
- ✅ Migrate Vue components

### Sprint 2: Core Features (Week 2)
- ⏳ Create plugin API
- ⏳ Handle styling strategy
- ⏳ Add TypeScript types
- ⏳ Create main entry point

### Sprint 3: Enhanced Features (Week 3)
- ⏳ Add event system
- ⏳ Implement keyboard navigation
- ⏳ Add focus management
- ⏳ Create configuration API

### Sprint 4: Documentation & Testing (Week 4)
- ⏳ Write comprehensive README
- ⏳ Create example implementations
- ⏳ Write unit tests
- ⏳ Integration testing

### Sprint 5: Integration (Week 5)
- ⏳ Create demo application
- ⏳ Test with fancy-crud ecosystem
- ⏳ Performance optimization
- ⏳ Final polish

---

## Technical Considerations

### Dependencies

**Required Peer Dependencies:**
- `vue@^3.3.0` - Core framework

**Optional Dependencies:**
- None (keep it lightweight!)

### Bundle Size Optimization

- Use tree-shaking friendly exports
- Lazy-load components when possible
- Minimize CSS payload
- Consider separate entry points for components

### Browser Support

- Modern browsers with CSS transitions
- Vue 3 compatible environments
- Consider adding polyfills for older browsers if needed

### Performance Optimization

1. **Use CSS transforms** (already implemented)
   - Hardware-accelerated animations
   - Smooth 60fps performance

2. **Virtual scrolling** (future consideration)
   - If modal content is heavy

3. **Lazy registration**
   - Register modals only when needed

4. **Memory management**
   - Proper cleanup on unmount
   - Remove modal stack entries when components destroyed

---

## Migration Path

### For Existing Users

If this system is already in use:

1. **Install plugin**: `npm install @fancy-crud/plugin-modal-stack`

2. **Update imports**:
   ```typescript
   // Before
   import { useModalStack } from '@/composables/useModalStack'
   import ModalContainer from '@/components/ModalContainer.vue'
   
   // After
   import { useModalStack, ModalContainer } from '@fancy-crud/plugin-modal-stack'
   ```

3. **Update component registration** (if using global registration)

4. **Test thoroughly** - Animation timings, z-index, etc.

---

## Future Enhancements

### Version 1.x
- [ ] Accessibility improvements (ARIA attributes)
- [ ] Animation presets (slide, fade, zoom)
- [ ] Modal history/breadcrumbs
- [ ] Persistent modal state (URL sync)

### Version 2.x
- [ ] Multi-stack support (different modal groups)
- [ ] Modal templates/presets
- [ ] Drag-to-reorder modals
- [ ] Modal minimization/docking

### Version 3.x
- [ ] Virtual modal rendering (performance)
- [ ] Server-side rendering support
- [ ] Advanced positioning algorithms
- [ ] Analytics integration

---

## Success Metrics

### Development Metrics
- [ ] Bundle size < 15KB (gzipped)
- [ ] 100% TypeScript coverage
- [ ] > 90% test coverage
- [ ] Zero peer dependency conflicts

### Usage Metrics
- [ ] Easy integration (< 5 min setup)
- [ ] Comprehensive documentation
- [ ] Active community feedback
- [ ] Regular maintenance

---

## Questions & Decisions

### Open Questions

1. **Tailwind Dependency**: Remove or keep?
   - **Recommendation**: Remove for wider compatibility

2. **Component Prefix**: What should be the default?
   - **Options**: `Modal`, `ModalStack`, `Ms`
   - **Recommendation**: `Modal` for simplicity

3. **Global Registration**: Required or optional?
   - **Recommendation**: Optional, composable API as primary

4. **Style Customization**: CSS variables or props?
   - **Recommendation**: CSS variables for theme, props for instance-level

5. **Overlay Click Behavior**: Always close all, or configurable?
   - **Recommendation**: Configurable per-modal

### Decisions Made

- ✅ Use TypeScript for better DX
- ✅ Keep components lightweight
- ✅ Export composable as primary API
- ✅ Follow fancy-crud plugin conventions
- ✅ Maintain existing animation behavior

---

## Conclusion

This implementation plan provides a comprehensive roadmap for converting the nested-stack-modal-system into a production-ready plugin. The resulting package will be:

- 🎯 **Framework-compatible** - Follows fancy-crud conventions
- 🔧 **Developer-friendly** - TypeScript, good docs, easy API
- ⚡ **Performant** - Optimized animations, small bundle
- 🎨 **Customizable** - CSS variables, configuration options
- 📦 **Production-ready** - Tests, examples, documentation

The phased approach allows for iterative development while maintaining functionality at each stage.

