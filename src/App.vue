<script setup>
import { RouterView, useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const videoPages = ['/', '/home', '/visitor', '/comment'];

const showVideoBackground = computed(() => {
  return videoPages.includes(route.path);
});

</script>

<template>
  <div class="global-video-background-container" v-show="showVideoBackground">
    <video autoplay loop muted playsinline>
      <source src="@/assets/backgroundVideo.mp4" type="video/mp4">
    </video>
  </div>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
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
  background-color: #000; /* Default background for pages without video */
  color: #fff;
}

.global-video-background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Ensure it's behind all other content */
  overflow: hidden;
}

.global-video-background-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


/* Fade transition for router views */
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
} */
</style>
