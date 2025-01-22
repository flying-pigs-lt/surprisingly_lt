<template>
    <teleport to="body">
      <transition name="fade">
        <div v-if="visible" class="custom-dialog-overlay" @click="closeOnOverlayClick">
          <div 
            ref="dialog" 
            class="custom-dialog"
            @click.stop
            :class="{'custom-dialog-fullscreen': fullscreen}"
            :style="dialogStyle"
            :draggable="draggable"
            @dragstart="onDragStart"
            @dragend="onDragEnd"
          >
            <header class="custom-dialog-header">
              <span>{{ title }}</span>
              <button class="close-btn" @click="close">×</button>
            </header>
            <section class="custom-dialog-body">
              <slot name="body">默认内容</slot>
            </section>
            <footer class="custom-dialog-footer">
              <slot name="footer">
                <!-- <button @click="confirm">确定</button>
                <button @click="close">关闭</button> -->

                <t-button text="确 定" @click="confirm" />
                <t-button text="关 闭" @click="close" />
              </slot>
            </footer>
          </div>
        </div>
      </transition>
    </teleport>
  </template>
  
  <script setup>
  import { ref, watch, defineProps, defineEmits } from 'vue';
  
  // Props定义
  const props = defineProps({
    modelValue: { type: Boolean, default: false },
    title: { type: String, default: '弹出框' },
    fullscreen: { type: Boolean, default: false },
    draggable: { type: Boolean, default: true },
    width: { type: String, default: '50%' },
    height: { type: String, default: 'auto' },
  });
  
  // Emits声明
  const emit = defineEmits(['update:modelValue', 'confirm']);
  
  const visible = ref(false);
  
  // 监听v-model绑定的visible属性
  watch(() => props.modelValue, (newVal) => {
    visible.value = newVal;
  });
  
  const close = () => {
    visible.value = false;
    emit('update:modelValue', false);  // 更新父组件的绑定值
  };
  
  const closeOnOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };
  
  const confirm = () => {
    emit('confirm');  // 确认事件
    close();
  };
  
  const dialogPosition = ref({ top: '10%', left: '50%' });
  const dialogStyle = ref({
        width: props.width,
        height: props.height,
        position: 'absolute', // 确保弹框是绝对定位的
        top: dialogPosition.value.top,
        // left: dialogPosition.value.left,
  });

  const offset = ref({ x: 0, y: 0 });
  const dragging = ref(false);
  
  const onDragStart = (e) => {
    if (!props.draggable) return;
    dragging.value = true;
    offset.value.x = e.clientX - dialogPosition.value.left;
    offset.value.y = e.clientY - dialogPosition.value.top;
  };
  
  const onDragEnd = (e) => {
    if (!dragging.value) return;
    dragging.value = false;
    dialogPosition.value.top = `${e.clientY - offset.value.y}px`;
    dialogPosition.value.left = `${e.clientX - offset.value.x}px`;
  };
  
  watch(dialogPosition, () => {
    if (dragging.value) return;
    dialogStyle.value = {
      top: dialogPosition.value.top,
      left: dialogPosition.value.left,
      width: props.width,
      height: props.height,
    };
  });
  </script>
  
  <style scoped>
  .custom-dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .custom-dialog {
    background: white;
    /* border-radius: 8px; */
    padding: 20px;
    max-width: 90%;
    box-sizing: border-box;
    position: relative;
    z-index: 1000;
  }
  
  .custom-dialog-header {
    font-size: 18px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .custom-dialog-body {
    margin-bottom: 20px;
  }
  
  .custom-dialog-footer {
    display: flex;
    justify-content: flex-end;
    /* margin: 10px; */
  }
  
  button {
    padding: 8px 16px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  
  .close-btn {
    background: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  
  .custom-dialog-fullscreen {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
  
  .custom-dialog .custom-dialog-header {
    cursor: move;
  }
  </style>
  