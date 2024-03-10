import type { DataItem } from '@/components/base/BaseComponent.vue'
import type { BaseRequestPageModel } from '@/components/base/models/request/BaseRequestModel'

export interface BranchModel extends DataItem {
  branch_name: string;
  branch_code: string;
}

export interface BranchFilter extends BaseRequestPageModel {
  branch_name: string;
  search_keyword: string;
}
