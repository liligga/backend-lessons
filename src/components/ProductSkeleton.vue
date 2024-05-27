<template>
  <div class="skeleton">
    <div class="skeleton__top"></div>
    <div class="skeleton__left"></div>
    <div class="skeleton__right"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  loading: Boolean
})
</script>

<style scoped>
.skeleton {
  /* background: #fff; */
  /* border-radius: 10px; */
  /* width: clamp(500px, 50%, 800px); */
  /* height: 400px; */
  /* padding: 20px; */
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 60px auto 100px;
  gap: 10px;
  height: 100%;
}

.skeleton>* {
  background: #ccc;
  border-radius: 10px;
  height: 100%;
  animation: pulse 200ms infinite;
}

.skeleton__top {
  grid-row: 1;
  grid-column: 1 / -1;
}

.skeleton__left {
  grid-row: 2;
  grid-column: 1 / -1;
}

.skeleton__right {
  grid-row: 3;
  grid-column: 1 / -1;
}
</style>
