<template>
    <div class="landing-container">
      <!-- Video background will be controlled by App.vue -->
      
      <div class="landing-header styled-top-bar">
        <!-- Wrapper for true centering of the animated title -->
        <div class="header-title-animation-wrapper" ref="titleWrapperRef">
          <h1>博物馆数字孪生平台</h1>
          <p>Museum Digital Twin Platform</p>
        </div>
        <!-- Info section for date/time and weather -->
        <div class="header-info">
          <span>{{ currentDateTime }}</span>
          <span v-if="weatherInfo"> | </span>
          <span>{{ weatherInfo }}</span>
        </div>
      </div>
  
      <div class="landing-main-content" ref="landingMainContentRef">
        <img src="@/assets/landingview.png" alt="Main Content Background" class="main-content-overlay-image" ref="overlayImageRef" />
        <div class="relics-showcase">
          <img src="@/assets/relic3.png" alt="器物1" class="relic-image relic1" ref="relic1Ref" />
          <img src="@/assets/relic2.png" alt="器物2" class="relic-image relic2" ref="relic2Ref" />
          <img src="@/assets/relic1.png" alt="器物3" class="relic-image relic3" ref="relic3Ref" />
        </div>
        
        <div class="explore-button-container">
          <img src="@/assets/Group 1204.svg" alt="Explore" @click="goToHome" class="explore-button" ref="exploreButtonRef" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const titleWrapperRef = ref(null); // Ref for the title wrapper
  const relic1Ref = ref(null);
  const relic2Ref = ref(null);
  const relic3Ref = ref(null);
  const exploreButtonRef = ref(null); // Ref for the explore button
  const landingMainContentRef = ref(null); // Ref for the main content area
  const overlayImageRef = ref(null); // Ref for the overlay image
  
  const goToHome = () => {
    if (titleWrapperRef.value) {
      titleWrapperRef.value.classList.add('title-exit-active');
    }
  
    // Trigger exit animation for relics
    if (relic1Ref.value) {
      relic1Ref.value.classList.add('relic-exit-animation');
    }
    if (relic2Ref.value) {
      relic2Ref.value.classList.add('relic-exit-animation');
    }
    if (relic3Ref.value) {
      relic3Ref.value.classList.add('relic-exit-animation');
    }
  
    // Trigger exit animation for explore button
    if (exploreButtonRef.value) {
      exploreButtonRef.value.classList.add('relic-exit-animation');
    }
  
    // Trigger exit animation for the overlay image
    if (overlayImageRef.value) {
      overlayImageRef.value.classList.add('overlay-image-exit-active');
    }
  
    // Wait for animation to complete before navigating
    setTimeout(() => {
      router.push('/home');
    }, 700); // Match animation duration (or slightly longer to ensure completion)
  };
  
  const currentDateTime = ref('');
  const weatherInfo = ref('杭州 ☀28℃ 💧65% | 展厅恒温22℃±1℃'); // Initialize as empty, populate from mock/API
  let timerId = null;
  
  const updateDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const time = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    const dayOfWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][now.getDay()];
    currentDateTime.value = `${date.replace(/\//g, '-')} ${dayOfWeek} ${time}`;
  };
  
  const fetchWeather = () => {
    // Placeholder: Replace with actual weather fetching logic from your TopBar.vue
    // Example: Hangzhou ☀️28°C 💧65% | 展厅恒温22°C±1°C
  //   weatherInfo.value = "杭州 ☀️28°C 💧65% | 展厅恒温22°C±1°C"; 
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
  
  </script>
  
  <style scoped>
  .landing-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; /* Align content to the top, header will push main down */
    height: 100vh;
    width: 100vw;
    color: #fff;
    text-align: center;
    overflow: hidden; 
    position: relative; 
    background-color: rgb(0, 0, 0);
    padding:7vh 8vh 4vh 8vh;
  }
  
  .landing-header.styled-top-bar {
    width: 100%;
    height: 7vh; /* Standard TopBar height */
    padding: 0 3vh 0 3vh;
    background-color: rgba(0, 0, 0); /* Dark, slightly transparent */
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    position: fixed; /* Fixed at the top */
    top: 0;
    left: 0;
    z-index: 1000;
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
      font-size: 2.4vh;
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
    font-size: 1.8vh; /* Slightly larger for better readability */
    color: #f0f0f0;
    display: flex;
    align-items: center;
    gap: 8px; /* Space between date and weather items */
    margin-left: auto; /* This will push it to the right */
  }
  
  .header-info span {
    white-space: nowrap;
  }
  
  .landing-main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; /* Vertically center the main block of content */
    flex: 1; 
    width: 100%;
    height: 100%;
    padding-top: 0vh;
    background-color: white; /* Restored white background */
    border-radius: 2vh;
    position: relative; /* For positioning the overlay image */
    overflow: hidden; /* To clip the overlay image to rounded corners */
  }
  
  .main-content-overlay-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0; /* Behind content, above parent's background color */
    opacity: 0; /* Initial state for its own entrance animation */
    animation: overlayImageEntrance 1s ease-out 0.4s forwards; /* Its own entrance animation */
  }
  
  .relics-showcase {
    display: flex;
    justify-content: center;
    align-items: flex-end; 
    gap: 5vw; 
    animation: fadeInUp 1.2s ease-out 0.5s backwards; 
    height: 70vh;
    position: relative; /* Ensure it's above the overlay image */
    z-index: 1; /* Ensure it's above the overlay image */
  }
  
  .relic-image {
    max-height: 75vh; 
    object-fit: contain;
    transition: transform 0.3s ease;
  }
  
  .relic-image:hover {
    transform: scale(1.05); 
  }
  
  .relic1 { 
      animation: fadeInUpRelic 1s ease-out 0.6s backwards;
      max-height: 20vh;
  }
  /* Keep original relic2 styling for centered and slightly larger look */
  .relic2 { 
    animation: fadeInUpRelic 1s ease-out 0.8s backwards;
    z-index: 1; 
    margin-left: -2vw;
    margin-right: -2vw;
    padding: 0 0 0 0;
  }
  .relic3 { 
      animation: fadeInUpRelic 1s ease-out 1.0s backwards; 
      margin-right: -4vw;
      max-height: 30vh;
  }
  
  .explore-button-container {
    margin-top: auto; 
    padding-bottom: 5vh; 
    animation: fadeInUpExplore 1s ease-out 1.5s backwards;
    position: relative; /* Ensure it's above the overlay image */
    z-index: 1; /* Ensure it's above the overlay image */
  }
  
  .explore-button {
    cursor: pointer;
    width: auto; 
    max-height: 15vh; 
    transition: transform 0.3s ease, filter 0.3s ease;
  }
  
  .explore-button:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
  }
  
  .landing-footer {
    /* position: absolute; Re-evaluate if needed, for now part of normal flow */
    /* bottom: 20px; */
    padding: 15px;
    font-size: 1.5vh;
    color: #aaa;
    width: 100%;
    text-align: center;
  }
  
  /* Keyframe animations */
  @keyframes customFadeInDown {
    to {
      opacity: 1;
      transform: translate(-50%, -50%); /* Final centered position */
    }
  }
  
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
  
  /* Entrance animation for overlay image */
  @keyframes overlayImageEntrance {
    from { opacity: 0; transform: translateY(20px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  
  /* New Exit Animation for Title */
  @keyframes slideTitleToLeft {
    from {
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    to {
      left: 11vh; /* Target position similar to TopBar logo */
      transform: translate(0, -50%); /* Adjust transform as 'left' is now the direct offset */
      opacity: 0.8; /* Optionally fade a bit if desired, or keep 1 */
    }
  }
  
  .title-exit-active {
    animation: slideTitleToLeft 0.7s ease-in-out forwards;
  }
  
  /* New Exit Animation for Relics */
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
  
  /* Exit animation for overlay image */
  @keyframes overlayImageExit {
    from { opacity: 1; transform: translateY(0) scale(1); }
    to { opacity: 0; transform: translateY(20px) scale(0.98); }
  }
  
  .overlay-image-exit-active {
    animation: overlayImageExit 0.5s ease-out forwards;
  }
  </style> 