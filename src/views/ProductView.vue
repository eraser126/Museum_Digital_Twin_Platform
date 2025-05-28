<template>
    <div class="app-container"> 
      <!-- 左侧导航栏 -->
      <SideBar />
  
      <!-- 主要内容区域 -->
      <div class="main-container">
        <!-- 顶部信息栏 -->
        <TopBar />
  
        <!-- 产品展示区域 -->
        <div class="product-content-area">
          <h2 class="product-title">博物馆新展品导览</h2>
          <p class="product-subtitle">Guide to New Museum Exhibits</p>
  
          <div class="floor-plan-carousel">
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
  import { ref, watch, onMounted, onBeforeUpdate, computed } from 'vue';
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

      const centerProduct = (index) => {
        currentIndex.value = index;
      };
  
      onBeforeUpdate(() => {
        videoRefs.value = [];
      });
  
      watch(currentIndex, (newIndex, oldIndex) => {
        if (videoRefs.value[oldIndex] && oldIndex !== newIndex) {
          videoRefs.value[oldIndex].pause();
        }
        if (videoRefs.value[newIndex]) {
          videoRefs.value[newIndex].play().catch(error => {
            console.error("Error attempting to play video:", error);
          });
        }
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
      };
    },
  };
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
    background-color: #000000;
  }
  
  .product-content-area {
    flex: 1;
    padding: 2vh 3vh 2.5vh 3vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: rgba(255, 255, 255);
    backdrop-filter: blur(8px);
    border-radius: 15px;
    margin: 0vh 2vh 2vh 0vh;
    overflow: hidden;
  }
  
  .product-title {
    font-size: 3vh;
    font-weight: bold;
    color: #000000;
    margin-top: 1vh;
    margin-bottom: 0.5vh;
  }
  
  .product-subtitle {
    font-size: 1.8vh;
    color: #000000;
    margin-bottom: 1vh;
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