<template>
    <div>
        <button :class="selectClassStyle" @click="emitClick" @contextmenu.prevent="showContextMenu">
            <span class="btn-text"> {{ text }} </span>
        </button>

        <!-- 右键点击时显示的气泡框 -->
        <div v-if="contextMenuVisible" :style="{ top: `${contextMenuPos.top}px`, left: `${contextMenuPos.left}px` }" class="context-menu" @click.stop>
            <div @click="openThemeDialog">更换主题</div>
        </div>

        <!-- 弹出框：选择主题 -->
        <t-dialog v-model="dialogVisible" title="切换按钮主题" draggable width="800px" height="auto"
             @confirm="onConfirm">
            <template #body>
                <div class="theme-content">
                    <div class="theme-options">
                        <div v-for="(theme, index) in themeOptions" :key="index">
                              <button class="w-[100%] h-[40px] border-[#fff]" text="按钮主题" @click="changeTheme(theme)">
                                {{ theme }}
                              </button>
                        </div>
                    </div>
                    <div class="theme-show">
                        <div class="flex items-center justify-center m-auto h-full">
                            <div>
                                <t-button :type="selectedTheme" text="按钮主题"/>
                            </div>
                        </div> 
                    </div>
                </div>
            </template>
            <template #footer>
                <t-button text="保存更改" @click="onConfirm"/>
                <t-button class="ml-10" text="关 闭" @click="closeDialog" />
            </template>
        </t-dialog>
    </div>
</template>


<script setup>
    import { computed, defineProps,defineEmits,onMounted } from 'vue'
    import { typeClassMap } from '@/views/blog/utils/typeClassMap.js'
    import '@/views/blog/assets/styles/buttonStyles.scss'  // 引入样式文件
    import TDialog from '@/views/blog/components/TDialog.vue'
    // import  useMessage  from 'naive-ui'
    import { useStore } from 'vuex';

    const store = useStore();

    const emit = defineEmits(['click'])
    // const message = useMessage()

    //定义props,接收父组件传递的数据
    const props = defineProps({
        text: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'default'
        },
        canChangeTheme: {
            type: Boolean,
            default: false // 默认不允许更换主题
        }
    })

    const contextMenuVisible = ref(false)  // 控制气泡框是否显示
    const contextMenuPos = ref({ top: 0, left: 0 })  // 存储右键点击的位置 
    const dialogVisible = ref(false) // 控制弹出框显示
    const selectedTheme = ref(props.type) // 当前选中的主题 

    const selectClassStyle = computed(() => typeClassMap[props.type] || typeClassMap['default'])

    //定义emitClick方法
    const emitClick = () => {
        emit('click')
    }

    // 打开选择主题的弹出框
    const openThemeDialog = () => {
        contextMenuVisible.value = false  // 隐藏气泡框
        dialogVisible.value = true  // 打开弹出框
    }

    // 主题选项
    let themeOptions = [];

    onMounted(() => {
        themeOptions = Object.keys(typeClassMap); // 获取所有主题
    })


    // 显示气泡框，右击事件
    const showContextMenu = (event) => {
        if (!props.canChangeTheme) return;  // 如果不允许更换主题，则不显示气泡框
        event.preventDefault()  // 阻止默认的右键菜单
        console.log('event::: ', event);
        contextMenuPos.value = { top: event.clientY - 40, left: event.clientX }  // 设置气泡框位置


        contextMenuVisible.value = true  // 显示气泡框
    }


    // 更换按钮主题
    const changeTheme = (theme) => {
        selectedTheme.value = theme;  // 更新选中的主题
    }


    const closeDialog = () => {
        dialogVisible.value = false;
    };

    const onConfirm = () => {
        // props.type = selectedTheme.value;  // 更新父组件的type属性
        store.dispatch('updateTheme', selectedTheme.value);  // 更新 Vuex 中的主题
        dialogVisible.value = false;

        // TMessage.success('主题更换成功');
        this.$message.success('主题更换成功');

        
    };


    // 关闭气泡框（点击空白处）
    document.addEventListener('click', () => {
        contextMenuVisible.value = false
    })
</script>

<style scoped lang="scss">
/* 气泡框样式 */
.context-menu {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
//   border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 150px;
  padding: 10px;
}

.context-menu div {
  padding: 5px;
  cursor: pointer;
}

.context-menu div:hover {
  background-color: #f1f1f1;
}


.theme-content{
    display: flex;
    border-radius: 10px;
    min-height: 450px;
    .theme-options {
        flex: 1;
        background: #fff;
        color: #477BA6;
        max-height: 500px;
        overflow-y: auto;
        scrollbar-width: none; 
    }

    .theme-show{
        flex: 1;
        background-color: rgb(232 232 232 / var(--tw-bg-opacity, 1));
        border-radius: 0 10px 10px 0;
    }
}
</style>


