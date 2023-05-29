import type { HandleRequestStatusCodes } from '@/http/axioma'

const defaults: { classes: Record<string, string> } = {
  classes: {
    // text: 'text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
    // text: 'col-span-12',
    // date: 'text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
    // password: 'text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
    // select: 'text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
    // checkbox: 'w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600',
    // radio: 'w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600',
    // textarea: 'block p-2.5 w-full text-sm text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
    // color: 'text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
    // file: 'block w-full text-sm text-gray-900 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400',
    // image: 'block w-full text-sm text-gray-900 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400',
    mainButton: 'bg-primary-500 text-white rounded-lg hover:shadow-md',
    auxButton: 'border ml-4 rounded-lg bg-transparent text-primary-500 border-primary-500 px-8 hover:bg-primary-50',
  },
}

export const fields: Record<string, any> = {
}

export const utils = {
  button: {},
  modal: {},
}

const statusCodes: HandleRequestStatusCodes = {}

export function setDefaultClasses(classes: { [k: string]: string }) {
  Object.assign(defaults.classes, classes)
}

export function getDefaults() {
  return defaults
}

export function getStatusCodesHandlers() {
  return statusCodes
}

export function setStatusCodesHandlers(handlers: HandleRequestStatusCodes) {
  Object.assign(statusCodes, handlers)
}

export function setFields(newFields: unknown) {
  Object.assign(fields, newFields)
}

export function setUtils(newUtils: unknown) {
  Object.assign(utils, newUtils)
}
