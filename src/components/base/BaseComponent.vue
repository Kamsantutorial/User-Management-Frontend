<!--BASE CRUD COMPONENT-->
<template>
  <LoadingView v-if="isLoading" />
  <!-- main listing -->
  <div v-if="isShowListing">
    <!-- start form search header -->
    <a-row>
      <a-col :span="24">
        <a-card :bordered="true">
          <slot name="header">
            <a-row>
              <a-col :span="6">
                <a-button type="primary" shape="circle" @click="showFormAdd()">
                  <template #icon>
                    <PlusOutlined />
                  </template>
                  Add new
                </a-button>
              </a-col>

              <a-col :span="6">
                <a-input-search v-model:value="searchValue" placeholder="input search text" enter-button="Search"
                  @search="onSearch()" />
              </a-col>
            </a-row>
          </slot>
        </a-card>
      </a-col>
      <!-- end form search header -->

      <!-- start table listing -->
      <a-col :span="24">
        <slot name="table">
          <a-table :scroll="{ x: 300 }" style="margin-top: 10px" :columns="tableColumns" :pagination="false"
            :data-source="itemList" bordered>
            <template #title></template>
            <template #bodyCell="{ column, text, record, index }">
              <template v-if="column.dataIndex === 'index'">
                {{ calculatePageIndex(index) }}
              </template>
              <template v-if="column.dataIndex === 'name'">
                <a>{{ text }}</a>
              </template>
              <template v-else-if="column.dataIndex === 'khqr_status'">
                <a-tag v-if="text == 1" class="success">SUCCESS</a-tag>
                <a-tag v-else-if="text == 0" class="pending">PENDING</a-tag>
                <a-tag v-else-if="text == 2" class="failed">FAILED</a-tag>
                <a-tag v-else-if="text == 3" class="failed">FAILED</a-tag>
              </template>
              <template v-else-if="column.dataIndex === 'email_status'">
                <a-tag v-if="text == 0" class="pending">PENDING</a-tag>
                <a-tag v-else-if="text == 1" class="success">SUCCESS</a-tag>
                <a-tag v-else-if="text == 2" class="failed">FAILED</a-tag>
              </template>
              <template v-else-if="column.dataIndex === 'payment_status'">
                <a-tag v-if="text == 'SUCCESS'" class="success">SUCCESS</a-tag>
                <a-tag v-else-if="text == 'FAILED'" class="failed">FAILED</a-tag>
                <a-tag v-else-if="text == 'PENDING'" class="pending">PENDING</a-tag>
              </template>
              <template v-else-if="column.dataIndex === 'is_active'">
                <a-tag v-if="text == 1" class="success">ACTIVE</a-tag>
                <a-tag v-else-if="text == 0" class="pending">INACTIVE</a-tag>
                <a-tag v-else class="success">ACTIVE</a-tag>
              </template>
              <template v-else-if="column.dataIndex === 'locked'">
                <div v-if="text == 1">true</div>
                <div v-else>false</div>
              </template>
              <template v-else-if="column.dataIndex === 'roles'">
                <a-badge v-for="tag in text" style="background-color: green; border-radius: 5px;"
                  :count="tag?.role_name?.toUpperCase()">
                </a-badge>
              </template>
              <template v-else-if="column.dataIndex === 'branch'">
                <span v-for="tag in text" :count="tag?.name?.toUpperCase()"> {{ tag?.name }}</span>
              </template>
      
              <template v-if="column.dataIndex === 'action'">
                <a-space>
                  <template v-for="(action, index) in tableActions" :key="index">
                    <a-space>
                      <a-button v-if="action === 'view'" @click="showFormDetail(record)" size="medium"
                        class="action-button" type="primary" shape="circle">
                        <template #icon>
                          <EyeOutlined />
                        </template>
                      </a-button>
                      <a-button v-if="action === 'edit'" size="medium" @click="showFormUpdate(record)"
                        class="action-button" type="primary" shape="circle">
                        <template #icon>
                          <EditOutlined />
                        </template>
                      </a-button>
                      <a-button v-if="action === 'delete'" size="medium" @click="showFormDelete(record?.id)"
                        class="action-button" type="danger" shape="circle">
                        <template #icon>
                          <DeleteOutlined />
                        </template>
                      </a-button>
                    </a-space>
                  </template>
                </a-space>
              </template>
            </template>

          </a-table>
          <div class="space-align-container">
            <div class="space-align-block">
              <div class="mock-block">
                <a-pagination v-model:current="page" show-size-changer v-model:pageSize="size"
                  :total="pagination.total" />
              </div>
            </div>
          </div>

        </slot>
      </a-col>
      <!-- end table listing -->
    </a-row>
  </div>
  <!-- end main listing -->

  <!-- start form add -->
  <div v-else-if="isShowFormAdd">
    <a-divider orientation="left" orientation-margin="0px">New {{ pageTitle ? pageTitle : $route.name }}</a-divider>
    <br />
    <slot name="formAdd" />
  </div>
  <!-- end form add -->

  <!-- start form update -->
  <div v-else-if="isShowFormUpdate">
    <a-divider orientation="left" orientation-margin="0px">Edit {{ pageTitle ? pageTitle : $route.name }}</a-divider>
    <br />
    <slot name="formUpdate" />
  </div>
  <!-- end form update -->

  <!-- start form detail -->
  <div v-else-if="isShowDetail">
    <a-divider orientation="left" orientation-margin="0px">{{ pageTitle ? pageTitle : $route.name }} Detail</a-divider>
    <br />
    <slot name="detail" />
  </div>
  <!-- end form detail -->

  <div v-else>
    <p>No content to display.</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { shareBaseStore } from './stores/BaseComponentStore'
