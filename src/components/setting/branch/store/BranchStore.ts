import type { BaseResponse } from "@/components/base/models/BaseModel";
import { baseAPIStore } from "@/components/base/stores/BaseAPIStore";
import { defineStore } from "pinia"

export const BranchStore = defineStore('BranchStore', () => {

    const baseAPI = baseAPIStore()

    async function listAllBranches(apiPath: string): Promise<BaseResponse> {
        const response: BaseResponse = await baseAPI.get(
            apiPath
        )
        return response
    }
    return {
        listAllBranches
    }
});