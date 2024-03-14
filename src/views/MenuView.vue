<template>
  <BaseComponent
    @on-init="onInitList()"
    @show-form-detail="showFormDetail"
    @show-form-update="showUpdate"
    :page-title="'Menu'"
    v-if="hasAccess('VIEW_MENU') || hasAccess('CREATE_MENU') || hasAccess('UPDATE_MENU')"
  >
    <template #header>
      <a-row>
        <a-col :span="18">
          <a-button type="primary" @click="addNew()" v-if="hasAccess('CREATE_MENU')">
            <template #icon>
              <PlusOutlined />
            </template>
            Add new
          </a-button>
        </a-col>
        <a-col :span="6">
          <a-input-search
            v-model:value="searchValue"
            placeholder="input search text"
            enter-button="Search"
            @search="onInitList()"
          />
        </a-col>
      </a-row>
    </template>

    <template #formAdd>
      <a-row>
        <a-row class="row-layout">
          <a-col class="first-col-layout">
            <div>
              <span class="text-danger">*</span>
              <label>Menu Name</label>
            </div>
          </a-col>
          <a-col class="second-col-layout">
            <a-form-item
              v-bind="validateInfos.menu_name"
              @blur="validate('menu_name', { trigger: 'blur' }).catch(() => {})"
            >
              <a-input v-model:value="required.menu_name" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="row-layout">
          <a-col class="first-col-layout">
            <div>
              <span class="text-danger">*</span>
              <label>Url</label>
            </div>
          </a-col>
          <a-col class="second-col-layout">
            <a-form-item
              v-bind="validateInfos.url"
              @blur="validate('url', { trigger: 'blur' }).catch(() => {})"
            >
              <a-input v-model:value="required.url" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="row-layout">
          <a-col class="first-col-layout">
            <div>
              <span class="text-danger">*</span>
              <label>Order</label>
            </div>
          </a-col>
          <a-col class="second-col-layout">
            <a-form-item
              v-bind="validateInfos.order_by"
              @blur="validate('order_by', { trigger: 'blur' }).catch(() => {})"
            >
              <a-input-number v-model:value="required.order_by" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="row-layout">
          <a-col class="first-col-layout">
            <div>
              <span class="text-danger">*</span>
              <label>Icon</label>
            </div>
          </a-col>
          <a-col class="second-col-layout">
            <a-form-item
              v-bind="validateInfos.icon"
              @blur="validate('icon', { trigger: 'blur' }).catch(() => {})"
            >
              <a-input v-model:value="required.icon" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="row-layout">
          <a-col class="first-col-layout">
            <label style="margin-left: 10px">Parent</label>
          </a-col>
          <a-col style="width: 45%">
            <a-form-item>
              <a-select ref="select" v-model:value="parentObject" @change="selectChange">
                <a-select-option v-for="par in parent" :key="par.id" :value="par.id">{{
                  par.menu_name
                }}</a-select-option>
              </a-select>
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
              <label>Menu Name</label>
            </div>
          </a-col>
          <a-col class="second-col-layout">
            <a-form-item
              v-bind="validateInfos.menu_name"
              @blur="validate('menu_name', { trigger: 'blur' }).catch(() => {})"
            >
              <a-input v-model:value="required.menu_name" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="row-layout">
          <a-col class="first-col-layout">
            <div>
              <span class="text-danger">*</span>
              <label>Url</label>
            </div>
          </a-col>
          <a-col class="second-col-layout">
            <a-form-item
              v-bind="validateInfos.url"
              @blur="validate('url', { trigger: 'blur' }).catch(() => {})"
            >
              <a-input v-model:value="required.url" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="row-layout">
          <a-col class="first-col-layout">
            <div>
              <span class="text-danger">*</span>
              <label>Order</label>
            </div>
          </a-col>
          <a-col class="second-col-layout">
            <a-form-item
              v-bind="validateInfos.order_by"
              @blur="validate('order_by', { trigger: 'blur' }).catch(() => {})"
            >
              <a-input-number v-model:value="required.order_by" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="row-layout">
          <a-col class="first-col-layout">
            <div>
              <span class="text-danger">*</span>
              <label>Icon</label>
            </div>
          </a-col>
          <a-col class="second-col-layout">
            <a-form-item
              v-bind="validateInfos.icon"
              @blur="validate('icon', { trigger: 'blur' }).catch(() => {})"
            >
              <a-input v-model:value="required.icon" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="row-layout">
          <a-col class="first-col-layout">
            <label style="margin-left: 10px">Parent</label>
          </a-col>
          <a-col style="width: 45%">
            <a-form-item>
              <a-select ref="select" v-model:value="parentObject" @change="selectChange">
                <a-select-option v-for="par in parent" :key="par.id" :value="par.id">{{
                  par.menu_name
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-row>
      <a-divider></a-divider>
      <a-row style="margin-left: 30%">
        <a-col
          ><a-button type="primary" @click.prevent="onSubmit" v-if="hasAccess('UPDATE_MENU')"
            >Save</a-button
          ></a-col
        >
        <a-col><a-button style="margin-left: 10px" @click="back()">Back</a-button></a-col>
      </a-row>
    </template>

    <template #detail>
      <a-descriptions>
        <!-- <a-descriptions-item label="ID">{{ item?.id }}</a-descriptions-item> -->
        <a-descriptions-item label="Menu Name">{{ item?.menu_name }}</a-descriptions-item>
        <a-descriptions-item label="Parent">{{ item?.parent?.menu_name }}</a-descriptions-item>
        <a-descriptions-item label="Order">{{ item?.order_by }}</a-descriptions-item>
        <a-descriptions-item label="Icon">{{ item?.icon }}</a-descriptions-item>
        <a-descriptions-item label="Url">{{ item?.url }}</a-descriptions-item>
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
import { onUnmounted, reactive, ref } from 'vue'
import { useForm } from 'ant-design-vue/lib/form'
import BaseComponent from '../components/base/BaseComponent.vue'
import { shareBaseStore } from '@/components/base/stores/BaseComponentStore'
import { storeToRefs } from 'pinia'
import type { MenuFilter, MenuModel } from '@/components/setting/menu/MenuModel'
import {
  API_CREATE_MENU,
  API_LIST_MENU,
  API_UPDATE_MENU,
  API_LIST_PARENTS
} from '@/components/base/constants/APIEndpoint'
import { MenuStore } from '@/components/setting/menu/store/MenuStore'
import { accessRightStore } from '@/components/base/stores/BaseAccessRightStore'

/**
 * Stores
 * */
const { hasAccess } = accessRightStore()

// declare parent
const parent = ref<MenuModel[]>([])

let parentObject = ref()

const menuStore = MenuStore()

//base store
const baseStore = shareBaseStore()

const { listParent } = menuStore

listParent(API_LIST_PARENTS).then((response) => {
  parent.value = response.body
})

const selectChange = (value: number) => {
  console.log(`selected ${value}`)
  item.value.parent_id = value
}

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

const back = () => {
  parentObject.value = ''
  showListing()
}

const addNew = () => {
  required.menu_name = ''
  required.url = ''
  required.order_by = ''
  required.icon = ''
  showFormAdd()
}

let filter = reactive<MenuFilter>({
  search_keyword: searchValue.value,
  menu_name: searchValue.value,
  page: page.value,
  size: size.value
})

tableColumns.value = [
  {
    title: 'Menu Name',
    dataIndex: 'menu_name'
  },
  {
    title: 'Parent',
    dataIndex: ['parent', 'menu_name']
  },
  {
    title: 'Order',
    dataIndex: 'order_by'
  },
  {
    title: 'Icon',
    dataIndex: 'icon'
  },
  {
    title: 'Url',
    dataIndex: 'url'
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
if (hasAccess('UPDATE_MENU')) {
  tableActions.value.push('edit')
}

const onInitList = () => {
  filter = reactive<MenuFilter>({
    search_keyword: searchValue.value,
    menu_name: searchValue.value,
    page: page.value,
    size: size.value
  })
  onInit(filter, API_LIST_MENU)
  clearSearch()
}

onInitList()

const showUpdate = (object: MenuModel) => {
  required.id = object.id
  required.menu_name = object.menu_name
  required.url = object.url
  required.order_by = object.order_by
  required.icon = object.icon

  parentObject.value = ''
  if (object.parent != null) {
    parentObject = ref({
      value: object.parent.id,
      label: object.parent.menu_name
    })
  }
  item.value = object
  if (object.parent != null) {
    item.value.parent_id = object.parent.id
  } else {
    item.value.parent_id = null
  }
  showFormUpdate(object)
}

let required = reactive({
  menu_name: '',
  url: '',
  order_by: '',
  icon: '',
  id: ''
})

const rulesRef = reactive({
  menu_name: [
    {
      required: true,
      message: 'Please input Menu Name'
    },
    {
      max: 100,
      message: 'Length less then 100',
      trigger: 'blur'
    }
  ],
  url: [
    {
      required: true,
      message: 'Please input Url'
    },
    {
      max: 255,
      message: 'Length less then 255',
      trigger: 'blur'
    }
  ],
  order_by: [
    {
      required: true,
      message: 'Please input Order'
    }
    // {
    //   max: 20,
    //   message: 'Length less then 20',
    //   trigger: 'blur',
    // },
  ],
  icon: [
    {
      required: true,
      message: 'Please input Icon'
    },
    {
      max: 255,
      message: 'Length less then 255',
      trigger: 'blur'
    }
  ]
})

const { validate, validateInfos } = useForm(required, rulesRef)

const onSubmit = () => {
  //startLoading()
  validate()
    .then((res: any) => {
      console.log(res, item.value)
      if (isShowFormAdd.value) {
        const reqCreate = reactive({
          menu_name: required.menu_name,
          url: required.url,
          order_by: required.order_by,
          icon: required.icon,
          parent_id: item.value.parent_id
        })
        onCreate(reqCreate, API_CREATE_MENU)
          .then((response) => {
            console.log('Create Sumitted .....', response)
            if (response.code == '200') {
              alert('success', 'Success', 'Menu has been created succesfully.')
              showListing()
            } else if (response.code == '409') {
              alert('error', 'Error', 'Menu is existed or Menu url is duplicated to other menus')
            }
            onInitList()
          })
          .catch((error) => {
            stopLoading()
            alert('error', 'Error', error)
          })
      } else if (isShowFormUpdate.value) {
        const reqUpdate = reactive({
          id: item.value.id,
          menu_name: required.menu_name,
          url: required.url,
          order_by: required.order_by,
          icon: required.icon,
          parent_id: item.value.parent_id
        })
        onUpdate(reqUpdate, reqUpdate?.id, API_UPDATE_MENU)
          .then((response) => {
            console.log('Update Sumitted .....', response)
            if (response.code == '200') {
              alert('success', 'Success', 'Menu has been updated succesfully.')
              showListing()
            } else if (response.code == '409') {
              alert('error', 'Error', 'Menu is existed or Menu url is duplicated to other menus.')
            }
            onInitList()
          })
          .catch((error) => {
            stopLoading()
            alert('error', 'Error', error)
          })
      }
    })
    .catch((err: any) => {
      console.log('error', err)
    })
}
</script>
