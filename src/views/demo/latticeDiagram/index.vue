/*
 * @Author: laoTan 
 * @Date: 2024-08-14 14:25:48  
 * @Last Modified time: 2024-08-14 14:25:48 
 */

<template>
    <CommonPage>
      <div style="display:flex">
        <div>
          <div style="display:flex">
            <n-form>
              <n-form-item label="起点坐标">
                <n-input v-model:value="startX" type="text" placeholder="X :" />
                <n-input v-model:value="startY" type="text"  placeholder="Y :" />
              </n-form-item>
              <n-form-item label="终点坐标">
                <n-input v-model:value="endX" type="text" placeholder="X :" />
                <n-input v-model:value="endY" type="text"  placeholder="Y :" />
              </n-form-item>
            </n-form>
          </div>
         
          <n-button type="tertiary" @click="addArea"> 填充选中颜色 </n-button>
          <n-button type="tertiary" @click="removeLastArea"> 删除最后一个区域 </n-button>
  
          <div>
            <div v-for="(area, areaIndex) in areas" :key="areaIndex">
              <p>Area {{ areaIndex + 1 }}:</p>
              <ul>
                <li v-for="(point, pointIndex) in area" :key="pointIndex">
                  Point {{ pointIndex + 1 }}: [{{ point.join(', ') }}]
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="container">
          <!-- 渲染点阵图 -->
          <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="dot-row">
            <div v-for="(col, colIndex) in cols" :key="colIndex" class="dot-wrap" :class="{
              'selected': isWithinAnyArea(rowIndex, colIndex).withinArea
            }">
              <div class="dot"></div>
              <!-- 条件渲染文本 -->
              <div v-if="isWithinAnyArea(rowIndex, colIndex).isCenter" class="text-overlay">
                区域{{ isWithinAnyArea(rowIndex, colIndex).areaIndex + 1 }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonPage>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const areas = ref([
    [[2, 3], [5, 6]],
    [[7, 2], [9, 4]],
    [[23, 33], [15, 4]],
    [[12, 23], [12, 33]]
  ]);
  
  const numRows = 46;
  const numCols = 63;
  
  const rows = computed(() => Array.from({ length: numRows }));
  const cols = computed(() => Array.from({ length: numCols }));
  
  const computedAreas = computed(() => {
    return areas.value.map(area => {
      const [point1, point2] = area;
      const topLeft = {
        row: Math.min(point1[0], point2[0]),
        col: Math.min(point1[1], point2[1]),
      };
      const bottomRight = {
        row: Math.max(point1[0], point2[0]),
        col: Math.max(point1[1], point2[1]),
      };
      const center = {
        row: Math.floor((topLeft.row + bottomRight.row) / 2),
        col: Math.floor((topLeft.col + bottomRight.col) / 2),
      };
      return { topLeft, bottomRight, center };
    });
  });
  
  const isWithinAnyArea = (row, col) => {
    for (let i = 0; i < computedAreas.value.length; i++) {
      const area = computedAreas.value[i];
      const withinArea = row >= area.topLeft.row &&
             row <= area.bottomRight.row &&
             col >= area.topLeft.col &&
             col <= area.bottomRight.col;
      const isCenter = row === area.center.row && col === area.center.col;
      if (withinArea) {
        return { withinArea, isCenter, areaIndex: i };
      }
    }
    return { withinArea: false, isCenter: false, areaIndex: null };
  };
  
  const startX = ref('');
  const startY = ref('');
  const endX = ref('');
  const endY = ref('');
  
  const addArea = () => {
    if (startX.value === '' || startY.value === '' || endX.value === '' || endY.value === '') {
      return;
    }
  
    const newArea = [
      [parseInt(startX.value), parseInt(startY.value)],
      [parseInt(endX.value), parseInt(endY.value)]
    ];
    areas.value.push(newArea);
  };
  
  const removeLastArea = () => {
    if (areas.value.length > 0) {
      areas.value.pop();
    }
  };
  </script>
  
  <style scoped>
  .container {
    position: relative;
    overflow: auto;
    margin-left: 20px;
  }
  
  .dot-row {
    display: flex;
  }
  
  .dot-wrap {
    position: relative;
    width: 14px;
    height: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .selected {
    background-color: rgba(0, 128, 0, .6);
  }
  
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(211,211, 211, .6);
  }
  
  p {
    font-weight: bold;
  }
  
  ul {
    list-style-type: none;
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 5px;
  }
  
  .text-overlay {
    position: absolute;
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    pointer-events: none;
    display: flex;
    white-space: nowrap;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 14px;
    z-index: 10;
  }
  </style>
  