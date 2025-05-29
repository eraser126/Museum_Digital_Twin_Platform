<template>
  <nav class="sidebar" :class="{ 'collapsed': isCollapsed }">
    <div class="nav-items">
      <router-link to="/" class="nav-item" active-class="active">
        <el-icon><Back /></el-icon>
        <transition name="fade-text">
          <span v-if="!isCollapsed">返回</span>
        </transition>
      </router-link>
      <router-link to="/home" class="nav-item" active-class="active">
        <el-icon><House /></el-icon>
        <transition name="fade-text">
          <span v-if="!isCollapsed">首页</span>
        </transition>
      </router-link>
      <router-link to="/visitor" class="nav-item" active-class="active">
          <TeamOutlined />
        <transition name="fade-text">
          <span v-if="!isCollapsed">访客</span>
        </transition>
      </router-link>
      <router-link to="/comment" class="nav-item" active-class="active">
        <el-icon><VideoCamera /></el-icon>
        <transition name="fade-text">
          <span v-if="!isCollapsed">评论</span>
        </transition>
      </router-link>
      <router-link to="/map" class="nav-item" active-class="active">
        <el-icon><Location /></el-icon>
        <transition name="fade-text">
          <span v-if="!isCollapsed">地图</span>
        </transition>
      </router-link>
      <router-link to="/product" class="nav-item" active-class="active">
        <el-icon><Goods /></el-icon>
        <transition name="fade-text">
          <span v-if="!isCollapsed">展品</span>
        </transition>
      </router-link>
    </div>
    <div class="nav-toggle" @click="toggleSidebar">
      <el-icon><Fold v-if="!isCollapsed" /><Expand v-else /></el-icon>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { House, VideoCamera, Comment, Expand, Fold, Location, Goods, Back } from '@element-plus/icons-vue'
import { TeamOutlined } from '@ant-design/icons-vue'

export default {
  name: 'SideBar',
  components: {
    House,
    VideoCamera,
    Comment,
    Expand,
    Fold,
    Location,
    Goods,
    Back,
    TeamOutlined
  },
  setup() {
    const router = useRouter();
    const initialCollapsedState = localStorage.getItem('sidebarCollapsed');
    const isCollapsed = ref(initialCollapsedState === 'true');
    
    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
      localStorage.setItem('sidebarCollapsed', isCollapsed.value.toString());
    };

    return {
      isCollapsed,
      toggleSidebar
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width, 20vh);
  min-width: var(--sidebar-width, 1vh);
  max-width: var(--sidebar-width, 20vh);
  background-color: #000000;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  padding: 0px;
  flex-shrink: 0;
  position: relative;
  z-index: 1000;
}

.sidebar.collapsed {
  width: 8vh;
}

.back-button-container {
  padding: 2vh 20px;
  margin: 0;
  cursor: pointer;
  height: 7vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-button-container .el-icon {
  font-size: 2.4vh;
  color: #fff;
}

.sidebar.collapsed .back-button-container {
  /* Optional: specific styles when collapsed, e.g., if text was present */
}

.sidebar .nav-toggle {
  padding: 10px 20px;
  margin: 0;
  cursor: pointer;
  height: 7vh;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.8vh;
  color: #fff;
  transition: all 0.3s ease;
}

.sidebar .nav-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.sidebar.collapsed .nav-toggle {
  /* justify-content: center; */ /* Removed to keep icon on the left */
}

.nav-toggle .el-icon {
  font-size: 2.4vh;
  margin-right: 2vh;
}

.nav-items {
  display: flex;
  flex-direction: column;
}

.nav-item {
  padding: 10px 20px;
  height: 7vh;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1.8vh;
  text-decoration: none;
  color: #fff;
  position: relative;
  z-index: 1001;
  pointer-events: auto;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-item.active {
  background-color: rgba(51, 51, 51);
}

.nav-item span {
  white-space: nowrap;
}

.nav-item .el-icon {
  font-size: 2.4vh;
  margin-right: 2vh;
}

.nav-item .anticon {
  font-size: 2.4vh;
  color: #fff;
  margin-right: 2vh;
}

@media screen and (max-height: 600px) {
  .nav-item { font-size: 16px; }
  .nav-item .el-icon { font-size: 18px; }
  .nav-item .anticon { font-size: 18px; }
}

@media screen and (min-height: 1200px) {
  .nav-item { font-size: 24px; }
  .nav-item .el-icon { font-size: 26px; }
  .nav-item .anticon { font-size: 26px; }
}

/* Transition for nav item text */
.fade-text-enter-active,
.fade-text-leave-active {
  transition: opacity 0.3s ease;
}

.fade-text-enter-from,
.fade-text-leave-to {
  opacity: 0;
}

.fade-text-enter-to,
.fade-text-leave-from {
  opacity: 1;
}
</style> 