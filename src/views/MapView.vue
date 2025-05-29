<template>
  <div class="app-container">
    <!-- 背景视频 -->
    <!-- <div class="video-background">
      <video autoplay loop muted playsinline>
        <source src="@/assets/backgroundVideo.mp4" type="video/mp4">
      </video>
    </div> -->

    <!-- 左侧导航栏 -->
    <!-- <SideBar /> -->

    <!-- 主要内容区域 -->
    <div class="main-container">
      <!-- 顶部信息栏 -->
      <!-- <TopBar /> -->

      <!-- 地图展示区域 -->
      <div class="map-content-area">
        <h2 class="map-title">博物馆平面导览图</h2>
        <p class="map-subtitle">Museum Floor Plan Guide Map</p>

        <div class="floor-plan-carousel">
          <div class="carousel-images">
            <img 
              v-for="(map, index) in maps" 
              :key="map.id" 
              :src="map.src" 
              :alt="map.alt" 
              :class="['floor-map-image', { 
                'active': index === currentIndex,
                'prev': index === (currentIndex - 1 + maps.length) % maps.length && maps.length > 1,
                'next': index === (currentIndex + 1) % maps.length && maps.length > 1
              }]" 
              @click="centerMap(index)"
            >
          </div>
        </div>

        <div class="map-legend">
          <div class="legend-column">
            <div class="legend-item">
              <el-icon><InfoFilled /></el-icon><span>信息, 门票, 轮椅租赁</span>
            </div>
            <div class="legend-item">
              <el-icon><ToiletPaper /></el-icon><span>洗手间</span>
            </div>
            <div class="legend-item">
              <el-icon><ToiletPaper /></el-icon><span>残疾人洗手间</span>
            </div>
          </div>
          <div class="legend-column">
            <div class="legend-item">
              <el-icon><Promotion /></el-icon><span>母婴室</span>
            </div>
            <div class="legend-item">
              <el-icon><Lock /></el-icon><span>保安室</span>
            </div>
            <div class="legend-item">
              <el-icon><FirstAidKit /></el-icon><span>医务室</span>
            </div>
          </div>
          <div class="legend-column">
            <div class="legend-item">
              <el-icon><LocationInformation /></el-icon><span>停车场</span>
            </div>
            <div class="legend-item">
              <el-icon><Eleme /></el-icon><span>电梯</span>
            </div>
            <div class="legend-item">
              <el-icon><Van /></el-icon><span>残疾人停车场</span>
            </div>
          </div>
          <div class="legend-column">
            <div class="legend-item">
              <el-icon><ForkSpoon /></el-icon><span>餐厅</span>
            </div>
            <div class="legend-item">
              <el-icon><ShoppingBag /></el-icon><span>纪念品商店</span>
            </div>
            <div class="legend-item">
              <WifiOutlined /><span>免费 WLAN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import SideBar from '@/components/SideBar.vue';
import TopBar from '@/components/TopBar.vue';
import Map2F from '@/assets/Group 1201.svg';
import Map3F from '@/assets/Group 1202.svg';
import Map4F from '@/assets/Group 1203.svg';
import { InfoFilled, ToiletPaper, Promotion, Lock, FirstAidKit, LocationInformation, Eleme, Van, ForkSpoon, ShoppingBag } from '@element-plus/icons-vue';
import { WifiOutlined } from '@ant-design/icons-vue';

export default {
  name: 'MapView',
  components: {
    SideBar,
    TopBar,
    InfoFilled, ToiletPaper, Promotion, Lock, FirstAidKit, LocationInformation, Eleme, Van, ForkSpoon, ShoppingBag,
    WifiOutlined
  },
  setup() {
    const maps = ref([
      { id: '2f', src: Map2F, alt: '2F Floor Plan' },
      { id: '3f', src: Map3F, alt: '3F Floor Plan' }, 
      { id: '4f', src: Map4F, alt: '4F Floor Plan' },
    ]);
    const currentIndex = ref(1); // Start with 3F map (index 1) in the center

    const centerMap = (index) => {
      currentIndex.value = index;
    };

    return {
      maps,
      currentIndex,
      centerMap,
    };
  },
};
</script>

