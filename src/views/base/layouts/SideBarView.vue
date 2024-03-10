<template>
  <a-layout-sider width="200" style="background: #fff; height: 100%; position: fixed">
    <a-menu v-model:selectedKeys="selectedKeys2" v-model:openKeys="openKeys" mode="inline"
      :style="{ height: '100%', borderRight: 0 }">
      <template v-for="(item) in menus">
        <a-sub-menu v-if="item.children && item.children.length > 0" :key="item.id"
          :class="{ 'ant-menu-item-selected-parent': isCurrentActive(item.children) }">
          <template #title>
            <span>
              <component :is="item.icon" /><span style="margin-left: 5px">{{ item.name }}</span>
            </span>
          </template>
          <a-menu-item v-for="(childItem) in item.children" :key="childItem.id"
            :class="{ 'ant-menu-item-selected': $route.path === childItem.path }">
            <component :is="childItem.icon" />
            <RouterLink style="margin-left: 5px" :to="childItem.path">{{
              childItem.name
            }}</RouterLink>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item v-if="!item.children || item.children.length === 0" :key="item.id" :title="item.name"
          :class="{ 'ant-menu-item-selected': $route.path === item.path }">
          <component :is="item.icon" />
          <RouterLink style="margin-left: 5px" :to="{ path: item.path }">
            {{ item.name }}</RouterLink>
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
  <p style="position: absolute;left: 0;bottom: 0;color: rgb(153, 152, 152);margin-left: 20px;">Version {{ APP_VERSION }}</p>
</template>
<script lang="ts">
import type { Menu } from '@/components/base/models/BaseModel'
import { baseAuthStore } from '@/components/base/stores/BaseAuthStore'
import router from '@/router'
import {
  SettingOutlined,
  UserOutlined,
  MenuOutlined,
  UserAddOutlined,
  HomeOutlined,
  ForkOutlined,
  CheckOutlined,
  HistoryOutlined,
  LaptopOutlined,
  QrcodeOutlined,
  NotificationOutlined
} from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'SidebarView',
  components: {
    SettingOutlined,
    LaptopOutlined,
    NotificationOutlined,
    HomeOutlined,
    HistoryOutlined,
    QrcodeOutlined,
    CheckOutlined,
    UserOutlined,
    MenuOutlined,
    UserAddOutlined,
    ForkOutlined
  },
  setup() {
    const menus = ref<Menu[]>([])
    const service = baseAuthStore()

    service.fetchRoutes().then((response) => {
      menus.value = response
    })

    const isCurrentActive = (menus: Menu[]) => {
      for (const menu of menus) {
        if (menu.path === router.currentRoute.value.path) {
          return true
        }
        if (menu.children) {
          if (isCurrentActive(menu.children)) {
            return true
          }
        }
      }
    }

    const APP_VERSION = import.meta.env.VITE_APP_VERSION

    return {
      menus,
      selectedKeys2: ref<number[]>(),
      openKeys: ref<number[]>(),
      isCurrentActive,
      APP_VERSION
    }
  }
})
</script>
<style lang="css">
.ant-menu-item-selected-parent {
  color: #1890ff;
}
</style>