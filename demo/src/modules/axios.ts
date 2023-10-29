'use strict'

import axios from 'axios'
export { AxiosResponse } from 'axios'

const hostname = window.location.hostname
const protocol = window.location.protocol
const baseURL = import.meta.env.DEV ? `${protocol}//${hostname}:9000/api` : `${protocol}//${hostname}/server/api`

const _axios = axios.create({ baseURL })

_axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token && config.headers)
      config.headers.Authorization = `Bearer ${token}`

    return config
  },

  (error) => {
    localStorage.clear()
    return Promise.reject(error)
  },
)

// Add a response interceptor
_axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response
  },

  (error) => {
    const originalRequest = error.config
    if (error.response && error.response.status === 401) {
      // store.dispatch('auth/logout')
      return Promise.reject(new Error('Credenciales expiradas'))
    }

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem('refresh_token')

      return axios.post('auth/token/', {
        grant_type: 'refresh_token',
        client_id: '',
        client_secret: '',
        refresh_token: refreshToken,
      }).then((response) => {
        // if (response.status === 201) {
        localStorage.setItem('access_token', response.data.access)
        if (axios.defaults.headers)
          axios.defaults.headers.common.Authorization = `Bearer ${response.data.access}`

        return axios(originalRequest)
        // }
      })
    }
    return Promise.reject(error)
  },
)

export function setCredentials({ access_token, refresh_token }: { access_token: string; refresh_token: string }) {
  localStorage.setItem('access_token', access_token)
  localStorage.setItem('refresh_token', refresh_token)

  if (_axios.defaults && _axios.defaults.headers)
    _axios.defaults.headers.common.Authorization = `Bearer ${access_token}`
}

export default _axios
