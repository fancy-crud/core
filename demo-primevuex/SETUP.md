# Demo PrimeVue Setup Summary

## ✅ What Was Created

A complete `demo-primevue` application has been created based on `demo-element-plus` with all Element Plus references replaced with PrimeVue equivalents.

## 📁 Project Structure

```
demo-primevue/
├── 📄 package.json                 # Dependencies and scripts
├── 📄 index.html                   # HTML entry point
├── 📄 vite.config.ts              # Vite configuration
├── 📄 tailwind.config.js          # Tailwind CSS config
├── 📄 postcss.config.js           # PostCSS config
├── 📄 auto-imports.d.ts           # Auto-import type definitions
├── 📄 components.d.ts             # Component type definitions
├── 📄 README.md                   # Documentation
└── src/
    ├── 📄 main.ts                 # Application entry (PrimeVue setup)
    ├── 📄 App.vue                 # Main app component (with Toast)
    ├── plugins/
    │   ├── 📄 fancy-crud.ts       # Fancy CRUD config (PrimeVue wrapper)
    │   └── 📄 TheMagic.vue        # Demo component
    ├── modules/
    │   └── 📄 axios.ts            # HTTP client setup
    ├── styles/
    │   └── 📄 main.sass           # Global styles
    └── viewer/                     # 13 viewer components
        ├── FCheckboxViewer.vue
        ├── FColorViewer.vue
        ├── FDateViewer.vue
        ├── FFileViewer.vue
        ├── FFormViewer.vue
        ├── FInputViewer.vue
        ├── FPasswordViewer.vue
        ├── FRadioViewer.vue
        ├── FSelectViewer.vue
        ├── FSidebar.vue
        ├── FSidebarItem.vue
        ├── FTableViewer.vue
        └── FTextareaViewer.vue
```

## 🔧 Key Configuration Changes

### 1. main.ts
```typescript
// PrimeVue Setup
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

app.use(PrimeVue)
app.use(ToastService)  // Required for notifications
```

### 2. App.vue
```vue
<template>
  <div>
    <Toast />  <!-- Added for PrimeVue notifications -->
    <f-sidebar>
      <!-- ... -->
    </f-sidebar>
  </div>
</template>
```

### 3. plugins/fancy-crud.ts
```typescript
import { useToast } from 'primevue/usetoast'
import { components, notify, styles } from '@fancy-crud/wrapper-primevue'

const toast = useToast()
const notifyInstance = notify()
notifyInstance.setToastInstance(toast)  // Critical for notifications!

export default defineConfig({
  components,  // PrimeVue wrapper components
  styles,      // PrimeVue button styles
  toast: notifyInstance,
  // ...
})
```

### 4. package.json
```json
{
  "name": "@fancy-crud/demo-primevue",
  "dependencies": {
    "@fancy-crud/wrapper-primevue": "workspace:^",
    "primevue": "^3.50.0",
    "primeicons": "^7.0.0",
    // ... (no element-plus dependencies)
  },
  "scripts": {
    "dev": "vite --port 9094 --host 0.0.0.0"
  }
}
```

### 5. vite.config.ts
```typescript
resolve: {
  alias: {
    '@fancy-crud/wrapper-primevue/dist': `${path.resolve(__dirname, '../packages/wrapper-primevue/dist')}/`,
    '@fancy-crud/wrapper-primevue': `${path.resolve(__dirname, '../packages/wrapper-primevue/src')}/`,
    // ...
  }
}
```

## 🚀 Running the Demo

### From Root Directory
```bash
pnpm demo:primevue
```

### From demo-primevue Directory
```bash
cd demo-primevue
pnpm dev
```

The demo will run on: **http://localhost:9094**

## 📦 Root package.json Updates

Added two new scripts:

```json
{
  "scripts": {
    "demo:primevue": "pnpm --filter='./demo-primevue' dev",
    "build:w-primevue": "pnpm --filter='./packages/wrapper-primevue' build"
  }
}
```

