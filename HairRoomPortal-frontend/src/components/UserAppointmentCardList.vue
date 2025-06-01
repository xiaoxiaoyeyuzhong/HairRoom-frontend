<script setup lang="ts">

import haircut from "../assets/haircut.jpg";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {useUserStore} from "../stores/user.ts";
import {storeToRefs} from "pinia";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";


interface UserAppointmentCardListProps{
  appointmentVOList: API.AppointmentVO[];
}


const router = useRouter();
// 声明用户登录状态
const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore); // 使用 storeToRefs 保持响应式


const props= withDefaults(defineProps<UserAppointmentCardListProps>(),{
  //@ts-ignore
  appointmentVOList: [] as API.AppointmentVO[],
});


// 订单支付
const doPay = async (staffId : number,billId: number) =>{

  const outTradeNo = + currentUser.value.data.id + "_" + staffId + "_" + billId
      + "_" + Date.now()
  // axios配置了api前缀，但是这里没用到，需要注意加上api前缀
  // 支付宝沙箱不太稳定，可能出现请求三次才成功的情况，不是代码的问题
  // 关于window.open的第二个参数，_self代表直接在本窗口跳转到支付宝支付窗口，而_blank代表使用新窗口打开
  window.open("http://127.0.0.1:8081/api/alipay/pay?billName="+"德田发型屋，"
      + "洗剪吹" + "&outTradeNo="+ outTradeNo  +"&billAmount="
      + "20" ,'_blank')
}

const RefundAddRequest : API.RefundAddRequest = ref({
  tradeNo: "0",
  outTradeNo: "0",
  refundAmount: 0,
  refundReason: "未享受服务，申请退款",
})

const DeleteRequest = ref({
  id: 0,
})

// 取消预约
const doCancelAppointment = async (id: number)=>{
  DeleteRequest.value.id = id;
  const res = await myAxios.post('appointment/cancel',DeleteRequest.value);
  if(res.code === 0){
    showSuccessToast("已经取消预约");
    window.location.reload();
  }else{
    showFailToast('取消预约失败' + (res.description ? `，${res.description}` : ''))
  }
}

// 申请退款
const doRefund = async (tradeNo : string,outTradeNo: string) =>{
  RefundAddRequest.value.tradeNo=tradeNo;
  RefundAddRequest.value.outTradeNo=outTradeNo;
  RefundAddRequest.value.refundAmount=20;

  const res = await myAxios.post('/refund/add',RefundAddRequest.value);
  if(res.code === 0){
    showSuccessToast("申请退款成功");
    window.location.reload();

  }else{
    showFailToast('申请退款失败' + (res.description ? `，${res.description}` : ''))
  }
}

onMounted(async()=>{
  await userStore.fetchCurrentUser(); // 获取用户信息
})

</script>

<template>

  <div id="userAppointmentCardList">
    <van-card
        v-for="AppointmentVO in props.appointmentVOList"
        :thumb="haircut"
        :desc="`员工名:${AppointmentVO.staffName}`"
        :title="`门店名:${AppointmentVO.storeName}`"
    >
      <!--      <template #tags>-->
      <!--        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">-->
      <!--          {{-->
      <!--            teamStatusEnum[AppointmentVO.status]-->
      <!--          }}-->
      <!--        </van-tag>-->
      <!--      </template>-->

      <template #bottom>
        <div>
          {{ `预约时间: ${AppointmentVO.appointmentTime}` }}
        </div>
        <div>
          {{ `时间段: ${AppointmentVO.timeInterval}` }}
        </div>
      </template>


      <template #footer>

        <!-- plain为朴素样式 -->

        <van-button  size="small"
                     plain
                     @click="doPay(AppointmentVO.staffId,AppointmentVO.billId)"
                     v-if="AppointmentVO.paySituation === 0"
                     type="success"
        >去支付</van-button>

        <van-button  size="small"
                     plain
                     @click="doRefund(AppointmentVO.tradeNo,AppointmentVO.outTradeNo)"
                     v-if="(AppointmentVO.paySituation === 1)"
                     type="warning"

        >申请退款</van-button>


        <van-button  size="small"
                     plain
                     @click="doCancelAppointment(AppointmentVO.id)"
                     type="danger"
                     v-if="(AppointmentVO.paySituation === 0)"
        >取消预约</van-button>

        <van-button  size="small"
                     plain
                     type="danger"
                     v-if="(AppointmentVO.paySituation === 2)"
                     disabled
        >用户已退款</van-button>

        <van-button  size="small"
                     plain
                     type="danger"
                     v-if="(AppointmentVO.paySituation === 3)"
                     disabled
        >退款处理中</van-button>
        <van-button  size="small"
                     plain
                     type="danger"
                     v-if="(AppointmentVO.paySituation === 4)"
                     disabled
        >退款失败</van-button>
      </template>

    </van-card>
  </div>

</template>

<style scoped>
#userAppointmentCardList :deep(.van-image__img) {
  height: 90px;
  object-fit: unset;
}
</style>