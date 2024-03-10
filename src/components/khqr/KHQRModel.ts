import type { DataItem } from '../base/BaseComponent.vue'
import type { BaseRequestPageModel } from '../base/models/request/BaseRequestModel';

export interface Khqr extends DataItem {
  amount: number;
  currency: string
  image_path: string
  transaction_date: string;
  created_at: string;
  khqr_status: number;
  customer: Customer;
}

export interface Customer {
  id: number;
  customer_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  agreement_code: string;
  is_active: boolean;
}

export interface KHQRFilter extends BaseRequestPageModel {
  from?: string;
  to? : string;
  search_keyword?: string;
  khqr_status?: number | null;
  transaction_date?: string;
}

export interface CustomerFilter extends BaseRequestPageModel {
  search_keyword: string;
}

export interface KHQRCreateRequest {
  amount: number;
  currency: string
  customer: CustomerRequest;
  is_active: boolean,
}

export interface KHQRUpdateRequest {
  id: string;
  amount: number;
  currency: string
  customer: CustomerRequest;
}

export interface CustomerRequest {
  customer_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  agreement_code: string;
}

export interface SentMailRequest {
[x: string]: any;
  customer_id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  agreement_code: string
  khqr_id: string
  image_url: string
}
