# Fancy CRUD - PrimeVue Demo

This is a demo application showcasing the Fancy CRUD library with PrimeVue components.

## Getting Started

### Installation

From the root of the monorepo, install dependencies:

```bash
pnpm install
```

### Running the Demo

You can run the demo in two ways:

**Option 1: From the root directory**
```bash
pnpm demo:primevue
```

**Option 2: From the demo-primevue directory**
```bash
cd demo-primevue
pnpm dev
```

The demo will be available at `http://localhost:9094`

## Features Demonstrated

This demo showcases:

- ✅ Text input fields
- ✅ Date picker
- ✅ Password input with toggle
- ✅ Select dropdown
- ✅ Checkbox (single and multiple)
- ✅ Radio buttons
- ✅ Color picker
- ✅ Textarea
- ✅ File upload
- ✅ Complete forms
- ✅ Data tables with pagination
- ✅ Toast notifications

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **PrimeVue** - Rich UI component library
- **Fancy CRUD** - CRUD automation library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework

## Project Structure

```
demo-primevue/
├── src/
│   ├── App.vue              # Main application component
│   ├── main.ts              # Application entry point
│   ├── plugins/
│   │   ├── fancy-crud.ts    # Fancy CRUD configuration
│   │   └── TheMagic.vue     # Demo component
│   ├── modules/
│   │   └── axios.ts         # HTTP client configuration
│   ├── styles/
│   │   └── main.sass        # Global styles
│   └── viewer/              # Demo viewer components
│       ├── FCheckboxViewer.vue
│       ├── FColorViewer.vue
│       ├── FDateViewer.vue
│       ├── FFileViewer.vue
│       ├── FFormViewer.vue
│       ├── FInputViewer.vue
│       ├── FPasswordViewer.vue
│       ├── FRadioViewer.vue
│       ├── FSelectViewer.vue
│       ├── FSidebar.vue
│       ├── FSidebarItem.vue
│       ├── FTableViewer.vue
│       └── FTextareaViewer.vue
├── index.html
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

## Configuration

The Fancy CRUD configuration is located in `src/plugins/fancy-crud.ts`:

```typescript
import { defineConfig } from '@fancy-crud/vue'
import { useToast } from 'primevue/usetoast'
import { components, notify, styles } from '@fancy-crud/wrapper-primevue'

const toast = useToast()
const notifyInstance = notify()
notifyInstance.setToastInstance(toast)

export default defineConfig({
  components,     // PrimeVue wrapper components
  styles,         // Button and modal styles
  toast: notifyInstance,  // Toast notification service
  // ... more configuration
})
```

## PrimeVue Integration

This demo uses:
- **PrimeVue 3.50+** - Component library
- **PrimeIcons** - Icon set
- **Lara Light Blue** - Default theme

The PrimeVue Toast service is initialized in `main.ts` and configured for use with Fancy CRUD notifications.

## Development

### Hot Module Replacement

The demo supports HMR, so changes to components will be reflected immediately without a full page reload.

### TypeScript Support

Full TypeScript support is enabled with auto-generated type declarations for components and auto-imports.

## Building for Production

To build the wrapper package:

```bash
# From root
pnpm build:w-primevue

# Or
cd packages/wrapper-primevue
pnpm build
```

## Related Demos

- `demo-element-plus` - Element Plus demo
- `demo-quasar` - Quasar demo
- `demo-vuetify` - Vuetify demo
- `demo-oruga` - Oruga UI demo

## License

MIT © Christopher A. Flores


