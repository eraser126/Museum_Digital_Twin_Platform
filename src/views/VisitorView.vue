<template>
  <div class="app-container">
    

    <!-- 主要内容区域 -->
    <div class="main-container">

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

          <!-- 底部区域 -->
          <div class="bottom-section">
            <h2>实时客流监测</h2>
            <div class="subtitle-container">
                <p class="subtitle">滞留热点</p>
                <p class="hotspot">2F数字展厅 (82人)</p> 
            </div>
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
          
        </div>

        <!-- 3号和4号块合并：数据统计区域 -->
        <div class="block block-3-4">
          <div class="chart-section">
            <div class="chart-block">
                <h3>实时人数监控表</h3>
                <div class="monitor-stats">
                  <div class="monitor-row">
                    <div class="monitor-icon">
                      <el-icon><Monitor /></el-icon>
                    </div>
                    <div class="monitor-info">
                      <div class="info-row">
                        <span class="big-value">8/10</span>
                        <span>自助购票机</span>
                      </div>
                      <div class="value-row">
                        <span class="percentage trend-down">2% ▼</span>
                      </div>
                    </div>
                  </div>
                  <div class="monitor-row">
                    <div class="monitor-icon">
                      <el-icon><Box /></el-icon>
                    </div>
                    <div class="monitor-info">
                      <div class="info-row">
                        <span class="big-value">17/24</span>
                        <span>行李寄存</span>
                      </div>
                      <div class="value-row">
                        <span class="percentage trend-up">43% ▲</span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div class="chart-block">
              <div style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center; padding: 1vh; background-color: rgba(0, 0, 0, 0.4); ">
                <img src="@/assets/Group 1205.svg" alt="分时段入人数次">
              </div>
            </div>
            <div class="chart-block">
              <div style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center; padding: 1vh; background-color: rgba(0, 0, 0, 0.4); ">
                <img src="@/assets/Group 1194.svg" alt="超细化单日人流量监测表">
              </div>
            </div>

            <div class="chart-block">
              <h3>实时空间监控表</h3>
              
              <div class="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>区域</th>
                        <th>空位</th>
                        <th>空调温度</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>4楼大厅</td>
                        <td>12</td>
                        <td>23°C</td>
                      </tr>
                      <tr>
                        <td>3楼大厅</td>
                        <td>8</td>
                        <td>24°C</td>
                      </tr>
                      <tr>
                        <td>2楼大厅</td>
                        <td>14</td>
                        <td>22°C</td>
                      </tr>
                    </tbody>
                  </table>
              </div>

            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import SideBar from '@/components/SideBar.vue'
import TopBar from '@/components/TopBar.vue'
import { CircleCheck, Monitor, User, Box } from '@element-plus/icons-vue'

