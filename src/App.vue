<script setup>
import { RouterView, useRoute } from 'vue-router';
import { computed } from 'vue';
import SideBar from './components/SideBar.vue';
import TopBar from './components/TopBar.vue';

const route = useRoute();

const videoPages = ['/', '/home', '/visitor', '/comment'];

const showVideoBackground = computed(() => {
  return videoPages.includes(route.path);
});

const showAppShell = computed(() => route.path !== '/');

</script>

<template>
  <div class="app-container">
    <div class="global-video-background-container" v-show="showVideoBackground">
      <video autoplay loop muted playsinline>
        <source src="@/assets/Background_Video.mp4" type="video/mp4">
      </video>
    </div>

    <template v-if="showAppShell">
      <SideBar />

      <div class="main-panel-wrapper">
        <TopBar />
        <main class="content-area">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </main>
      </div>
    </template>
    <template v-else>
      <main class="content-area full-page-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </template>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 3px;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #000;
  color: #fff;
}

.app-container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.main-panel-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100vh;
  overflow: hidden;
}

.main-panel-wrapper .content-area {
  flex-grow: 1;
  overflow-y: auto;
  position: relative;
}

.app-container > .content-area.full-page-content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
}

.global-video-background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.global-video-background-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* New: slide-fade-right transition */
.slide-fade-right-enter-active {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Smoother easing */
}
.slide-fade-right-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}
.slide-fade-right-enter-from {
  opacity: 0;
  transform: translateX(50px) scale(0.98); /* Enter from right, slightly smaller */
}
.slide-fade-right-leave-to {
  opacity: 0;
  transform: translateX(-50px) scale(0.98); /* Leave to left, slightly smaller */
}

/* Commented out .app-shell-fade as it was reverted in SideBar */
/*
.app-shell-fade-enter-active,
.app-shell-fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.app-shell-fade-enter-from,
.app-shell-fade-leave-to {
  opacity: 0;
}
*/
</style>
