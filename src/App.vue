<template>
  <f-sidebar>
    <f-sidebar-item title="Forms" />
    <f-sidebar-item
      v-for="(_, inputKey) in inputs"
      :key="inputKey"
      :label="inputKey.toUpperCase()"
      :id="`${inputKey}-field`"
    />

    <template
      v-for="(inputType, inputKey) in inputs"
      :key="`${inputKey}-field`"
      #[`${inputKey}-field`]
    >
      <component :is="inputType" />
    </template>
  </f-sidebar>
  <!-- <h1>Hello world</h1> -->
</template>

<script lang="ts" setup>
import FFormViewer from '@/components/viewer/FFormViewer.vue'
import FInputViewer from '@/components/viewer/FInputViewer.vue'
import FInputDate from '@/components/viewer/FDateViewer.vue'
import FCheckbox from '@/components/viewer/FCheckboxViewer.vue'
import FPasswordViewer from '@/components/viewer/FPasswordViewer.vue'
import FSelect from '@/components/viewer/FSelectViewer.vue'
import FRadioViewer from '@/components/viewer/FRadioViewer.vue'
import FColor from '@/components/viewer/FColorViewer.vue'
import FTextareaViewer from '@/components/viewer/FTextareaViewer.vue'
import FFileViewer from '@/components/viewer/FFileViewer.vue'
import FImageViewer from '@/components/viewer/FImageViewer.vue'
import FTableViewer from '@/components/viewer/FTableViewer.vue'

const inputs = {
  text: FInputViewer,
  date: FInputDate,
  password: FPasswordViewer,
  select: FSelect,
  checkbox: FCheckbox,
  radio: FRadioViewer,
  color: FColor,
  textarea: FTextareaViewer,
  file: FFileViewer,
  image: FImageViewer,
  genreForm: FFormViewer,
  table: FTableViewer,
}
</script>
