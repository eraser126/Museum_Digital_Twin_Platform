<template>
  <div v-if="visible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="text-info-section">
        <button class="close-button" @click="closeModal">&times;</button>
        <h3 class="modal-title">{{ product.name }}</h3>
        <div v-for="(item, index) in product.textInfo" :key="'text-' + index" class="text-item">
          <p v-if="item.type === 'paragraph'">{{ item.content }}</p>
          <p v-else><strong>{{ item.label }}:</strong> {{ item.value }}</p>
        </div>
      </div>
      <div v-if="product.tableInfo && product.tableInfo.headers && product.tableInfo.rows" class="table-info-section">
        <!-- <h4>详细参数</h4> -->
        <table>
          <thead>
            <tr>
              <th v-for="(header, hIndex) in product.tableInfo.headers" :key="'header-' + hIndex">{{ header }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rIndex) in product.tableInfo.rows" :key="'row-' + rIndex">
              <td v-for="(cell, cIndex) in row" :key="'cell-' + rIndex + '-' + cIndex">{{ cell }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetailModal',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    product: {
      type: Object,
      default: () => ({ name: '', textInfo: [], tableInfo: { headers: [], rows: [] } }) // 提供默认值防止渲染错误
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const closeModal = () => {
      emit('close');
    };

    return {
      closeModal,
    };
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  /* Centering the modal content */
  justify-content: center; 
  align-items: center; 
  z-index: 1000;
}

.modal-content {
  /* Positioning and Size */
  width: 30vw;
  height: 80vh;
  max-width: 40vw; 
  max-height: 85vh; /* Max height for the card */
  /* Horizontal offset from center */
  transform: translateX(30vw);
    /* background-color: aqua; */
  /* Appearance */
  color: #e0e0e0; 
  padding: 0vh; /* Remove padding, sections will handle their own */
  gap: 2vh;
  /* overflow-y: auto; */
  display: flex;
  flex-direction: column; 
}

/* text-info-section now contains close button and title */
.text-info-section {
  padding: 2vh;
  height: 38vh;
  position: relative; /* For close button positioning */
  /* border-bottom: 1px solid rgba(255, 255, 255, 0.1); */
  flex-shrink: 0; /* Prevent this section from shrinking excessively */

  background-color: rgba(30, 30, 30, 0.75); 
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px); 
  /* border: 1px solid rgba(255, 255, 255, 0.1); */
  border-radius: 16px; 
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  overflow-y: auto; /* Allow this section to scroll if content is too long */
}

.close-button {
  position: absolute;
  top: 2px; 
  right: 8px; 
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #b0b0b0;
  z-index: 1; 
  /* --- New styles for hover effect --- */
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
}

/* --- New rule for showing button on modal hover --- */
.modal-content:hover .close-button {
  opacity: 1;
  pointer-events: auto;
}

.close-button:hover {
  color: #ffffff; /* This existing hover for button color remains */
}

.modal-title {
  text-align: left;
  font-size: 22px;
  font-weight: 600;
  margin-top: 0; /* Title is now within text-info-section */
  margin-bottom: 0px;
  padding-bottom: 1vh;
  color: #ffffff;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}

/* modal-body class is removed */

.text-item {
    margin-top: 1vh;
    margin-left: 1vh;
}

.text-item p {
  margin-bottom: 10px;
  color: #d0d0d0; 
  line-height: 1.6;
}

.text-item strong {
  margin-right: 8px;
  color: #ffffff; 
  font-weight: 500;
}

.table-info-section {
  padding: 2vh; /* Adjust padding */
  flex-grow: 1; /* Allow table section to grow and enable its own scroll if needed */
  height: 40vh;
  /* overflow-y: auto; */
  background-color: rgba(30, 30, 30, 0.75); 
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px); 
  /* border: 1px solid rgba(255, 255, 255, 0.1); */
  border-radius: 16px; 
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

.table-info-section table {
  width: 100%;
  border-collapse: collapse;
  font-size: 2vh;
}

.table-info-section th,
.table-info-section td {
  /* border: 1px solid rgba(255, 255, 255, 0.2);  */
  padding: 1vh 1vh;
  height: 6vh;
  text-align: left;
  color: #d0d0d0; 
}

.table-info-section th {
  /* background-color: rgba(255, 255, 255, 0.1);  */
  font-weight: 600;
  color: #ffffff; 
}

.table-info-section tr:nth-child(even) {
  background-color: transparent; 
}
</style> 