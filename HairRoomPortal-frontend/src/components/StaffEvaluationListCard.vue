<script setup lang="ts">

import haircut from "../assets/haircut.jpg";
import {useRouter} from "vue-router";
import {useEvaluationStore} from "../stores/evaluation.ts";


interface UserAppointmentCardListProps{
  staffEvaluationVOList: API.StaffEvaluationVO[];
}


const router = useRouter();

// 跳转前设置数据
const doReplaceDetails = (staffEvaluationVO: API.StaffEvaluationVO) => {
  const store = useEvaluationStore();
  store.setEvaluation(staffEvaluationVO);
  router.push('/UserPage/StaffEvaluationDetailsPage');
}

const props= withDefaults(defineProps<UserAppointmentCardListProps>(),{
  //@ts-ignore
  staffEvaluationVOList: [] as API.StaffEvaluationVO[],
});



</script>

<template>
  <div id="userAppointmentCardList">
    <van-card
        v-for="StaffEvaluationVO in props.staffEvaluationVOList"
        :thumb="haircut"
        :desc="`员工名:${StaffEvaluationVO.staffName}`"
        :title="`门店名:${StaffEvaluationVO.storeName}`"
    >

      <template #bottom>
        <div>
          {{ `预约时间: ${StaffEvaluationVO.appointmentTime}` }}
        </div>
        <div>
          {{ `时间段: ${StaffEvaluationVO.timeInterval}` }}
        </div>
      </template>


      <template #footer>

        <!-- plain为朴素样式 -->

        <van-button  size="small"
                     plain
                     @click="doReplaceDetails(StaffEvaluationVO)"
                     v-if="StaffEvaluationVO.evaluationSituation === 0"
                     type="warning"
        >填写评价</van-button>

        <van-button  size="small"
                     plain
                     @click="doReplaceDetails(StaffEvaluationVO)"
                     v-if="StaffEvaluationVO.evaluationSituation === 1"
                     type="warning"
        >修改评价</van-button>

      </template>

    </van-card>
  </div>

</template>

<style scoped>
#userAppointmentCardList :deep(.van-image__img) {
  height: 90px;
  object-fit: unset;
}
</style>