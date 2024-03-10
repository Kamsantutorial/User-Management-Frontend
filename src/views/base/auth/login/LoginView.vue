<template>
  <div class="fullscreen">
    <a-card :title="null" class="login-card khqr-bg">
      <a-space>
        <img src="@/assets/images/aeon-logo.png" width="40" alt="AEON" />
        <h2 class="login-title">{{ appTitle }}</h2>
      </a-space>
      <a-form :model="formState" name="basic" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }" autocomplete="off"
        @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item label="Username" name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]" class="form-item-margin">
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item label="Password" name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]" class="form-item-margin">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <!-- <a-form-item name="remember" class="form-item-margin">
          <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
        </a-form-item> -->

        <a-form-item class="form-item-margin" style="margin-top: 20px; margin-bottom: 20px">
          <a-button style="width: 100%" type="primary" html-type="submit">Login</a-button>
        </a-form-item>
        <a-alert v-if="error" :message="error" type="error" show-icon />
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { baseAuthStore } from '@/components/base/stores/BaseAuthStore'
import { getLocalStorage } from '@/components/base/utils/SessionStorageUtil'
import { useRoute } from 'vue-router'
import router from '@/router';
import { interceptorsStore } from '@/components/base/stores/BaseAPIStore';
import { storeToRefs } from 'pinia';
const { errorMessage } = storeToRefs(interceptorsStore())
const route = useRoute()

const appTitle = import.meta.env.VITE_APP_TITLE

interface FormState {
  username: string
  password: string
  remember: boolean
}

const { login } = baseAuthStore()
const error = ref()

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true
})
const onFinish = (values: any) => {
  login(values.username, values.password).then((response) => {
    console.log('Success Login:', response)
    if (response) {
      console.log('Success Login:', getLocalStorage('user'))
      window.location.href = '/dashboard'
    } else {
      console.log("route.query?.error", errorMessage.value)
      error.value = errorMessage.value 
    }
  }).catch(err => {
    console.log('Error Login:', err)
    error.value = "Incorrect username or password!"
  })
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

</script>

<style></style>