<template>
  <div class="collapsible">
    <!-- <h3><slot name="title"></slot></h3> -->
    <!-- <p><slot name="content"></slot></p> -->
    <slot name="title">Fallback</slot>
  </div>
</template>

<script setup>

</script>

<style>
.collapsible  {
  transition: all 0.3s;
}
.collapsible p {
  display: none;
}
</style>
