<template>
  <BaseComponent @on-init="onInitList" @show-form-detail="showDetail" @show-form-update="showUpdate"
    @on-search="onInitList" :page-title="'Branch'"
    v-if="hasAccess('VIEW_BRANCH') || hasAccess('CREATE_BRANCH') || hasAccess('UPDATE_BRANCH')">
    <template #header>
      <a-row>
        <a-col :span="18">
          <a-button type="primary" @click="showAdd()" v-if="hasAccess('CREATE_BRANCH')">
            <template #icon>
              <PlusOutlined />
            </template>
            Add new
          </a-button>
        </a-col>
        <a-col :span="6">
          <a-input-search v-model:value="searchValue" placeholder="input search text" enter-button="Search"
            @search="onInitList()" />
        </a-col>
      </a-row>
    </template>

    <template #formAdd>
      <a-row>
        <a-row class="row-layout">
          <a-col class="first-col-layout"><span class="text-danger">*</span>Code</a-col>
          <a-col class="second-col-layout">
            <a-form-item v-bind="validateInfos.branch_code"
              @blur="validate('branch_code', { trigger: 'blur' }).catch(() => { })">
              <a-input v-model:value="required.branch_code" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="row-layout">
          <a-col class="first-col-layout"><span class="text-danger">*</span>Name</a-col>
          <a-col class="second-col-layout">
            <a-form-item v-bind="validateInfos.branch_name"
              @blur="validate('branch_name', { trigger: 'blur' }).catch(() => { })">
              <a-input v-model:value="required.branch_name" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-row>
      <a-divider></a-divider>
      <a-row style="margin-left: 30%">
        <a-col><a-button type="primary" @click.prevent="onSubmit">Save</a-button></a-col>
        <a-col><a-button style="margin-left: 10px" @click="showListing()">Back</a-button></a-col>
      </a-row>
    </template>

    <template #formUpdate>
      <a-row>
        <a-input v-model:value="required.id" hidden />
        <a-row class="row-layout">
          <a-col class="first-col-layout"><span class="text-danger">*</span>Code</a-col>
          <a-col class="second-col-layout">
            <a-form-item v-bind="validateInfos.branch_code"
              @blur="validate('branch_code', { trigger: 'blur' }).catch(() => { })">
              <a-input v-model:value="required.branch_code" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="row-layout">
          <a-col class="first-col-layout"><span class="text-danger">*</span>Name</a-col>
          <a-col class="second-col-layout">
            <a-form-item v-bind="validateInfos.branch_name"
              @blur="validate('branch_name', { trigger: 'blur' }).catch(() => { })">
              <a-input v-model:value="required.branch_name" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-row>
      <a-divider></a-divider>
      <a-row style="margin-left: 30%">
        <a-col><a-button type="primary" @click.prevent="onSubmit"
            v-if="hasAccess('UPDATE_BRANCH')">Save</a-button></a-col>
        <a-col><a-button style="margin-left: 10px" @click="showListing()">Back</a-button></a-col>
      </a-row>
    </template>

    <template #detail>
      <a-descriptions>
        <!-- <a-descriptions-item label="ID">{{ item?.id }}</a-descriptions-item> -->
        <a-descriptions-item label="Code">{{ item?.branch_code }}</a-descriptions-item>
        <a-descriptions-item label="Name">{{ item?.branch_name }}</a-descriptions-item>
        <a-descriptions-item label="Status">
          <a-tag v-if="item?.is_active == 1" class="success">ACTIVE</a-tag>
          <a-tag v-else-if="item?.is_active == 0" class="pending">INACTIVE</a-tag>
          <a-tag v-else class="success">ACTIVE</a-tag>
        </a-descriptions-item>
      </a-descriptions>
      <a-divider></a-divider>

      <a-space>
        <a-button @click="showListing()">Back</a-button>
      </a-space>
    </template>
  </BaseComponent>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useForm } from 'ant-design-vue/lib/form'
import BaseComponent from '../components/base/BaseComponent.vue'
import { shareBaseStore } from '@/components/base/stores/BaseComponentStore'
import { storeToRefs } from 'pinia'
import type { BranchFilter } from '@/components/setting/branch/BranchModel'
import { API_CREATE_BRANCH, API_LIST_BRANCH, API_UPDATE_BRANCH } from '@/components/base/constants/APIEndpoint'
import { accessRightStore } from '@/components/base/stores/BaseAccessRightStore'

