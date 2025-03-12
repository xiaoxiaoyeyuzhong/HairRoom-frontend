<script setup lang="ts">
import {useRouter} from "vue-router";
import AppointmentCardList from "../components/AppointmentCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";

const router = useRouter();
const searchText = ref([]);

// 
const doAddTeam = () => {
  router.push({
    path: "/TeamPage/TeamAddPage",
  });
};

// 今天的日期
const today = new Date();

const getToday = () =>{
  const todayMonth = today.getMonth()+1;
  const todayDate = today.getDate();
  return `${todayMonth}.${todayDate}`;
}

// 选择的日期
const selectedDay = ref(getToday());

const scheduleList = ref([]);

//
const CanAppointmentByDayQueryRequest = ref({
  // "staffId": 1,
  "appointmentTime": getToday(),
});

// 搜索值班理发师
const listStaff = async (val = " ", status = 0) => {
  CanAppointmentByDayQueryRequest.value.appointmentTime = selectedDay.value;

  const res = await myAxios.post("appointment/can/day", CanAppointmentByDayQueryRequest.value);
  if (res.code === 0) {
    scheduleList.value = res.data;
  } else {
    showFailToast("获取发型师信息失败，请刷新重试");
  }
};


const onSearch = (val) => {
  listStaff(val);
};

// 可预约的日期，记得要初始化，加入"1.1"等假数据，否则页面初始化的时候不会默认选中第一项
// todo 不要用假数据，初始化都用当前时间，防止onChange组件多次请求覆盖正确值
const appointmentDays = ref([
  getToday(),
]);



// 根据当前日期生成接下来七天的日期
const generateNextSevenDays = () => {

  const days = [];

  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    const month = nextDay.getMonth() + 1; // 月份是从0开始的，所以需要加1
    const day = nextDay.getDate();
    days.push(`${month}.${day}`);
  }
  // appointmentDays.value = days;
  appointmentDays.value = days;
  // 设置默认选中今天
  // 确保selectedDay也同步更新
  selectedDay.value = appointmentDays.value[0];

  console.log("generateNextSevenDays后，selectedDay=" + selectedDay.value);
  console.log(appointmentDays);
};

// 根据选择的日期来切换队伍列表
const onTableChange = () => {

  console.log("onTableChange后，selectedDay=" + selectedDay.value);

  listStaff();
};

// 只会在页面加载时触发一次
onMounted(() => {
  generateNextSevenDays(); // 生成接下来的七天
  listStaff();
});

</script>

<template>
  <div id="SchedulePage">
    <van-search v-model="searchText" placeholder="搜索理发师" @search="onSearch" />
    <van-tabs v-model:active="selectedDay" @change="onTableChange">
      <van-tab
          v-for="(day, index) in appointmentDays"
          :key="index"
          :title="day"
          :name="day"
      />
    </van-tabs>
    <van-button class="add-button" type="primary" icon="plus" @click="doAddTeam" />
    <appointment-card-list class="card-component" :schedule-list="scheduleList" :appointment-time="selectedDay"/>
    <van-empty v-if="scheduleList?.length < 1" description="数据为空" />
  </div>
</template>

<style scoped>
#SchedulePage {
}
</style>
