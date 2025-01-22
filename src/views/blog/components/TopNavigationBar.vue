<template>
    <div class="custom-menu">
      <n-menu
        :value="activeIndex"
        mode="horizontal"
        :options="menuOptions"
        class="custom-n-menu"
        @update:value="handleMenuClick"
      />
    </div>
  </template>
  
  <script setup>
  import { ref , defineEmits } from 'vue';
  import { NIcon } from 'naive-ui';
  import { HomeOutline as HomeIcon, GameControllerOutline as GamesIcon, ChatboxEllipsesOutline as ChatIcon,
     SearchOutline as SearchIcon, PersonOutline as ProfileIcon, SwapHorizontalOutline as SwitchAccountIcon
  } from '@vicons/ionicons5';

  const emit = defineEmits(['switchWallpaper' , 'switchContent']);


  
  // 定义响应式数据
  const activeIndex = ref('1');
  
  // 定义菜单项
  const menuOptions = [
    { label: '首页', key: '1', icon: renderIcon(HomeIcon)},
    { label: 'Games', key: '2', icon: renderIcon(GamesIcon)},
    { label: 'Chat', key: '3', icon: renderIcon(ChatIcon)},
    { label: 'Search', key: '4', icon: renderIcon(SearchIcon)},
    { label: 'Profile', key: '5', icon: renderIcon(ProfileIcon) },
    { label: 'Switch Wallpaper', key: '6', icon: renderIcon(SwitchAccountIcon)}
 ];

  // 处理菜单点击事件
  const handleMenuClick = (key) => {
    switch (key) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
        activeIndex.value = key;
        switchContent(key);
        break;
    
      case '6':
        activeIndex.value = '6';
        // 切换壁纸
        switchWallpaper();
        break;  
      default: break;
    }

  };

  // 获取文件下的背景图片
  function importAllImages() {
    const images = import.meta.glob('@/assets/images/blog-bgImg/*.{ png,jpg,jpeg,gif,svg }')
    return Object.keys(images).map(path => new URL(path, import.meta.url).href)
  }

  const imagesList = ref(importAllImages())  // 图片数据
  const currentImageIndex = ref(0) // 当前图片的索引
  const currentImageUrl = ref('@/assets/images/blog-bgImg/wallhaven-1p22m9.jpg') // 当前图片的路径

  // 切换壁纸的逻辑
  function switchWallpaper() {
    currentImageIndex.value = (currentImageIndex.value + 1) % imagesList.value.length
    currentImageUrl.value = imagesList.value[currentImageIndex.value]
    emit('switchWallpaper' , currentImageUrl.value); // 发送事件
  }
  
  // 渲染图标函数
  function renderIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) });
  }

  // 切换内容
  function switchContent(key) {
    emit('switchContent' , key);
  }

  onMounted(() => {
    switchWallpaper()
    setInterval(switchWallpaper, 300000)
  })


  </script>
  
  <style scoped>
  /* From Uiverse.io by Admin12121 */
  .custom-menu {
    padding: 0.5rem;
    background-color: #fff;
    position: relative;
    display: flex;
    justify-content: center;
    border-radius: 0px;
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.075);
    width: 100vw;
  }
  
  .custom-n-menu {
    border-bottom: none;  
    font-size: 1rem;
    font-family: 'echo';
  }

  </style>
  
  <!-- 引入所需的图标库 -->
  <script>
  import { h } from 'vue';
  </script>