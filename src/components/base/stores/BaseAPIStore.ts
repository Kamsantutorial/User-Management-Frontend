import axios from 'axios'
import { API_BASE_URL, AUTH_TOKEN } from '../constants/BaseConstant'
import type { BaseResponse, LoginResponse } from '../models/BaseModel'
import { defineStore, storeToRefs } from 'pinia'
import { getLocalStorage } from '../utils/SessionStorageUtil'
import router from '@/router'
import { ref } from "vue"
import { shareBaseStore } from './BaseComponentStore'

export const interceptorsStore = defineStore('interceptorsStore', () => {
   const errorMessage = ref()
   return {
    errorMessage
   }
})

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    common: {
      Authorization: `Bearer ${getLocalStorage(AUTH_TOKEN)}`
    }
  }
})

api.interceptors.response.use(
  response => response,
  error => {

    console.log("error", error)
    if (error.response.status === 401) {
      window.location.href = '/login?error=' + error;
      interceptorsStore().$state.errorMessage = error
    } else if(error.response.status === 400) {
      router.replace({ path: '/login', query: { error: error?.response?.data?.error_description }})
      interceptorsStore().$state.errorMessage = error?.response?.data?.error_description 
    }
  });

const apiCheckToken = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    common: {
      Authorization: `Basic ${window.btoa('admin' + ':' + 'admin@123')}`
    }
  }
})

/*
 * base store call API using axios
 * */
export const baseAPIStore = defineStore('baseAPIStore', () => {

  async function postCreate(request: any, urlPath: string): Promise<BaseResponse> {
    const res = await api.post<any>(`${API_BASE_URL}${urlPath}`, request)
    return res.data
  }

  async function postCheckToken(request: any, urlPath: string): Promise<BaseResponse> {
    const res = await apiCheckToken.post<any>(`${API_BASE_URL}${urlPath}`, request)
    return res.data
  }

  async function postLogin(request: any, urlPath: string): Promise<LoginResponse> {
    const res = await api.post<any>(`${API_BASE_URL}${urlPath}`, request, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
    return res?.data
  }


  async function postUpdate(request: any, urlPath: string): Promise<BaseResponse> {
    const res = await api.post<any>(`${API_BASE_URL}${urlPath}`, request)
    return res.data
  }

  async function postDelete(urlPath: string): Promise<BaseResponse> {
    const res = await api.post<any>(`${API_BASE_URL}${urlPath}`)
    return res.data
  }

  async function getWithPage(urlPath: string, params?: any): Promise<BaseResponse> {
    const res = await api.get<any>(`${API_BASE_URL}${urlPath}`, { params })
    return res.data
  }

  async function getDetail(urlPath: string, id?: string): Promise<BaseResponse> {
    const url = id ? `${API_BASE_URL}${urlPath}/${id}` : `${API_BASE_URL}${urlPath}`
    const res = await api.get<any>(url)
    return res.data
  }

  async function get(urlPath: string): Promise<BaseResponse> {
    const url = `${API_BASE_URL}${urlPath}`
    const res = await api.get<any>(url)
    return res.data
  }

  async function getWithParam(params: any, urlPath: string): Promise<BaseResponse> {
    const url = `${API_BASE_URL}${urlPath}`
    const res = await api.get<any>(url, { params })
    return res.data
  }

  async function getListing(request: any, urlPath: string): Promise<BaseResponse> {
    const url = `${API_BASE_URL}${urlPath}`
    const res = await api.get<any>(url, { params: request })
    return res.data
  }

  return {
    get,
    getWithParam,
    getDetail,
    getListing,
    getWithPage,
    postCreate,
    postUpdate,
    postDelete,
    postLogin,
    postCheckToken
  }
})

// Use outside component
export async function get(urlPath: string): Promise<any> {
  const url = `${API_BASE_URL}${urlPath}`
  const res = await api.get<any>(url)
  return res.data
}
