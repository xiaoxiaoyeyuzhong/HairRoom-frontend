<script setup lang="ts">


import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {getCurrentUser} from "../services/user.ts";
import {showFailToast} from "vant";
import UserAppointmentCardList from "../components/UserAppointmentCardList.vue";
import AppointmentCardList from "../components/AppointmentCardList.vue";

const appointmentVOList = ref([]) ;
const currentUser = ref();
const doListAppointmentByUserId = async () =>{
  console.log("登录用户为" + currentUser.value.id);
  const userId = currentUser.value.id;
  const res = await myAxios.get(`appointment/listByUserId?userId=${userId}`);
  if(res.code === 0){
    appointmentVOList.value = res.data;
    console.log("打印已预约列表第一个 appointmentVOList.value[0].appointmentTime=" + appointmentVOList.value[0].appointmentTime);
  }else{
    showFailToast('查询用户已预约理发师列表失败' + (res.description ? `，${res.description}` : ''));
  }

}

onMounted(async ()=>{
const res = await getCurrentUser();
currentUser.value = res.data;
await doListAppointmentByUserId();

});


</script>

<template>

  <user-appointment-card-list class="card-component" :appointment-v-o-list="appointmentVOList" />
<!--  <appointment-card-list class="card-component" :schedule-list="appointmentVOList" />-->
  <van-empty v-if="appointmentVOList?.length < 1" description="数据为空" />
</template>

<style scoped>

</style>