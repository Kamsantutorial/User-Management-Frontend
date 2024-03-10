import type { BaseResponse } from "@/components/base/models/BaseModel";
import { baseAPIStore } from "@/components/base/stores/BaseAPIStore";
import { defineStore } from "pinia"

export const RoleStore = defineStore('RoleStore', () => {

    const baseAPI = baseAPIStore()

    async function listAllRoles(apiPath: string): Promise<BaseResponse> {
        const response: BaseResponse = await baseAPI.get(
            apiPath
        )
        return response
    }
    return {
        listAllRoles
    }
});