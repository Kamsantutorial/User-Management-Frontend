<template>
  <div class="loading">
    <!-- <a-spin /> -->
    <img :width="43" src="@/assets/images/loading.gif" />
  </div>
</template>

<script lang="ts">
import { Spin } from 'ant-design-vue'

export default {
  components: {
    'a-spin': Spin
  }
}
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(0.1px);
  /* Adjust the blur radius as desired */
}
</style>
