import type { CheckTokenRequest, LoginRequest, LoginResponse, Menu } from '../models/BaseModel'
import { USER_SESSION_KEY, AUTH_TOKEN, API_BASE_URL } from '../constants/BaseConstant'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../utils/SessionStorageUtil'
import { defineStore } from 'pinia'
import type { CheckAccessTokenResponse, UserProfile } from '../models/response/BaseResponseModel'
import { baseAPIStore } from './BaseAPIStore'
import { API_LOGIN } from '../constants/APIEndpoint'
import axios from 'axios'
import { ref } from "vue"

/**
 * base auth store contain all state relate to Authorization of user
 */
export const baseAuthStore = defineStore('baseAuthStore', () => {
  const baseAPI = baseAPIStore()
  const loginError = ref()

  async function login(username: string, password: string): Promise<LoginResponse> {
    const user: LoginRequest = {
      username: username,
      password: password,
      client_id: import.meta.env.VITE_CLIENT_ID,
      client_secret: import.meta.env.VITE_CLEINT_SECRET,
      grant_type: 'password'
    }
    const response: LoginResponse = await baseAPI.postLogin(user, API_LOGIN)
    if (response?.access_token) {
      if (response) {
        setLocalStorage(response, USER_SESSION_KEY)
        setLocalStorage(response.access_token, AUTH_TOKEN)
        return response
      } else {
        return response
      }
    } else {
      // Login failed
      return response
    }
  }

  function isAuthorized(): boolean {
    const userInfo = getLocalStorage(USER_SESSION_KEY)
    return !!userInfo
  }

  function isTokenValid() {
    const req: CheckTokenRequest = {
      token: getLocalStorage(AUTH_TOKEN)
    }
    postCheckToken(req, "oauth/check_token").then(res => {
      if (!res.active) {
        removeLocalStorage(USER_SESSION_KEY)
        window.location.href = '/login'
      }
      console.log("reponse", res.active)
      return res.active;
    }).catch(err => {
      console.log("error", err)
      if (err.response.data.error == "invalid_token") {
        removeLocalStorage(USER_SESSION_KEY)
        window.location.href = '/login'
      }
    });
  }

  function logout(): boolean {
    removeLocalStorage(USER_SESSION_KEY)
    return true
  }

  function getUserSession(): UserProfile {
    const userInfo: UserProfile = getLocalStorage(USER_SESSION_KEY)
    return userInfo
  }

  function getUserMenuSession(): Menu[] {
    const userInfo: UserProfile = getLocalStorage(USER_SESSION_KEY)
    if (userInfo) {
      const routes: Menu[] = userInfo.menus
      return routes
    } else {
      return []
    }
  }

  async function getUserInfo(): Promise<UserProfile> {
    const userInfo: UserProfile = getLocalStorage(USER_SESSION_KEY)
    if (userInfo) {
      return userInfo
    } else {
      return userInfo;
    }
  }

  return {
    login,
    logout,
    getUserMenuSession,
    getUserSession,
    fetchRoutes,
    isTokenValid,
    loginError
  }
})


/**
 * base function use outside component
 */
export function isAuthorized(): boolean {
  const userInfo = getLocalStorage(USER_SESSION_KEY)
  return !!userInfo
}

const apiCheckToken = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    common: {
      Authorization: `Basic ${window.btoa('admin' + ':' + 'admin@123')}`
    }
  }
})

async function postCheckToken(request: any, urlPath: string): Promise<CheckAccessTokenResponse> {
  const res = await apiCheckToken.post<any>(`${API_BASE_URL}${urlPath}`, request, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
  return res.data
}

export function isTokenValid() {
  const req: CheckTokenRequest = {
    token: getLocalStorage(AUTH_TOKEN)
  }
  postCheckToken(req, "oauth/check_token").then(res => {
    if (!res.active) {
      removeLocalStorage(USER_SESSION_KEY)
      window.location.href = '/login'
    }
    console.log("reponse", res.active)
    return res.active;
  }).catch(err => {
    console.log("error", err)
    if (err.response.data.error == "invalid_token") {
      removeLocalStorage(USER_SESSION_KEY)
      window.location.href = '/login'
    }
  });
}

export async function getUserInfo(): Promise<UserProfile> {
  const userInfo: UserProfile = getLocalStorage(USER_SESSION_KEY)
  if (userInfo) {
    isTokenValid()
    return userInfo
  } else {
    return userInfo;
  }
}

export async function fetchRoutes(): Promise<Menu[]> {
  if (isAuthorized()) {
    const userProfile = await getUserInfo()
    if (userProfile) {
      const routes: Menu[] = userProfile.menus
      return routes
    } else {
      return []
    }
  } else {
    return []
  }
}
