<template>
    <div class="blog-homePage">
        <div class="blog-homePage-content">
            <div class="blog-home-header">
                <div class="home-header-time">
                    <TimeShow />
                </div>

                <div class="homePage-content-center">
                    <div class="homePage-content-center-item"></div>
                    <div class="homePage-content-center-item"></div>
                    <div class="homePage-content-center-item"></div>
                    <div class="homePage-content-center-item"></div>

                    <!-- <t-button text="按钮" @click="handleClick" :type="buttonType" :canChangeTheme="true" /> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import TimeShow from '@/views/blog/components/TimeShow.vue'

import { useStore } from 'vuex';
const store = useStore();
const buttonType = computed(() => store.state.theme); // 获取本地保存主题

const handleClick = () => {
    console.log('点击了按钮')
}

</script>


<style scoped lang="scss">
.blog-homePage {
    width: 100%;
    height: 100%;
    margin: auto;
    transition: margin-left 0.3s;
    padding: 30px;
}

.blog-homePage-content{
    width: 100%;
    height: 100%;
    margin: auto;
    transition: margin-left 0.3s;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(1px);
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
    border: 0px solid rgba(255, 255, 255, 0.5);


    .homePage-content-center{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;


        .homePage-content-center-item{
            flex: 0 1 150px;
            margin: 5px;
        }
    }
}

</style>