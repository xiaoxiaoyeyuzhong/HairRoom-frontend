<script setup>

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
const id = route.query.id;
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
    router.push({
      path: '/TeamPage',
      replace: true,
    });
  } else {
    showFailToast('更新失败');
  }
}
</script>

<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队伍名称"
            placeholder="请输入队伍名称"
            :rules="[{ required: true, message: '请输入队伍名称' }]"
        />
        <van-field
            v-model="addTeamData.description"
            rows="4"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />
        <van-field
            is-link
            readonly
            clickable
            name="date-picker"
            label="过期时间"
            :value="addTeamData.expireTime"
            v-model="addTeamData.expireTime"
            :placeholder="'点击选择过期时间'"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-picker-group
              title="设定过期日期"
              :tabs="['选择日期', '选择时间']"
              @confirm="onConfirm"
              @cancel="showPicker = false"
          >
            <van-date-picker
                v-model="currentDate"
                :min-date="minDate"
            />
            <van-time-picker
                v-model="currentTime"
                :columns-type="columnsType"
            />
          </van-picker-group>
        </van-popup>
        <van-field name="radio" label="队伍是否公开">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field
            v-if="Number(addTeamData.status) === 2"
            v-model="addTeamData.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入队伍密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
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
#teamPage {
}
</style>