<template>
  <q-input 
    v-model="displayValue" 
    mask="date" 
    :error-message="hintText" 
    :hint="hintText" 
    :error="hasFieldErrors" 
    v-bind="attributes"
  >
    <template #append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="dateValue" :mask="dateMask">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { QBtn, QDate, QIcon, QInput, QPopupProxy, ClosePopup as vClosePopup } from 'quasar'
import type { NormalizedDatepickerField } from '@fancy-crud/vue'
import { useDatepickerField } from '@fancy-crud/vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedDatepickerField
}>()

const { hintText, vmodel, hasFieldErrors } = useDatepickerField<any>(props)

// Quasar QDate uses YYYY/MM/DD format
const dateMask = 'YYYY/MM/DD'

// Convert ISO string to Quasar date format (YYYY/MM/DD)
const toQuasarDate = (isoString: string | null | undefined): string => {
  if (!isoString) return ''
  try {
    const date = new Date(isoString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}/${month}/${day}`
  } catch {
    return ''
  }
}

// Convert Quasar date format to ISO string
const toISOString = (quasarDate: string): string | null => {
  if (!quasarDate) return null
  try {
    const [year, month, day] = quasarDate.split('/')
    const date = new Date(Number(year), Number(month) - 1, Number(day))
    return date.toISOString()
  } catch {
    return null
  }
}

// Handle bidirectional conversion
const dateValue = computed({
  get: () => toQuasarDate(vmodel.value.modelValue),
  set: (val: string) => {
    const isoValue = toISOString(val)
    vmodel.value['onUpdate:modelValue'](isoValue)
  }
})

// Display value for input (formatted)
const displayValue = computed(() => {
  const quasarDate = dateValue.value
  if (!quasarDate) return ''
  return quasarDate.replace(/\//g, '/')
})

const attributes = computed(() => {
  const { modelValue, rules, type, ...attrs} = props.field

  return {
    ...attrs,
    ...props.field.wrapper,
  }
})
</script>

