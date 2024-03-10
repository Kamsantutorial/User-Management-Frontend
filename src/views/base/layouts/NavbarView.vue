<template>
  <a-layout-header class="header">
    <a-row>
      <a-col :span="20">
        <img style="margin-bottom: 5px;" src="@/assets/images/kamsan-tutorial.png" width="300" />
      </a-col>
      <a-col :span="4">
        <a-space style="position: fixed; right: 0; margin-right: 30px">
          <span style="color: #fff"
            >{{ userProfile?.user?.fullname }}</span
          >
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <a-badge count="0">
                <a-avatar size="small" style="background-color: #1890ff">
                  <template #icon>
                    <UserOutlined />
                  </template>
                </a-avatar>
              </a-badge>
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item key="1" @click="logout()"> <logout-outlined /> Logout</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-space>
      </a-col>
    </a-row>
  </a-layout-header>
</template>
<script lang="ts">
import {
  UserOutlined,
  MenuOutlined,
  CheckOutlined,
  OrderedListOutlined,
  LogoutOutlined,
  LaptopOutlined,
  NotificationOutlined
} from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue'
import router from '@/router'
import type { UserProfile } from '@/components/base/models/response/BaseResponseModel'
import { baseAuthStore } from '@/components/base/stores/BaseAuthStore'

export default defineComponent({
  name: 'NavbarView',
  components: {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
    LogoutOutlined,
    CheckOutlined,
    OrderedListOutlined,
    MenuOutlined
  },
  setup() {
    const userProfile = ref<UserProfile>()
    const baseService = baseAuthStore()

    const getUserInfo = () => {
      userProfile.value = baseService.getUserSession()
    }

    const logout = () => {
      if (baseService.logout()) {
        router.push('/login')
      }
    }

    getUserInfo()

    return {
      selectedKeys1: ref<string[]>(['2']),
      userProfile,
      getUserInfo,
      logout
    }
  }
})
</script>
<style scoped>
.dropdown-menu {
  position: fixed;
  right: 15px;
  top: 85px;
  z-index: 11;
}
</style>
