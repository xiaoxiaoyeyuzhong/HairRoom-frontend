<script setup lang="ts">

import {onMounted, ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import myAxios from "../plugins/myAxios.ts";
import {useRoute, useRouter} from "vue-router";
const showPicker = ref(false);
const currentDate = ref(['2022', '06', '01']);  //定义一个初始时间(年月日)
const currentTime = ref(['12', '00', '00']);  //定义一个初始时间(时分秒)
const columnsType = ['hour', 'minute', 'second'];
const router = useRouter();
const route = useRoute();
const onConfirm = () => {
  //组合过期时间，'T'是满足后端序列化配的
  addTeamData.value.expireTime = currentDate.value.join('-') + 'T' +
      currentTime.value.join(':');
  showPicker.value = false;   //有了这行才会使picker点击“确认”后自动关闭
};

const minDate = new Date();

// 通过路由获取传递的信息
const id = route.query.id;
const nowTimeSlot = route.query.nowTimeSlot;
// 使用内置的Number函数将timeSlots转换为数字数组，防止includes判断错误
const timeSlots : number[] = (route.query.timeSlots as string[]).map(Number);
console.log("ScheduleUpdatePage,通过路由获取信息" + timeSlots );

// 展示时间段需要的时间段映射
const timeSlotsMap = [
  { value: 1, label: '上午' },
  { value: 2, label: '下午' },
  { value: 3, label: '晚上' },
];


//需要用户填写表单数据
const addTeamData = ref({});
//获取之前队伍的信息
onMounted(async () => {
  if (id <= 0) {
    showFailToast("队伍加载失败");
    return;
  }
  const res = await myAxios.get("/team/get", {
    params: {
      id: id,
    }
  });
  if (res?.code === 0) {
    addTeamData.value = res.data;
  } else {
    showFailToast("队伍加载失败，请刷新重试");
  }
})
// 提交

const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status)
  }
  // todo 前端参数校验
  const res = await myAxios.post("/team/update", postData);
  if (res?.code === 0 && res.data) {
    showSuccessToast('更新成功');
    await router.push({
      path: '/TeamPage',
      replace: true,
    });
  } else {
    showFailToast('更新失败');
  }
}
</script>

<template>
  <div id="ScheduleUpdatePage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <!-- readonlyd代表只读 -->
        <van-field
            v-model="addTeamData.name"
            name="name"
            readonly
            label="员工名称"

        />

        <van-field name="appointSlots" label="可预约人数">
          <!-- integer限制只能输入整数 -->
          <template #input>
            <van-stepper v-model="value" integer />
          </template>
        </van-field>
<!--        <van-field-->
<!--            v-model="addTeamData.description"-->
<!--            rows="4"-->
<!--            autosize-->
<!--            label="可预约人数"-->
<!--            type="number"-->
<!--            placeholder="请输入可预约人数"-->
<!--            :rules="[{ required: true, message: '请输入可预约的最大人数' }]"-->
<!--        />-->
<!--        <van-field-->
<!--            is-link-->
<!--            readonly-->
<!--            clickable-->
<!--            name="date-picker"-->
<!--            label="过期时间"-->
<!--            :value="addTeamData.expireTime"-->
<!--            v-model="addTeamData.expireTime"-->
<!--            :placeholder="'点击选择过期时间'"-->
<!--            @click="showPicker = true"-->
<!--        />-->
<!--        <van-popup v-model:show="showPicker" position="bottom">-->
<!--          <van-picker-group-->
<!--              title="设定过期日期"-->
<!--              :tabs="['选择日期', '选择时间']"-->
<!--              @confirm="onConfirm"-->
<!--              @cancel="showPicker = false"-->
<!--          >-->
<!--            <van-date-picker-->
<!--                v-model="currentDate"-->
<!--                :min-date="minDate"-->
<!--            />-->
<!--            <van-time-picker-->
<!--                v-model="currentTime"-->
<!--                :columns-type="columnsType"-->
<!--            />-->
<!--          </van-picker-group>-->
<!--        </van-popup>-->
        <van-field name="radio" label="排班时间段">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio
                  v-for="(timeSlot, index) in timeSlotsMap"
                  :key="timeSlot.value"
                  :name="timeSlot.value"
                  v-show="!timeSlots.includes(timeSlot.value) || Number(nowTimeSlot) === timeSlot.value"
              >
                {{ timeSlot.label }}
              </van-radio>

            </van-radio-group>
          </template>
        </van-field>

<!--        <van-field-->
<!--            v-if="Number(addTeamData.status) === 2"-->
<!--            v-model="addTeamData.password"-->
<!--            type="password"-->
<!--            name="password"-->
<!--            label="密码"-->
<!--            placeholder="请输入队伍密码"-->
<!--            :rules="[{ required: true, message: '请填写密码' }]"-->
<!--        />-->
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped>
#ScheduleUpdatePage {
}
</style>