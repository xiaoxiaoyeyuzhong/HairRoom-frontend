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
}
