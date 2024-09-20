/*
 * @Author: laoTan 
 * @Date: 2024-08-14 14:29:27  
 * @Last Modified time: 2024-08-14 14:29:27 
 */

 <template>
    <CommonPage>
      <div id="EchartsMap" ref="echartsMapRef" style="width: 100%; height: 100%;">       
      </div>
      <n-button v-show="isGoBackShow" @click="goBack" style="position: absolute; top: 17%; left: 15%;" type="primary">返 回</n-button> 
      
    </CommonPage>
  </template>

<script setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/geo";
import "echarts/lib/chart/scatter";
import "echarts/lib/chart/map";
import "echarts/lib/component/visualMap";
import * as turf from "@turf/turf";
import { map } from "lodash-es";

import areaBg from '@/assets/images/map_texture.jpg'

const echartsMapRef = ref(null); // 用 ref 获取 DOM 元素
const pointListInfo = ref([]); // 所有地图点位
const polygons = ref([]); // 多边形内点位

let isGoBackShow = ref(false); //控制返回按钮是否显示
let mapList = ref([]); // 记录地图下钻的数据

// const domImg = ref(['@/assets/images/背景.png'])


const domImg = new Image();
domImg.src = areaBg;


    // 初始化地图
    onMounted(async () => {
        const jsonData = await import("../../../assets/json/map/china.json");
        const data = jsonData.default;
        mapList.value.push({ name: "china", data });
        initializeMap("china", data);
    });

    const initializeMap = (mapName, mapJSON) => {
        echarts.registerMap(mapName, mapJSON);
        let myChart = echarts.getInstanceByDom(echartsMapRef.value);
        if (!myChart) {
            myChart = echarts.init(echartsMapRef.value, null, { renderer: 'canvas' });
        }
        const options = {
            backgroundColor: "#e0f7fa",
                geo: {
                    map: mapName,
                    aspectScale: 1.2,
                    top: "10%",
                    bottom: "5%",
                    roam: true,
                    label: {
                        show: true,
                        color: "#C3E0DD",
                        fontSize: 14,
                    },
                    itemStyle: {
                        areaColor: {
                            type:'pattern',
                            image: domImg,
                            repeat: 'repeat',

                        },
                        borderColor: "#38b6a3",
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                        shadowBlur: 20,

                        // normal: {
                        //     areaColor: '#3075b2',
                        //     borderColor: '#4c99f9',
                        //     borderWidth: 1
                        // },
                    },
                    emphasis: {
                        itemStyle: {
                            borderWidth: 2,
                            borderColor: "#4c99f9",
                            areaColor: "#3075b2",
                            },
                        label: {
                            color: "#fff",
                        },
                    },
                },
        };
        myChart.setOption(options,true);


        // 窗口调整时，重新调整图表大小
        window.addEventListener("resize", () => {
            myChart.resize();
        });

        myChart.off("click");

       // 点击事件处理
        myChart.on("click", async (params) => {
            const name = params.name;
            if (params.componentType === 'geo') {
                const exists = mapList.value.some(map => map.name === name);
                
                if(!exists){
                    const jsonData = await import(`../../../assets/json/map/${name}.json`);
                    const data = jsonData.default;
                    // 记录下钻后的地理名字和数据
                    mapList.value.push({name, data});
                    // 更新返回按钮的状态
                    await updateBackButtonVisibility();
                    initializeMap(name, data);
                }else{
                    console.log(`Map for ${name} is already in mapList.`);
                }


               
            }
        });
    };

    // 更新返回按钮的可见性
    function updateBackButtonVisibility() {
        isGoBackShow.value = mapList.value.length > 1;
    }
    // 返回上一级
    const goBack = () => {
        if (mapList.value.length <= 1) {  // 如果只有一个顶级地图，则无法返回
            console.warn("Already at the top level, cannot go back further.");
            return;
        }
        // 移除当前层级
        mapList.value.pop();
        // 获取当前层级的地图名称和数据
        const { name, data } = mapList.value[mapList.value.length - 1];
        // 更新返回按钮的状态
        updateBackButtonVisibility();
        // 初始化地图
        initializeMap(name, data);
    };





</script>

