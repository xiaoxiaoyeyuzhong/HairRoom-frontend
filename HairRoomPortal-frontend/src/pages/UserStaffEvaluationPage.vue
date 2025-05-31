<script setup lang="ts">

import StaffEvaluationListCard from "../components/StaffEvaluationListCard.vue";

// 0代表未评价，1代表已评价
const active = ref(0);

// 声明用户登录状态
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import {useUserStore} from "../stores/user.ts";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";

const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore); // 使用 storeToRefs 保持响应式

const staffEvaluationList : API.StaffEvaluationVO = ref([]);

const StaffEvaluationQueryRequest =ref({
  customerUserId: 0,
  evaluationSituation: 0,
})
const doListStaffEvaluation = async() =>{
  StaffEvaluationQueryRequest.value.customerUserId = currentUser.value.data.id;
  StaffEvaluationQueryRequest.value.evaluationSituation = active.value;
  const res = await myAxios.post("staffEvaluation/list",StaffEvaluationQueryRequest.value);
  if(res.code === 0){
    staffEvaluationList.value = res.data;
  }else{
    showFailToast('查询评价列表失败' + (res.description ? `，${res.description}` : ''));
  }
}

onMounted(async()=>{
  await userStore.fetchCurrentUser(); // 获取用户信息
  await doListStaffEvaluation() // 初始化评价列表
})
</script>

<template>
  <van-tabs v-model:active="active" @change="doListStaffEvaluation()">

    <van-tab title="待评价">
      <staff-evaluation-list-card class="card-component" :staff-evaluation-v-o-list="staffEvaluationList" />
    </van-tab>
    <van-tab title="已评价">
      <staff-evaluation-list-card class="card-component" :staff-evaluation-v-o-list="staffEvaluationList" />
    </van-tab>
  </van-tabs>
</template>

<style scoped>

</style>