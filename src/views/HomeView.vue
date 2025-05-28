<template>
  <div class="app-container">
    <!-- 左侧导航栏 -->
    <SideBar />

    <!-- 主要内容区域 -->
    <div class="main-container">
      <!-- 顶部信息栏 -->
      <TopBar />

      <!-- 主要展示区域 -->
      <div class="content-area">
        <!-- 1号块（预留） -->
        <div></div>
        
        <!-- 2号块：博物馆智慧化监测模块 -->
        <div class="block block-2">
          <!-- 顶部图片区域 -->
          <div class="top-image">
            <img src="@/assets/museum.png" alt="博物馆图片">
          </div>
          
          <!-- 中间区域 -->
          <div class="middle-section">
            <h2>博物馆智慧化监测模块</h2>
            <div class="stats-area">
              <div class="stat-item">
                <div>
                  <el-icon><CircleCheck /></el-icon>
                </div>
                <div class="stat-info">
                  <p>环境监控</p>
                  <p>展品</p>
                </div>
                <div>
                  <p class="percentage trend-up">100% ▲</p>
                </div>
              </div>
              <div class="stat-item">
                <div>
                  <el-icon><User /></el-icon>
                </div>
                <div class="stat-info">
                  <p class="value">3870</p>
                  <p>当前在馆人数</p> 
                </div>
                <div>
                  <p class="percentage trend-up">18% ▲</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 底部表格区域 -->
          <div class="bottom-section">
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>区域</th>
                    <th>温度</th>
                    <th>湿度</th>
                    <th>光照 (lux)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>4F数字展厅</td>
                    <td>20.5℃</td>
                    <td>55%</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td>3F数字展厅</td>
                    <td>22.3℃</td>
                    <td>58%</td>
                    <td>180</td>
                  </tr>
                  <tr>
                    <td>2F数字展厅</td>
                    <td>19.2℃</td>
                    <td>56%</td>
                    <td>130</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
        </div>

        <!-- 3号块：实时客流监测 -->
        <div class="block block-3">
          <div>
            <h2>实时客流监测</h2>
            <p class="subtitle">滞留热点</p>
            <p class="hotspot">2F数字展厅 (82人)</p>
            <div class="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>时段</th>
                      <th>在馆人数</th>
                      <th>承载比</th>
                      <th>入口流速</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>09:00-10:00</td>
                      <td>3266</td>
                      <td>64%</td>
                      <td>28人/分钟</td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </div>
          <div style="display: flex; justify-content: center;">
            <img src="@/assets/Group 1194.svg" alt="超细化单日人流量监测表">
          </div>
        </div>

        <!-- 4号块：设备运行状态 -->
        <div class="block block-4">
          <h2>设备运行状态</h2>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>监测点</th>
                  <th>在线数</th>
                  <th>最近维护</th>
                  <th>能耗</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>恒温机组</td>
                  <td>12/12</td>
                  <td>2024-06</td>
                  <td>428</td>
                </tr>
                <tr>
                  <td>安防摄像头</td>
                  <td>87/90</td>
                  <td>2024-05</td>
                  <td>156</td>
                </tr>
                <tr>
                  <td>VR终端</td>
                  <td>32/35</td>
                  <td>2024-07</td>
                  <td>217</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { House, User, VideoCamera, CircleCheck, Expand, Fold } from '@element-plus/icons-vue'
import SideBar from '@/components/SideBar.vue'
import TopBar from '@/components/TopBar.vue'

export default {
  name: "HomeView",
  components: {
    House,
    User,
    VideoCamera,
    CircleCheck,
    Expand,
    Fold,
    SideBar,
    TopBar
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const flowChart = ref(null)
    const tableContainer = ref(null)
    
    const checkTableScroll = () => {
      if (tableContainer.value) {
        const scrollDiv = tableContainer.value.querySelector('.table-scroll')
        if (scrollDiv.scrollHeight > scrollDiv.clientHeight) {
          tableContainer.value.classList.add('has-scroll')
        } else {
          tableContainer.value.classList.remove('has-scroll')
        }
      }
    }

    onMounted(() => {
      checkTableScroll()
    })

    return {
      flowChart,
      tableContainer
    }
  }
}
</script>

<style scoped>
/* 定义入场动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 基础样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

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
}

/* 内容遮罩层样式 */
.content-overlay {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.6); /* 半透明黑色遮罩 */
  backdrop-filter: blur(2px); /* 轻微模糊效果 */
}

.content-area {
  flex: 1;
  padding: 2vh 3vh 2.5vh 2vh;
  display: grid;
  grid-template-columns: 65% 35%;
  grid-template-rows: 65% 35%;
  gap: 1vh;
  min-height: 0;
}

.block {
  background-color: rgba(28, 30, 39, 0.6);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  padding: 1.2vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0; /* 初始不可见，通过动画显示 */
}

