<template>
  <div class="card-header">
    <StatusBar
      :configured="service.configured"
      :published="service.published"
    />

    <div
      v-if="service.versions.length"
      class="versions"
    >
      {{ service.versions.length }}
      {{ service.versions.length > 1 ? "versions" : "version" }}
    </div>
  </div>
  <p class="name">
    {{ service.name }}
  </p>
  <p class="description">
    {{ service.description }}
  </p>
  <div class="card-footer">
    <ServiceMetrics
      :configured="service.configured"
      :metrics="service.metrics"
    />
    <AvatarTiles :users="getUniqueDeveloperList(service)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import StatusBar from '../common/StatusBar.vue'
import ServiceMetrics from '../common/ServiceMetrics.vue'
import AvatarTiles from '../common/AvatarTiles.vue'

import { type ServiceType, type Developer } from '@/types/appTypes'

export default defineComponent({
  name: 'ServiceCard',
  components: {
    StatusBar,
    ServiceMetrics,
    AvatarTiles,
  },
  props: {
    service: {
      type: Object as PropType<ServiceType>,
      required: true,
    },
  },
  setup() {
    const getUniqueDeveloperList = (serviceItem: ServiceType): Array<Developer> => {
      // Filter duplicate developers per service version
      const developerSet = new Set()
      const unique = [] as Developer[]
      for (const item of serviceItem.versions) {
        if (!developerSet.has(item?.developer?.id)) {
          developerSet.add(item?.developer?.id)
          unique.push(item.developer as Developer)
        }
      }

      return unique
    }

    return {
      getUniqueDeveloperList,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/serviceCard.scss';
</style>
