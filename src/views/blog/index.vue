<template>
  <div class="blog" :style="{ backgroundImage: `url(${currentImageUrl})` }">
    <button class="toggle-button" @click="toggleSidebar">
      <!-- {{ isSidebarVisible ? 'Hide' : 'Show' }} Sidebar -->
      <n-icon size="40" class="n-toggle-button">
        <CaretForward />
      </n-icon>
    </button>
    <div class="blog-home">
      <div class="blog-home-header">
        <p class="time-display">
          {{ formattedTime }}
        </p>
        <p class="date-display">
          {{ formattedDate }}
        </p>
        <p class="week-display">
          {{ formattedWeek }}
        </p>
      </div>
      <div v-if="isSidebarVisible" class="blog-home-sidebar">
        <ul>
          <li><a href="#section1">Home</a></li>
          <li><a href="#section2">About</a></li>
          <li><a @click="switchingImages">切换壁纸</a></li>
          <li><a href="#section4">Contact</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import dayjs from 'dayjs'

import { CaretForward } from '@vicons/ionicons5'

// 定义响应式的 currentTime
const currentTime = ref(dayjs())
// 默认显示侧边栏
const isSidebarVisible = ref(true)

// 定义一个计算属性来格式化时间
const formattedTime = computed(() => currentTime.value.format('HH:mm:ss'))
const formattedDate = computed(() => currentTime.value.format('YYYY年MM月DD日')) // 显示年月日;
const formattedWeek = computed(() => currentTime.value.format('dddd')) // 显示星期);

const currentImageIndex = ref(0) // 当前图片的索引
const currentImageUrl = ref('@/assets/images/blog-bgImg/wallhaven-1p22m9.jpg') // 当前图片的路径

// 获取文件下的背景图片
function importAllImages() {
  const images = import.meta.glob('@/assets/images/blog-bgImg/*.{ png,jpg,jpeg,gif,svg }')
  return Object.keys(images).map(path => new URL(path, import.meta.url).href)
}

// 图片数据
const imagesList = ref(importAllImages())

// 图片切换
function switchingImages() {
  currentImageIndex.value = (currentImageIndex.value + 1) % imagesList.value.length
  currentImageUrl.value = imagesList.value[currentImageIndex.value]
}

// 切换侧边栏显示状态
function toggleSidebar() {
  isSidebarVisible.value = !isSidebarVisible.value
}

// 使用 setInterval 每秒更新 currentTime
setInterval(() => {
  currentTime.value = dayjs()
}, 1000)

onMounted(() => {
  switchingImages()
  setInterval(switchingImages, 300000)
})
</script>

<style>
.blog {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-repeat: no-repeat;
  /* 图片覆盖整个背景 */
  background-size: cover;
  background-position: center center;
  /* margin: 0 auto; */
}

.blog-home {
  /* display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center; */

  width: 100%;
  height: 100%;
  margin: auto;
  transition: margin-left 0.3s;
}

.toggle-button {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  padding: 10px 10px;
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0);
  color: rgba(255, 255, 255, 0.5);
  border: none;
  /* border-radius: 5px; */
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle-button:hover {
  /* background-color: rgba(0, 0, 25, 0.6); */
  color: rgba(255, 255, 255, 1);
}

.blog-home-header {
  display: flex;
  flex-direction: column; /* 纵向排列 */
  align-items: center;
  /* 将时间居中显示 */
  /* height: 100vh;  */
}

/* 时间显示的样式 */
.time-display {
  margin-top: 2.4rem;
  font-size: 5rem; /* 字体大小 */
  font-weight: 600;
  color: #fff; /* 文字颜色 */
  padding: 10px 20px;
  font-family: Arial, sans-serif; /* 设置字体为 Arial */
  border-radius: 15px; /* 圆角边框 */
  /* 文字阴影 */
  text-shadow: 2px 4px 6px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease-in-out;
  /* 添加动画效果 */
  /* animation: pulse 1.5s infinite;  */
}

.date-display,
.week-display {
  font-size: 1rem; /* 字体大小 */
  font-weight: 500;
  color: #fff; /* 文字颜色 */
  font-family: Arial, sans-serif; /* 设置字体为 Arial */
  margin: 5px 0; /* 上下间距 */
}

.blog-home-sidebar {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 200px;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.blog-home-sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  text-align: center;
}

.blog-home-sidebar li {
  margin: 20px 0;
}

.blog-home-sidebar a {
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.blog-home-sidebar a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
