# Museum_Digital_Twin_Platform

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## 更新记录

### 2024-07-21
- 根据UI图片更新了 `src/views/HomeView.vue` 页面的以下内容：
    - 调整了顶部信息栏的日期显示。
    - 在"博物馆智慧化监测模块"中为"环境监控"添加了状态箭头，并修改了"当前在馆人数"的百分比和箭头颜色。
    - 修改了"实时客流监测"模块中"滞留热点"的文字颜色。
    - 更新了"设备运行状态"模块中的部分数据（最近维护日期、能耗值）。
- `block-1` 区域目前为空，作为预留块。
- "超细化单日人流量监测表"的图表部分目前为占位符，待后续实现。

## 近期更新

- **YYYY-MM-DD** (Please fill in today's date):
    - **新增地图导览功能**: 
        - 在侧边导航栏添加了新的"地图"选项（使用 `Location` 图标）。
        - 创建了新的地图页面 (`src/views/MapView.vue`)，路径为 `/map`。
        - **地图页面特性**:
            - 页面标题为"博物馆平面导览图"。
            - 包含一个交互式的楼层平面图轮播器，展示2F、3F（默认居中）、4F的平面图 (分别对应 `Group 1201.svg`, `Group 1202.svg`, `Group 1203.svg`)。
            - 用户可以通过点击两侧的平面图将其切换到中间位置。
            - 中间位置的平面图会高亮显示（更亮、稍大），两侧的平面图则会变暗、变小，以突出显示当前选中的楼层。
            - 页面底部包含一个图例区域，使用图标和文字说明各种设施（如洗手间、母婴室、停车场、餐厅等）。
        - 更新了路由配置 (`src/router/index.js`) 以支持新的地图页面导航。

- **2023-10-27**: 为 `VisitorView.vue` 和 `HomeView.vue` 页面添加了组件动画效果。
    - **入场动画**: 页面主要区块增加了从下向上渐变出现的加载动画 (fadeInUp)。
    - **悬停效果**: 
        - 主要区块在鼠标悬停时会轻微放大并增加阴影，提升立体感。
        - 特定统计项（如环境监控、当前在馆人数）在悬停时会有轻微上浮效果。
        - 图表区块在悬停时会轻微放大并增强阴影。
        - 表格行在悬停时的背景色变化增加了平滑过渡效果。
    - 这些动画效果旨在增强用户界面的动态性和交互性，同时保持原有的布局结构不变。

- **YYYY-MM-DD** (Please fill in today's date):
    - **新增产品展示页面 (`ProductView.vue`)**: 
        - 在侧边导航栏添加了新的"产品"选项（使用 `Goods` 图标），链接到 `/product`。
        - 创建了新的产品展示页面 (`src/views/ProductView.vue`)。
        - **产品页面特性**:
            - 页面包含顶部标题 "馆藏精品鉴赏" 和副标题 "APPRECIATION OF MUSEUM COLLECTION"。
            - **视频轮播**: 采用类似 `MapView` 的轮播形式展示三个产品视频 (`product1.mp4`, `product2.mp4`, `product3.mp4`)。
                - 视频卡片可以左右点击或通过底部指示点切换。
                - 中间卡片（当前选中）的视频会自动播放，两侧卡片的视频则暂停并重置到开头。
                - 中间卡片尺寸更大、更亮；两侧卡片尺寸较小、较暗，有明确的视觉层级。
            - **交互提示**: 鼠标悬停在中间的视频卡片上时，右下角会出现一个圆形背景的箭头图标 (`ArrowRightBold`)。
            - **产品详情弹窗**: 点击该箭头图标会触发弹窗 (`ProductDetailModal.vue`)。
                - 弹窗标题为产品名称。
                - 弹窗左侧展示产品的高清图片 (来自 `assets`，例如 `product1_detail.png`)。
                - 弹窗右侧使用描述列表展示产品的详细信息：年代、材质、规格、重量、用途、馆藏地址。
                - 弹窗下方为产品的详细文字描述。
                - 产品数据从 `src/data/productData.js` 文件中获取，用户需要根据提供的 `product.xlsx` 文件填充该数据文件，并提供对应的详情图片。
            - 页面具有深色背景 (可替换为 `assets` 中的背景纹理图片)。
        - 创建了产品数据文件 `src/data/productData.js` 用于存储和管理产品信息。
        - 创建了产品详情弹窗组件 `src/components/ProductDetailModal.vue`。
        - 更新了路由配置 (`src/router/index.js`) 以包含 `/product` 路由。
