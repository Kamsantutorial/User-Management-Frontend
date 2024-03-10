<template>
    <div>
      <a-button @click="() => openNotificationWithIcon('success')">Success</a-button>
    </div>
  </template>
  <script lang="ts" setup>
  import { notification } from 'ant-design-vue';
  const openNotificationWithIcon = (type: string) => {
    (notification as any)[type]({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };
  </script>
  
  