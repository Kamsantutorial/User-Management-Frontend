import { defineStore } from 'pinia'
import { baseAPIStore } from './BaseAPIStore'
import { ref } from 'vue'
import { accessRightStore } from './BaseAccessRightStore'
import type { BaseItemResponse } from '../models/response/BaseResponseModel'
import type { BaseResponse } from '../models/BaseModel'
import type { TableColumn } from '../BaseComponent.vue'
import { notification } from 'ant-design-vue'

/**
 * base compoent store to use for base component
 * of each component that contain basic CRUD function
 */
export const shareBaseStore = defineStore('shareBaseStore', () => {

  const baseAPI = baseAPIStore()
  /**
   * controll form state
   */
  const isShowFormAdd = ref(false)
  const isShowFormUpdate = ref(false)
  const isShowListing = ref(true)
  const isShowDetail = ref(false)
  /**
   * end controll form state
   */
  const isLoading = ref(true)
  /**
   * CRUD object
   */
  const item = ref()
  const itemList = ref()
  const tableColumns = ref<TableColumn[]>([])
  const tableActions = ref<string[]>(['detail', 'edit', 'delete'])
  /**
   * end CRUD object
   */
  const baseResponseItems = ref<BaseItemResponse>() //base API response
  const searchValue = ref('')
  /**
   * Pagination
   */
  const page = ref(1)
  const size = ref(10)

  const { hasAccess } = accessRightStore()

  function showFormAdd() {
    isShowFormAdd.value = true
    isShowDetail.value = false
    isShowFormUpdate.value = false
    isShowListing.value = false
    item.value = ref<any>({})
  }

  function showFormUpdate(obj: any) {
    isShowFormAdd.value = false
    isShowDetail.value = false
    isShowFormUpdate.value = true
    isShowListing.value = false
    item.value = obj
  }

  function showFormDetail(obj: any) {
    isShowFormAdd.value = false
    isShowDetail.value = true
    isShowFormUpdate.value = false
    isShowListing.value = false
    item.value = obj
  }

  function showListing() {
    isShowFormAdd.value = false
    isShowDetail.value = false
    isShowFormUpdate.value = false
    isShowListing.value = true
  }

  function onSearch() {
  };

  function onPageChange(pageNum: number) {
    page.value = pageNum;
  }

  function onInit(filter: any, apiPath: string) {
    isLoading.value = true
    onListing(filter, apiPath).then(response => {
      itemList.value = response?.body?.items
      baseResponseItems.value = response?.body
      isLoading.value = false
    })
  }

  function clearSearch() {
    searchValue.value = ''
  }

  async function onCreate(object: any, path: string = ''): Promise<BaseResponse> {
    return await baseAPI.postCreate(object, path)
  }

  async function onUpdate(object: any, id: string, path: string = ''): Promise<BaseResponse> {
    return await baseAPI.postUpdate(object, path + `/${id}`)
  }

  async function onDelete(id: string, path: string = ''): Promise<BaseResponse> {
    return await baseAPI.postDelete(path + `/${id}`)
  }

  async function onListing(object: any, path: string = ''): Promise<BaseResponse> {
    const response: BaseResponse = await baseAPI.getListing(
      object,
      path
    )
    return response
  }

  async function onGetOne(path: string = ''): Promise<BaseResponse> {
    const response: BaseResponse = await baseAPI.get(
      path
    )
    return response
  }

  async function onGetOneWithParam(object: any, path: string = ''): Promise<BaseResponse> {
    const response: BaseResponse = await baseAPI.getWithParam(
      object,
      path
    )
    return response
  }

  function startLoading() {
    isLoading.value = true
  }

  function stopLoading() {
    isLoading.value = false
  }

  function alert(type: string, message: string, description: string) {
    (notification as any)[type]({
      message: message,
      description: description,
    });
  };

  function $reset() {
    isShowFormAdd.value = false
    isShowDetail.value = false
    isShowFormUpdate.value = false
    isShowListing.value = true
    item.value = ref()
    itemList.value = []
  }

  // expose all available function
  return {
    onListing,
    onGetOne,
    onGetOneWithParam,
    showFormAdd,
    showFormDetail,
    showFormUpdate,
    showListing,
    onSearch,
    onCreate,
    onDelete,
    onUpdate,
    startLoading,
    stopLoading,
    hasAccess,
    alert,
    $reset,
    onPageChange,
    clearSearch,
    onInit,
    isLoading,
    isShowFormUpdate,
    isShowDetail,
    isShowFormAdd,
    isShowListing,
    searchValue,
    baseResponseItems,
    item,
    itemList,
    page,
    size,
    tableColumns,
    tableActions
  }
})
