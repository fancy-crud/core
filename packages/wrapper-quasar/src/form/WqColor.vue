<template>
  <q-input
    v-model="modelValue"
    @focus="state.popup = true"
    v-bind="props.field.wrapper"
    :hint="hintText"
    :error="hasFieldErrors"
    :error-message="hintText"
  >
    <template #append>
      <q-icon name="colorize" class="cursor-pointer">
        <q-popup-proxy v-model="state.popup" cover transition-show="scale" transition-hide="scale">
          <q-color v-model="modelValue" />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script lang="ts" setup>
import { QColor, QIcon, QInput, QPopupProxy } from 'quasar'
import type { NormalizedColorField } from '@fancy-crud/vue'
import { useColorField } from '@fancy-crud/vue'

const props = defineProps<{
  formId: symbol
  field: NormalizedColorField
}>()
const { hintText, hasFieldErrors, modelValue } = useColorField(props)

const state = reactive({
  popup: false,
})
</script>
