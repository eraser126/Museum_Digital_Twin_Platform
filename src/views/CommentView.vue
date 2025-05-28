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
        
        <!-- 2号块：网络评论核心 -->
        <div class="block block-2">
          <!-- 顶部图片区域 -->
          <div class="top-image">
            <img src="@/assets/museum2.png" alt="博物馆图片">
          </div>

          <!-- 底部区域：网络评论核心 -->
          <div class="review-core-container">
            <h3>网络评论核心</h3>
            <div class="review-core-content">
              <div class="main-stats-table">
                <table>
                  <thead>
                    <tr>
                      <th>指标</th>
                      <th>今日数据</th>
                      <th>昨日同期</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>新增评论总数</td>
                      <td>284条 <span class="trend-up">▲</span></td>
                      <td>211条</td>
                    </tr>
                    <tr>
                      <td>关键词出现频率</td>
                      <td>"沉浸式" (42次)</td>
                      <td>"互动" 33次</td>
                    </tr>
                    <tr>
                      <td>平均情感得分</td>
                      <td>4.6/5.0 <span class="trend-up">▲</span></td>
                      <td>4.3/5.0</td>
                    </tr>
                    <tr>
                      <td>高热度评论帖</td>
                      <td>3条 <span class="trend-up">▲</span></td>
                      <td>1条</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="aux-stats">
                <div class="review-status">
                  <div style="display: flex; align-items: center;">
                    <h4>评论情况</h4>
                  </div>
                  <div>
                    <p>微博 <span>42%</span></p>
                    <p>抖音 <span>28%</span></p>
                    <p>官网 <span>18%</span></p>
                  </div>
                </div>
                <div class="sentiment-tendency">
                  <div style="display: flex; align-items: center;">
                    <h4>情感倾向</h4>
                  </div>
                  <div>
                    <p>正面 <span>89%</span></p>
                    <p>中性 <span>8%</span></p>
                    <p>负面 <span>3%</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <!-- 3号和4号块合并：数据统计区域 -->
        <div class="block block-3-4">
          <div class="chart-section">

            <div class="chart-block hourly-comments-block">
                <h3>小时级评论分析表</h3>
                <div class="table-container hourly-comments-table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>时间点</th>
                        <th>评论总量</th>
                        <th>正面占比</th>
                        <th>负面占比</th>
                        <th>情感均值</th>
                        <th>高峰词</th>
                        <th>平台流量峰值</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>08:00</td>
                        <td>12</td>
                        <td>82%</td>
                        <td>2%</td>
                        <td>4.3</td>
                        <td>"开馆"、"排队"</td>
                        <td>微博(55%)</td>
                      </tr>
                      <tr>
                        <td>10:00</td>
                        <td>48</td>
                        <td>91%</td>
                        <td>1%</td>
                        <td>4.7</td>
                        <td>"讲解"、"AR"</td>
                        <td>抖音(68%)</td>
                      </tr>
                      <tr>
                        <td>12:00</td>
                        <td>20</td>
                        <td>79%</td>
                        <td>5%</td>
                        <td>4.1</td>
                        <td>"餐厅"、"拥挤"</td>
                        <td>官网(73%)</td>
                      </tr>
                    </tbody>
                  </table>
              </div>
                
            </div>

            <div class="chart-block sentiment-daily-block">
              <h3>评论情感波动日报表</h3>
              <img src="@/assets/Group 1190.svg" alt="评论情感波动日报表">
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
import { Monitor, Avatar, Box } from '@element-plus/icons-vue'

