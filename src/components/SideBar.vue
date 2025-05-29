<template>
  <nav class="sidebar" :class="{ 'collapsed': isCollapsed }">
    <div class="nav-toggle" @click="toggleSidebar">
      <el-icon><Fold v-if="!isCollapsed" /><Expand v-else /></el-icon>
    </div>
    <div class="nav-items">
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
          <span v-if="!isCollapsed">媒体</span>
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
  </nav>
</template>

<script>
import { ref } from 'vue'
import { House, VideoCamera, Comment, Expand, Fold, Location, Goods } from '@element-plus/icons-vue'
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
    TeamOutlined
  },
  setup() {
    // Read initial collapsed state from localStorage, default to false (expanded)
    const initialCollapsedState = localStorage.getItem('sidebarCollapsed');
    const isCollapsed = ref(initialCollapsedState === 'true');
    
    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
      // Save the new state to localStorage
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

.nav-toggle {
  padding: 2vh 20px;
  margin: 0;
  /* margin-bottom: 20px; */
  cursor: pointer;
  height: 7vh;
}

.nav-toggle .el-icon {
  font-size: 2.4vh;
}

.nav-items {
  display: flex;
  flex-direction: column;
}

.nav-item {
  padding: 10px 20px;
  height: 6vh;
  display: flex;
  align-items: center;
  /* gap: 12px; */
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