<template>
  <div>
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
  </div>
</template>

<script lang="ts" setup>
import FSidebar from './viewer/FSidebar.vue'
import FSidebarItem from './viewer/FSidebarItem.vue'
import FFormViewer from './viewer/FFormViewer.vue'
import FInputViewer from './viewer/FInputViewer.vue'
import FInputDate from './viewer/FDateViewer.vue'
import FCheckbox from './viewer/FCheckboxViewer.vue'
import FPasswordViewer from './viewer/FPasswordViewer.vue'
import FSelect from './viewer/FSelectViewer.vue'
import FRadioViewer from './viewer/FRadioViewer.vue'
import FColor from './viewer/FColorViewer.vue'
import FTextareaViewer from './viewer/FTextareaViewer.vue'
import FFileViewer from './viewer/FFileViewer.vue'
import FImageViewer from './viewer/FImageViewer.vue'
import FTableViewer from './viewer/FTableViewer.vue'

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