export default {
  name: "CommentView",
  components: {
    SideBar,
    TopBar,
    Monitor,
    Avatar,
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

/* .app-container specific to CommentView if needed, or a new root class */
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

/* 视频背景样式 - START REMOVAL */
/*
.video-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.video-background video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
*/
/* 视频背景样式 - END REMOVAL */

.content-area {
  flex: 1;
  padding: 2vh 3vh 2.5vh 2vh;
  display: grid;
  grid-template-columns: 65% 35%;
  grid-template-rows: 65% 35%;
  gap: 1vh;
  min-height: 0;
  /* 为子元素应用动画 */
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

.review-core-container { /* Replaces .block-2 .bottom-section for specificity */
  flex: 1;
  min-width: 0;
  padding: 1.2vh 1.2vh 1.2vh 1.2vh; /* Adjusted padding */
  display: flex;
  flex-direction: column;
  height: 100%; /* Ensure it tries to fill space */
  overflow: hidden; /* Prevent content overflow */
}

.review-core-container h3 {
  font-size: 2.4vh; /* Adjusted from general 2.4vh */
  color: #fff;
  margin-bottom: 0.8vh;
  font-weight: 500; /* Match general h3 */
  padding-left: 0.8vh;;
  /* text-align: center; */
}

.review-core-content {
  display: flex;
  flex-direction: row;
  gap: 1vh;
  flex: 1; /* Allow this to take remaining space */
  min-height: 0; /* For flex children to shrink */
  overflow: hidden;
}

.main-stats-table {
  flex: 0 0 65%; /* Give more space to the table */
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.main-stats-table table {
  width: 100%;
  table-layout: fixed;
}

.main-stats-table th,
.main-stats-table td {
  font-size: 1.6vh; /* Smaller font for this table */
  padding: 0.5vh 0.8vh;
  height: 5vh;
  /* height: auto; */
  white-space: normal; /* Allow text wrapping */
  word-break: break-word; /* Break long words if necessary */
}
.main-stats-table th:nth-child(1) { width: 37%; }
.main-stats-table th:nth-child(2) { width: 35%; }
.main-stats-table th:nth-child(3) { width: 28%; }


.aux-stats {
  flex: 0 0 32%;
  display: flex;
  flex-direction: column;
  gap: 1vh; /* Space between review status and sentiment tendency */
  min-width: 0;
  font-size: 1.6vh; /* Smaller font for aux stats */
}

.review-status,
.sentiment-tendency {
  /* background-color: rgba(51, 51, 51, 0.7); */
  border-radius: 6px;
  padding: 0.8vh;
  flex: 1; /* Distribute space if needed */
  display: flex;
  flex-direction: row;
  min-height: 0;
}

.aux-stats h4 {
  font-size: 1.8vh;
  width: 50%;
  color: #fff;
  /* margin-bottom: 0.5vh; */
  font-weight: 500;
}

.aux-stats p {
  margin: 0.2vh 0;
  height: 3.5vh;
  font-size: 1.6vh;
  color: #eee;
  display: flex;
  justify-content: space-between;
}
.aux-stats p span {
  font-weight: bold;
  color: #fff;
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

/* 3-4号块合并样式 */
.block-3-4 {
  grid-row: 2;
  grid-column: 1 / span 2;
  background-color: rgba(28, 30, 39, 0.6);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  padding: 2.5vh;
  animation: fadeInUp 0.7s ease-out forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.block-3-4:hover {
  transform: translateY(-5px) scale(1.01);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
}

.chart-section {
  display: grid;
  grid-template-columns: 68% 30%;
  gap: 1.5%;
  height: 100%;
}

.chart-block {
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
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
  /* height: 100%; */ /* Removed to allow flex sizing */
  flex-grow: 1; /* Allow image to take available vertical space */
  min-height: 0; /* Prevents overflow in flex item */
  object-fit: contain;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  /* 图片本身不加单独hover，由父级.chart-block控制 */
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

.hourly-comments-block { /* Specific class for the first chart block */
  /* Styles if needed */
}

.sentiment-daily-block { /* Specific class for the second chart block */
  /* Styles if needed */
}

.block-3-4 .table-container.hourly-comments-table-container table th,
.block-3-4 .table-container.hourly-comments-table-container table td {
  font-size: 1.8vh; /* Adjusted font size for 7-column table */
  padding: 0.6vh 0.8vh; /* Adjusted padding */
  white-space: nowrap; /* Keep nowrap for most cells */
}

/* Allow specific columns to wrap if needed, e.g., "高峰词", "平台流量峰值" */
.block-3-4 .table-container.hourly-comments-table-container table td:nth-child(6),
.block-3-4 .table-container.hourly-comments-table-container table td:nth-child(7),
.block-3-4 .table-container.hourly-comments-table-container table th:nth-child(6),
.block-3-4 .table-container.hourly-comments-table-container table th:nth-child(7) {
  white-space: normal;
  word-break: break-all; /* More aggressive wrapping for these specific columns */
}
</style> 