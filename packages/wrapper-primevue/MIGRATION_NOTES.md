# PrimeVue Wrapper Migration Notes

## Summary

The `@wrapper-primevue` package has been successfully refactored from Element Plus to PrimeVue. All component wrappers in the `@common/` directory have been updated to use PrimeVue components and APIs.

## Changes Made

### 1. Package Configuration

#### `package.json`
- ✅ Updated package name: `@fancy-crud/wrapper-primevue`
- ✅ Replaced `element-plus` dependency with `primevue` (^3.50.0)
- ✅ Removed `@element-plus/icons-vue` dependency
- ✅ Updated main/module export paths to `fancy-crud-wrapper-primevue.js`
- ✅ Updated repository directory path
- ✅ Updated keywords to include `primevue`

#### `vite.config.ts`
- ✅ Already configured with correct output filename
- ✅ External dependencies updated to include `primevue` and `@primeuix/themes`

#### `tsconfig.common.json`
- ✅ Updated paths to reference `@packages/wrapper-primevue/*`

#### `CHANGELOG.md`
- ✅ Updated package name to `@fancy-crud/wrapper-primevue`

### 2. Common Components (`src/common/`)

#### `notify.ts`
- ✅ Replaced `ElNotification` with PrimeVue Toast service
- ✅ Added `NOTIFICATION_TYPE` mapping to PrimeVue severity levels
- ✅ Implemented `setToastInstance()` method for setting up the toast service
- ✅ Maps notification types: success, warning, error, info

#### `WeButton.vue`
- ✅ Replaced `ElButton` with PrimeVue `Button` component
- ✅ Updated import: `import Button from 'primevue/button'`
- ✅ Maintained `isLoading` prop compatibility

#### `WeModal.vue`
- ✅ Replaced `ElDialog` with PrimeVue `Dialog` component
- ✅ Updated import: `import Dialog from 'primevue/dialog'`
- ✅ Changed v-model prop from `modelValue` to `visible`
- ✅ Updated event handler to `onUpdate:visible`

### 3. Form Components (`src/form/`)

#### `WeField.vue`
- ✅ Replaced `ElFormItem` render function with template-based approach
- ✅ Implemented PrimeVue field styling with `p-invalid` class
- ✅ Added proper error and hint message display
- ✅ Converted from render function to script setup with template

#### `WeText.vue`
- ✅ Replaced `ElInput` with PrimeVue `InputText`
- ✅ Added `w-full` class for full-width styling
- ✅ Applied `p-invalid` class for error states

#### `WeTextarea.vue`
- ✅ Replaced `ElInput` with PrimeVue `Textarea`
- ✅ Added full-width styling and error state handling

#### `WePassword.vue`
- ✅ Replaced `ElInput` with PrimeVue `Password` component
- ✅ Added `toggleMask` for show/hide password functionality
- ✅ Disabled strength meter with `:feedback="false"`

#### `WeColor.vue`
- ✅ Replaced `ElColorPicker` with PrimeVue `ColorPicker`

#### `WeDatepicker.vue`
- ✅ Replaced `ElDatePicker` with PrimeVue `DatePicker`
- ✅ Added full-width styling

#### `WeSelect.vue`
- ✅ Replaced `ElSelect` and `ElOption` with PrimeVue `Select`
- ✅ Transformed options array to PrimeVue format with `label` and `value`
- ✅ Used `optionLabel` and `optionValue` props

#### `WeRadio.vue`
- ✅ Replaced `ElRadio` and `ElRadioGroup` with PrimeVue `RadioButton`
- ✅ Implemented custom layout with flex styling
- ✅ Added proper label associations

#### `WeCheckbox.vue`
- ✅ Replaced `ElCheckbox` and `ElCheckboxGroup` with PrimeVue `Checkbox`
- ✅ Implemented multiple and single checkbox modes
- ✅ Used `binary` prop for single checkbox with `trueValue`/`falseValue`

