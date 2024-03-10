import type { DataItem } from '@/components/base/BaseComponent.vue'
import type { BaseRequestPageModel } from '@/components/base/models/request/BaseRequestModel'

export interface TransactionModel extends DataItem {
  from_bank: string
  from_name: string
  from_account: string
  amount: string
  currency: string
  phone_number: string
  to_bank: string
  to_name: string
  to_account: string
  transaction_id: string
  created_at: string
  payment_status: string
}

export interface TransactionFilter extends BaseRequestPageModel {
  fromDate?: string;
  toDate?: string;
  search_keyword?: string;
  payment_status?: string | null;
}