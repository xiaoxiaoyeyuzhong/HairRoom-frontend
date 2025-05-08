<script setup lang="ts">
import {onMounted, ref} from "vue";
import { showToast } from 'vant';
import {useRouter} from "vue-router";
import {getCurrentUser} from "../services/user.ts";
import {userRoleEnum} from "../constants/user/userRoleEnum.ts";
import routes from "../config/routes.ts";
import {useUserStore} from "../stores/user.ts";
import {storeToRefs} from "pinia";

const router=useRouter();
const onClickLeft = () => {
  // 点击箭头返回时，跳转到上一个页面，因为有多级页面
  router.back()
};
const onClickRight = () => {
  router.push('/SearchPage')
};
// const active = ref("index");
const onChange = (index) => showToast(`标签 ${index}`);

//根据路由切换标题
const DEFAULT_TITLE = '德田发型屋';
const title =ref(DEFAULT_TITLE);
router.beforeEach((to,from)=>{
  const toPath = to.path;
  //在路由里寻找和要前往页面路径一样的配置，如果route的值不为空，则用title，如果是空，用默认的标题
  const route = routes.find((route)=>{
    return toPath === route.path;
  })
  title.value = route.title ?? DEFAULT_TITLE;
})

// 声明用户登录状态
const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore); // 使用 storeToRefs 保持响应式

onMounted(async()=>{
  //获取用户信息
  await userStore.fetchCurrentUser(); // 获取用户信息
  console.log("BasicLayout.vue:" + currentUser.value);
})

</script>

<template>
  <van-nav-bar
      :title="title"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

<!--&lt;!&ndash;  使用v-if判断active的值，当其发生改变的时候，跳转到对应页面&ndash;&gt;-->
<!--  <template v-if="active==='index'">-->
<!--  <Index />-->
<!--  </template>-->
<!--  <template v-if="active==='team'">-->
<!--    <Team />-->
<!--  </template>-->

<!--定义中间内容，加入路由-->
  <div id="content">
    <router-view />
  </div>
  <!--点击底部标签栏进行页面切换-->
  <van-tabbar route @change="onChange">
    <!--路由的to要加上/-->
    <!-- 当用户的角色为客户时，显示预约而不显示排班；当用户角色为员工时，显示排班而不显示预约；-->
    <van-tabbar-item replace to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item replace to="/AppointmentPage" icon="search" name="appointment"
                     v-if="currentUser?.data.userRole===userRoleEnum.C">预约</van-tabbar-item>
    <van-tabbar-item replace to="/SchedulePage" icon="search" name="schedule"
                     v-if="currentUser?.data.userRole===userRoleEnum.S">排班</van-tabbar-item>
    <van-tabbar-item replace to="/UserPage" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>

</template>

<style scoped>

</style>