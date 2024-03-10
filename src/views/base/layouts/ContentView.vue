<template>
  <a-layout style="padding: 0 24px 24px; margin-left: 200px; height: 100%; overflow-y: scroll">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item v-for="(route, index) in $route.matched" :key="index">
        <router-link :to="route.path">{{ route.name }}</router-link>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0 }">
      <RouterView />
    </a-layout-content>
    <FooterView></FooterView>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import FooterView from './FooterView.vue'

export default defineComponent({
  components: {
    RouterView,
    FooterView
  }
})
</script>
