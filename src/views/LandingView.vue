<template>
  <div class="landing-container">
    <!-- 全屏开场动画背景图片 -->
    <div class="opening-background-image" ref="openingBgRef">
      <img src="@/assets/landingview.png" alt="Opening Background" />
    </div>
    
    <!-- 开场动画标题（放大版本，位于屏幕中央） -->
    <div class="opening-title-wrapper" ref="openingTitleRef">
      <h1>博物馆数字孪生可视化平台</h1>
      <p>Museum Digital Twin Visualization Platform</p>
    </div>

    <!-- 原有的页面头部（顶栏），动画后出现 -->
    <div class="landing-header styled-top-bar" ref="headerRef">
      <div class="header-title-animation-wrapper" ref="titleWrapperRef">
        <h1>博物馆数字孪生可视化平台</h1>
        <p>Museum Digital Twin Visualization Platform</p>
      </div>
      <!-- 时间和天气信息 -->
      <div class="header-info">
        <span>{{ currentDateTime }}</span>
        <span v-if="weatherInfo"> | </span>
        <span>{{ weatherInfo }}</span>
      </div>
    </div>

    <!-- 主体内容，最后出现 -->
    <div class="landing-main-content" ref="landingMainContentRef">
      <img src="@/assets/landingview.png" alt="Main Content Background" class="main-content-overlay-image" ref="overlayImageRef" />
      <div class="relics-showcase">
        <div class="relic-float-wrapper relic1-wrapper">
          <img src="@/assets/relic3.png" alt="器物1" class="relic-image relic1" ref="relic1Ref" />
        </div>
        <div class="relic-float-wrapper relic2-wrapper">
          <img src="@/assets/relic2.png" alt="器物2" class="relic-image relic2" ref="relic2Ref" />
        </div>
        <div class="relic-float-wrapper relic3-wrapper">
          <img src="@/assets/relic1.png" alt="器物3" class="relic-image relic3" ref="relic3Ref" />
        </div>
      </div>
      
      <div class="explore-button-container" ref="exploreButtonContainerRef">
        <img src="@/assets/Group 1204.svg" alt="Explore" @click="goToHome" class="explore-button" ref="exploreButtonRef" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const titleWrapperRef = ref(null);
const relic1Ref = ref(null);
const relic2Ref = ref(null);
const relic3Ref = ref(null);
const exploreButtonRef = ref(null);
const exploreButtonContainerRef = ref(null);
const landingMainContentRef = ref(null);
const overlayImageRef = ref(null);

// 新增：开场动画相关的refs
const openingBgRef = ref(null);
const openingTitleRef = ref(null);
const headerRef = ref(null);

const currentDateTime = ref('');
const weatherInfo = ref('杭州 ☀28℃ 💧65% | 展厅恒温22℃±1℃');
let timerId = null;

const updateDateTime = () => {
  const now = new Date();
  const date = now.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  const time = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  const dayOfWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][now.getDay()];
  currentDateTime.value = `${date.replace(/\//g, '-')} ${dayOfWeek} ${time}`;
};

const fetchWeather = () => {
  // 天气数据获取逻辑
};

onMounted(() => {
  updateDateTime();
  fetchWeather();
  timerId = setInterval(updateDateTime, 60000);
});

onUnmounted(() => {
  if (timerId) {
    clearInterval(timerId);
  }
});

const goToHome = () => {
  if (titleWrapperRef.value) {
    titleWrapperRef.value.classList.add('title-exit-active');
  }
  if (relic1Ref.value) {
    relic1Ref.value.classList.add('relic-exit-animation');
  }
  if (relic2Ref.value) {
    relic2Ref.value.classList.add('relic-exit-animation');
  }
  if (relic3Ref.value) {
    relic3Ref.value.classList.add('relic-exit-animation');
  }
  if (exploreButtonRef.value) {
    exploreButtonRef.value.classList.add('explore-button-exit-animation');
  }
  if (overlayImageRef.value) {
    overlayImageRef.value.classList.add('overlay-image-exit-active');
  }

  setTimeout(() => {
    router.push('/home');
  }, 700);
};
</script>

<style scoped>
.landing-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  width: 100vw;
  color: #fff;
  text-align: center;
  overflow: hidden;
  position: relative;
  background-color: rgb(0, 0, 0); /* 初始黑色背景 */
  padding: 7vh 7vh 4vh 7vh;
}

/* === 开场动画相关样式 === */

/* 全屏开场背景图片 - 自动动画 */
.opening-background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2000;
  opacity: 0;
  transform: translateY(0);
  pointer-events: none;
  animation: openingBackgroundSequence 1.8s ease-out 0.4s forwards; /* 0.4s后自动开始 */
}

