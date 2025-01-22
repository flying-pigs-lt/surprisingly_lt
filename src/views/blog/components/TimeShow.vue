<template>
    <div class="time-show">
        <div class="time-display">
            {{ formattedTime }}
        </div>
        <div class="date-display">
            {{ formattedDate }} {{ formattedWeek }}
        </div>
    </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import dayjs from 'dayjs'

const currentTime = ref(dayjs())

 // 定义一个计算属性来格式化时间
const formattedTime = computed(() => currentTime.value.format('HH:mm:ss'))
const formattedDate = computed(() => currentTime.value.format('YYYY年MM月DD日')) // 显示年月日;
const formattedWeek = computed(() => currentTime.value.format('dddd')) // 显示星期);

// 使用 setInterval 每秒更新 currentTime
setInterval(() => {
  currentTime.value = dayjs()
}, 1000)


</script>

<style scoped>

/* .time-show{
    width: 100%;
    height: 100%;
    background: red;
} */
/* 时间显示的样式 */
.time-display {
  display: flex;
  /* margin-top: 2.4rem; */
  font-size: 5rem; /* 字体大小 */
  /* font-weight: 600; */
  color: #fff; /* 文字颜色 */
  /* padding: 20px 10px 0 10px; */
  font-family: Arial, sans-serif; /* 设置字体为 Arial */
  border-radius: 15px; /* 圆角边框 */
  /* 文字阴影 */
  text-shadow: 2px 4px 6px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease-in-out;
}

.date-display,
.week-display {
  display: flex;
  justify-content: center;
  position: relative;
  top: -30px;
  font-style: italic;

  /* margin-top: 30px; */

  font-size: .9rem; /* 字体大小 */
  font-weight: 500;
  color: #fff; /* 文字颜色 */
  font-family: Arial, sans-serif; /* 设置字体为 Arial */
  margin: 5px 0; /* 上下间距 */
}
</style>