<script setup lang="ts">
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts"
import {showFailToast, showSuccessToast} from "vant";
import {useRoute, useRouter} from "vue-router";
import {useUserStore} from "../stores/user.ts";

const userAccount = ref('');
const userPassword = ref('');
const router=useRouter();
const route =useRoute();
const userStore = useUserStore();
const onSubmit = async () => {
  const res=await myAxios.post('/user/login',{
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  })
  console.log("正在登录")
  await userStore.setCurrentUserState(res.data) // 更新用户信息
  if (res.code===0 && res.data){
    showSuccessToast("用户登录成功");

    //拿到地址栏上的重定向参数
    window.location.href = <string>route.query?.redirect ?? '/';
  }else {
    showFailToast(`${res.description}`);
  }
};
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          autocomplete="current-password"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          autocomplete="current-password"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>