export default {
  name: "VisitorView",
  components: {
    SideBar,
    TopBar,
    CircleCheck,
    Monitor,
    User,
    Box
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
}

.content-area {
  flex: 1;
  padding: 2vh 3vh 2.5vh 2vh;
  display: grid;
  grid-template-columns: 65% 35%;
  grid-template-rows: 65% 35%;
  gap: 1vh;
  min-height: 0;
  overflow-y: hidden;
  overflow-x: hidden;
  /* 为子元素应用动画 */
}

.content-area > div { /* 针对 .block-2 和 .block-3-4 的父级，若它们是直接子元素 */
  /* 如果block元素不是content-area的直接子元素，则需要更精确的选择器 */
}

/* 2号块样式 */
.block-2 {
  grid-row: 1;
  grid-column: 2;
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  height: 100%;
  background-color: rgba(28, 30, 39, 0.6);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  animation: fadeInUp 0.5s ease-out forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.block-2:hover {
  transform: translateY(-5px) scale(1.01);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
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
  transition: transform 0.2s ease-in-out;
}

.block-2 .stat-item:hover {
  transform: translateY(-3px);
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
  font-size: 2.2vh;
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
  /* align-items: center; */
}

.block-2 .bottom-section {
    flex: 1;
    min-width: 0;
    padding: 0px 1.5vh 1.5vh 1.5vh;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.block-2 .bottom-section h2 {
  font-size: 2.2vh;
  color: #fff;
  margin-bottom: 0.8vh;
  padding-left: 0.8vh;
}

.block-2 .subtitle-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 0.8vh;
    gap: 1vh;
}

.block-2 .subtitle {
  font-size: 2vh;
  color: #fff;
  margin: 0;
  flex-shrink: 0;
}

.block-2 .hotspot {
  color: #F56C6C;
  font-size: 2vh;
  margin: 0;
  flex-shrink: 0;
}

.block-2 .table-container {
  flex: 1;
  min-height: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  margin-top: 1vh;
  margin-left: 0;
  margin-right: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.block-2 .table-container:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 16px rgba(0,0,0,0.3);
}

.block-2 .table-scroll {
  flex: 1;
  overflow-y: hidden;
  min-height: 0;
  scrollbar-width: thin;
}

.trend-up {
  color: #67C23A;
}

.trend-down {
  color: #F56C6C;
}

table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

th {
    color: #fff;
    font-weight: 500;
    padding: 0.8vh 1.2vh;
    height: 5vh;
    font-size: 2vh;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

td {
    padding: 0.8vh 1.2vh;
    font-size: 2vh;
    height: 5vh;
    color: #fff;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
}

tbody tr:last-child td {
  border-bottom: none;
}

tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.05);
  transition: background-color 0.2s ease;
}

.block-2 table th:first-child {
  width: 30%;
}

.block-2 table th:not(:first-child) {
  width: 23.33%;
}

.block-3-4 table th {
  width: 33.33%;
}

/* 3-4号块合并样式 */
.block-3-4 {
  grid-row: 2;
  grid-column: 1 / span 2;
  background-color: rgba(28, 30, 39, 0.6);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  padding: 1.5vh;
  animation: fadeInUp 0.7s ease-out forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.block-3-4:hover {
  transform: translateY(-5px) scale(1.01);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
}

.chart-section {
  display: grid;
  grid-template-columns: 18% 28% 28% 23%;
  gap: 1%;
  height: 100%;
}

.chart-block {
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.chart-block:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 16px rgba(0,0,0,0.3);
}

.chart-block h3 {
  font-size: 2.4vh;
  color: #fff;
  margin-bottom: 1vh;
  font-weight: normal;
}

.chart-block img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  /* 图片本身不加单独hover，由父级.chart-block控制 */
}

/* .chart-block h3 + img {
  height: calc(100% - 40px);
  margin-top: 1vh;
  background-color: rgba(51, 51, 51, 0.9);
  padding: 1vh;
} */

/* 实时人数监控表样式 */
.monitor-stats {
  width: 100%;
  height: calc(100% - 3vh);
  display: flex;
  flex-direction: column;
  gap: 0px;
  /* background-color: rgba(51, 51, 51, 0.9); */
  border-radius: 8px;
  padding-left: 0.8vh;
  padding-right: 0.8vh;
}

.monitor-row {
  display: flex;
  align-items: center;
  gap: 1.2vh;
  /* padding: 5px; */
  /* background-color: rgba(255, 255, 255, 0.1); */
  border-radius: 8px;
  height: calc(50% - 0.6vh);
  transition: background-color 0.3s ease; /* 添加过渡效果 */
}

.monitor-icon {
  width: 20%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.monitor-icon .el-icon {
  font-size: 5vh;
  color: #fff;
}

.monitor-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-row {
  display: flex;
  flex-direction: column;
  gap: 0.4vh;
}

.info-row span {
  color: #fff;
  font-size: 2vh;
}

.info-row .big-value {
  font-size: 2.4vh;
  font-weight: bold;
  color: #fff;
}

.value-row {
  text-align: right;
}

.percentage {
  font-size: 2vh;
  white-space: nowrap;
}

.block-3-4 .table-container {
  flex: 1;
  max-height: 100%;
  padding: 0px;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  margin: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

</style> 