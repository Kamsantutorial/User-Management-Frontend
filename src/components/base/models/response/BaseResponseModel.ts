import type { Menu, Permission, Role, User } from '../BaseModel'

export interface BaseResponse {
  status: string;
  message: string;
  code: string;
  body: any;
  data: any;
}

export interface BaseItemResponse {
  items: any
  page: number
  pages: number
  page_size: number
  total_records: number
}

export interface LoginResponse {
  access_token: string
}

export interface UserProfileResponse extends BaseResponse {
  body: UserProfile
}

export interface UserProfile {
  id: string
  name: string
  username: string
  roles: Role[]

  access_token: string
  token_type: string
  expires_in: number
  scope: string
  menus: Menu[]
  user: User
}

export interface CheckAccessTokenResponse {
  active: boolean
}
