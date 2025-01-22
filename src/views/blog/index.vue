<template>
  <div class="blog" :style="{ backgroundImage: `url(${currentImageUrl})` }">
    <div class="blog-home">
      <div class="blog-home-header">
        <div class="header-nav">
          <TopNavigationBar @switch-wallpaper="switchWallpaper" @switch-content="switchContent" />
        </div>
      </div>
      <div class="blog-home-content">
        <template v-if="contentIndex === '1'">
          <BlogHome />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import TopNavigationBar from '@/views/blog/components/TopNavigationBar.vue'
import BlogHome from '@/views/blog/content/blog-home.vue'

const currentImageUrl = ref('') // 当前图片的路径
const contentIndex = ref('1') // 当前内容的索引

// 获取背景图片
function switchWallpaper(data) {
  currentImageUrl.value = data
}

function switchContent(key) {
  contentIndex.value = key
}
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

  font-family:
    'echo',
    'Chinese Quotes',
    'Inter var',
    'Inter',
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Helvetica,
    Arial,
    'Noto Sans',
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'Noto Color Emoji';
  /* margin: 0 auto; */
}

.blog-home {
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

.blog-home-content {
  width: 100%;
  height: 100%;
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
</style>
