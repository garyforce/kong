<template>
  <ServiceCatalog />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ServiceCatalog from '@/components/catalog/ServiceList.vue';

export default defineComponent({
  name: 'PageHome',
  components: {
    ServiceCatalog
  },
})
</script>