<style scoped>
@keyframes fadeInContainer {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInContentItem {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.app-container {
  display: flex;
  height: 100%;
  width: 100%;
  color: #fff;
  overflow: hidden;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-color: #000000;
  opacity: 0; /* Initial state for animation */
  animation: fadeInContainer 0.5s ease-out forwards;
}

.map-content-area {
  flex: 1;
  padding: 2vh 3vh 2.5vh 3vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Align items to the top */
  background-color: rgba(255, 255, 255);
  backdrop-filter: blur(8px);
  border-radius: 15px;
  margin: 0vh 2vh 2vh 0vh; /* Add some margin around the content area */
  overflow: hidden; /* Prevent content spill */
}

.map-title {
  font-size: 3vh;
  font-weight: bold;
  color: #000000;
  margin-top: 1vh;
  margin-bottom: 0.5vh;
  opacity: 0; /* Initial state for animation */
  animation: fadeInContentItem 0.5s ease-out 0.4s forwards; /* Delay after container animation starts */
}

.map-subtitle {
  font-size: 1.8vh;
  color: #000000;
  margin-bottom: 1vh;
  opacity: 0; /* Initial state for animation */
  animation: fadeInContentItem 0.5s ease-out 0.7s forwards; /* Staggered delay */
}

.floor-plan-carousel {
  display: flex;
  justify-content: center;
  align-items: center; 
  width: 100%;
  flex-grow: 1; /* Allow carousel to take available space */
  min-height: 0; /* Important for flex children */
  position: relative;
  margin-bottom: 0vh;
  /* background-color: #000000; */
  opacity: 0; /* Initial state for animation */
  animation: fadeInContentItem 0.5s ease-out 1.0s forwards; /* Staggered delay */
}

.carousel-images {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%; 
}

.floor-map-image {
  max-width: 100%; /* Base max width for side images, might be overridden by .prev/.next */
  max-height: 100%; /* Base max height for side images */
  object-fit: contain;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  position: absolute; /* For overlapping and transitioning */
  opacity: 0.7; /* Default opacity for non-active, non-transitioning side images */
  filter: brightness(0.8) saturate(0.7); /* Default filter for non-active */
  transition: transform 0.6s cubic-bezier(0.35, 0.85, 0.25, 1), 
              opacity 0.6s cubic-bezier(0.35, 0.85, 0.25, 1), 
              filter 0.6s cubic-bezier(0.35, 0.85, 0.25, 1), 
              max-width 0.6s cubic-bezier(0.35, 0.85, 0.25, 1), 
              max-height 0.6s cubic-bezier(0.35, 0.85, 0.25, 1);
  z-index: 1; /* Default z-index */
}

.floor-map-image.active {
  max-width: 100%; /* Center image is larger */
  max-height: 100%; /* Center image is larger */
  opacity: 1;
  filter: brightness(1) saturate(1);
  transform: translateX(0) scale(1.1); /* Center it and slightly larger */
  z-index: 10;
}

.floor-map-image.prev {
  transform: translateX(-75%) scale(0.85); /* Move left, slightly smaller */
  opacity: 0.7; /* Opacity for side images */
  filter: brightness(0.8) saturate(0.7); /* Filter for side images */
  z-index: 5;
  /* max-width for prev/next can be a percentage of the container or a fixed value if needed */
  /* e.g., max-width: 70%; */
}

.floor-map-image.next {
  transform: translateX(75%) scale(0.85); /* Move right, slightly smaller */
  opacity: 0.7; /* Opacity for side images */
  filter: brightness(0.8) saturate(0.7); /* Filter for side images */
  z-index: 5;
  /* e.g., max-width: 70%; */
}

/* Adjustments for only two images, or initial/final states */
.floor-plan-carousel .carousel-images img:first-child.active + img.next {
 transform: translateX(75%) scale(0.85);
}
.floor-plan-carousel .carousel-images img:last-child.active ~ img.prev {
 transform: translateX(-75%) scale(0.85);
}


.map-legend {
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 900px; /* Max width for the legend */
  padding: 1.5vh 1vh;
  /* background-color: rgba(0, 0, 0, 0.3); */
  border-radius: 8px;
  margin-bottom: 1vh; /* Space from bottom */
  opacity: 0; /* Initial state for animation */
  animation: fadeInContentItem 0.5s ease-out 1.3s forwards; /* Staggered delay */
}

.legend-column {
  display: flex;
  flex-direction: column;
  gap: 1vh;
}

.legend-item {
  display: flex;
  align-items: center;
  font-size: 1.6vh;
  color: #000000;
}

.legend-item .el-icon {
  margin-right: 8px;
  font-size: 2vh;
  color: #000000; /* Element UI blue for icons */
}

/* Style for Ant Design icons in legend, if needed */
.legend-item .anticon {
  margin-right: 8px;
  font-size: 2vh; /* Match Element Plus icon size */
  color: #000000; /* Match Element Plus icon color */
}
</style> 