<template>
  <BaseComponent @on-init="onInitList()" @show-form-detail="showFormDetail" @show-form-update="showUpdate"
    :page-title="'Permission'"
    v-if="hasAccess('VIEW_PERMISSION') || hasAccess('CREATE_PERMISSION') || hasAccess('UPDATE_PERMISSION')">
    <template #header>
      <a-row>
        <a-col :span="18">
          <a-button type="primary" @click="addNew()" v-if="hasAccess('CREATE_PERMISSION')">
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
          <a-col class="first-col-layout">
            <div>
              <span class="text-danger">*</span>
              <label>Permission Name</label>
            </div>
          </a-col>
          <a-col class="second-col-layout">
            <a-form-item v-bind="validateInfos.permission_name"
              @blur="validate('branch_code', { trigger: 'blur' }).catch(() => { })">
              <a-input v-model:value="required.permission_name" />
            </a-form-item>
          </a-col>
        </a-row>
        <!-- <a-row class="row-layout">
          <a-col class="first-col-layout">
            <label style="margin-left: 10px">Permission Type</label>
          </a-col>
          <a-col class="second-col-layout">
            <a-form-item>
              <a-input v-model:value="item.type" />
            </a-form-item>
          </a-col>
        </a-row> -->
        <a-row class="row-layout">
          <a-col class="first-col-layout">
            <label style="margin-left: 10px">Menu</label>
          </a-col>
          <a-col style="width: 35%">
            <a-form-item>
              <a-select ref="select" v-model:value="menuObject" @change="selectChange">
                <a-select-option v-for="menu in menus" :value="menu.id">{{ menu.menu_name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="row-layout">
          <a-col style="width: 19.4%; margin-left: 10px">Status</a-col>
          <a-col style="width: 35%">
            <a-form-item>
              <a-switch v-model:checked="status.is_active" checked-children="Active" un-checked-children="In-Active" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-row>
      <a-divider></a-divider>
      <a-row style="margin-left: 30%">
        <a-col><a-button type="primary" @click.prevent="onSubmit">Save</a-button></a-col>
        <a-col><a-button style="margin-left: 10px" @click="back()">Back</a-button></a-col>
      </a-row>
    </template>

    <template #formUpdate>
      <a-row>
        <a-input v-model:value="item.id" hidden />
        <a-row class="row-layout">
          <a-col class="first-col-layout">
            <div>
              <span class="text-danger">*</span>
              <label>Permission Name</label>
            </div>
          </a-col>
          <a-col class="second-col-layout">
            <a-form-item v-bind="validateInfos.permission_name"
              @blur="validate('branch_code', { trigger: 'blur' }).catch(() => { })">
              <a-input v-model:value="required.permission_name" />
            </a-form-item>
          </a-col>
        </a-row>
        <!-- <a-row class="row-layout">
          <a-col class="first-col-layout">
            <label style="margin-left: 10px">Permission Type</label>
          </a-col>
          <a-col class="second-col-layout">
            <a-form-item>
              <a-input v-model:value="item.type" />
            </a-form-item>
          </a-col>
        </a-row> -->
        <a-row class="row-layout">
          <a-col class="first-col-layout">
            <label style="margin-left: 10px">Menu</label>
          </a-col>
          <a-col style="width: 35%">
            <a-form-item>
              <a-select ref="select" v-model:value="menuObject" @change="selectChange">
                <a-select-option v-for="menu in menus" :value="menu.id">{{ menu.menu_name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="row-layout">
          <a-col style="width: 19.4%; margin-left: 10px">Status</a-col>
          <a-col style="width: 35%">
            <a-form-item>
              <a-switch v-model:checked="item.is_active" checked-children="Active" un-checked-children="In-Active" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-row>
      <a-divider></a-divider>
      <a-row style="margin-left: 30%">
        <a-col><a-button type="primary" @click.prevent="onSubmit"
            v-if="hasAccess('UPDATE_PERMISSION')">Save</a-button></a-col>
        <a-col><a-button style="margin-left: 10px" @click="back()">Back</a-button></a-col>
      </a-row>
    </template>

    <template #detail>
      <a-descriptions>
        <!-- <a-descriptions-item label="ID">{{ item?.id }}</a-descriptions-item> -->
        <a-descriptions-item label="Permission Name">{{ item?.permission_name }}</a-descriptions-item>
        <!-- <a-descriptions-item label="Type">{{ item?.type }}</a-descriptions-item> -->
        <a-descriptions-item label="Menu">{{ item?.menu?.menu_name }}</a-descriptions-item>
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
import { reactive, ref } from 'vue'
import { useForm } from 'ant-design-vue/lib/form'
import BaseComponent from '../components/base/BaseComponent.vue'
import { shareBaseStore } from '@/components/base/stores/BaseComponentStore'
import { storeToRefs } from 'pinia'
import type { PermissionModel, PermissionFilter } from '@/components/setting/permission/PermissionModel'
import { API_CREATE_PERMISSION, API_LIST_PERMISSION, API_UPDATE_PERMISSION, API_LIST_ALL_MENU } from '@/components/base/constants/APIEndpoint'
import { MenuStore } from '@/components/setting/menu/store/MenuStore'
import type { MenuModel } from '@/components/setting/menu/MenuModel'
import { accessRightStore } from '@/components/base/stores/BaseAccessRightStore'

/**
 * Stores
 * */
const { hasAccess } = accessRightStore()

const menuStore = MenuStore()

const {
  listMenus
} = menuStore

// declare
const menus = ref<MenuModel[]>([])

let menuObject = ref()

listMenus(API_LIST_ALL_MENU).then((response) => {
  menus.value = response.body
})

const selectChange = (value: number) => {
  item.value.menu_id = value
};

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
  tableColumns
} = storeToRefs(baseStore)
//end base store

page.value = 1
size.value = 10

let filter = reactive<PermissionFilter>({
  search_keyword: searchValue.value,
  permission_name: searchValue.value,
  page: page.value,
  size: size.value
})

tableColumns.value = [
  {
    title: 'Permission Name',
    dataIndex: 'permission_name'
  },
  // {
  //   title: 'Type',
  //   dataIndex: 'type'
  // },
  {
    title: 'Menu',
    dataIndex: ['menu', 'menu_name'],
  },
  {
    title: 'Status',
    dataIndex: 'is_active'
  },
  {
    title: 'Action',
    dataIndex: 'action'
  }
]

tableActions.value = ['view']
if (hasAccess("UPDATE_PERMISSION")) {
  tableActions.value.push("edit")
}

const onInitList = () => {
  filter = reactive<PermissionFilter>({
    search_keyword: searchValue.value,
    permission_name: searchValue.value,
    page: page.value,
    size: size.value
  })
  onInit(filter, API_LIST_PERMISSION)
  clearSearch()
}

onInitList();

let required = reactive({
  permission_name: '',
  id: '',
});

const status = ref({
  is_active: true
});

const addNew = () => {
  required.permission_name = ''
  menuObject.value = []
  status.value.is_active = true
  showFormAdd()
}

const showUpdate = (object: PermissionModel) => {
  required.id = object.id
  required.permission_name = object.permission_name
  menuObject.value = ''
  if (object.menu != null) {
    menuObject = ref({
      value: object.menu.id,
      label: object.menu.menu_name
    })
  }
  item.value = object
  if (object.menu != null) {
    item.value.menu_id = object.menu.id
  } else {
    item.value.menu_id = null
  }
  showFormUpdate(object)
}

const back = () => {
  menuObject.value = ''
  onInitList()
  showListing()
}

const rulesRef = reactive({
  permission_name: [
    {
      required: true,
      message: 'Please input Permission Name',
    },
    {
      max: 100,
      message: 'Length less then 100',
      trigger: 'blur',
    },
  ]
});

const { validate, validateInfos } = useForm(required, rulesRef)

const onSubmit = () => {
  //startLoading()
  validate()
    .then((res: any) => {
      console.log(res, item.value)

      if (isShowFormAdd.value) {
        const reqCreate = reactive({
          permission_name: required.permission_name,
          type: item.value.type,
          menu_id: item.value.menu_id,
          is_active: status.value.is_active
        })
        onCreate(reqCreate, API_CREATE_PERMISSION)
          .then((response) => {
            console.log('Create Sumitted .....', response)
            if (response.code == '200') {
              alert("success", "Success", "Permission has been created succesfully.")
              showListing();
            } else {
              alert("error", "Error", "Error")
            }
            onInitList();
          })
          .catch((error) => {
            stopLoading()
            alert("error", "Error", error)
          })
      } else if (isShowFormUpdate.value) {
        const reqUpdate = reactive({
          permission_name: item.value.permission_name,
          type: item.value.type,
          menu_id: item.value.menu_id,
          is_active: item.value.is_active,
          id: item.value.id,
        })
        onUpdate(reqUpdate, reqUpdate?.id, API_UPDATE_PERMISSION)
          .then((response) => {
            console.log('Update Sumitted .....', response)
            if (response.code == '200') {
              alert("success", "Success", "Permission has been updated succesfully.")
              showListing();
            } else {
              alert("error", "Error", "Error")
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
