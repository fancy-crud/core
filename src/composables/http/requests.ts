import _ from 'lodash'
import { effect, reactive, ref } from '@vue/reactivity'
import { AxiosInstance, AxiosResponse } from "axios";

import { Form, FormModes, NormalizedFields, NormalizedFieldStructure, RecordManager } from "@/types";
import { CreateRequest, DeleteRequest, RetrieveRequest, SameAPIEndpoint as SameAPIEndpoint, UpdateRequest, GetListRequest } from "@/types";
import { getFormData } from '..';

export const http = {
  axios: {} as AxiosInstance,
  pagination: {
    results: 'results',
    count: 'count'
  }
}

function getPaginationResultsKey(data: any) {
  const splittedKey = http.pagination.results.split('.')
  return splittedKey.reduce((accum, key) => accum[key], data)
}

function getPaginationCountKey(data: any) {
  const splittedKey = http.pagination.count.split('.')
  return splittedKey.reduce((accum, key) => accum[key], data)
}

export function setHttpConfig(options: unknown) {
  Object.assign(http, options)
}

export function buildURL({
  url,
  lookupValue,
}: {
  url: string;
  lookupValue?: string | number;
}): string {
  let result: string;

  if (url.endsWith("/")) {
    result = [url + String(lookupValue || ''), ""].join("/");
  } else {
    result = [url, String(lookupValue || '')].join("/");
  }

  return result.replaceAll('//', '/');
}

function _getSameAPIEndpoint(fields: NormalizedFields) {
  const fieldsEntries = Object.entries<NormalizedFieldStructure>(fields)
  const sameAPIEndpoint: SameAPIEndpoint = {};
  fieldsEntries.forEach(([fieldKey, field]) => {
    if (!field.url) return false

    const fieldUrl = field.url
    const fieldParams = field.filterParams || {}

    let stringFieldParams = (
      new URLSearchParams(fieldParams as Record<string, string>)
    ).toString()

    stringFieldParams = stringFieldParams.split('&').sort().join('&')

    let urlTracked = fieldUrl

    if (stringFieldParams) {
      urlTracked = `${ fieldUrl }?${stringFieldParams}`
    }
    const isUrlTracked = Object.prototype.hasOwnProperty.call(sameAPIEndpoint, urlTracked)
    
    if (!isUrlTracked) {
      sameAPIEndpoint[urlTracked] = []
    }

    sameAPIEndpoint[urlTracked].push(fieldKey)
    return true
  });

  return sameAPIEndpoint
}

export function addOptionsToField(field: NormalizedFieldStructure, data: any) {
  const options: any[] = field.options || []

  const addOptionsItems = (items: any[]) => {
    items.forEach(item => {
      const result = options.find(option => _.isEqual(option, item))
      
      if (!result) {
        options.push(item)
      }
    })
  }
  
  if (Array.isArray(data)) {
    addOptionsItems(data)
  }
  else {
    addOptionsItems(
      getPaginationResultsKey(data)
    )
  }
  9
  return options
}

export function getForeignKeys(fields: NormalizedFields): void {
  const sameAPIEndpoint: SameAPIEndpoint = _getSameAPIEndpoint(fields);

  Object.entries(sameAPIEndpoint).forEach(([url, fieldKeys]) => {
    http.axios.get(url).then(({ data }) => {
      fieldKeys.forEach(fieldKey => {
        fields[fieldKey].options = addOptionsToField(fields[fieldKey], data)
      })
    })
    .catch((e) => console.log(e));
  })
}

export async function createRecord({ url, form }: CreateRequest) {
  let response: AxiosResponse;

  try {
    response = await http.axios.post(url, form);
  } catch (error) {
    throw { isActionSucceed: false, value: error }
  }

  return { isActionSucceed: true, value: response };
}

export async function updateRecord({ url, form, lookupValue }: UpdateRequest) {
  const _url = buildURL({ url, lookupValue })
  let response: any

  try {
    response = await http.axios.patch(_url, form)
  } catch (error: unknown) {
    throw { isActionSucceed: false, value: error }
  }

  return { isActionSucceed: true, value: response }
}

export async function retrieveRecord({ url, lookupValue }: RetrieveRequest) {
  const _url = buildURL({ url, lookupValue })
  let response: AxiosResponse;

  try {
    response = await http.axios.get(_url)
  } catch (error) {
    throw { isActionSucceed: false, value: error }
  }

  return { isActionSucceed: true, value: response }
}

export async function deleteRecord(settings: DeleteRequest) {
  const { url, lookupValue, fieldName, hardDelete } = settings

  const requestHardDelete = async () => {
    let response: AxiosResponse;

    try {
      const _url = buildURL({ url, lookupValue })
      response = await http.axios.delete(_url)
    } catch (error) {
      throw { isActionSucceed: false, value: error }
    }

    return { isActionSucceed: true, value: response }
  }

  const requestSoftDelete = async () => {
    if (!fieldName) {
      throw new Error('Field parameter is required when hardDelete is false')
    }

    let response: AxiosResponse

    try {
      const _url = buildURL({ url, lookupValue })
      response = await http.axios.patch(_url, { [fieldName]: false })
    } catch (error) {
      throw { isActionSucceed: false, value: error }
    }

    return { isActionSucceed: true, value: response }
  }

  if (hardDelete) {
    return await requestHardDelete()
  }

  return await requestSoftDelete()
}

export async function triggerCreateOrUpdate(form: Form) {
  const mode = form.settings.mode
  const record = form.record || {}
  const { jsonForm, formData } = getFormData(form)
  let _formData = formData ? formData : jsonForm

  
  const request = {
    url: form.settings.url,
    form: _formData,
    lookupValue: record[form.settings.lookupField]
  }

  const modes: {[k: string]: typeof createRecord | typeof updateRecord} = {
    [FormModes.CREATE_MODE]: createRecord,
    [FormModes.UPDATE_MODE]: updateRecord
  }

  const dispatchRequest = modes[mode || FormModes.CREATE_MODE]
  
  let response = await dispatchRequest(request)
  return response
}

export function getRecords(args: GetListRequest): RecordManager {
  const { url, _search, initialFilterParams } = args

  const loading = ref(false)
  const search = ref(_search || '')

  const pagination = reactive(
    Object.assign({ page: 1, rowsPerPage: 10, count: 10 }, args.pagination || {})
  )

  const filterParams = reactive(initialFilterParams || {})

  const list = reactive({
    unmutedItems: [] as unknown[],
    items: [] as unknown[]
  })

  const setDataList = (data: any) => {
    if (Array.isArray(data)) {
      list.items = data
      pagination.count = data.length
      return
    }

    const results = getPaginationResultsKey(data)
    const count = getPaginationCountKey(data)

    list.items = results
    pagination.count = count
  }

  const fetchItems = (page=1) => {
    const params = {
      limit: pagination.rowsPerPage,
      search: search.value,
      offset: 0,
      ...filterParams
    }
  
    const offset = (page - 1) * params.limit
  
    if (offset > 0) {
      params.offset = offset
    }

    loading.value = true

    http.axios.get(url, { params })
    .then(({ data }) => setDataList(data))
    .finally(() => loading.value = false)
  }

  const resetPagination = () => {
    pagination.page = 1
    fetchItems()
  }

  effect(() => JSON.stringify(filterParams), {
    scheduler: resetPagination
  })

  effect(() => search.value, { scheduler: resetPagination })

  effect(() => pagination.page, { scheduler: () => fetchItems(pagination.page) })

  return {
    filterParams,
    pagination,
    fetchItems,
    search,
    loading,
    list
  }
}
