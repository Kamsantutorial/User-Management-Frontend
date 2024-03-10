import type { DataItem } from '@/components/base/BaseComponent.vue'
import type { BaseRequestPageModel } from '@/components/base/models/request/BaseRequestModel'

export interface RoleModel extends DataItem {
  id: string
  role_name: string
  permissions: []
}

export interface RoleFilter extends BaseRequestPageModel {
  role_name: string
  search_keyword: string
}