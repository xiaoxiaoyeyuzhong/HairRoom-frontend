<script setup lang="ts">

import picture from "../assets/picture.png";
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

onMounted(async()=>{
  currentUser.value=await getCurrentUser();
})

const props= withDefaults(defineProps<ScheduleCardListProps>(),{
  //@ts-ignore
  scheduleList: [] as API.Schedule[],
  appointmentTime: "" as string
});

const AppointmentAddRequest = ref({
  customerId: 0, // 不能在还未像后端请求currentUser的时候就初始化，会报空指针
  staffId: 0,
  appointmentTime: props.appointmentTime,

    }
);
// 预约理发师
const doAddAppointment = async (staffId: number) =>{

  AppointmentAddRequest.value.staffId=staffId;
  AppointmentAddRequest.value.customerId=currentUser.value.id;
  // 传参数的时候记得，ref（响应式变量）需要取value
  const res = await myAxios.post('/appointment/add',AppointmentAddRequest.value);
  if(res.code === 0){
    showSuccessToast("预约理发师成功");

  }else{
    showFailToast('预约失败' + (res.description ? `，${res.description}` : ''))
  }

}


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


/**
 * 跳转至更新队伍页面
 * @param id
 */
const doUpdateTeam=(id: number)=>{
  router.push({
    path: '/TeamPage/TeamUpdatePage',
    query:{
      id,
    }
  })
}

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
</script>

<template>
  <div id="appointmentCardList">
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

        <!-- 预约理发师 todo 跳转到选择时间段和号码的页面，点击确定后添加预约，如果要现在支付，再跳转到支付页面 -->
        <van-button  size="small"  plain
                     @click="doAddAppointment(schedule.staffId)"
                     type="primary"
        >预约理发师</van-button>
        <!-- 取消预约 -->
        <van-button  size="small"
                     plain
                     @click="doQuitTeam(schedule.id)"
                     type="danger"
        >取消预约</van-button>
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