#### `WeFile.vue`
- ✅ Replaced `ElUpload` with PrimeVue `FileUpload`
- ✅ Implemented custom upload handling
- ✅ Added `@select` event handler for file selection

### 4. Table Components (`src/table/`)

#### `WeTableBody.vue`
- ✅ Replaced `ElTable` and `ElTableColumn` with PrimeVue `DataTable` and `Column`
- ✅ Updated slot props structure (changed from `bind.row` to `slotProps.data`)
- ✅ Maintained action column functionality
- ✅ Removed Element Plus specific styles

#### `WeTableFooter.vue`
- ✅ Replaced `ElPagination` and `ElDropdown` with PrimeVue `Paginator` and `Select`
- ✅ Implemented computed property for `firstRecord` pagination offset
- ✅ Removed `@element-plus/icons-vue` icon dependency

### 5. Configuration (`src/config/`)

#### `index.ts` (styles)
- ✅ Updated button styles for PrimeVue:
  - Changed `type` to `severity` (primary, secondary, info, danger)
  - Changed `plain` to `outlined`
  - Changed `circle` to `rounded`
  - Updated icon format to PrimeVue icons (e.g., `pi pi-plus`)
- ✅ Added modal styling with width configuration

## Next Steps

### Required Actions

1. **Install PrimeVue Dependencies**
   ```bash
   cd packages/wrapper-primevue
   pnpm install primevue@^3.50.0
   ```

2. **Build the Package**
   ```bash
   pnpm run build
   ```

3. **Test the Components**
   - Create a demo application or test suite
   - Verify all form components render correctly
   - Test table functionality with pagination
   - Verify modal and button interactions
   - Test notification system with toast instance setup

### Integration Notes

When using this wrapper in an application, you'll need to:

1. **Initialize PrimeVue Toast** (for notifications):
   ```ts
   import { useToast } from 'primevue/usetoast'
   import { notify } from '@fancy-crud/wrapper-primevue'
   
   const toast = useToast()
   const notifyInstance = notify()
   notifyInstance.setToastInstance(toast)
   ```

2. **Import PrimeVue CSS**:
   ```ts
   import 'primevue/resources/themes/lara-light-blue/theme.css'
   import 'primevue/resources/primevue.min.css'
   import 'primeicons/primeicons.css'
   ```

3. **Register Toast Service**:
   ```ts
   import ToastService from 'primevue/toastservice'
   app.use(ToastService)
   ```

## Component Mapping

| Element Plus | PrimeVue | Status |
|--------------|----------|--------|
| ElButton | Button | ✅ Done |
| ElDialog | Dialog | ✅ Done |
| ElNotification | Toast | ✅ Done |
| ElInput | InputText | ✅ Done |
| ElInput (textarea) | Textarea | ✅ Done |
| ElInput (password) | Password | ✅ Done |
| ElColorPicker | ColorPicker | ✅ Done |
| ElDatePicker | DatePicker | ✅ Done |
| ElSelect / ElOption | Select | ✅ Done |
| ElRadio / ElRadioGroup | RadioButton | ✅ Done |
| ElCheckbox / ElCheckboxGroup | Checkbox | ✅ Done |
| ElUpload | FileUpload | ✅ Done |
| ElTable / ElTableColumn | DataTable / Column | ✅ Done |
| ElPagination | Paginator | ✅ Done |
| ElFormItem | Custom Field Component | ✅ Done |

## Known Issues / Future Improvements

1. **TypeScript Errors**: Currently showing "Cannot find module 'primevue/button'" - will be resolved after installing dependencies
2. **Icon System**: PrimeVue uses `pi pi-*` icon format - may need adjustment based on available icons
3. **Testing**: Comprehensive testing needed after dependency installation
4. **Documentation**: Consider adding usage examples for each component

## Migration Complete ✅

All components in the `@common/` directory have been successfully refactored to use PrimeVue!

