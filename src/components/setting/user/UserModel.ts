import type { DataItem } from '@/components/base/BaseComponent.vue'
import type { Role } from '@/components/base/models/BaseModel'
import type { BaseRequestPageModel } from '@/components/base/models/request/BaseRequestModel'

export interface UserModel extends DataItem {
  fullname: string
  username: string
  staff_id: string
  email: string
  phone_number: string
  role_name: string
  roles: Role[]
  branch: Branches
  branches: string
  branch_id: string
  created_at: string
  locked: string

}

export interface UserFilter extends BaseRequestPageModel {
  fullname: string
  search_keyword: string
}

export interface Branches extends DataItem {
  branch_name: string
}

export interface UserModelRequest extends DataItem {
  fullname: string
  username: string
  staff_id: string
  email: string
  phone_number: string
  role_name: string
  roles: number[];
  branch: Branches
  branches: string
  branch_id: string
  created_at: string
  locked: string
}
