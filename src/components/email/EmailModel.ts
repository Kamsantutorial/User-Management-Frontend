import type { DataItem } from '@/components/base/BaseComponent.vue'
import type { BaseRequestPageModel } from '@/components/base/models/request/BaseRequestModel'

export interface EmailModel extends DataItem {
  customer_id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  type: string
  sent_date: string
  transaction_date: string
  email_status: number
}

export interface EmailFilter extends BaseRequestPageModel {
  search_keyword?: string;
  email_status?: number;
  transaction_date?: string;
}
