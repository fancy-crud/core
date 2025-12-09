<template>
  <div>
    <FwToast position="top-left" detail="test" summary="test summary" severity="success" />

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

    <button @click="showSuccess" class="p-2 bg-green-500 text-white rounded m-4">
      Mostrar notificación de prueba
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
import FTableViewer from './viewer/FTableViewer.vue'
import ModalStackViewer from './viewer/ModalStackViewer.vue'
import { FwToast, toast } from '@fancy-crud/wrapper-primevue'

export default defineComponent({
  name: 'App',
  components: {
    FSidebar,
    FSidebarItem,
    FwToast
  },
  setup() {
    const showSuccess = () => {
      toast.handler({
        type: 'success',
        message: '¡Notificación de éxito desde FwToast!',
        payload: {
          summary: 'Success!',
          life: 5000,
          icon: 'pi pi-check',
          closable: true,
          styleClass: 'my-custom-toast'
        }
      })
    }

    const inputs = {
      textField: FInputViewer,
      dateField: FInputDate,
      passwordField: FPasswordViewer,
      selectField: FSelect,
      checkboxField: FCheckbox,
      radioField: FRadioViewer,
      colorField: FColor,
      textareaField: FTextareaViewer,
      fileField: FFileViewer,
      genreForm: FFormViewer,
      tableViewer: FTableViewer,
      modalStack: ModalStackViewer,
    }

    return {
      inputs,
      showSuccess,
    }
  }
})
</script>