.block:hover {
  transform: translateY(-5px) scale(1.01);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.block-1 {
  grid-row: 1;
  grid-column: 1;
  animation: fadeInUp 0.5s ease-out 0.1s forwards; /* 延迟0.1s */
}

.block-2 {
  grid-row: 1;
  grid-column: 2;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  padding: 0;
  animation: fadeInUp 0.5s ease-out 0.2s forwards; /* 延迟0.2s */
}

.block-2 .top-image {
  width: 100%;
  height: 40%;
  overflow: hidden;
  flex-shrink: 0;
}

.block-2 .top-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.block-2 .middle-section {
  padding: 1.2vh;
  flex-shrink: 0;
  height: 25%;
}

.block-2 .middle-section h2 {
  font-size: 2.4vh;
  color: #fff;
  margin-bottom: 0vh;
  padding-left: 0.8vh;
}

.block-2 .stats-area {
  display: flex;
  flex-direction: row;
  gap: 1vh;
  margin: 0;
  height: calc(100% - 3vh);
}

.block-2 .stat-item {
  flex: 1;
  border-radius: 6px;
  padding: 0vh;
  display: flex;
  align-items: center;
  gap: 0.8vh;
  margin: 0;
  height: 100%;
  min-width: 0;
  justify-content: space-between;
  transition: transform 0.2s ease-in-out; /* 添加悬停动画 */
}

.block-2 .stat-item:hover {
  transform: translateY(-3px); /* 悬停时向上移动一点 */
}

/* 图标区域 */
.block-2 .stat-item > div:first-child {
  flex-shrink: 0;
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.block-2 .stat-item .el-icon {
  font-size: 5vh;
  color: #fff;
}

/* 中间文字区域 */
.block-2 .stat-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  overflow: hidden;
}

.block-2 .stat-info p {
  margin: 0;
  font-size: 1.8vh;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}

.block-2 .stat-info .value {
  font-size: 2.4vh;
  font-weight: bold;
  margin: 0.2vh 0;
}

/* 右侧百分比区域 */
.block-2 .stat-item > div:last-child {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding-left: 0.5vh;
  min-width: fit-content;
}

.block-2 .percentage {
  font-size: 1.6vh;
  color: #fff;
  white-space: nowrap;
  min-width: 60px;
  text-align: right;
}

.block-2 .trend-up {
  color: #67C23A;
  display: inline-flex;
  align-items: center;
}

.block-2 .bottom-section {
  flex: 1;
  min-width: 0;
  padding: 0px 1.5vh 1.5vh 1.5vh;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.block-2 .table-container {
  flex: 1;
  padding: 0px;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  margin: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.table-container {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.table-container:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 16px rgba(0,0,0,0.3);
}

/* 表格样式统一 */
.block-2 table,
.block-3 table,
.block-4 table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.block-2 th,
.block-3 th,
.block-4 th {
  color: #fff;
  font-weight: 500;
  padding: 0.8vh 1.2vh;
  height: 5vh;
  font-size: 1.8vh;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.block-2 td,
.block-3 td,
.block-4 td {
  padding: 0.8vh 1.2vh;
  font-size: 1.8vh;
  height: 4.5vh;
  color: #fff;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 设置表格列宽 */
.block-2 table th,
.block-4 table th {
  width: 25%;
}

.block-3 table th:first-child {
  width: 30%;
}

.block-3 table th:not(:first-child) {
  width: 23.33%;
}

/* 表格hover效果 */
.block-2 tbody tr:hover,
.block-3 tbody tr:hover,
.block-4 tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.05);
  transition: background-color 0.2s ease; /* 平滑过渡 */
}

/* 标题样式优化 */
.block h2 {
  font-size: 2.4vh;
  color: #fff;
  margin-bottom: 1.2vh;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.block-3 {
  grid-row: 2;
  grid-column: 1;
  display: flex;
  flex-direction: row;
  gap: 1.2vh;
  padding: 0vh;
  animation: fadeInUp 0.5s ease-out 0.3s forwards; /* 延迟0.3s */
}

.block-3 > div:first-child {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2vh 2vh 1.5vh 2vh;
}

.block-3 .subtitle {
  font-size: 1.8vh;
  color: #fff;
  flex-shrink: 0;
  margin-left: 1vh;
}

.block-3 .hotspot {
  color: #F56C6C;
  font-size: 2vh;
  margin: 0.8vh 0 2.8vh 1vh;
  flex-shrink: 0;
}

.block-3 .table-container {
  flex: 1;
  min-height: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  margin-top: 1vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.block-3 .table-scroll {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  scrollbar-width: thin;
  scrollbar-color: #666 #333;
}

.block-3 .chart-container {
  width: 100%;
  height: calc(100% - 3vh);
}

.block-3 > div:last-child {
  flex: 1;
  min-width: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  padding: 1.2vh;
  margin: 1.5vh 1.5vh 1.5vh 0vh;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.block-3 > div:last-child:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 16px rgba(0,0,0,0.3);
}

/* 自定义滚动条样式 */
.block-3 .table-scroll::-webkit-scrollbar {
  width: 0.6vh;
}

.block-3 .table-scroll::-webkit-scrollbar-track {
  background: #333;
  border-radius: 0.3vh;
}

.block-3 .table-scroll::-webkit-scrollbar-thumb {
  background-color: #666;
  border-radius: 0.3vh;
}

/* 添加表格底部渐变阴影 */
.block-3 .table-container {
  position: relative;
}

.block-3 .table-container::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(to top, #333 0%, transparent 100%);
  pointer-events: none;
  opacity: 0.8;
  display: none;
}

.block-3 .table-container.has-scroll::after {
  display: block;
}

.block-4 {
  grid-row: 2;
  grid-column: 2;
  display: flex;
  flex-direction: column;
  padding: 2vh 1.5vh;
  animation: fadeInUp 0.5s ease-out 0.4s forwards; /* 延迟0.4s */
}

.block-4 h2 {
  font-size: 2.4vh;
  color: #fff;
  margin-bottom: 3vh;
}

.block-4 .table-container {
  flex: 1;
  padding: 0px;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  margin: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

/* 确保所有容器不溢出 */
.block,
.block > div,
.table-container,
.stat-item,
.stat-info {
  overflow: hidden;
}

/* 自定义滚动条样式 */
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

</style>