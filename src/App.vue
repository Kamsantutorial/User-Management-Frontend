<template>
  <a-layout style="width: 100%; height: 100%; position: fixed">
    <NavbarView />
    <a-layout>
      <SideBarView></SideBarView>
      <ContentView></ContentView>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue'
import NavbarView from '@/views/base/layouts/NavbarView.vue'
import SideBarView from '@/views/base/layouts/SideBarView.vue'
import FooterView from '@/views/base/layouts/FooterView.vue'
import ContentView from '@/views/base/layouts/ContentView.vue'
export default defineComponent({
  components: {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
    NavbarView,
    SideBarView,
    FooterView,
    ContentView
  },
  setup() {
    return {
      selectedKeys1: ref<string[]>(['2']),
      selectedKeys2: ref<string[]>(['1']),
      collapsed: ref<boolean>(false),
      openKeys: ref<string[]>(['sub1'])
    }
  }
})
</script>
