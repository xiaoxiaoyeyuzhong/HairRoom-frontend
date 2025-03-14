<script setup lang="ts">

import AppointmentCardList from "../components/AppointmentCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {getCurrentUser} from "../services/user.ts";
import {showFailToast} from "vant";

const appointmentList = ref([]);
const currentUser = ref();
const doListAppointmentByUserId = async () =>{
  console.log("登录用户为" + currentUser.value.id);
  const userId = currentUser.value.id;
  const res = await myAxios.get(`appointment/listByUserId?userId=${userId}`);
  if(res.code === 0){
    appointmentList.value = res.data;
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
  <appointment-card-list class="card-component" :schedule-list="appointmentList" />
</template>

<style scoped>

</style>