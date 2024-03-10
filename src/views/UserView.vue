<template>
  <BaseComponent @on-init="onInitList" @show-form-add="showAdd" @show-form-detail="showFormDetail"
    @on-delete="showFormDelete" @show-form-update="showUpdate" :page-title="'User'"
    v-if="hasAccess('VIEW_USER') || hasAccess('CREATE_USER') || hasAccess('UPDATE_USER')">
    <template #header>
      <a-row>
        <a-col :span="18">
          <a-button type="primary" @click="showAdd" v-if="hasAccess('CREATE_USER')">
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
          <a-col class="first-col-layout"><span class="text-danger">*</span>Username</a-col>
          <a-col class="second-col-layout">
            <a-form-item v-bind="validateInfos.username"
              @blur="validate('username', { trigger: 'blur' }).catch(() => { })">
              <a-input placeholder="Username" v-model:value="required.username" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="row-layout">
          <a-col style="width: 19.2%; margin-left: 10px">Full Name</a-col>
          <a-col class="second-col-layout">
            <a-form-item>
              <a-input placeholder="Full Name" v-model:value="item.fullname" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="row-layout">
          <a-col style="width: 19.2%; margin-left: 10px">Phone Number</a-col>
          <a-col class="second-col-layout">
            <a-form-item>
              <a-input placeholder="Phone Number" v-model:value="item.phone_number" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="row-layout">
          <a-col style="width: 19.2%; margin-left: 10px">Email</a-col>
          <a-col class="second-col-layout">
            <a-form-item>
              <a-input placeholder="Email" v-model:value="item.email" />
            </a-form-item>
          </a-col>
        </a-row>
        <!-- <a-row class="row-layout">
          <a-col class="first-col-layout"><span class="text-danger">*</span>Branch</a-col>
          <a-col style="width: 35%">
            <a-form-item v-bind="validateInfos.branchObject">
              <a-select ref="select" v-model:value="required.branchObject" @change="selectChangeBranch">
                <a-select-option v-for="branch in branches" :value="branch.id">{{ branch.branch_name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col><span class="text-danger">*</span>
        </a-row> -->
        <a-row class="row-layout">
          <a-col class="first-col-layout"><span class="text-danger">*</span>Roles</a-col>
          <a-col style="width: 45%">
            <a-form-item v-bind="validateInfos.roleObject">
              <a-select ref="select" placeholder="--Select Role--"  v-model:value="required.roleObject" @change="selectChangeRole" mode="multiple">
                <a-select-option v-for="role in roles" :value="role.id">{{ role.role_name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="row-layout">
          <a-col class="first-col-layout"><span class="text-danger">*</span>Password</a-col>
          <a-col class="second-col-layout">
            <a-form-item>
              <a-input-password placeholder="input password" v-model:value="item.password" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="row-layout">
          <a-col class="first-col-layout"><span class="text-danger">*</span>Confirm Password</a-col>
          <a-col class="second-col-layout">
            <a-form-item>
              <a-input-password placeholder="input confirm password" v-model:value="item.confirm_password" />
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
          <a-col class="first-col-layout"><span class="text-danger">*</span>User Name</a-col>
          <a-col class="second-col-layout">
            <a-form-item v-bind="validateInfos.username"
              @blur="validate('username', { trigger: 'blur' }).catch(() => { })">
              <a-input v-model:value="required.username" :disabled="'true'" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="row-layout">
          <a-col style="width: 19.2%; margin-left: 10px">Phone Number</a-col>
          <a-col class="second-col-layout">
            <a-form-item>
              <a-input v-model:value="item.phone_number" />
            </a-form-item>
          </a-col>
        </a-row>
        <!-- <a-row class="row-layout">
          <a-col class="first-col-layout"><span class="text-danger">*</span>Branch</a-col>
          <a-col style="width: 35%">
            <a-form-item v-bind="validateInfos.branchObject">
              <a-select ref="select" v-model:value="required.branchObject" @change="selectChangeBranch">
                <a-select-option v-for="branch in branches" :value="branch.id">{{ branch.branch_name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row> -->
        <a-row class="row-layout">
          <a-col class="first-col-layout"><span class="text-danger">*</span>Roles</a-col>
          <a-col style="width: 35%">
            <a-form-item v-bind="validateInfos.roleObject">
              <a-select ref="select" v-model:value="required.roleObject" @change="selectChangeRole" mode="multiple">
                <a-select-option v-for="role in roles" :value="role.id">{{ role.role_name }}</a-select-option>
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
        <a-row class="row-layout">
          <a-col style="width: 19.4%; margin-left: 10px">Locked</a-col>
          <a-col style="width: 35%">
            <a-form-item>
              <a-switch v-model:checked="item.locked" checked-children="Locked" un-checked-children="Un-Lock" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-row>
      <a-divider></a-divider>
      <a-row style="margin-left: 30%">
        <a-col><a-button type="primary" @click.prevent="onSubmit" v-if="hasAccess('UPDATE_USER')">Save</a-button></a-col>
        <a-col><a-button style="margin-left: 10px" @click="back()">Back</a-button></a-col>
      </a-row>
    </template>

    <template #detail>
      <a-descriptions>
        <!-- <a-descriptions-item label="ID">{{ item?.id }}</a-descriptions-item> -->
        <a-descriptions-item label="Full Name">{{ item?.fullname }}</a-descriptions-item>
        <a-descriptions-item label="User Name">{{ item?.username }}</a-descriptions-item>
        <a-descriptions-item label="Staff ID">{{ item?.staff_id }}</a-descriptions-item>
        <a-descriptions-item label="Email">{{ item?.email }}</a-descriptions-item>
        <a-descriptions-item label="Phone Number">{{ item?.phone_number }}</a-descriptions-item>
        <a-descriptions-item label="Role"><a-badge v-for="tag in item.roles"
            style="background-color: green; border-radius: 5px;" :count="tag?.role_name?.toUpperCase()">
          </a-badge></a-descriptions-item>
        <a-descriptions-item label="Branch">{{ item?.branch?.branch_name }}</a-descriptions-item>
        <a-descriptions-item label="Create Date">{{ item?.created_at }}</a-descriptions-item>
        <a-descriptions-item label="Locked">{{ item?.locked }}</a-descriptions-item>
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
  <template>
    <div>
      <a-modal v-model:visible="showDialog" @ok="handleOk">
        <p>Are you sure you want to delete?</p>
      </a-modal>
    </div>
  </template>
  <div v-if="state.loading">
    <LoadingView />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useForm } from 'ant-design-vue/lib/form'
import BaseComponent from '../components/base/BaseComponent.vue'
import { shareBaseStore } from '@/components/base/stores/BaseComponentStore'
import { storeToRefs } from 'pinia'
import type { UserFilter, UserModel } from '@/components/setting/user/UserModel'
import type { BranchModel } from '@/components/setting/branch/BranchModel'
import { BranchStore } from '@/components/setting/branch/store/BranchStore'
import { RoleStore } from '@/components/setting/role/store/RoleStore'
import type { RoleModel } from '@/components/setting/role/RoleModel'
import { API_CREATE_USER, API_LIST_USER, API_UPDATE_USER, API_LIST_ALL_BRANCH, API_LIST_ALL_ROLES, API_DELETE_USER } from '@/components/base/constants/APIEndpoint'
import { accessRightStore } from '@/components/base/stores/BaseAccessRightStore'
import LoadingView from '@/components/base/components/loading/LoadingView.vue'

const state = reactive({
  loading: false,
});

const showDialog = ref(false);
let currentId: any = null;

const showFormDelete = (id: any) => {
  currentId = id;
  showDialog.value = true;
}

const handleOk = () => {
  onDelete(currentId, API_DELETE_USER).then((response) => {
    if (response.code == '200') {
      showDialog.value = false;
      alert("success", "Success", "User has been deleted succesfully.")
      onInitList();
    }
  })
};

/**
 * Stores
 * */
const { hasAccess } = accessRightStore()

const branchStore = BranchStore()

const {
  listAllBranches
} = branchStore

// declare
const branches = ref<BranchModel[]>([])

let branchObject = ref()

let roleObject = ref<any[]>([])

listAllBranches(API_LIST_ALL_BRANCH).then((response) => {
  branches.value = response.data
})

// role
const roleStore = RoleStore()

const {
  listAllRoles
} = roleStore

// declare role
const roles = ref<RoleModel[]>([])

listAllRoles(API_LIST_ALL_ROLES).then((response) => {
  roles.value = response.body
})

const selectChangeBranch = (value: number) => {
  item.value.branch_id = value
};

const selectChangeRole = (values: string[]) => {
  item.value.roles = []
  values.forEach((id: string) => {
    let role = roles.value.find(role => role.id === id);
    item.value.roles.push(role);
  })
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

const back = () => {
  branchObject.value = ''
  onInitList()
  showListing()
}

const showUpdate = (object: UserModel) => {
  branchObject.value = ''
  if (object.branch != null) {
    branchObject = ref({
      value: object.branch.id,
      label: object.branch.branch_name
    })
  }

  item.value = object
  item.value.branch_id = object.branch.id

  roleObject.value = []
  required.roleObject = []
  if (object.roles != null) {
    object.roles.forEach((element: any) => {
      required.roleObject.push(element?.id);
    });
  }

  required.id = object.id
  required.username = object.username
  //required.branchObject = object.branch_id
  showFormUpdate(object)
}

const showAdd = () => {
  required.username = ''
  //required.branchObject = ''
  required.roleObject = []
  roleObject = ref([])
  item.value = ref<UserModel>()
  showFormAdd()
}

let filter = reactive<UserFilter>({
  search_keyword: searchValue.value,
  fullname: searchValue.value,
  page: page.value,
  size: size.value
})

tableColumns.value = [
  {
    title: 'Full Name',
    dataIndex: 'fullname'
  },
  {
    title: 'Username',
    dataIndex: 'username'
  },
  // {
  //   title: 'STAFF ID',
  //   dataIndex: 'staff_id'
  // },
  {
    title: 'EMIAL',
    dataIndex: 'email'
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone_number'
  },
  {
    title: 'Roles',
    dataIndex: 'roles'
  },

  // {
  //   title: 'Branch',
  //   dataIndex: ['branch', 'branch_name'],
  // },
  {
    title: 'Create Date',
    dataIndex: 'created_at'
  },
  // {
  //   title: 'Locked',
  //   dataIndex: 'locked'
  // },
  {
    title: 'Status',
    dataIndex: 'is_active'
  },
  {
    title: 'ACTION',
    dataIndex: 'action'
  }
]

tableActions.value = ['view']

if (hasAccess("UPDATE_USER")) {
  tableActions.value.push("edit")
}
if (hasAccess("DELETE_USER")) {
  tableActions.value.push("delete")
}

const onInitList = () => {
  filter = reactive<UserFilter>({
    search_keyword: searchValue.value,
    fullname: searchValue.value,
    page: page.value,
    size: size.value
  })
  onInit(filter, API_LIST_USER)
  clearSearch()
}

onInitList();

let required = reactive({
  username: '',
  phone_number: '',
  // branchObject: '',
  roleObject: ref<any[]>([]),
  password: '',
  confirm_password: '',
  id: '',
});

const rulesRef = reactive({
  username: [
    {
      required: true,
      message: 'Please input User Name',
    },
    {
      max: 100,
      message: 'Length less then 100',
      trigger: 'blur',
    },
  ],
  branchObject: [
    {
      required: true,
      message: 'Please select Branch',
    }
  ],
  roleObject: [
    {
      required: true,
      message: 'Please select Role',
    }
  ]
});

const { validate, validateInfos } = useForm(required, rulesRef)

const onSubmit = () => {
  // Show the loading message
  state.loading = true;
  validate()
    .then((res: any) => {
      console.log(res, item.value)
      if (isShowFormAdd.value) {
        const reqCreate = reactive({
          fullname: item.value.fullname,
          username: required.username,
          staff_id: item.value.staff_id,
          email: item.value.email,
          phone_number: item.value.phone_number,
          role_name: item.value.role_name,
          roles: item.value.roles.map((item: any) => new Number(item.id)),
          branch_id: item.value.branch_id,
          id: item.value.id,
          is_active: item.value.is_active,
          locked: item.value.locked
        })
        onCreate(reqCreate, API_CREATE_USER)
          .then((response) => {
            console.log('Create Sumitted .....', response)
            if (response.code == '200') {
              setTimeout(() => {
                state.loading = false;
              }, 100);
              alert("success", "Success", "User has been created succesfully.")
              showListing();
            } else if (response.code == '500') {
              state.loading = false;
              alert("error", "Error", "User not found.")
            } else if (response.code == '204') {
              state.loading = false;
              alert("error", "Error", "Role not found.")
            }
            onInitList();
          })
          .catch((error) => {
            state.loading = false;
            stopLoading()
            alert("error", "Error", error)
          })
      } else if (isShowFormUpdate.value) {
        const reqUpdate = reactive({
          fullname: item.value.fullname,
          username: item.value.username,
          staff_id: item.value.staff_id,
          email: item.value.email,
          phone_number: item.value.phone_number,
          role_name: item.value.role_name,
          roles: item.value.roles.map((item: any) => new Number(item.id)),
          branch_id: item.value.branch_id,
          id: item.value.id,
          is_active: item.value.is_active,
          locked: item.value.locked
        })
        onUpdate(reqUpdate, reqUpdate?.id, API_UPDATE_USER)
          .then((response) => {
            console.log('Update Sumitted .....', response)
            if (response.code == '200') {
              setTimeout(() => {
                state.loading = false;
              }, 100);
              alert("success", "Success", "User has been updated succesfully.")
              showListing();
            } else if (response.code == '500') {
              state.loading = false;
              alert("error", "Error", "User not found.")
            }
            onInitList();
          })
          .catch((error) => {
            stopLoading()
            state.loading = false;
            alert("error", "Error", error)
          })
      }
    })
    .catch((err: any) => {
      console.log('error', err)
      state.loading = false;
    })
}
</script>