<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios.ts"
import { showSuccessToast, showFailToast } from 'vant';
import UserCardList from "../components/UserCardList.vue";
import RoundedCard from "../components/RoundedCard.vue";
const route =useRoute();
console.log(route.query.tags)

//默认不开启匹配模式
const isMatchMode = ref<boolean>(false);
const loading = ref();
//定义用户列表
const userList = ref([]);

// const loadData = async () => {
//   let userListData;
//
//   loading.value = true;
//   //心动模式：根据标签匹配用户
//   if (isMatchMode.value) {
//     const num = 10;
//     userListData = await myAxios.get('/user/match', {
//       params: {
//         num,
//       },
//     })
//         .then(function (response) {
//           console.log('/user/recommend', response);
//           showSuccessToast('请求成功');
//           return response?.data;
//         })
//         .catch(function (error) {
//           console.log('/user/recommend', error);
//           showFailToast('请求失败');
//         })
//   }else {
//     //普通模式：直接分页查询用户
//     userListData = await myAxios.get('/user/recommend', {
//       params: {
//         pageSize: 8,
//         pageNum: 1,
//       },
//     })
//         .then(function (response) {
//           console.log('/user/recommend', response);
//           showSuccessToast('请求成功');
//           return response?.data?.records;
//         })
//         .catch(function (error) {
//           console.log('/user/recommend', error);
//           showFailToast('请求失败');
//         })
//   }
//   if (userListData) {
//     userListData.forEach((user: API.CurrentUser) => {
//       user.tags = JSON.parse(user.tags);
//     })
//     userList.value = userListData;
//   }
//   loading.value = false;
// }
// watchEffect(() => {
//   loadData();
// })

const doPay = () =>{
  // axios配置了api前缀，但是这里没用到，需要注意加上api前缀
  // 支付宝沙箱不太稳定，可能出现请求三次才成功的情况，不是代码的问题
  // 关于window.open的第二个参数，_self代表直接在本窗口跳转到支付宝支付窗口，而_blank代表使用新窗口打开
  window.open("http://127.0.0.1:8081/api/alipay/pay?billName="+"德田发型屋，"
      + "洗剪吹" +"&billOutId="+Date.now()+"&billAmount="
      + "20" ,'_blank')
}

const images = [
  'https://hair-room.oss-cn-guangzhou.aliyuncs.com/slideshow/fair_1.jpg',
  'https://hair-room.oss-cn-guangzhou.aliyuncs.com/slideshow/fair_2.jpg',
];

</script>

<template>
<!--  <van-cell center title="心动模式">-->
<!--    <van-switch v-model="isMatchMode" />-->
<!--  </van-cell>-->
  <user-card-list class="card-component" :user-list="userList" :loading="loading"/>
<!--  <van-button type="primary" @click="doPay()">主要按钮</van-button>-->

<!--  <van-empty v-if="!userList || userList.length<1" description="数据为空" />-->
  <!-- 主页轮播图 -->
  <van-swipe :autoplay="3000" lazy-render class="van-swipe">
    <van-swipe-item v-for="image in images" :key="image" class="swipe-item">
      <img :src="image"  alt="主页轮播图"/>
    </van-swipe-item>
  </van-swipe>

  <!-- 预约卡片 -->
  <RoundedCard></RoundedCard>


</template>

<style scoped>
.van-swipe{
  height: 200px;
  border-radius: 30px;
  overflow: hidden
}

/* 图片样式设置 */
.van-swipe-item img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持比例并填满容器 */
  display: block; /* 移除图片下方的空白间隙 */
}

</style>