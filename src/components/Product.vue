<template>
  <div class="product-container">
    <div v-if="props.product && !props.loading" class="product">
      <h3>{{ props.product.title }} </h3>
      <p class="price" v-if="props.product.price">{{ props.product.price }}$</p>
      <img :src="props.product.thumbnail" alt="" />
      <p class="description">{{ props.product.description }}</p>
    </div>
    <ProductSkeleton v-if="props.loading" />
    <div v-if="props.error" class="error">
      {{ props.error }}
    </div>
  </div>
</template>

<script setup>
import ProductSkeleton from './ProductSkeleton.vue';

const props = defineProps({
  product: {
    id: Number,
    title: String,
    description: String,
    price: Number,
    thumbnail: String
  },
  id: Number,
  loading: Boolean,
  error: String | null
});
</script>

<style scoped>
p {
  margin: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

.product-container {
  width: clamp(300px, 50%, 800px);
  /* height: 500px; */
  height: 100%;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  position: relative;
}

.product {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 10px;
  /* justify-items: center; */
  align-items: center;
}

.product h3 {
  grid-row: 1;
  grid-column: 1 / 3;
  text-wrap: balance;
}

.product img {
  grid-row: 2;
  grid-column: 1 / -1;
  justify-self: center;
}

.product .description {
  grid-row: 3;
  grid-column: 1 / -1;
  /* text-wrap: balance; */
}

.product .price {
  grid-row: 1;
  grid-column: 3 / -1;
  align-self: start;
  justify-self: end;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 5px;
  z-index: 100;
}

.error {
  position: absolute;
  top: 50%;
  left: 50%;
  /* right: 0; */
  /* transform: translate(calc(50% - 100px), calc(50% - 40px)); */
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: bold;
  background: pink;
  width: 200px;
  text-align: center;
  z-index: 100;
}
</style>