## 🔗 Dependencies

### Runtime Dependencies
- `@fancy-crud/core` (workspace)
- `@fancy-crud/vue` (workspace)
- `@fancy-crud/wrapper-primevue` (workspace) ⭐
- `@fancy-crud/plugin-rule-parsers` (workspace)
- `primevue` (^3.50.0)
- `primeicons` (^7.0.0)
- `vue` (^3.3.4)
- `@vueuse/core` (^9.9.0)

### Dev Dependencies
- `autoprefixer`
- `postcss`
- `tailwindcss`

## ⚙️ Important Notes

### 1. Toast Service Initialization
PrimeVue's Toast service **must** be initialized before Fancy CRUD:

```typescript
app.use(PrimeVue)
app.use(ToastService)  // MUST be before FancyCrud
app.use(FancyCrud, fancyConfig)
```

### 2. Toast Component in Template
The `<Toast />` component must be in the root template:

```vue
<template>
  <div>
    <Toast />  <!-- Required! -->
    <!-- rest of app -->
  </div>
</template>
```

### 3. Setting Toast Instance
The toast instance must be set in the config:

```typescript
const toast = useToast()
const notifyInstance = notify()
notifyInstance.setToastInstance(toast)
```

### 4. Port Configuration
Demo runs on port **9094** to avoid conflicts:
- Element Plus: 9093
- PrimeVue: 9094

## 🎨 PrimeVue Theme

Currently using **Lara Light Blue** theme:
```typescript
import 'primevue/resources/themes/lara-light-blue/theme.css'
```

Other available themes:
- `lara-light-blue`
- `lara-light-indigo`
- `lara-dark-blue`
- `bootstrap4-light-blue`
- `md-light-indigo`
- And many more...

To change theme, update the import in `main.ts`.

## 🧪 Testing Checklist

Before running, ensure:

- [ ] All dependencies installed (`pnpm install` from root)
- [ ] PrimeVue wrapper built (`pnpm build:w-primevue`)
- [ ] Core and Vue packages built
- [ ] Port 9094 is available
- [ ] Backend API is running (if using API features)

## 📝 Viewer Components

All 13 viewer components from `demo-element-plus` were copied:

1. ✅ **FInputViewer.vue** - Text input demo
2. ✅ **FDateViewer.vue** - Date picker demo
3. ✅ **FPasswordViewer.vue** - Password input demo
4. ✅ **FSelectViewer.vue** - Select dropdown demo
5. ✅ **FCheckboxViewer.vue** - Checkbox demo
6. ✅ **FRadioViewer.vue** - Radio button demo
7. ✅ **FColorViewer.vue** - Color picker demo
8. ✅ **FTextareaViewer.vue** - Textarea demo
9. ✅ **FFileViewer.vue** - File upload demo
10. ✅ **FFormViewer.vue** - Complete form demo
11. ✅ **FTableViewer.vue** - Data table demo
12. ✅ **FSidebar.vue** - Sidebar navigation
13. ✅ **FSidebarItem.vue** - Sidebar items

These components will work with PrimeVue wrapper components automatically.

## 🐛 Troubleshooting

### Issue: Toast notifications not appearing
**Solution**: Ensure ToastService is registered and Toast component is in template

### Issue: Components not rendering
**Solution**: Build the wrapper-primevue package first

### Issue: Module not found errors
**Solution**: Run `pnpm install` from the root directory

### Issue: Port already in use
**Solution**: Change port in `package.json` scripts or kill process on port 9094

## 🎯 Next Steps

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Build Wrapper**
   ```bash
   pnpm build:w-primevue
   ```

3. **Run Demo**
   ```bash
   pnpm demo:primevue
   ```

4. **Test All Features**
   - Open http://localhost:9094
   - Test each input type
   - Verify table pagination
   - Test notifications

## ✨ Success!

You now have a fully functional PrimeVue demo for Fancy CRUD! 🎉


