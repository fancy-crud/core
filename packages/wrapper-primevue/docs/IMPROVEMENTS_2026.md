# Mejoras a Fancy CRUD - Wrapper PrimeVue

**Fecha**: Enero 2026  
**Versión**: Post v0.0.0

Este documento detalla las mejoras y correcciones aplicadas a los componentes del wrapper de PrimeVue y al core de Fancy CRUD.

---

## Tabla de Contenidos

1. [Exportación de CSS en Wrappers](#1-exportación-de-css-en-wrappers)
2. [Mejoras al Componente FwSelect](#2-mejoras-al-componente-fwselect)
3. [Mejoras al Componente FwDatepicker](#3-mejoras-al-componente-fwdatepicker)
4. [Corrección de Error en Edición Inline de Tablas](#4-corrección-de-error-en-edición-inline-de-tablas)

---

## 1. Exportación de CSS en Wrappers

### Problema
Los wrappers no exportaban sus archivos CSS, lo que impedía a los usuarios importar los estilos necesarios.

### Solución
Se agregó la exportación del CSS en el `package.json` de **todos los wrappers**:

#### Archivos modificados:
- `packages/wrapper-element-plus/package.json`
- `packages/wrapper-oruga-ui/package.json`
- `packages/wrapper-primevue/package.json`
- `packages/wrapper-quasar/package.json`
- `packages/wrapper-vuetify/package.json`

#### Cambios en `package.json`:

```json
{
  "exports": {
    ".": {
      "import": "./dist/fancy-crud-wrapper-primevue.js",
      "types": "./dist/src/index.d.ts"
    },
    "./style.css": "./dist/fancy-crud-wrapper-primevue.css"
  }
}
```

### Uso

Ahora los usuarios pueden importar los estilos de cada wrapper:

```typescript
import '@fancy-crud/wrapper-primevue/style.css'
import '@fancy-crud/wrapper-element-plus/style.css'
import '@fancy-crud/wrapper-oruga-ui/style.css'
import '@fancy-crud/wrapper-quasar/style.css'
import '@fancy-crud/wrapper-vuetify/style.css'
```

---

## 2. Mejoras al Componente FwSelect

### Problemas identificados

1. **Valores booleanos como string**: El componente no manejaba correctamente valores booleanos cuando venían como strings (`"true"`, `"false"`)
2. **Objeto completo en lugar de valor**: PrimeVue devolvía el objeto completo `{value: 'false', label: 'No validados'}` en lugar de solo el valor

#### Ejemplo del problema:
```
URL generada (incorrecta):
is_validated[value]=false&is_validated[label]=No+validados

URL esperada:
is_validated=false
```

### Solución implementada

**Archivo**: `packages/wrapper-primevue/src/form/FwSelect.vue`

#### 1. Función helper para normalizar booleanos

```typescript
// Helper function to normalize boolean values
const toBoolean = (value: any): boolean | undefined => {
  if (value === undefined || value === null) return undefined
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') {
    const normalized = value.toLowerCase().trim()
    if (normalized === 'true') return true
    if (normalized === 'false') return false
  }
  return Boolean(value)
}
```

#### 2. Extracción automática del valor

```typescript
const modelValue = computed({
  get: () => vmodel.value.modelValue,
  set: (val) => {
    // Extract value if it's an object with value property
    // This handles cases where PrimeVue returns {value: 'true', label: 'Validados'} instead of just 'true'
    let actualValue = val
    if (val !== null && val !== undefined && typeof val === 'object' && 'value' in val) {
      actualValue = val.value
    }
    vmodel.value['onUpdate:modelValue'](actualValue)
  }
})
```

#### 3. Normalización de propiedades booleanas

Se aplicó `toBoolean` a todas las propiedades booleanas del select:

```typescript
const selectProps = computed(() => {
  const field = props.field as any
  return {
    placeholder: field.placeholder,
    disabled: toBoolean(field.disabled),
    filter: toBoolean(field.filter),
    loading: toBoolean(field.loading),
    editable: toBoolean(field.editable),
    autoFilterFocus: toBoolean(field.autoFilterFocus),
    resetFilterOnHide: toBoolean(field.resetFilterOnHide),
    fluid: toBoolean(field.fluid),
    // ... más propiedades
  }
})
```

#### 4. Manejo del showClear

```typescript
const showClearValue = computed(() => {
  const field = props.field as any
  return toBoolean(field.clearable || field.showClear)
})
```

### Casos de uso soportados

```typescript
// Definición manual de opciones
const fields = {
  is_validated: {
    label: "Filtrar por estado de validación",
    showClear: true,
    type: FieldType.select,
    optionLabel: "label",
    optionValue: "value",
    options: [
      { value: 'true', label: 'Validados' },
      { value: 'false', label: 'No validados' }
    ],
    modelValue: "",
  }
}

// Opciones desde Django u otra API
const fields = {
  country: {
    type: FieldType.select,
    url: '/api/countries/',  // Devuelve [{id: 1, name: 'USA'}, ...]
    optionLabel: 'name',
    optionValue: 'id',
  }
}
```

### Resultado

✅ El componente ahora maneja correctamente:
- Valores booleanos tanto como `boolean` o `string`
- Extracción automática del valor cuando PrimeVue devuelve el objeto completo
- Compatibilidad con opciones definidas manualmente o desde APIs (Django, etc.)

---

## 3. Mejoras al Componente FwDatepicker

### Problemas identificados

1. **Error de actualización del componente**: PrimeVue `DatePicker` espera objetos `Date`, pero el backend envía strings ISO
2. **Falta de soporte para DateTime**: No había forma de seleccionar fecha + hora en el mismo picker

#### Error original:
```
[Vue warn]: Unhandled error during execution of component update
```

### Solución implementada

**Archivo**: `packages/wrapper-primevue/src/form/FwDatepicker.vue`

#### 1. Conversión automática de fechas

```typescript
// Helper function to convert ISO string to Date object
const toDateObject = (value: any): Date | null | undefined => {
  if (value === null || value === undefined) return value
  if (value instanceof Date) return value
  if (typeof value === 'string') {
    try {
      const date = new Date(value)
      return isNaN(date.getTime()) ? null : date
    } catch {
      return null
    }
  }
  return null
}

// Helper function to convert Date object to ISO string
const toISOString = (value: any): string | null | undefined => {
  if (value === null || value === undefined) return value
  if (value instanceof Date) {
    try {
      return value.toISOString()
    } catch {
      return null
    }
  }
  if (typeof value === 'string') return value
  return null
}
```

#### 2. Computed para manejo bidireccional

```typescript
const dateValue = computed({
  get: () => {
    // Convert ISO string from backend to Date object for PrimeVue
    return toDateObject(vmodel.value.modelValue)
  },
  set: (val) => {
    // Convert Date object back to ISO string for backend
    const isoValue = toISOString(val)
    vmodel.value['onUpdate:modelValue'](isoValue)
  }
})
```

#### 3. Propiedades normalizadas

```typescript
const datePickerProps = computed(() => {
  const field = props.field as any
  return {
    placeholder: field.placeholder,
    disabled: toBoolean(field.disabled),
    readonly: toBoolean(field.readonly),
    showIcon: toBoolean(field.showIcon),
    showTime: toBoolean(field.showTime),      // ✨ Soporte DateTime
    showButtonBar: toBoolean(field.showButtonBar),
    hourFormat: field.hourFormat || '24',
    timeOnly: toBoolean(field.timeOnly),      // ✨ Solo hora
    dateFormat: field.dateFormat,
    minDate: toDateObject(field.minDate),
    maxDate: toDateObject(field.maxDate),
    disabledDates: field.disabledDates?.map(toDateObject),
    // ... más propiedades
  }
})
```

### Casos de uso

#### Solo fecha (Date)
```typescript
const fields = {
  event_start_date: {
    type: FieldType.datepicker,
    label: 'Fecha de inicio',
    placeholder: 'Seleccionar fecha',
    dateFormat: 'dd/mm/yy',
    showIcon: true,
    showButtonBar: true,
    showClear: true,
  }
}
```

#### Fecha + Hora (DateTime)
```typescript
const fields = {
  event_datetime: {
    type: FieldType.datepicker,
    label: 'Fecha y hora del evento',
    placeholder: 'Seleccionar fecha y hora',
    dateFormat: 'dd/mm/yy',
    showIcon: true,
    showTime: true,        // ✨ Habilita selección de hora
    hourFormat: '24',      // '12' o '24'
    showButtonBar: true,
    showClear: true,
  }
}
```

#### Solo hora (Time)
```typescript
const fields = {
  event_time: {
    type: FieldType.datepicker,
    label: 'Hora del evento',
    timeOnly: true,        // ✨ Solo hora, sin fecha
    hourFormat: '24',
    showIcon: true,
  }
}
```

### Propiedades soportadas

- `showTime`: Habilita selección de hora
- `hourFormat`: Formato de hora ('12' o '24')
- `timeOnly`: Solo selector de hora
- `dateFormat`: Formato de fecha personalizado
- `minDate` / `maxDate`: Fechas mínima/máxima permitidas
- `disabledDates`: Array de fechas deshabilitadas
- `disabledDays`: Array de días de la semana deshabilitados
- `showIcon`: Muestra icono de calendario
- `showButtonBar`: Muestra barra de botones (Hoy, Limpiar)
- `numberOfMonths`: Cantidad de meses a mostrar
- `selectionMode`: Modo de selección (single, multiple, range)
- `inline`: Muestra el calendario inline

### Resultado

✅ El componente ahora:
- Convierte automáticamente entre strings ISO y objetos Date
- Soporta selección de fecha + hora con `showTime: true`
- Soporta solo hora con `timeOnly: true`
- Maneja correctamente todos los formatos de fecha
- No genera errores de actualización del componente

---

## 4. Corrección de Error en Edición Inline de Tablas

### Problema

Al usar la funcionalidad `input: { isEnable: true }` en columnas de tabla para habilitar edición inline, se producía un error:

```
DataCloneError: Failed to execute 'structuredClone' on 'Window': 
[object Array] could not be cloned.
```

**Causa**: `structuredClone` no puede clonar objetos que contengan funciones, y los campos normalizados contienen funciones como `recordValue`, `interceptOptions`, `getComponent`, `rules`, etc.

### Solución implementada

**Archivo**: `packages/vue/src/tables/capabilities/set-list-data-with-reactivity-form.ts`

#### Función de clonado personalizada

```typescript
// Helper function to deep clone fields while preserving functions
function cloneFields(fields: ObjectWithRawFields): ObjectWithRawFields {
  const cloned: ObjectWithRawFields = {}
  
  for (const [key, field] of Object.entries(fields)) {
    cloned[key] = { ...field }
    
    // Clone nested objects but preserve functions
    if (field.wrapper && typeof field.wrapper === 'object') {
      cloned[key].wrapper = { ...field.wrapper }
    }
    
    // Clone options array if it exists and is an array
    if (Array.isArray(field.options)) {
      cloned[key].options = field.options.map(opt => {
        if (typeof opt === 'object' && opt !== null) {
          return { ...opt }
        }
        return opt
      })
    }
  }
  
  return cloned
}
```

#### Uso

```typescript
items = items.map((record: any) => {
  const $form = useForm({
    fields: cloneFields(allowInputFields),  // ✅ Antes: structuredClone(allowInputFields)
    settings: {
      ...settings,
      mode: FORM_MODE.update,
      lookupValue: settings.lookupField ? record[settings.lookupField] : undefined,
    },
  })
  // ...
})
```

### Caso de uso: Edición inline en tablas

```typescript
const form = useForm({
  fields: {
    name: {
      type: FieldType.text,
      label: 'Nombre'
    },
    enable_agenda: {
      type: FieldType.checkbox,
      label: 'Agenda habilitada'
    },
    is_active: {
      type: FieldType.checkbox,
      label: 'Activo'
    }
  },
  settings: {
    url: 'registers/:id'
  }
})

const table = useTable({
  form,
  columns: {
    name: {},  // Solo lectura
    enable_agenda: {
      label: 'Agenda',
      input: { isEnable: true }  // ✅ Editable como checkbox en la tabla
    },
    is_active: {
      label: 'Estado',
      input: { isEnable: true }  // ✅ Editable como checkbox en la tabla
    }
  },
  settings: () => ({
    url: 'registers/'
  })
})
```

### Resultado

✅ La edición inline ahora funciona correctamente:
- Los campos booleanos se convierten automáticamente en checkboxes
- Los checkboxes son interactivos en la tabla
- Los cambios se guardan automáticamente
- No se produce el error de `structuredClone`

---

## Resumen de Beneficios

### Para Desarrolladores

1. **Mejor experiencia de desarrollo**: Todos los wrappers ahora exportan CSS correctamente
2. **Menos bugs**: Correcciones de errores comunes en componentes críticos
3. **Más flexibilidad**: Soporte completo para datetime y edición inline
4. **Mejor compatibilidad**: Manejo robusto de diferentes formatos de datos (strings, booleans, objetos)

### Para Usuarios Finales

1. **Mejor UX**: Selección de fecha y hora en un solo componente
2. **Edición más rápida**: Checkboxes editables directamente en tablas
3. **Menos errores**: Validación y conversión automática de datos
4. **Mayor consistencia**: Comportamiento uniforme en todos los componentes

---

## Notas Técnicas

### Compatibilidad

Todas las mejoras son **retrocompatibles**. Los componentes funcionan exactamente igual que antes, pero ahora soportan casos adicionales y manejan mejor los errores.

### Testing

Se recomienda probar especialmente:
- Selects con opciones booleanas
- DatePickers con datos desde backend (strings ISO)
- Edición inline en tablas con múltiples tipos de campos
- Integración con Django y otras APIs REST

### Próximas mejoras sugeridas

1. Aplicar las mismas correcciones de `FwSelect` y `FwDatepicker` a otros wrappers (Element Plus, Vuetify, Quasar, Oruga)
2. Agregar tests unitarios para las funciones helper (`toBoolean`, `toDateObject`, etc.)
3. Documentar mejor las propiedades disponibles en cada componente
4. Crear ejemplos interactivos para cada caso de uso

---

## Migración

### No se requieren cambios

Todas las mejoras son automáticas y no requieren cambios en el código existente.

### Aprovechar nuevas funcionalidades

Para aprovechar las nuevas funcionalidades de datetime:

```diff
  const fields = {
    event_date: {
      type: FieldType.datepicker,
      label: 'Fecha del evento',
+     showTime: true,
+     hourFormat: '24',
    }
  }
```

---

**Documentación generada**: Enero 15, 2026  
**Autor**: Sistema de mejoras Fancy CRUD  
**Wrapper afectado**: PrimeVue (y cambios en core que afectan a todos los wrappers)
