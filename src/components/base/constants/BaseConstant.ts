import type { SelectProps } from "ant-design-vue";
import { ref } from 'vue'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
export const AUTH_TOKEN = 'your_token_here'
export const USER_SESSION_KEY = 'user'
export const TOKEN_SESSION_KEY = 'token'
export const MENU_SESSION_KEY = 'menu'

export const IS_ACTIVE = ref<SelectProps['options']>([
    {
        value: 1,
        label: 'SUCCESS'
    },
    {
        value: 0,
        label: 'PENDING'
    },
    {
        value: 3,
        label: 'FAILED'
    }
])


export const KHQR_STATUS = ref<SelectProps['options']>([
    {
        value: null,
        label: 'ALL'
    },
    {
        value: 1,
        label: 'SUCCESS'
    },
    {
        value: 0,
        label: 'PENDING'
    },
    {
        value: 3,
        label: 'FAILED'
    }
])

export const EMAIL_STATUS = ref<SelectProps['options']>([
    {
        value: 0,
        label: 'PENDING'
    },
    {
        value: 1,
        label: 'SUCCESS'
    },
    {
        value: 2,
        label: 'FAILED'
    },
    {
        value: 3,
        label: 'ALL'
    }
])

export const PAYMENT_STATUS = ref<SelectProps['options']>([
    {
        value: 'ALL',
        label: 'ALL'
    },
    {
        value: 'SUCCESS',
        label: 'SUCCESS'
    },
    {
        value: 'FAILED',
        label: 'FAILED'
    },
    {
        value: 'PENDING',
        label: 'PENDING'
    }
])

export const CURENCY = ref<SelectProps['options']>([
    {
        value: 'USD',
        label: 'USD'
    },
    {
        value: 'KHR',
        label: 'KHR'
    }
])
