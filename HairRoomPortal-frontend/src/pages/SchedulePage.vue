<script setup lang="ts">
import {useRouter} from "vue-router";
import ScheduleCardList from "../components/ScheduleCardList.vue"
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";
const router = useRouter();
const searchText = ref([]);
//跳转到加入队伍页面
const doAddSchedule = () => {
  router.push({
    path: '/TeamPage/TeamAddPage',
  })
}
const scheduleList = ref([]);
/**
 * 搜索队伍

 */
const ScheduleQueryRequest = ref({
  "staffId": 1,
  "weekDay": 1,
});

const listSchedule = async () => {
  const res = await myAxios.post("/schedule/get/day",ScheduleQueryRequest.value);
  if (res.code === 0) {
    scheduleList.value = res.data;
  } else {
    showFailToast("获取队伍列表失败，请刷新重试");
  }
}
//只会在页面加载时触发一次
onMounted(() => {
  listSchedule();
})
const onSearch = (val) => {
  listSchedule(val);
}

/**
 * 根据输入星期几，切换到对应页面
 * @param name
 */
// 设置周一到周日的标签
const daysOfWeek = [
  "周一",
  "周二",
  "周三",
  "周四",
  "周五",
  "周六",
  "周日",
];
// 选择的星期几
const selectedDay = ref("周一");
const onTableChange = (name : string) =>{
  // 获取选择的星期几的下标，要记住获取的下标是从零开始的
  const index = daysOfWeek.indexOf(name);
  console.log("选中的星期几下标是", index);
  ScheduleQueryRequest.value.weekDay = index + 1;
  listSchedule();
}

</script>

<template>
  <div id="SchedulePage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <van-tabs v-model:active="selectedDay" @change="onTableChange">
      <van-tab v-for="(day, index) in daysOfWeek" :key="index" :title="day" :name="day" />
    </van-tabs>
    <van-button class="add-button" type="primary" icon="plus" @click="doAddSchedule()" />
    <schedule-card-list class="card-component" :schedule-list="scheduleList" />
    <van-empty v-if="scheduleList?.length < 1" description="今天排班为空"/>
  </div>
</template>

<style scoped>
#SchedulePage {
}
</style>