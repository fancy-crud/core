import { ISetListDataHandler, register } from '@fancy-crud/core'
import { SetListDataWithReactivityFormsHandler } from './set-list-data-with-reactivity-form'

register(ISetListDataHandler.name, SetListDataWithReactivityFormsHandler)
