<script setup lang="ts">

import haircut from "../assets/haircut.jpg";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";

interface ScheduleCardListProps{
  scheduleList: API.Schedule[];
  appointmentTime: string;
}

//获取当前登录用户
const router = useRouter();
const currentUser : API.CurrentUser= ref();


const props= withDefaults(defineProps<ScheduleCardListProps>(),{
  //@ts-ignore
  scheduleList: [] as API.Schedule[],
  appointmentTime: "" as string
});

const AppointmentAddRequest = ref({
  customerUserId: 0, // 不能在还未像后端请求currentUser的时候就初始化，会报空指针
  staffId: 0,
  storeId: 0,
  appointmentTime: props.appointmentTime,
  timeInterval: 0,
    });
// 预约理发师
const doAddAppointment = async (staffId: number,timeInterval: number,storeId: number) =>{

  console.log("AppointCard value?  props.appointmentTime=" + props.appointmentTime)
  AppointmentAddRequest.value.staffId=staffId;
  AppointmentAddRequest.value.timeInterval=timeInterval;
  AppointmentAddRequest.value.customerUserId=currentUser.value.id;
  AppointmentAddRequest.value.storeId = storeId;
  // AppointmentAddRequest只会初始化一次，所以每次都要指定appointmentTime的值
  AppointmentAddRequest.value.appointmentTime = props.appointmentTime;

  // 传参数的时候记得，ref（响应式变量）需要取value
  const res = await myAxios.post('/appointment/add',AppointmentAddRequest.value);
  if(res.code === 0){
    showSuccessToast("预约理发师成功");

  }else{
    let errorMsg = '预约失败';
    if (res.message) {
      errorMsg += `：${res.message}`;
    }
    if (res.description) {
      errorMsg += `，详情：${res.description}`;
    }
    showFailToast(errorMsg);
  }

}

onMounted(async()=>{
  const res =await getCurrentUser();
  // 将响应式变量的value指向我们封装的data
  currentUser.value = res.data;
})

</script>

<template>
  <div id="appointmentCardList">
    <van-card
        v-for="schedule in props.scheduleList"
        :thumb="haircut"
        :desc="`员工名:${schedule.staffName}`"
        :title="`门店名:${schedule.storeName}`"
    >
      <!--      <template #tags>-->
      <!--        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">-->
      <!--          {{-->
      <!--            teamStatusEnum[schedule.status]-->
      <!--          }}-->
      <!--        </van-tag>-->
      <!--      </template>-->

      <template #bottom>
        <div>
          {{ `时间段: ${schedule.timeInterval}` }}
        </div>
        <div>
          {{ `已预约人数: ${schedule.haveAppointedSlots}` }}
        </div>
        <!--        <div v-if="schedule.expireTime">-->
        <!--          {{ '过期时间: ' + schedule.expireTime }}-->
        <!--        </div>-->
        <div>
          {{ `可预约人数: ${schedule.appointSlots}` }}
        </div>
      </template>
      <template #footer>

        <!-- plain为朴素样式 -->
        <!-- 预约理发师 todo 跳转到选择时间段和号码的页面，点击确定后添加预约，如果要现在支付，再跳转到支付页面 -->
        <van-button  size="small"
                     plain
                     @click="doAddAppointment(schedule.staffId,schedule.timeInterval,schedule.storeId)"
                     type="primary"
        >预约理发师</van-button>


      </template>
    </van-card>

  </div>

</template>

<style scoped>
#appointmentCardList :deep(.van-image__img) {
  height: 90px;
  object-fit: unset;
}
</style>