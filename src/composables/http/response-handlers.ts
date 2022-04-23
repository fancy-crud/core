import { AxiosResponse } from "axios"
import { Form } from "@/types"
// import { errorNotification } from "../notifications"

export function handleBadRequest(form: Form, data?: any) {
  if (!data) return

  Object.entries(data).forEach(([fieldKey, value]) => {
    let messageError = ''
    if (Array.isArray(value) && value.length) {
      messageError = value[0]
    }
    else {
      messageError = (value as string)
    }

    form.fields[fieldKey].errors = [messageError]
  })
}

// export function handlePermission() {
// }

export function handleUnknownError(_form: Form, _data?: any) {
  // errorNotification({
  //   message: 'Ha ocurrido un error inesperado, por favor contacte con soporte técnico para dar seguimiento'
  // })
}

export function handleErrorRequest(form: Form, error?: AxiosResponse) {
  if (!error) {
    handleUnknownError(form)
    return
  }

  const statusCode: {[k: number]: any} = {
    400: handleBadRequest,
    // 401: handlePermission,
    500: handleUnknownError
  }

  const handler = statusCode[error.status || 500]
  handler(form, error.data)
}