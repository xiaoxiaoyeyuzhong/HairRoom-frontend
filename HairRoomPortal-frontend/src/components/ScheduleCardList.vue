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

//加入队伍
const joinTeamId = ref(0);
const password = ref('');
const showPasswordDialog =ref(false);
const doAddSchedule = async () =>{
  if(!joinTeamId){
    return;
  }
  const res = await myAxios.post('/schedule/join',{
    teamId: joinTeamId.value,
    password: password.value,
  });
  if (res?.code === 0){
    showSuccessToast("加入队伍成功");
    doJoinCancel();
    await router.push({
      path: '/UserPage/TeamPage/UserTeamJoinPage',
      replace: true,
    });
  }else {
    showFailToast('加入失败' + (res.description ? `，${res.description}` : ''))
  }
}

//准备加入队伍
// const preJoinTeam = (schedule:API.Team)=>{
//   joinTeamId.value = schedule.id;
//   if(schedule.status===0){
//     doJoinTeam();
//   }else {
//     // showPasswordDialog.value = true;
//   }
// }
//清空加入参数
const doJoinCancel =()=>{
  joinTeamId.value = 0;
  password.value = '';
}

//  在跳转到更新排班页面的时候传递已经存在的排班时间段
// 不用ref，router传递数据的时候会爆红，而且不能用const，因为不能改
let timeSlots : number[]= [
];

const pushTimeSlots = () =>{
  // 处理排班数组中的每一项，将其中的排班时间段组成一个新数组返回
  timeSlots =props.scheduleList.map(schedule => schedule.timeSlot);
  console.log("appointmentPage_处理排班时间段" + timeSlots[0]);
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
      timeSlots,
    }
  })
}

// 展示时间段需要的时间段映射
const timeSlotsMap = [
  { value: 1, label: '上午' },
  { value: 2, label: '下午' },
  { value: 3, label: '晚上' },
];

/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/schedule/quit', {
    teamId: id
  });
  if (res?.code === 0) {
    showSuccessToast('操作成功');

  } else {
    showFailToast('操作失败' + (res.description ? `，${res.description}` : ''));
  }
}
/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/schedule/delete/id', {
    id,
  });
  if (res?.code === 0) {
    showSuccessToast('操作成功');
  } else {
    showFailToast('操作失败' + (res.description ? `，${res.description}` : ''));
  }
}

onMounted(async()=>{
  currentUser.value=await getCurrentUser();

})

</script>

<template>
  <div id="scheduleCardList">
    <van-card
        v-for="schedule in props.scheduleList"
        :thumb="picture"
        :desc="`员工名:${schedule.staffId}`"
        :title="`门店名:${schedule.storeId}`"
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
          <div
              v-for="(timeSlot, index) in timeSlotsMap"
              :key="timeSlot.value"
              :name="timeSlot.value"
              v-show="Number(`${schedule.timeSlot}`) === timeSlot.value"
          >
            {{ timeSlot.label }}
          </div>
<!--          <div v-if="Number(`${schedule.timeSlot}`)===1" >-->
<!--            上午-->
<!--          </div>-->
<!--          <div v-if="Number(`${schedule.timeSlot}`)===2" >-->
<!--            下午-->
<!--          </div>-->
<!--          <div v-if="Number(`${schedule.timeSlot}`)===3" >-->
<!--            晚上-->
<!--          </div>-->
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
                     @click="doUpdateSchedule(schedule.id,schedule.timeSlot)"
                     type="warning"
        >更新排班</van-button>
        <!-- 删除排班 -->
        <van-button  size="small"
                     plain
                     @click="doQuitTeam(schedule.id)"
                     type="danger"
        >删除排班</van-button>
        <!-- 解散队伍：仅创建人可见-->
<!--        <van-button v-if="schedule.userId === currentUser?.data.id" size="small"  plain type="danger"-->
<!--                    @click="doDeleteTeam(schedule.id)">解散队伍</van-button>-->
      </template>
    </van-card>
<!--    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button-->
<!--                @confirm="doJoinTeam" @cancel="doJoinCancel">-->
<!--      <van-field v-model="password"  placeholder="请输入密码" />-->
<!--    </van-dialog>-->
  </div>

</template>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 90px;
  object-fit: unset;
}
</style>