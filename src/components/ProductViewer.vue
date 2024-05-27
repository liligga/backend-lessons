<script setup>
import { ref, onMounted } from 'vue'
import Product from './Product.vue'

const currentId = ref(1)

const loading = ref(false)
const error = ref(null)
const product = ref({})

const fetchProduct = async (id) => {
  product.value = {}
  loading.value = true
  error.value = null
  const response = await fetch(`https://dummyjson.com/products/${id}`)
  if (!response.ok) {
    loading.value = false
    error.value = 'Failed to fetch product'
    throw new Error('Failed to fetch product')
  }
  const data = await response.json()
  loading.value = false
  error.value = null
  return data
}

const increase = () => {
  currentId.value++
  fetchProduct(currentId.value).then((data) => {
    product.value = data
  })
}

const decrease = () => {
  currentId.value--
  fetchProduct(currentId.value).then((data) => {
    product.value = data
  })
}

onMounted(() => {
  fetchProduct(1).then((data) => {
    product.value = data
  })
})
</script>

<template>
  <div class="product-wrapper">
    <Product :product="product" :id="currentId" :loading="loading" :error="error" />
    <div class="buttons">
      <button @click="decrease" :disabled="loading">Назад</button>
      <button @click="increase" :disabled="loading">Вперед</button>
    </div>
  </div>
</template>

<style scoped>
.product-wrapper {
  width: 100%;
  /* width: clamp(300px, 50%, 800px); */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.buttons {
  z-index: 100;
  width: clamp(300px, 50%, 800px);
  display: flex;
  /* width: clamp(500px, 50%, 800px); */
  justify-content: space-between;
}

.buttons button {
  padding: 10px;
  border-radius: 10px;
  background: #85c1e9;
  color: #000;
  border: none;
  cursor: pointer;
}

.buttons button:disabled {
  background: #ccc;
}
</style>