/**
 * Stores
 * */
const { hasAccess } = accessRightStore()
//base store
const baseStore = shareBaseStore()

const {
  stopLoading,
  startLoading,
  showFormAdd,
  showFormDetail,
  showFormUpdate,
  showListing,
  onSearch,
  onCreate,
  onDelete,
  onUpdate,
  onListing,
  alert,
  clearSearch,
  onInit
} = baseStore

//assign variable to refs
const {
  isShowFormUpdate,
  isShowDetail,
  isShowFormAdd,
  isShowListing,
  searchValue,
  isLoading,
  item,
  itemList,
  page,
  size,
  tableActions,
  tableColumns,
} = storeToRefs(baseStore)
//end base store

/**
 * initail state
 * */
page.value = 1
size.value = 10

let filter = reactive<BranchFilter>({
  search_keyword: searchValue.value,
  branch_name: searchValue.value,
  page: page.value,
  size: size.value
})

let required = reactive({
  branch_name: '',
  branch_code: '',
  id: '',
});

tableColumns.value = [
  {
    title: 'CODE',
    dataIndex: 'branch_code'
  },
  {
    title: 'NAME',
    dataIndex: 'branch_name'
  },
  {
    title: 'STATUS',
    dataIndex: 'is_active'
  },
  {
    title: 'ACTION',
    dataIndex: 'action'
  }
]

tableActions.value = ['view']
if (hasAccess("UPDATE_BRANCH")) {
  tableActions.value.push("edit")
}

const onInitList = () => {
  filter = reactive<BranchFilter>({
    search_keyword: searchValue.value,
    branch_name: searchValue.value,
    page: page.value,
    size: size.value
  })
  onInit(filter, API_LIST_BRANCH)
  clearSearch()
}

onInitList();

/**
 * initail methods
 * */
const showAdd = () => {
  required.branch_code = ''
  required.branch_name = ''
  showFormAdd()
}

const showUpdate = (obj: any) => {
  if (obj) {
    required.id = obj.id
    required.branch_code = obj.branch_code
    required.branch_name = obj.branch_name
    showFormUpdate(obj)
  }
}

const showDetail = (obj: any) => {
  showFormDetail(obj)
}

/**
 * form validation
 * */
const rulesRef = reactive({
  branch_code: [
    {
      required: true,
      message: 'Please input code',
    },
    {
      max: 10,
      message: 'Length less then 10',
      trigger: 'blur',
    },
  ],
  branch_name: [
    {
      required: true,
      message: 'Please input name',
    },
    {
      max: 150,
      message: 'Length less then 150',
      trigger: 'blur',
    },
  ],

});

const { validate, validateInfos } = useForm(required, rulesRef)

/**
 * form action
 * */
const onSubmit = () => {
  //startLoading()
  validate()
    .then((res: any) => {
      console.log(res, item.value)

      if (isShowFormAdd.value) {
        const req = reactive({
          branch_code: required.branch_code,
          branch_name: required.branch_name
        })
        onCreate(req, API_CREATE_BRANCH)
          .then((response) => {
            console.log('Create Sumitted .....', response)
            if (response.code == '200') {
              alert("success", "Success", "Branch has been created succesfully.")
              showListing();
            } else if (response.code == '409') {
              alert("error", "Error", "Branch is existed.")
            }
            onInitList();
          })
          .catch((error) => {
            stopLoading()
            alert("error", "Error", error)
          })
      } else if (isShowFormUpdate.value) {
        onUpdate(required, required?.id, API_UPDATE_BRANCH)
          .then((response) => {
            console.log('Update Sumitted .....', response)
            if (response.code == '200') {
              alert("success", "Success", "Branch has been updated succesfully.")
              showListing();
            } else if (response.code == '409') {
              alert("error", "Error", "Branch is existed.")
            }
            onInitList();
          })
          .catch((error) => {
            stopLoading()
            alert("error", "Error", error)
          })
      }
    })
    .catch((err: any) => {
      console.log('error', err)
    })
}
</script>
