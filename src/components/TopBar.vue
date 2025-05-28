<template>
  <header class="top-bar">
    <router-link to="/" class="logo-link">
      <div class="logo">
        <h1>博物馆数字孪生平台</h1>
        <p>Museum Digital Twin Platform</p>
      </div>
    </router-link>
    <div class="weather-info">
      <span>{{ currentDateTime }}</span>
      <span> | </span>
      <span>{{ weatherInfo }}</span>
    </div>
  </header>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: 'TopBar',
  setup() {
    const currentDateTime = ref('')
    const weatherInfo = ref('杭州 ☀28℃ 💧65% | 展厅恒温22℃±1℃')
    let timer = null

    const updateDateTime = () => {
      const now = new Date()
      const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const date = String(now.getDate()).padStart(2, '0')
      const day = days[now.getDay()]
      const time = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
      currentDateTime.value = `${year}-${month}-${date} ${day} ${time}`
    }

    onMounted(() => {
      updateDateTime()
      timer = setInterval(updateDateTime, 60000) // 每分钟更新一次
    })

    onBeforeUnmount(() => {
      if (timer) {
        clearInterval(timer)
      }
    })

    return {
      currentDateTime,
      weatherInfo
    }
  }
}
</script>

<style scoped>
.top-bar {
  background-color: rgba(0, 0, 0);
  backdrop-filter: blur(10px);
  height: 7vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3vh 0 3vh;
  /* border-bottom: 1px solid #333; */
  flex-shrink: 0;
}

/* New style for the router-link to ensure it doesn't alter layout or add underline */
.logo-link {
  text-decoration: none; /* Removes underline from the link */
  color: inherit; /* Inherits text color from parent, preventing blue link color */
  display: flex; /* Ensures the link takes up space correctly if needed, or aligns items if it wraps flex children directly */
  align-items: center; /* Vertically align if needed, matches .top-bar */
}

.logo {
  display: flex;
  flex-direction: column;
  padding-left: 0vh;
  top: 50%;
}

.logo h1 {
  font-size: 2.4vh;
  line-height: 1.2;
  margin: 0;
  font-weight: 500;
}

.logo p {
  font-size: 1.6vh;
  color: #999;
  margin: 0;
}

.weather-info {
  color: #fff;
  font-size: 1.8vh;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* padding: 0 15px; */
  display: flex;
  align-items: center;
  gap: 8px; /* Space between date and weather items */
  margin-left: auto;
}

@media screen and (max-height: 600px) {
  .logo h1 { font-size: 20px; }
  .logo p { font-size: 14px; }
}

@media screen and (min-height: 1200px) {
  .logo h1 { font-size: 32px; }
  .logo p { font-size: 20px; }
}
</style> 