<template>
  <!-- 可复用的圆角卡片组件 -->
  <div class="cards-container">
    <div
      class="rounded-card"
      v-for="(item, index) in cardData"
      :key="index"
      @click="handleClick(item)"
  >
    <!-- 文字区域 -->
    <div class="text-section">
      <h3 class="title">{{ item.title }}</h3>
      <p class="subtitle">{{ item.subtitle }}</p>
    </div>

    <!-- 图片区域 -->
    <div class="image-section">
      <img
          :src="item.image"
          :alt="item.title"
          class="card-image"
          @error="handleImageError(index)"
      >
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { RouteLocationRaw } from 'vue-router'

// 定义卡片数据类型
interface CardItem {
  title: string
  subtitle: string
  image: string
  route: RouteLocationRaw
}

export default defineComponent({
  name: 'RoundedCard',
  props: {
    cardData: {
      type: Array as PropType<CardItem[]>,
      default: () => [
        {
          title: '在线预约',
          subtitle: '每时每刻 无论远近',
          image: 'https://hair-room.oss-cn-guangzhou.aliyuncs.com/homeCard/appointment.jpg',
          route: '/AppointmentPage'
        },
        {
          title: '消费历史',
          subtitle: '我的理发经历',
          image: 'https://hair-room.oss-cn-guangzhou.aliyuncs.com/homeCard/consumerHistory.jpg',
          route: '/UserPage/UserAppointmentPage'
        }
      ] as CardItem[]
    }
  },
  methods: {
    handleClick(item: CardItem): void {
      this.$router.push(item.route)
    },
    handleImageError(index: number): void {
      // 使用 Vue 的响应式方法更新数组
      this.$set(this.cardData, index, {
        ...this.cardData[index],
        image: require('@/assets/default-image.jpg')
      })
    }
  }
})
</script>

<style scoped>
/* 新增外层容器 */
.cards-container {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -8px; /* 抵消卡片边距 */
}

.rounded-card {
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 8px; /* 缩小边距 */
  transition: transform 0.3s ease;
  cursor: pointer;
  width: calc(50% - 16px); /* 一行两个，考虑边距 */
  box-sizing: border-box;

  /* 添加flex布局 */
  display: flex;
  justify-content: space-between;
  padding: 12px; /* 统一内边距 */
}

.text-section {
  flex: 1;
  padding-right: 8px; /* 文字和图片间距 */
}

.title {
  margin: 0 0 4px 0; /* 缩小标题间距 */
  font-size: 16px;

}

.subtitle {
  margin: 0;
  font-size: 12px;
  color: #8B4513;
}

.image-section {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  background: #f8f8f8; /* 容器背景色 */
  border-radius: 8px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}
</style>