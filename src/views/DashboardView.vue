<template>
  <a-layout class="dashboard">
    <a-layout-content style="padding: 24px" class="khqr-bg">
      <!-- <a-row style="margin-bottom: 20px">
        <a-col :span="24">
          <a-range-picker v-model:value="dataRange" @change="onSelect" />
        </a-col>
      </a-row> -->
      <a-row>
        <a-col :span="24">
          <div class="dashboard__cards">
            <DashboardCard
              title="Total User"
              route="/user"
              :count="totalUser"
              label="Completed"
              description="Users"
              :icon="CheckOutlined"
              :type="'primary'"
            />
          </div>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts" setup>
import DashboardCard from '@/views/home/DashboardCard.vue'
import { CheckOutlined, IssuesCloseOutlined } from '@ant-design/icons-vue'
import { reactive, ref } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import { shareBaseStore } from '@/components/base/stores/BaseComponentStore'
import { API_COUNT_USER } from '@/components/base/constants/APIEndpoint'

const totalUser = ref(0)
const dateFormat = 'YYYY/MM/DD'

const currentDate = dayjs()
const defaultStartDate = currentDate.startOf('month')
const defaultEndDate = currentDate.endOf('month')

const formattedStartDate = defaultStartDate.format(dateFormat)
const formattedEndDate = defaultEndDate.format(dateFormat)

const dataRange = ref<[Dayjs, Dayjs]>([
  dayjs(formattedStartDate, dateFormat),
  dayjs(formattedEndDate, dateFormat)
])

const baseStore = shareBaseStore()

const {
  onListing,
  onGetOneWithParam,
  showFormAdd,
  showFormDetail,
  showFormUpdate,
  showListing,
  onSearch,
  onCreate,
  onDelete,
  onUpdate,
  hasAccess,
  alert,
  onInit
} = baseStore

function getDashboardData() {
  console.log('dataRange.value', dataRange.value)
  onListing(null, API_COUNT_USER).then((res) => {
    totalUser.value = res.body.total_user
  })
}

getDashboardData()
</script>

<style lang="css" scoped>
.dashboard {
  background-color: transparent;
  height: 100%;
  overflow: hidden;
}

.bg {
  position: relative;
  height: 100%;
  /* border-bottom: 1px #e1232e solid; */
}

.bg::after {
  content: '';
  background: url('@/assets/images/KHQR Logo red.png') no-repeat;
  opacity: 0.1;
  position: absolute;
  bottom: -10px;
  transform: rotate(7deg);
  right: -10px;
  width: 120px; /* Adjust the width as needed */
  height: 100px; /* Adjust the height as needed */
  z-index: 1;
  pointer-events: none;
}

.dashboard__cards {
  display: grid;
  background-color: transparent;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
  margin-top: 10px;
}
</style>
