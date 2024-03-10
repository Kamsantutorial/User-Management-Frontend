import type { DataItem } from '@/components/base/BaseComponent.vue'
import type { BaseRequestPageModel } from '@/components/base/models/request/BaseRequestModel'

export interface PermissionModel extends DataItem {
  permission_name: string
  type: string
  menu_id: string
  menu: Menus
}

export interface PermissionFilter extends BaseRequestPageModel {
  permission_name: string
  search_keyword: string
}

export interface Menus extends DataItem {
  menu_name: string
}
