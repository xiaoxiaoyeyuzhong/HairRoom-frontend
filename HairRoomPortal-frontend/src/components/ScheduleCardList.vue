<script setup lang="ts">

import picture from "../assets/picture.png";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";

interface ScheduleCardListProps{
  scheduleList: API.Schedule[];
}

//获取当前登录用户
const router = useRouter();
const currentUser = ref();



const props= withDefaults(defineProps<ScheduleCardListProps>(),{
  //@ts-ignore
  scheduleList: [] as API.Schedule[]
});

//  在跳转到更新排班页面的时候传递已经存在的排班时间段
// 不用ref，router传递数据的时候会爆红，而且不能用const，因为不能改
let timeIntervals : number[]= [
];

const pushTimeSlots = () =>{
  // 处理排班数组中的每一项，将其中的排班时间段组成一个新数组返回
  timeIntervals =props.scheduleList.map(schedule => schedule.timeInterval);
  console.log("appointmentPage_处理排班时间段" + timeIntervals[0]);
}

/**
 * 跳转至更新排班页面
 * @param id
 * @param nowTimeSlot
 */
const doUpdateSchedule=(id: number,nowTimeSlot: number)=>{
  pushTimeSlots();
  router.push({
    path: '/SchedulePage/ScheduleUpdatePage',
    query:{
      id,
      nowTimeSlot,
      timeIntervals,
    }
  })
}

// 展示时间段需要的时间段映射
const timeSlotsMap = [
  { value: 1, label: '上午' },
  { value: 2, label: '下午' },
  { value: 3, label: '晚上' },
];
onMounted(async()=>{
  currentUser.value=await getCurrentUser();

})

</script>

<template>
  <div id="scheduleCardList">
    <van-card
        v-for="schedule in props.scheduleList"
        :thumb="picture"
        :desc="`员工名:${schedule.staffName}`"
        :title="`门店名:${schedule.storeName}`"
    >

      <template #bottom>
        <div>
          <div
              v-for="(timeInterval, index) in timeSlotsMap"
              :key="timeInterval.value"
              :name="timeInterval.value"
              v-show="Number(`${schedule.timeInterval}`) === timeInterval.value"
          >
            时间段:{{ timeInterval.label }}
          </div>

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
        <!-- 加入排班 -->
        <!--        <van-button size="small" type="primary" plain-->
        <!--                    @click="doAddSchedule(schedule.id)">加入排班</van-button>-->
        <!-- 更新排班 -->
        <van-button  size="small"
                     plain
                     @click="doUpdateSchedule(schedule.id,schedule.timeInterval)"
                     type="warning"
        >更新排班</van-button>
        <!-- 删除排班 -->
        <van-button  size="small"
                     plain
                     @click=""
                     type="danger"
        >删除排班</van-button>

      </template>
    </van-card>

  </div>

</template>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 90px;
  object-fit: unset;
}
</style>