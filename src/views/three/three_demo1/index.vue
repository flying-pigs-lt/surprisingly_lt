<!--
 * @Author: Flying_pigs 3051244658@qq.com
 * @Date: 2024-10-28 09:53:14
 * @LastEditors: Flying_pigs 3051244658@qq.com
 * @LastEditTime: 2024-10-28 10:46:37
 * @FilePath: \surprisingly_lt\src\views\three\three_demo1\index.vue
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
-->
<template>
  <div id="content">
    <canvas id="can" /> <!-- 用于渲染3D场景的画布 -->
  </div>
</template>

<style scoped>
    /* 设置内容容器的样式 */
#content {
  width: 100%; /* 宽度100% */
  height: 100%; /* 高度100% */
  overflow: hidden; /* 隐藏溢出的内容 */
}

/* 设置画布的样式 */
#can {
  width: 100%; /* 宽度100% */
  height: 100%; /* 高度100% */
  overflow: hidden; /* 隐藏溢出的内容 */
}
</style>

<script setup>
import { onMounted } from 'vue' // 从Vue导入onMounted生命周期钩子
import * as THREE from 'three' // 导入Three.js库
// 导入VueUse库的时间戳功能

// 创建一个新的Three.js场景
const scene = new THREE.Scene()

// 创建一个正交相机，设置其视口范围
let camera = new THREE.OrthographicCamera(
  -window.innerWidth / 2,
  window.innerWidth / 2,
  -window.innerHeight / 2,
  window.innerHeight / 2,
  -1000,
  1000,
)

// 创建WebGL渲染器并设置初始大小
let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

// 创建一个半径为100的球体几何体
const geometry = new THREE.SphereGeometry(100, 16, 16)

// 创建一个绿色的线框材质
const material = new THREE.MeshBasicMaterial({
  color: 0x00FF00, // 颜色设置为绿色
  wireframe: true, // 线框模式
})

// 创建一个球体网格并将其添加到场景中
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// 生成一个唯一的球体ID
const ballId = `ball-${(new Date()).getTime()}`

// 存储场景中的所有球体
const balls = {}
// 存储球体的位置信息
const ballsInfo = {}

// 创建一个广播频道，用于在不同窗口间传递信息
const channel = new BroadcastChannel('ball')
channel.addEventListener('message', (e) => {
  // 如果接收到的球体ID已经存在
  if (e.data.id in balls) {
    // 如果存在则不需要处理（可以在这里添加逻辑）
  }
  else {
    // 创建新的球体几何体和材质
    const bgeo = new THREE.SphereGeometry(100, 16, 16)
    const bmaterial = new THREE.MeshBasicMaterial({
      color: 0xFF0000, // 颜色设置为红色
      wireframe: true, // 线框模式
    })
    const ball = new THREE.Mesh(bgeo, bmaterial) // 创建新的球体网格
    balls[e.data.id] = ball // 将新球体存储在balls对象中
    ball.name = e.data.id // 设置球体的名称
    scene.add(balls[e.data.id]) // 将球体添加到场景中
  }
  // 更新ballsInfo对象中的信息
  ballsInfo[e.data.id] = e.data
})

// 动画循环函数
function animate() {
  requestAnimationFrame(animate) // 请求下一帧动画

  // 更新球体的旋转
  sphere.rotation.x += 0.01
  sphere.rotation.y += 0.005

  // 广播当前球体的状态
  channel.postMessage({
    type: 'ball',
    id: ballId,
    rotation: {
      x: sphere.rotation.x,
      y: sphere.rotation.y,
      z: sphere.rotation.z,
    },
    offset: {
      x: window.screenX, // 当前窗口的屏幕X坐标
      y: window.screenY, // 当前窗口的屏幕Y坐标
    },
    size: {
      width: window.innerWidth, // 当前窗口的宽度
      height: window.innerHeight, // 当前窗口的高度
    },
    timestamp: (new Date()).getTime(), // 当前时间戳
  })

  const now = (new Date()).getTime() // 获取当前时间

  // 更新所有球体的位置和状态
  for (const i in balls) {
    if (ballsInfo[i].id === ballId) {
      continue // 跳过当前球体
    }
    // 如果球体超出存活时间，则从场景中移除
    if (now - ballsInfo[i].timestamp > 100) {
      const ball = scene.getObjectByName(ballsInfo[i].id)
      scene.remove(ball) // 从场景中移除球体
      delete balls[i] // 删除balls中的球体
      delete ballsInfo[i] // 删除ballsInfo中的信息
      continue
    }
    // 更新球体的位置
    balls[i].position.x = ((ballsInfo[i].offset.x + ballsInfo[i].size.width / 2) - (window.screenX + window.innerWidth / 2))
    balls[i].position.z = 0 // 设置Z轴位置为0
    balls[i].position.y = (-((window.screenY + window.innerHeight / 2) - (ballsInfo[i].offset.y + ballsInfo[i].size.height / 2)))

    // 更新球体的旋转
    balls[i].rotation.x = ballsInfo[i].rotation.x
    balls[i].rotation.y = ballsInfo[i].rotation.y
    balls[i].rotation.z = ballsInfo[i].rotation.z
  }

  // 渲染场景
  renderer.render(scene, camera)
}

// 调整渲染器和相机的大小
function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight) // 设置渲染器大小
  camera = new THREE.OrthographicCamera(
    -window.innerWidth / 2,
    window.innerWidth / 2,
    -window.innerHeight / 2,
    window.innerHeight / 2,
    -1000,
    1000,
  ) // 更新相机的视口范围
}

animate() // 启动动画循环

// 组件挂载后执行
onMounted(() => {
  const canvas = document.getElementById('can') // 获取画布元素
  renderer = new THREE.WebGLRenderer({ canvas }) // 使用画布创建WebGL渲染器
  resize() // 调整渲染器大小

  // 监听窗口调整大小事件
  window.addEventListener('resize', resize)
})
</script>
