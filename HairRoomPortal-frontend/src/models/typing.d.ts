declare namespace API{
     type CurrentUser = {
        id: number;

        userName?: string;

        userAccount: string;

        userAvatar?: string;

        userPassword: string;

        userRole: string;

    };

   type Team = {
      id: number;
      name: string;
      description: string;
      expireTime?: Date;
      maxNum: number;
      password?: string;
      //todo 定义枚举值，更规范
      status?: number;
      createTime: Date;
      updateTime: Date;
      userId: number;
      createUser?: CurrentUser;
      hasJoin: boolean;
      hasJoinNum?: number;
   }

   type Schedule = {
       id: number;
      /**
       * 员工id
       */
      staffId: number;

      /**
       * 门店id
       */
      storeId: number;

      /**
       * 星期几
       */
      weekDay: number;

      /**
       * 时间段
       */
      timeInterval: number;

      /**
       * 已预约数
       */
      haveAppointedSlots: number;

      /**
       * 可预约数
       */
      appointSlots: number;

      /**
       * 门店名称
       */
      storeName: string;

      /**
       * 员工名称
       */
      staffName: string;
   }

   type ScheduleQueryRequest = {
      staffId: number;
      weekDay: number;
   }

   type RefundAddRequest = {
      /**
       * 支付宝交易号
       */
      tradeNo: string;

      /**
       * 商户订单号
       */
      outTradeNo: string;

      /**
       * 退款金额
       */
      refundAmount: number;

      /**
       * 退款原因
       */
      refundReason: string;
   }

   type AppointmentVO = {
      /**
       * id
       */
      id: number;

      /**
       * 客户id
       */
      customerId: number;

      /**
       * 员工id
       */
      staffId: number;

      /**
       * 门店id
       */
      storeId: number;

      /**
       * 账单id
       */
      billId: number;

      /**
       * 预约日期
       */
      appointmentTime: Date;

      /**
       * 预约时间段
       */
      timeInterval: number;

      /**
       * 门店名称
       */
      storeName: string;

      /**
       * 员工名称
       */
      staffName: string;

      /**
       * 支付宝交易号
       */
      tradeNo: string;

      /**
       * 商户订单号
       */
      outTradeNo: string;

      /**
       * 支付状态
       */
      paySituation: number;
   }

   type StaffEvaluationVO = {

      /**
       * id
       */
      id: number;

      /**
       * 客户id
       */
      customerId: number;

      /**
       * 员工id
       */
      staffId: number;

      /**
       * 关联的预约id
       */
      appointmentId: number;

      /**
       * 评价内容
       */
      evaluation: string;

      /**
       * 评价分数
       */
      evaluationScore: number;

      /**
       * 评价状态
       */
      evaluationSituation: number;

      /**
       * 门店名称
       */
      storeName: string;

      /**
       * 员工名称
       */
      staffName: string;

      /**
       * 预约时间
       */
      appointmentTime: string;

      /**
       * 预约时间段
       */
      timeInterval: number;
   }

}
