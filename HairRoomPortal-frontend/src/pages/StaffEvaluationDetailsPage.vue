<script setup lang="ts">
// 评价状态,0代表未评价，1代表已评价
import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import StaffEvaluationVO = API.StaffEvaluationVO;
import {useEvaluationStore} from "../stores/evaluation.ts";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";

const store = useEvaluationStore();

// 直接使用存储的数据
const evaluationData = computed(() => store.currentEvaluation);

const StaffEvaluationUpdateRequest = ref({
  id: 0,
  evaluation: "",
  evaluationScore: 0,
})

const onSubmit = async() =>{
  StaffEvaluationUpdateRequest.value.id = evaluationData.value.id;
  StaffEvaluationUpdateRequest.value.evaluation = evaluationData.value.evaluation;
  StaffEvaluationUpdateRequest.value.evaluationScore = evaluationData.value.evaluationScore;
  const res = await myAxios.post("staffEvaluation/update",StaffEvaluationUpdateRequest.value);
  if (res.code === 0) {
    showSuccessToast("修改评价成功");
  } else {
    showFailToast("修改评价失败，请刷新重试");
  }
}

// 离开页面时清理数据
onBeforeUnmount(() => {
  store.clearEvaluation();
});


</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="evaluationData.storeName"
          name="storeName"
          label="门店名称"
          disabled
      />
      <van-field
          v-model="evaluationData.staffName"
          name="staffName"
          label="员工名称"
          disabled
      />
      <van-field
          v-model="evaluationData.appointmentTime"
          name="appointmentTime"
          label="预约时间"
          disabled
      />
      <van-field
          v-model="evaluationData.timeInterval"
          name="timeInterval"
          label="时间段"
          disabled
      />
      <van-field
          v-model="evaluationData.evaluation"
          name="evaluation"
          label="评价内容"
          type="textarea"
          autosize
          placeholder="请填写评价内容"
          :rules="[{ required: true, message: '请填写评价内容' }]"
      />
      <van-field name="rate" label="评分">
        <template #input>
          <van-rate v-model="evaluationData.evaluationScore" />
        </template>
      </van-field>

    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>