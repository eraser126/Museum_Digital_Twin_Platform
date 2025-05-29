<template>
    <div class="app-container"> 
  
      <!-- 主要内容区域 -->
      <div class="main-container">
  
        <!-- 产品展示区域 -->
        <div class="product-content-area">
          <!-- 内容始终在DOM中，动画控制显隐 -->
          <h2 class="product-title">博物馆新展品导览</h2>
          <p class="product-subtitle">Guide to New Museum Exhibits</p>
  
          <!-- 加载指示器，仅在视频加载时显示 -->
          <div v-if="isLoading" class="loading-indicator-carousel">
            <div class="spinner"></div>
            <p>视频加载中...</p>
          </div>
          
          <!-- 视频轮播区域，使用v-show确保视频元素在DOM中以进行加载检测 -->
          <div v-show="!isLoading" class="floor-plan-carousel">
            <div class="carousel-videos">
              <div 
                v-for="(product, index) in products"
                :key="product.id"
                class="video-container" 
                :class="[{
                  'active': index === currentIndex,
                  'prev': index === (currentIndex - 1 + products.length) % products.length && products.length > 1,
                  'next': index === (currentIndex + 1) % products.length && products.length > 1
                }]"
                @mouseenter="isHovering[index] = true"
                @mouseleave="isHovering[index] = false"
                @click="centerProduct(index)"
              >
                <video
                  :ref="el => videoRefs[index] = el"
                  :src="product.src"
                  class="video-content"
                  muted
                  loop
                  playsinline
                ></video>
                <div 
                  v-if="index === currentIndex && isHovering[index]" 
                  class="detail-arrow" 
                  @click.stop="showProductDetail(product.id)"
                >
                  <el-tooltip
                    content="详细信息"
                    placement="top"
                    effect="dark" 
                  >
                    <el-icon><TopRight /></el-icon>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 产品详情弹窗 -->
      <ProductDetailModal 
        :visible="isModalVisible" 
        :product="selectedProductDetail"
        @close="hideProductDetail"
      />
    </div>
  </template>
  
  <script>
  import { ref, watch, onBeforeUpdate, computed, nextTick } from 'vue';
  import SideBar from '@/components/SideBar.vue';
  import TopBar from '@/components/TopBar.vue';
  import ProductDetailModal from '@/components/ProductDetailModal.vue';
  import { productsData } from '@/data/productData.js';
  import Product1 from '@/assets/product1.mp4';
  import Product2 from '@/assets/product2.mp4';
  import Product3 from '@/assets/product3.mp4';
  import { ElTooltip } from 'element-plus';
  import { InfoFilled, ToiletPaper, Promotion, Lock, FirstAidKit, LocationInformation, Eleme, Van, ForkSpoon, ShoppingBag, TopRight } from '@element-plus/icons-vue';
  
  export default {
    name: 'ProductView',
    components: {
      SideBar,
      TopBar,
      ProductDetailModal,
      ElTooltip,
      InfoFilled, ToiletPaper, Promotion, Lock, FirstAidKit, LocationInformation, Eleme, Van, ForkSpoon, ShoppingBag,
      TopRight
    },
    setup() {
      const products = ref([
        { id: 'prod1', src: Product1, alt: 'Product 1 Video' },
        { id: 'prod2', src: Product2, alt: 'Product 2 Video' }, 
        { id: 'prod3', src: Product3, alt: 'Product 3 Video' },
      ]);
      const currentIndex = ref(1);
      const videoRefs = ref([]);
      
      const isModalVisible = ref(false);
      const selectedProductId = ref(null);
      const isHovering = ref({});
      products.value.forEach((_, index) => {
        isHovering.value[index] = false;
      });

      const isLoading = ref(true);

      const centerProduct = (index) => {
        currentIndex.value = index;
      };
  
      onBeforeUpdate(() => {
        videoRefs.value = [];
      });

      const setupVideoEvents = (videoElement) => {
        if (!videoElement) return;

        // Clear previous listeners to prevent duplicates if called multiple times
        if (videoElement._canPlayListener) {
          videoElement.removeEventListener('canplaythrough', videoElement._canPlayListener);
        }
        if (videoElement._errorListener) {
          videoElement.removeEventListener('error', videoElement._errorListener);
        }

        if (videoElement.readyState >= 4) { // HAVE_ENOUGH_DATA
          isLoading.value = false;
          videoElement.play().catch(error => console.error("Error playing video:", error));
        } else {
          isLoading.value = true; // Ensure loader stays if not enough data yet
          videoElement._canPlayListener = () => {
            isLoading.value = false;
            videoElement.play().catch(error => console.error("Error playing video after load:", error));
            videoElement.removeEventListener('canplaythrough', videoElement._canPlayListener);
            if (videoElement._errorListener) videoElement.removeEventListener('error', videoElement._errorListener);
          };
          videoElement._errorListener = (e) => {
            console.error(`Error loading video ${videoElement.src}:`, e);
            isLoading.value = false; // Hide loader even on error.
            if (videoElement._canPlayListener) videoElement.removeEventListener('canplaythrough', videoElement._canPlayListener);
            videoElement.removeEventListener('error', videoElement._errorListener);
          };
          
          videoElement.addEventListener('canplaythrough', videoElement._canPlayListener);
          videoElement.addEventListener('error', videoElement._errorListener);

          if (videoElement.error) {
            videoElement._errorListener(videoElement.error); // Manually trigger if already errored
          } else if (videoElement.networkState === 3 /*NETWORK_NO_SOURCE*/) {
             videoElement._errorListener(new Error("Video source not found or network error"));
          } else if (videoElement.networkState === 1 /* NETWORK_IDLE */ && videoElement.readyState < 4) {
            videoElement.load(); // Explicitly call load if browser is idle and data is not enough
          } else if (videoElement.networkState === 2 /* NETWORK_LOADING */) {
            // Video is already trying to load, just wait for events
          }
        }
      };
  
      watch(currentIndex, (newIndex, oldIndex) => {
        if (oldIndex !== undefined && videoRefs.value[oldIndex]) {
          videoRefs.value[oldIndex].pause();
        }

        if (products.value.length === 0) {
          isLoading.value = false;
          return;
        }
        
        // Set loading to true when index changes, setupVideoEvents will set it to false when ready
        isLoading.value = true; 

        nextTick(() => {
          const activeVideo = videoRefs.value[newIndex];
          if (activeVideo) {
            setupVideoEvents(activeVideo);
          } else {
            // This case should be rare now that videos are in DOM via v-show
            console.warn(`ProductView: Video ref for index ${newIndex} not found after nextTick.`);
            // As a failsafe, if no video ref found for an existing product, stop loading to prevent infinite spinner.
            // This might mean the specific video for this product is missing or there's another issue.
            if(products.value[newIndex]) {
                 isLoading.value = false; 
                 console.error(`Failed to initialize video for product at index ${newIndex}. Content may not display correctly.`);
            }
          }
        });
      }, { immediate: true });
  
      const showProductDetail = (productId) => {
        selectedProductId.value = productId;
        isModalVisible.value = true;
      };

      const hideProductDetail = () => {
        isModalVisible.value = false;
        selectedProductId.value = null;
      };

      const selectedProductDetail = computed(() => {
        if (!selectedProductId.value) return null;
        return productsData.find(p => p.id === selectedProductId.value) || { name: '未找到产品', textInfo: [], tableInfo: { headers: [], rows: [] }};
      });
  
      return {
        products,
        currentIndex,
        centerProduct,
        videoRefs,
        isModalVisible,
        showProductDetail,
        hideProductDetail,
        selectedProductDetail,
        isHovering,
        isLoading,
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

  /* Adjusted loading indicator to be specific for carousel area */
  .loading-indicator-carousel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-grow: 1; /* Take up space similar to carousel */
    min-height: 300px; /* Or a height that matches carousel */
    color: #000000;
  }

  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: #000000;
    animation: spin 1s ease infinite;
    margin-bottom: 10px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
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
  
  .product-content-area {
    flex: 1;
    padding: 2vh 3vh 2.5vh 3vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; /* Changed from center to flex-start to accommodate loading indicator correctly */
    background-color: rgba(255, 255, 255);
    backdrop-filter: blur(8px);
    border-radius: 15px;
    margin: 0vh 2vh 2vh 0vh;
    overflow: hidden;
    position: relative; /* Needed for absolute positioning of loading indicator if it were to overlay */
  }
  
  .product-title {
    font-size: 3vh;
    font-weight: bold;
    color: #000000;
    margin-top: 1vh;
    margin-bottom: 0.5vh;
    opacity: 0; /* Initial state for animation */
    animation: fadeInContentItem 0.5s ease-out 0.4s forwards; /* Delay after container & loading */
  }
  
  .product-subtitle {
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
    flex-grow: 1;
    min-height: 0;
    position: relative;
    margin-bottom: 0vh;
    opacity: 0; /* Initial animation state */
    animation: fadeInContentItem 0.5s ease-out 1.0s forwards; /* Animation plays when v-show is true and opacity is 0 */
  }
  
  .carousel-videos {
    display: flex;
    justify-content: center;
    padding-top: 5vh;
    width: 100%;
    height: 100%; 
    position: relative;
  }
  
  .video-container {
    position: absolute;
    max-width: 60vh;
    max-height: 60vh;
    aspect-ratio: 1 / 1;
    border-radius: 15px;
    cursor: pointer;
    transition: transform 0.6s cubic-bezier(0.35, 0.85, 0.25, 1), 
                opacity 0.6s cubic-bezier(0.35, 0.85, 0.25, 1), 
                filter 0.6s cubic-bezier(0.35, 0.85, 0.25, 1), 
                max-width 0.6s cubic-bezier(0.35, 0.85, 0.25, 1), 
                aspect-ratio 0.6s cubic-bezier(0.35, 0.85, 0.25, 1);
    opacity: 1;
    filter: brightness(0.9) saturate(0.6);
    overflow: hidden;
  }
  
  .video-container.active {
    max-width: 60vh;
    opacity: 1;
    filter: brightness(1) saturate(1);
    transform: translateX(0) scale(1.1);
    z-index: 10;
  }
  
  .video-container.prev {
    transform: translateX(-75%) scale(0.85);
    z-index: 5;
  }
  
  .video-container.next {
    transform: translateX(75%) scale(0.85);
    z-index: 5;
  }
  
  .video-content {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .product-legend {
    display: flex;
    justify-content: space-around;
    width: 100%;
    max-width: 900px;
    padding: 1.5vh 1vh;
    border-radius: 8px;
    margin-bottom: 1vh;
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
    color: #000000;
  }
  
  .detail-arrow {
    position: absolute;
    bottom: 20px;
    right: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 15;
    transition: background-color 0.3s ease;
  }
  
  .detail-arrow:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  .detail-arrow .el-icon {
    font-size: 20px;
  }
  
  .floor-plan-carousel .carousel-videos .video-container:first-child.active + .video-container.next {
   transform: translateX(75%) scale(0.85);
  }
  .floor-plan-carousel .carousel-videos .video-container:last-child.active ~ .video-container.prev {
   transform: translateX(-75%) scale(0.85);
  }
  </style> 