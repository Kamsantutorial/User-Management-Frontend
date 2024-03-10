export interface BaseResponse {
  status: string
  message: string
  code: string
  body: any
  data: any
}

export interface User {
  id: string
  name: string
  username?: string
  email: string
  roles: Role[]
  branch: string
  status: string
  fullname: string
}

export interface Role {
  id: number
  role_name: string
}

export interface Permission {
  permission_name: string
}

export interface LoginRequest {
  username: string
  password: string
  client_id: string
  client_secret: string
  grant_type: string
}

export interface CheckTokenRequest {
  token: string
}

export interface Menu {
  id: string
  path: string
  redirect?: string
  component: string
  name: string
  icon: string
  children?: Menu[]
  permissions?: Permission[]
}

export interface RoleMenu {
  menu: Menu
  role: Role
}

export interface LoginResponse {
  access_token: string
  error: string
  error_message: string
}
