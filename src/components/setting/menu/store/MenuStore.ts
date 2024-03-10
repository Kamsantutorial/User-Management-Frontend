import type { BaseResponse } from "@/components/base/models/BaseModel";
import { baseAPIStore } from "@/components/base/stores/BaseAPIStore";
import { defineStore } from "pinia"

export const MenuStore = defineStore('MenuStore', () => {

    const baseAPI = baseAPIStore()

    async function listParent(apiPath: string): Promise<BaseResponse> {
        const response: BaseResponse = await baseAPI.get(
            apiPath
        )
        return response
    }

    async function listMenus(apiPath: string): Promise<BaseResponse> {
        const response: BaseResponse = await baseAPI.get(
            apiPath
        )
        return response
    }

    async function listAllMenuTypes(apiPath: string): Promise<BaseResponse> {
        const response: BaseResponse = await baseAPI.get(
            apiPath
        )
        return response
    }

    return {
        listParent,
        listMenus,
        listAllMenuTypes
    }
});