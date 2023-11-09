<template>
  <q-input v-model="modelValue" mask="date" :error-message="hintText" :hint="hintText" :error="hasFieldErrors">
    <template #append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="modelValue">
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
import { QDate, QIcon, QInput, QPopupProxy } from 'quasar'
import type { NormalizedDatepickerField } from '@fancy-crud/vue'
import { useDatepickerField } from '@fancy-crud/vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedDatepickerField
}>()

const { hintText, modelValue, hasFieldErrors } = useDatepickerField<string | null>(props)
</script>

