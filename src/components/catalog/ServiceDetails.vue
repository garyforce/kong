<template>
  <div class="service-detail-modal">
    <p class="modal-title">
      {{ service.name }}
    </p>
    <p class="modal-description">
      {{ service.description }}
    </p>
    <div class="metadata-container">
      <section class="left-content">
        <h3>Status</h3>
        <StatusBar
          :configured="service.configured"
          :published="service.published"
        />
      </section>
      <section>
        <h3>Metrics</h3>
        <ServiceMetrics
          :configured="service.configured"
          :metrics="service.metrics"
        />
      </section>
    </div>
    <section v-if="service.versions?.length">
      <p class="versions">
        Versions ({{ service.versions.length }})
      </p>
      <ServiceVersions
        :type="service.type"
        :versions="service.versions"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { type ServiceType } from '@/types/appTypes'
import StatusBar from '../common/StatusBar.vue'
import ServiceMetrics from '../common/ServiceMetrics.vue'
import ServiceVersions from '../common/ServiceVersions.vue'

export default defineComponent({
  name: 'ServiceDetails',
  components: {
    StatusBar,
    ServiceMetrics,
    ServiceVersions,
  },
  props: {
    service: {
      type: Object as PropType<ServiceType>,
      required: true,
    },
  },
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/serviceDetails.scss'
</style>
