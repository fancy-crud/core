# fancy-crud/core [![npm](https://img.shields.io/npm/v/@fancy-crud/core)](https://img.shields.io/npm/v/@fancy-crud/core) [![build status](https://github.com/fancy-crud/core/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/fancy-crud/core/actions/workflows/release.yml)

A powerful and flexible Vue 3 CRUD library that provides automatic form generation, data tables, and complete CRUD operations with minimal configuration. Built with TypeScript and supports multiple UI frameworks.

## Features

- 🚀 **Automatic Form Generation** - Create forms with minimal configuration
- 📊 **Data Tables** - Feature-rich tables with pagination, sorting, and filtering
- 🎨 **Multiple UI Frameworks** - Vuetify, Quasar, Element Plus, Oruga support
- 🔧 **Flexible Field Types** - Text, select, checkbox, date, file, color, and more
- ✅ **Built-in Validation** - Support for Zod and Valibot validation libraries
- 🌐 **HTTP Integration** - Automatic API calls for CRUD operations
- 📝 **TypeScript Support** - Full type safety and IntelliSense
- 🎯 **Minimal Configuration** - Get started quickly with sensible defaults

## Installation

```bash
# Core packages
npm install @fancy-crud/core @fancy-crud/vue

# Choose your UI framework wrapper
npm install @fancy-crud/wrapper-vuetify  # For Vuetify
npm install @fancy-crud/wrapper-quasar   # For Quasar
npm install @fancy-crud/wrapper-element-plus  # For Element Plus
npm install @fancy-crud/wrapper-oruga-ui  # For Oruga

# Optional: Validation plugins
npm install @fancy-crud/plugin-rule-parsers  # For Zod/Valibot support
npm install @fancy-crud/plugin-vue3-toastify  # For notifications
```

## Quick Start

### 1. Install and Configure

```typescript
// main.ts
import { createApp } from 'vue'
import { FancyCrud } from '@fancy-crud/vue'
import { createVuetify } from 'vuetify'
import axios from 'axios'

// Choose your UI framework wrapper
import components, { styles } from '@fancy-crud/wrapper-vuetify'

const app = createApp(App)

// Configure your UI framework
const vuetify = createVuetify()
app.use(vuetify)

// Configure FancyCrud
app.use(FancyCrud, {
  http: {
    request: axios,
  },
  components,
  styles,
})
```

### 2. Create a Simple Form

```vue
<template>
  <f-form v-bind="form" />
</template>

<script setup lang="ts">
import { useForm } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: {
      type: 'text',
      label: 'Name',
      placeholder: 'Enter your name'
    },
    email: {
      type: 'text',
      label: 'Email',
      placeholder: 'Enter your email'
    }
  },
  settings: {
    url: '/api/users',
    title: 'Create User'
  }
})
</script>
```

### 3. Create a Data Table

```vue
<template>
  <f-table v-bind="table" />
</template>

<script setup lang="ts">
import { useForm, useTable } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: {
      type: 'text',
      label: 'Name'
    },
    email: {
      type: 'text',
      label: 'Email'
    }
  },
  settings: {
    url: '/api/users'
  }
})

const table = useTable({
  form,
  settings: {
    url: '/api/users'
  }
})
</script>
```

## Field Types

FancyCrud supports various field types out of the box:

### Text Fields
```typescript
{
  name: {
    type: 'text',
    label: 'Name',
    placeholder: 'Enter name',
    class: 'custom-class'
  }
}
```

### Select Fields
```typescript
{
  category: {
    type: 'select',
    label: 'Category',
    options: [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 }
    ],
    optionLabel: 'label',
    optionValue: 'value'
  }
}
```

### Checkbox Fields
```typescript
{
  features: {
    type: 'checkbox',
    label: 'Features',
    multiple: true,
    options: ['Feature 1', 'Feature 2', 'Feature 3']
  }
}
```

### Date Fields
```typescript
{
  birthday: {
    type: 'datepicker',
    label: 'Birthday'
  }
}
```

### File Upload
```typescript
{
  avatar: {
    type: 'file',
    label: 'Avatar',
    multiple: false
  }
}
```

### Other Field Types
- `password` - Password input
- `textarea` - Multi-line text
- `radio` - Radio buttons
- `color` - Color picker
- `image` - Image upload with preview

## Field Configuration Options

Each field supports various configuration options:

```typescript
{
  fieldName: {
    type: 'text',
    label: 'Field Label',
    placeholder: 'Placeholder text',
    class: 'custom-css-class',
    
    // Visibility options
    hidden: false,
    createOnly: false,  // Only show in create mode
    updateOnly: false,  // Only show in update mode
    
    // Validation
    rules: validationRules,
    
    // Styling
    wrapper: {
      class: 'col-span-6'  // Grid classes
    },
    
    // Behavior
    debounceTime: 300,
    readonly: false,
    disabled: false,
    
    // For select/checkbox/radio
    multiple: false,
    options: [],
    optionLabel: 'label',
    optionValue: 'value',
    
    // Custom handlers
    interceptOptions: (options) => options,
    parseModelValue: (value) => value,
    recordValue: (value) => value
  }
}
```

## Form Configuration

### Basic Form Setup

