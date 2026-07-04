<template>
  <div class="spinner-container">
    <span class="spinner"></span>
    <div class="blur-container"></div>
  </div>
</template>
<style scoped>
.spinner-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 9999;
}

.blur-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(3px);
  z-index: -1;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid rgba(174, 174, 174, 0.4);
  border-top-color: rgb(32, 32, 32);
  border-radius: 50%;
  display: inline-block;
  margin-right: 6px;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
