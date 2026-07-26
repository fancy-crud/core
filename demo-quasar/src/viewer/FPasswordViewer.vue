<template>
  <div>
    <f-form v-bind="form">
      <template #field-password="{ field }">
        <div class="col-span-12">
          <q-input
            v-model="field.modelValue"
          >
            <template #append>
              Hellodsadsa
            </template>
          </q-input>
        </div>
      </template>
    </f-form>
  </div>

  <div class="p-10 mt-10 border">
    {{ form.fields.password.modelValue }}
  </div>
</template>

<script lang='ts' setup>
import { useForm, FieldType } from '@fancy-crud/vue'

const form = useForm({
  id: 'password-field',
  fields: {
    password: {
      label: 'Password',
      type: FieldType.password,
      showPassword: true,
    },
  },
  settings: {
    url: 'artists/',
  },
  notifications: {
    handler(notification) {
      if (notification?.type === 'success') {
        console.log('Success:', notification)
      }
    },
  }
})
</script>
