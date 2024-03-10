<template>
  <BaseComponent @on-init="onInitList()" @show-form-detail="showFormDetail" @show-form-add="showFormAdd"
    @show-form-update="showUpdate" v-if="hasAccess('VIEW_ROLE') || hasAccess('CREATE_ROLE') || hasAccess('UPDATE_ROLE')">
    <template #header>
      <a-row>
        <a-col :span="18">
          <a-button type="primary" @click="showFormAdd()" v-if="hasAccess('CREATE_ROLE')">
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
          <a-col class="first-col-layout"><span class="text-danger">*</span>Role Name</a-col>
          <a-col style="width: 50%">
            <a-form-item v-bind="validateInfos.role_name"
              @blur="validate('role_name', { trigger: 'blur' }).catch(() => { })">
              <a-input v-model:value="required.role_name" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-col>
          <a-checkbox-group v-model:value="permissionObject" @change="" style="width: 100%">
            <div v-for="menu in menus" :key="menu.id">
              <a-row>
                <a-col :span="24">
                  <strong>{{ menu.menu_name }}</strong>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="24" style="margin-bottom: 10px;margin-top: 10px;">
                  <a-row>
                    <a-col style="margin-bottom: 10px;margin-top: 10px;" v-for="permission in menu.permissions" :span="8">
                      <a-checkbox :key="permission.id" :value="permission.id">
                        {{ permission.permission_name }}
                      </a-checkbox>
                    </a-col>
                  </a-row>
                </a-col>
              </a-row>
            </div>
          </a-checkbox-group>
        </a-col>
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
          <a-col class="first-col-layout"><span class="text-danger">*</span>Role Name</a-col>
          <a-col style="width: 50%">
            <a-form-item v-bind="validateInfos.role_name"
              @blur="validate('role_name', { trigger: 'blur' }).catch(() => { })">
              <a-input v-model:value="required.role_name" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-col>
          <a-checkbox-group v-model:value="permissionObject" @change="" style="width: 100%">
            <div v-for="menu in menus" :key="menu.id">
              <a-row>
                <a-col :span="24">
                  <strong>{{ menu.menu_name }}</strong>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="24" style="margin-bottom: 10px;margin-top: 10px;">
                  <a-row>
                    <a-col style="margin-bottom: 10px;margin-top: 10px;" v-for="permission in menu.permissions" :span="8">
                      <a-checkbox :key="permission.id" :value="permission.id">
                        {{ permission.permission_name }}
                      </a-checkbox>
                    </a-col>
                  </a-row>
                </a-col>
              </a-row>
            </div>
          </a-checkbox-group>
        </a-col>
      </a-row>
      <a-divider></a-divider>
      <a-row style="margin-left: 30%">
        <a-col><a-button type="primary" @click.prevent="onSubmit" v-if="hasAccess('UPDATE_ROLE')">Save</a-button></a-col>
        <a-col><a-button style="margin-left: 10px" @click="back()">Back</a-button></a-col>
      </a-row>
    </template>

    <template #detail>
      <a-descriptions>
        <!-- <a-descriptions-item label="ID">{{ item?.id }}</a-descriptions-item> -->
        <a-descriptions-item label="Role Name">{{ item?.role_name }}</a-descriptions-item>
        <a-descriptions-item label="Status">
          <a-tag v-if="item?.is_active == 1" class="success">ACTIVE</a-tag>
          <a-tag v-else-if="item?.is_active == 0" class="pending">INACTIVE</a-tag>
          <a-tag v-else class="success">ACTIVE</a-tag>
        </a-descriptions-item> </a-descriptions>
      <a-divider></a-divider>

      <a-space>
        <a-button @click="showListing()">Back</a-button>
      </a-space>
    </template>
  </BaseComponent>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useForm } from 'ant-design-vue/lib/form'
import BaseComponent from '../components/base/BaseComponent.vue'
import { shareBaseStore } from '@/components/base/stores/BaseComponentStore'
import { storeToRefs } from 'pinia'
import type { RoleFilter } from '@/components/setting/role/RoleModel'
import { API_CREATE_ROLE, API_LIST_ROLE, API_UPDATE_ROLE, API_LIST_MENU_TYPES } from '@/components/base/constants/APIEndpoint'
import { MenuStore } from '@/components/setting/menu/store/MenuStore';
import { type RoleModel } from '@/components/setting/role/RoleModel';
import { accessRightStore } from '@/components/base/stores/BaseAccessRightStore'

/**
 * Stores
 * */
const { hasAccess } = accessRightStore()

const menuStore = MenuStore()
const { listAllMenuTypes } = menuStore

const menus = ref<any[]>([])

listAllMenuTypes(API_LIST_MENU_TYPES).then((response) => {
  menus.value = response.body
});

let permissionObject = ref<any[]>([])

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

const back = () => {
  permissionObject.value = []
  showListing()
}

const showUpdate = (object: RoleModel) => {
  required.role_name = object.role_name
  permissionObject.value = []
  if (object.permissions != null) {
    object.permissions.forEach((element: any) => {
      permissionObject.value.push(element.id);
    });
  }
  showFormUpdate(object)
}

let filter = reactive<RoleFilter>({
  search_keyword: searchValue.value,
  role_name: searchValue.value,
  page: page.value,
  size: size.value
})

tableColumns.value = [
  {
    title: 'Role Name',
    dataIndex: 'role_name'
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
if (hasAccess("UPDATE_ROLE")) {
  tableActions.value.push("edit")
}

const onInitList = () => {
  filter = reactive<RoleFilter>({
    search_keyword: searchValue.value,
    role_name: searchValue.value,
    page: page.value,
    size: size.value
  })
  onInit(filter, API_LIST_ROLE)
  clearSearch()
}

onInitList();

let required = reactive({
  role_name: '',
  id: '',
});

const rulesRef = reactive({
  role_name: [
    {
      required: true,
      message: 'Please input Role Name',
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
      const req = reactive({
        role_name: required.role_name,
        permissions: permissionObject.value,
        id: item.value.id,
        status: item.value.status
      })
      if (isShowFormAdd.value) {
        onCreate(req, API_CREATE_ROLE)
          .then((response) => {
            console.log('Create Sumitted .....', response)
            alert("success", "Success", "Role has been created succesfully.")
            showListing();
            onInitList();
          })
          .catch((error) => {
            stopLoading()
            alert("error", "Error", error)
          })
      } else if (isShowFormUpdate.value) {
        console.log('2') // not selected

        onUpdate(req, req?.id, API_UPDATE_ROLE)
          .then((response) => {
            console.log('Update Sumitted .....', response)
            alert("success", "Success", "Role has been updated succesfully.")
            showListing();
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