.opening-background-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 背景图片动画：从页面底部向上完整滚动并消失 */
.opening-background-image.opening-bg-animate {
  animation: openingBackgroundSequence 1.8s ease-out forwards; /* 延长到1.8s */
}

@keyframes openingBackgroundSequence {
  0% {
    opacity: 0;
    transform: translateY(100vh) scale(1); /* 从页面底部开始 */
  }
  15% {
    opacity: 1;
    transform: translateY(100vh) scale(1); /* 图片完全在屏幕下方 */
  }
  85% {
    opacity: 1;
    transform: translateY(-100vh) scale(1); /* 图片完全滚动到屏幕上方 */
  }
  100% {
    opacity: 0;
    transform: translateY(-100vh) scale(1); /* 完全消失在屏幕上方 */
  }
}

/* 开场标题（大字版本，居中显示） - 自动动画 */
.opening-title-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2001;
  opacity: 0;
  text-align: center;
  pointer-events: none;
  animation: openingTitleSequence 2.0s ease-out 1.0s forwards; /* 缩短到2.0s，更快消失 */
}

.opening-title-wrapper h1 {
  font-size: 6vh; /* 比最终版本大 */
  line-height: 1.2;
  margin: 0 0 2vh 0;
  font-weight: 600;
  color: #ffffff;
}

.opening-title-wrapper p {
  font-size: 3vh; /* 比最终版本大 */
  color: #cccccc;
  margin: 0;
}

/* 开场标题出现动画 */
.opening-title-wrapper.opening-title-animate {
  animation: openingTitleAppear 0.6s ease-out forwards;
}

@keyframes openingTitleAppear {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

/* 开场标题移动动画改为渐变消失 */
.opening-title-wrapper.opening-title-move-to-final {
  animation: openingTitleFadeOut 1.0s ease-out forwards;
}

@keyframes openingTitleFadeOut {
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0; /* 渐变消失 */
    transform: translate(-50%, -50%) scale(0.8); /* 稍微缩小 */
  }
}

/* === 原有元素的修改 === */

/* 顶栏自动出现 */
.landing-header.styled-top-bar {
  width: 100%;
  height: 7vh;
  padding: 0 3vh 0 3vh;
  background-color: rgba(0, 0, 0);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  opacity: 0;
  transform: translateY(-100%);
  animation: headerAppear 0.3s ease-out 2.7s forwards; /* 2.7s后自动出现 */
}

/* 顶栏出现动画（修复transform问题） */
.landing-header.header-appear {
  animation: headerAppear 0.3s ease-out forwards;
}

@keyframes headerAppear {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 顶栏标题的入场动画 - 来自原始文件 */
@keyframes customFadeInDown {
  to {
    opacity: 1;
    transform: translate(-50%, -50%); /* Final centered position */
  }
}

.header-title-animation-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  /* Initial transform for centering AND animation start position */
  transform: translate(-50%, calc(-50% - 30px)); /* Start 30px above final Y center */
  opacity: 0; /* Start invisible */
  animation: customFadeInDown 1s ease-out forwards; /* forwards to keep final state */
  text-align: left;
  padding-left: 0vh;
}

.landing-header h1 {
  font-size: 2.6vh;
  line-height: 1.2;
  margin: 0;
  font-weight: 500;
}

.landing-header p {
  font-size: 1.6vh;
  color: #999;
  margin: 0;
}

.header-info {
  font-size: 1.8vh;
  color: #f0f0f0;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.header-info span {
  white-space: nowrap;
}

/* 主体内容：使用CSS自动动画 */
.landing-main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  height: 100%;
  padding-top: 0vh;
  background-color: white;
  border-radius: 2vh;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  animation: mainContentAppear 0.8s ease-out 2.5s forwards; /* 2.5s后自动出现 */
}

/* 移除不再需要的手动动画类 */

@keyframes mainContentAppear {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.main-content-overlay-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0; /* 初始状态 */
  transform: translateY(-30px); /* 从上方开始 */
  animation: overlayImageSlideDown 1.0s ease-out 2.5s forwards; /* 与主体内容同时开始 */
}

.relics-showcase {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 5vw;
  height: 70vh;
  position: relative;
  z-index: 1;
  opacity: 0; /* 初始隐藏 */
  animation: fadeInUp 0.8s ease-out 3.2s forwards; /* 改为forwards保持最终状态 */
}

.relic-image {
  max-height: 75vh;
  object-fit: contain;
  transition: transform 0.3s ease, filter 0.3s ease;
  opacity: 0; /* 初始隐藏 */
  transform: translateY(40px) scale(0.9); /* 初始位置 */
}

.relic-image:hover {
  transform: scale(1.15); /* 只设置缩放，让浮动动画继续 */
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
  z-index: 10; /* 提升层级确保在最前面 */
}

