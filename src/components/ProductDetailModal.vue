<template>
  <transition name="modal-slide-corner">
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
  </transition>
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
/* Modal Transition: Slide Corner Effect */
.modal-slide-corner-enter-active,
.modal-slide-corner-leave-active {
  transition: background-color 0.3s ease; /* For overlay fade */
}

.modal-slide-corner-enter-active .modal-content,
.modal-slide-corner-leave-active .modal-content {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* Overlay Fade */
.modal-slide-corner-enter-from,
.modal-slide-corner-leave-to {
  background-color: rgba(0, 0, 0, 0);
}

.modal-slide-corner-enter-to,
.modal-slide-corner-leave-from {
  background-color: rgba(0, 0, 0, 0.3); /* Semi-transparent black */
}

/* Content Enter: From bottom-left to top-right */
.modal-slide-corner-enter-from .modal-content {
  opacity: 0;
  transform: translateX(30vw) scale(0.3); /* Start small, at its final X position */
  transform-origin: bottom left;
}

.modal-slide-corner-enter-to .modal-content {
  opacity: 1;
  transform: translateX(30vw) scale(1); /* End at full size, at its final X position */
  transform-origin: bottom left;
}

/* Content Leave: From top-right to bottom-left */
.modal-slide-corner-leave-from .modal-content {
  opacity: 1;
  transform: translateX(30vw) scale(1);
  transform-origin: bottom left; /* Origin for shrinking towards top-right */
}

.modal-slide-corner-leave-to .modal-content {
  opacity: 0;
  /* Adjusted to move towards bottom-left while shrinking from top-right */
  transform: translateX(calc(30vw - 70px)) scale(0.3);
  transform-origin: bottom left;
}

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

  background-color: rgba(28, 30, 39, 0.6); 
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
  font-size: 2.6vh;
}

/* modal-body class is removed */

.text-item {
    margin-top: 1vh;
    /* margin-left: 1vh; */
    height: 4.5vh; /* Changed from fixed height to auto for content flexibility */
    padding: 8px 12px; /* Add some padding */
    border-radius: 6px; /* Rounded corners for items */
    font-size: 2vh;
    transition: background-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease; /* Smooth transition */
}

.text-item:hover {
  background-color: rgba(255, 255, 255, 0.08); /* Subtle white highlight on hover */
  transform: translateY(-2px) scale(1.01); /* Slight lift and scale effect */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Soft shadow on hover */
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
  background-color: rgba(28, 30, 39, 0.6); 
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
  transition: color 0.25s ease; /* Smooth transition for text color */
}

.table-info-section th {
  /* background-color: rgba(255, 255, 255, 0.1);  */
  font-weight: 600;
  color: #ffffff; 
}

.table-info-section tbody tr {
  transition: background-color 0.25s ease, transform 0.25s ease; /* Smooth transition for rows */
}

.table-info-section tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.08); /* Subtle white highlight for the row */
  transform: scale(1.005); /* Very slight scale effect for the row */
}

.table-info-section tbody tr:hover td {
  color: #ffffff; /* Brighter text for hovered row cells */
}

.table-info-section tr:nth-child(even) {
  background-color: transparent; 
}
</style> 