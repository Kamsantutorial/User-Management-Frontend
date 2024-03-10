<template>
  <a-card :title="title">
    <span style="font-size: 32px; font-weight: bold">{{ count }}</span>
    <template v-if="label === 'Failed'">
      <a-badge :count="description" />
    </template>
    <template v-else-if="label === 'Refund'">
      <a-badge :count="description" />
    </template>
    <template v-else>
      <a-badge :number-style="{ backgroundColor: '#52c41a' }" :count="description" />
    </template>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RightOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'DashboardCard',
  props: {
    route: {
      type: String,
      required: true
    },
    description: String,
    title: String,
    count: Number,
    label: String,
    type: String,
    icon: {
      type: [String, Object],
      default: 'UserOutlined' // set a default icon component
    }
  },
  components: {
    RightOutlined,
    UserOutlined: () => import('@ant-design/icons-vue').then((icons) => icons.UserOutlined)
    // import the icon components and register them as components locally
    // you can add other icons here as necessary
  }
})
</script>

<style lang="scss" scoped>
.completed {
  background-color: green;
  border-radius: 5px;
  padding: 1px;
  color: #fff;
  margin-left: 5px;
}

.failed {
  border-radius: 5px;
  padding: 1px;
  margin-left: 5px;
}

.card-head-title {
  color: #fff;
  display: inline-block;
  flex: 1;
  padding: 16px 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.dashboard-card {
  border-radius: 10px;
  // background-color: rgb(82, 196, 26);
  color: #000;

  .icon {
    margin-right: 10px;
  }

  .dashboard-card__count {
    font-size: 24px;
    font-weight: bold;
  }

  .dashboard-card__label {
    font-size: 14px;
  }
}
</style>