.relic1 { 
  animation: fadeInUpRelic 0.6s ease-out 3.5s forwards, floatRelic1 3s ease-in-out 4.1s infinite; /* 入场动画 + 浮动动画 */
  max-height: 20vh;
}

.relic2 { 
  animation: fadeInUpRelic 0.6s ease-out 3.7s forwards, floatRelic2 4s ease-in-out 4.3s infinite; /* 入场动画 + 浮动动画 */
  z-index: 1; 
  margin-left: -2vw;
  margin-right: -2vw;
  padding: 0 0 0 0;
}

.relic3 { 
  animation: fadeInUpRelic 0.6s ease-out 3.9s forwards, floatRelic3 3.5s ease-in-out 4.5s infinite; /* 入场动画 + 浮动动画 */
  margin-right: -4vw;
  max-height: 30vh;
}

.explore-button-container {
  margin-top: auto;
  padding-bottom: 5vh;
  position: relative;
  z-index: 1;
  opacity: 0; /* 初始隐藏 */
  animation: fadeInUpExplore 0.8s ease-out 4.1s forwards; /* 改为forwards */
}

.explore-button {
  cursor: pointer;
  width: auto;
  max-height: 15vh;
  transition: transform 0.3s ease, filter 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* Change .explore-button:hover to .explore-button:hover:not(.explore-button-exit-animation) */
.explore-button:hover:not(.explore-button-exit-animation) {
  transform: scale(1.1);
  filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.6));
  animation: rippleGlow 1.5s ease-out infinite;
}

.explore-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.6s ease;
}

/* Change .explore-button:hover::before to .explore-button:hover:not(.explore-button-exit-animation)::before */
.explore-button:hover:not(.explore-button-exit-animation)::before {
  width: 200%;
  height: 200%;
  opacity: 1;
  animation: rippleExpand 1.2s ease-out infinite;
}

/* Add rule to reset ::before when exiting */
.explore-button.explore-button-exit-animation::before {
  animation: none;
  opacity: 0;
  width: 0;
  height: 0;
}

@keyframes rippleGlow {
  0%, 100% {
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.6));
  }
  50% {
    filter: drop-shadow(0 0 25px rgba(255, 255, 255, 0.9));
  }
}

@keyframes rippleExpand {
  0% {
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }
  100% {
    width: 300%;
    height: 300%;
    opacity: 0;
  }
}

/* 标题退场动画 - 使用顶栏标题的原始逻辑 */
@keyframes slideTitleToLeft {
  from {
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 1;
  }
  to {
    left: 11vh; /* 目标位置类似TopBar logo位置 */
    transform: translate(0, -50%); /* 调整transform因为left现在是直接偏移 */
    opacity: 0.8;
  }
}

.title-exit-active {
  animation: slideTitleToLeft 0.7s ease-in-out forwards;
}

/* 文物退场动画 */
@keyframes relicExit {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
  }
}

.relic-exit-animation {
  animation: relicExit 0.5s ease-out forwards;
}

/* explore按钮专门退场动画 */
@keyframes exploreButtonExit {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.6));
  }
  50% {
    opacity: 0.8;
    transform: translateY(10px) scale(1.05);
    filter: drop-shadow(0 0 25px rgba(255, 255, 255, 0.9));
  }
  100% {
    opacity: 0;
    transform: translateY(30px) scale(0.8);
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.2));
  }
}

.explore-button-exit-animation {
  animation: exploreButtonExit 0.6s ease-out forwards;
}

/* 覆盖图片退场动画 */
@keyframes overlayImageExit {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
}

.overlay-image-exit-active {
  animation: overlayImageExit 0.5s ease-out forwards;
}

/* 原始文件中的入场动画 */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUpRelic {
  from { opacity: 0; transform: translateY(40px) scale(0.9); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes fadeInUpExplore {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* 覆盖图片入场动画 */
@keyframes overlayImageEntrance {
  from { opacity: 0; transform: translateY(20px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes openingTitleSequence {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  25% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  55% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
}

@keyframes overlayImageSlideDown {
  from {
    opacity: 0;
    transform: translateY(-60px); /* 从 -30px 修改为 -60px */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 器物浮动动画 - 每个器物不同的浮动节奏 */
@keyframes floatRelic1 {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-8px) scale(1);
  }
}

@keyframes floatRelic2 {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  30% {
    transform: translateY(-12px) scale(1);
  }
  70% {
    transform: translateY(-6px) scale(1);
  }
}

@keyframes floatRelic3 {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  40% {
    transform: translateY(-10px) scale(1);
  }
  80% {
    transform: translateY(-4px) scale(1);
  }
}
</style> 