import { storeToRefs } from 'pinia'
import LoadingView from './components/loading/LoadingView.vue'

export interface TableColumn {
  title: string;
  className?: string;
  dataIndex: any;
  width?: number;
}

export interface DataItem {
  id: string;
  status: string;
  is_active: boolean;
  is_deleted: boolean;
}

defineProps({
  pageTitle: {
    type: String,
    required: false
  }
})

const emit = defineEmits(['onInit', 'showFormAdd', 'showFormDetail', 'showFormUpdate', 'onSearch', 'onDelete'])

//base store function
const baseStore = shareBaseStore()

const {
  onListing,
  // showFormAdd,
  //showFormDetail,
  //showFormUpdate,
  showListing,
  //onSearch,
  onCreate,
  onDelete,
  onUpdate,
  startLoading,
  stopLoading,
  hasAccess
} = baseStore

const {
  isShowFormUpdate,
  isShowDetail,
  isShowFormAdd,
  isShowListing,
  isLoading,
  searchValue,
  baseResponseItems,
  item,
  itemList,
  page,
  size,
  tableColumns,
  tableActions
} = storeToRefs(baseStore)

tableColumns.value.unshift({
  title: '#',
  dataIndex: "index",
  width: 100
});

function calculatePageIndex(index: number) {
  return (page.value - 1) * size.value + index + 1;
}

onMounted(() => {
  setTimeout(() => {
    stopLoading()
  }, 1000)
  showListing()
  console.log('state init')
})

onUnmounted(() => {
  baseStore.$reset()
  console.log('state reset')
})

const pagination = computed(() => ({
  total: baseResponseItems.value?.total_records,
  current: page,
  pageSize: size
}))

watch(page, () => {
  emit('onInit')
})

watch(size, () => {
  emit('onInit')
})

watch(searchValue, () => {
  if (!searchValue.value || searchValue.value === '') {
    emit('onInit')
  }
})

//override
const showFormAdd = () => {
  emit('showFormAdd')
}

//override
const showFormDetail = (object: any) => {
  emit('showFormDetail', object)
}

//override
const showFormDelete = (id: any) => {
  emit('onDelete', id)
}

//override
const onSearch = () => {
  emit('onSearch')
}

//override
const showFormUpdate = (object: any) => {
  console.log(object)
  emit('showFormUpdate', object)
}

</script>

<style scoped>
.space-align-container {
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-wrap: wrap;
}

.space-align-block {
  width: 100%;
  margin-top: 10px;
  flex: none;
}

.space-align-block .mock-block {
  display: flex;
  padding: 32px 8px 16px;
  flex-direction: row-reverse;
}
</style>