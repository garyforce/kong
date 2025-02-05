<template>
  <div class="card-container">
    <div class="card-title shimmer" />
    <div class="card-description shimmer" />
    <div class="card-footer shimmer" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ServiceCardSkeleton',
})
</script>
<style scoped lang="scss">
 @import '@/assets/styles/serviceCardSkeleton.scss';
</style>