```typescript
const form = useForm({
  id: 'user-form',  // Optional: unique identifier
  fields: {
    // Field definitions
  },
  settings: {
    url: '/api/users',
    mode: 'create',  // 'create' | 'update'
    title: 'User Form',
    lookupField: 'id'  // Field used for updates
  },
  buttons: {
    main: {
      label: 'Save',
      onClick: customSaveHandler
    },
    aux: {
      label: 'Cancel',
      onClick: customCancelHandler
    }
  }
})
```

### Dynamic Form Titles

```typescript
settings: {
  title: '{{ Create User | Update User }}'  // Dynamic based on mode
}
```

### Form Events

```typescript
// In your component
const form = useForm({
  // ... configuration
})

// Listen to form events
form.onSuccess = (response) => {
  console.log('Form submitted successfully', response)
}

form.onError = (error) => {
  console.log('Form submission failed', error)
}
```

## Table Configuration

### Basic Table Setup

```typescript
const table = useTable({
  form,  // Associated form for CRUD operations
  columns: {
    name: {
      label: 'Name',
      format: (value) => value.toUpperCase()
    },
    email: {
      label: 'Email'
    },
    actions: {
      value: 'actions',
      label: 'Actions'
    }
  },
  settings: {
    url: '/api/users',
    lookupField: 'id',
    autoInferColumns: true  // Auto-generate columns from form fields
  },
  pagination: {
    rowsPerPage: 10
  }
})
```

### Column Configuration

```typescript
columns: {
  columnName: {
    label: 'Column Title',
    format: (value) => formatValue(value),  // Custom formatting
    exclude: false,  // Hide column
    input: {
      isEnable: true  // Enable inline editing
    }
  }
}
```

### Table Buttons

```typescript
buttons: {
  add: {
    label: 'Add New',
    onClick: customAddHandler
  },
  edit: {
    label: 'Edit',
    onClick: customEditHandler
  },
  remove: {
    label: 'Delete',
    onClick: customDeleteHandler
  },
  dump: {
    label: 'Export',
    onClick: customExportHandler
  }
}
```

## Validation

### Using Zod

```typescript
import { z } from 'zod'
import { zodSafeParser } from '@fancy-crud/plugin-rule-parsers'

// Configure validation parser
app.use(FancyCrud, {
  // ... other config
  rules: {
    parser: zodSafeParser
  }
})

// Use in field definition
{
  email: {
    type: 'text',
    label: 'Email',
    rules: z.string().email()
  }
}
```

### Using Valibot

```typescript
import { email, string } from 'valibot'
import { valibotSafeParser } from '@fancy-crud/plugin-rule-parsers'

// Configure validation parser
app.use(FancyCrud, {
  // ... other config
  rules: {
    parser: valibotSafeParser
  }
})

// Use in field definition
{
  email: {
    type: 'text',
    label: 'Email',
    rules: string([email()])
  }
}
```

## UI Framework Wrappers

### Vuetify

```typescript
import components, { styles } from '@fancy-crud/wrapper-vuetify'

app.use(FancyCrud, {
  components,
  styles,
  // ... other config
})
```

### Quasar

```typescript
import components, { styles } from '@fancy-crud/wrapper-quasar'

app.use(FancyCrud, {
  components,
  styles,
  // ... other config
})
```

### Element Plus

```typescript
import components, { styles } from '@fancy-crud/wrapper-element-plus'

app.use(FancyCrud, {
  components,
  styles,
  // ... other config
})
```

### Oruga UI

```typescript
import components, { styles } from '@fancy-crud/wrapper-oruga-ui'

app.use(FancyCrud, {
  components,
  styles,
  // ... other config
})
```

## Notifications

```typescript
import { vueToastifyPlugin } from '@fancy-crud/plugin-vue3-toastify'

app.use(FancyCrud, {
  // ... other config
  toast: vueToastifyPlugin({
    autoClose: 5000
  })
})
```

## Advanced Usage

### Custom Field Components

```vue
<template>
  <f-form v-bind="form">
    <template #field-custom="{ field }">
      <CustomFieldComponent :field="field" />
    </template>
  </f-form>
</template>
```

### Form Slots

```vue
<template>
  <f-form v-bind="form">
    <template #before-form-body>
      <div>Content before form fields</div>
    </template>
    
    <template #after-form-footer>
      <div>Content after form buttons</div>
    </template>
  </f-form>
</template>
```

### Table Slots

```vue
<template>
  <f-table v-bind="table">
    <template #column-name="{ row }">
      <strong>{{ row.name }}</strong>
    </template>
  </f-table>
</template>
```

### Bus Commands

```typescript
import { Bus, ResetFieldsByFormIdCommand } from '@fancy-crud/core'

const bus = new Bus()

// Reset form fields
bus.execute(new ResetFieldsByFormIdCommand(form.id))
```

## HTTP Configuration

```typescript
import axios from 'axios'

axios.defaults.baseURL = 'https://api.example.com/'

app.use(FancyCrud, {
  http: {
    request: axios
  },
  // ... other config
})
```

## TypeScript Support

FancyCrud is built with TypeScript and provides full type safety:

```typescript
import { useForm, useTable, FieldType } from '@fancy-crud/vue'

const form = useForm({
  fields: {
    name: {
      type: FieldType.text,
      label: 'Name'
    }
  }
})
```

## Examples

Check out the demo applications in the repository:

- [Vuetify Demo](./demo-vuetify)
- [Quasar Demo](./demo-quasar)
- [Element Plus Demo](./demo-element-plus)
- [Oruga Demo](./demo-oruga)

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to the main repository.

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2019-present, Christopher Flores

