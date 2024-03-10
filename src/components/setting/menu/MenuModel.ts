import type { DataItem } from '@/components/base/BaseComponent.vue'
import type { BaseRequestPageModel } from '@/components/base/models/request/BaseRequestModel'

export interface MenuModel extends DataItem {
  menu_name: string
  order_by: string
  url: string
  icon: string
  parent_id: string
  parent: Parent
}

export interface MenuFilter extends BaseRequestPageModel {
  menu_name: string
  search_keyword: string
}

export interface Parent extends DataItem {
  menu_name: string
}
