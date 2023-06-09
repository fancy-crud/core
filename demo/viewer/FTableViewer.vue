<template>
  <div class="pb-5">
    <f-table v-bind="table" />
  </div>
</template>

<script lang='ts' setup>
import { FieldType } from '@fancy-crud/core'

// const formats = useFormats()

const form = useForm({
  id: 'formulario',
  fields: {
    name: {
      type: FieldType.text,
      label: 'First name',
      placeholder: 'First name',
      wrapper: {
        class: 'col-span-12',
      },
    },
    gender: {
      type: FieldType.text,
      label: 'Gender',
      wrapper: {
        class: 'col-span-12',
      },
    },
    created_at: {
      type: FieldType.text,
      label: 'Created at',
      updateOnly: true,
      readonly: true,
      disabled: true,
      wrapper: {
        class: 'col-span-12',
      },
    },
  },
  settings: {
    url: 'artists/',
  },
  titles: {
    create: 'Crear artista',
  },
})

const table = useTable({
  form,
  columns: {
    gender: {
      format: (value: unknown) => value === 'm' ? 'Male' : 'Female',
    },
    created_at: {
      // format: (value: unknown) => formats.dateTimeFormat(value as string),
    },
    actions: { value: 'actions', label: '' },
  },
  settings: {
    url: form.settings.url,
    lookupField: 'id',
  },
  pagination: {
    rowsPerPage: 10,
  },
})

// const data = [
//   {
//     id: 1,
//     name: 'Fredy',
//     gender: 'm',
//     image: null,
//     image2: null,
//     is_active: true,
//     created_at: '2023-01-01T21:51:25.587947-06:00',
//     updated_at: '2023-05-27T13:27:32.958539-06:00',
//   },
//   {
//     id: 2,
//     name: 'Sami',
//     gender: 'f',
//     image: null,
//     image2: null,
//     is_active: true,
//     created_at: '2023-01-01T21:52:53.183908-06:00',
//     updated_at: '2023-01-01T21:52:53.183944-06:00',
//   },
//   {
//     id: 3,
//     name: 'Pat',
//     gender: 'm',
//     image: null,
//     image2: null,
//     is_active: true,
//     created_at: '2023-01-04T15:51:28.429890-06:00',
//     updated_at: '2023-01-04T15:51:28.429991-06:00',
//   },
//   {
//     id: 4,
//     name: 'New',
//     gender: 'm',
//     image: null,
//     image2: null,
//     is_active: false,
//     created_at: '2023-02-20T12:14:22.899425-06:00',
//     updated_at: '2023-02-20T12:14:58.061190-06:00',
//   },
//   {
//     id: 5,
//     name: 'not',
//     gender: 'f',
//     image: null,
//     image2: null,
//     is_active: true,
//     created_at: '2023-02-20T12:22:26.391576-06:00',
//     updated_at: '2023-02-20T12:22:26.391654-06:00',
//   },
//   {
//     id: 6,
//     name: '12222',
//     gender: 'f',
//     image: null,
//     image2: null,
//     is_active: true,
//     created_at: '2023-05-20T11:52:52.333315-06:00',
//     updated_at: '2023-05-20T11:52:52.333365-06:00',
//   },
//   {
//     id: 7,
//     name: 'ref',
//     gender: 'm',
//     image: null,
//     image2: null,
//     is_active: true,
//     created_at: '2023-05-21T21:05:59.197929-06:00',
//     updated_at: '2023-05-21T21:05:59.197993-06:00',
//   },
//   {
//     id: 8,
//     name: 'refd',
//     gender: 'm',
//     image: null,
//     image2: null,
//     is_active: true,
//     created_at: '2023-05-21T21:06:23.797258-06:00',
//     updated_at: '2023-05-21T21:06:23.797304-06:00',
//   },
//   {
//     id: 9,
//     name: 'refr',
//     gender: 'm',
//     image: null,
//     image2: null,
//     is_active: true,
//     created_at: '2023-05-21T21:07:25.663547-06:00',
//     updated_at: '2023-05-28T09:39:08.161961-06:00',
//   },
//   {
//     id: 16,
//     name: 'c',
//     gender: 'm',
//     image: null,
//     image2: null,
//     is_active: true,
//     created_at: '2023-05-31T06:41:50.400785-06:00',
//     updated_at: '2023-05-31T06:41:50.400868-06:00',
//   },
// ]

setTimeout(() => {
  form.fields.name.placeholder = 'Vaya vaya'
}, 3000)
</script>
