<template>
  <CommonPage>
    <div>
        <div class="btn-1 definitionBtn">
            <button class="button_1" type="primary" @click="skipBlog">Blog 跳 转</button>
        </div>
        <div class="btn-2 definitionBtn">
            <voltageBtn @click="handClick" />
        </div>
    </div>
  </CommonPage>
</template>



<script setup>

import { ref, computed } from "vue";

import voltageBtn  from '@/views/demo/components/voltage-button.vue'

const router = useRouter(); //导入路由

//跳转路由
function skipBlog() {
  router.push('/blog')
}

function handClick() {
    console.log("父组件点击");
    // router.push();
}

</script>

<style>
  /* From Uiverse.io by vikiWayne */ 
.button_1 {
  padding: 1em 2em;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  letter-spacing: 5px;
  text-transform: uppercase;
  cursor: pointer;
  color: #2c9caf;
  transition: all 1000ms;
  font-size: 15px;
  position: relative;
  overflow: hidden;
  outline: 2px solid #2c9caf;
}

.button_1:hover {
  color: #ffffff;
  transform: scale(1.1);
  outline: 2px solid #70bdca;
  box-shadow: 4px 5px 17px -4px #268391;
}

.button_1::before {
  content: "";
  position: absolute;
  left: -50px;
  top: 0;
  width: 0;
  height: 100%;
  background-color: #2c9caf;
  transform: skewX(45deg);
  z-index: -1;
  transition: width 1000ms;
}

.button_1:hover::before {
  width: 250%;
}

.definitionBtn{
    margin: 30px 10px ;
}


</style>

