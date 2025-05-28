<template>
  <div class="app-container">
    <!-- 背景视频 -->
    <div class="video-background">
      <video autoplay loop muted playsinline>
        <source src="@/assets/backgroundVideo.mp4" type="video/mp4">
      </video>
    </div>
    
    <!-- 左侧导航栏 -->
    <SideBar />

    <!-- 主要内容区域 -->
    <div class="main-container">
      <!-- 顶部信息栏 -->
      <TopBar />

      <!-- 主要展示区域 -->
      <div class="content-area">
        <h1>设备管理页面</h1>
        <!-- 这里添加设备管理相关的内容 -->
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import TopBar from '@/components/TopBar.vue'

export default {
  name: "DeviceView",
  components: {
    SideBar,
    TopBar
  }
}
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  color: #fff;
  overflow: hidden;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.video-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.video-background video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

h1 {
  font-size: 2.4vh;
  margin-bottom: 20px;
}
</style> 