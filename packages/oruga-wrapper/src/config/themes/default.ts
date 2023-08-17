export const defaultCustomization: Record<string, Record<string, unknown> & { wrapper?: { class: string }; class: string }> = {
  text: {
    wrapper: { class: 'col-span-12' },
    class: '',
  },
  date: {
    wrapper: { class: 'col-span-12' },
    class: '',
  },
  password: {
    wrapper: { class: 'col-span-12' },
    class: '',
  },
  select: {
    wrapper: { class: 'col-span-12' },
    class: 'w-full',
  },
  checkbox: {
    wrapper: { class: 'col-span-12' },
    class: 'f-field__checkbox',
  },
  radio: {
    wrapper: { class: 'col-span-12' },
    class: 'f-field__radio',
  },
  textarea: {
    wrapper: { class: 'col-span-12' },
    class: '',
  },
  color: {
    wrapper: { class: 'col-span-12' },
    class: '',
  },
  file: {
    wrapper: { class: 'col-span-12' },
    class: '',
  },
  image: {
    wrapper: { class: 'col-span-12' },
    class: '',
  },
  mainButton: {
    class: 'f-form-footer__button f-form-footer__button--main',
    outlined: true,
  },
  auxButton: {
    class: 'f-form-footer__button f-form-footer__button--aux',
    outlined: true,
  },
}

export const orugaDefaultCustomization = {
  field: {
    labelClass: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
  },
  input: {
    inputClass: 'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light',
  },
  checkbox: {
    checkClass: 'w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800',
  },
  radio: {
    checkClass: 'w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600',
  },
}
