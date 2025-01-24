<script setup lang="ts">
import { useRouter } from "vue-router";
import TeamCardList from "../components/teamCardList.vue";
import { onMounted, ref } from "vue";
import myAxios from "../plugins/myAxios.ts";
import { showFailToast } from "vant";

const router = useRouter();
const searchText = ref([]);

// 跳转到加入队伍页面
const doAddTeam = () => {
  router.push({
    path: "/TeamPage/TeamAddPage",
  });
};

const teamList = ref([]);

// 搜索队伍
const listTeam = async (val = " ", status = 0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
      status,
    },
  });
  if (res.code === 0) {
    teamList.value = res.data;
  } else {
    showFailToast("获取队伍列表失败，请刷新重试");
  }
};

// 只会在页面加载时触发一次
onMounted(() => {
  listTeam();
  generateNextSevenDays(); // 生成接下来的七天
});

const onSearch = (val) => {
  listTeam(val);
};

// 可预约的日期
const appointmentDays = ref([]);
// 今天的日期
const today = new Date();
// 选择日期,初始化时也要记得得到的月份从0开始，要+1
const selectedDay = ref();
console.log(selectedDay.value);
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
  appointmentDays.value = days;
  // 设置默认选中今天
  selectedDay.value = appointmentDays.value[0];
  console.log("generateNextSevenDays后，selectedDay=" + selectedDay.value);
  console.log(appointmentDays.value);
};

// 根据选择的日期来切换队伍列表
const onTableChange = (name) => {
  console.log("切换时，打印的name是" + name);
  console.log("onTableChange后，selectedDay=" + selectedDay.value);
  if (name === "public") {
    listTeam(searchText.value, 0);
  } else {
    listTeam(searchText.value, 2);
  }
};
</script>

<template>
  <div id="SchedulePage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
    <van-tabs v-model:active="selectedDay" @change="onTableChange">
      <van-tab
          v-for="(day, index) in appointmentDays"
          :key="index"
          :title="day"
          :name="day"
      />
    </van-tabs>
    <van-button class="add-button" type="primary" icon="plus" @click="doAddTeam" />
    <team-card-list class="card-component" :team-list="teamList" />
    <van-empty v-if="teamList?.length < 1" description="数据为空" />
  </div>
</template>

<style scoped>
#SchedulePage {
}
</style>
