<template>
  <div class="service-catalog">
    <div class="header">
      <div class="title-container">
        <p class="title">
          Service Hub
        </p>
        <p class="subtitle">
          Organize services, manage and track versioning and API service
          documentation. Learn More
        </p>
      </div>
      <div class="input-container">
        <label>
          <input
            v-model="searchQuery"
            class="search-input"
            data-testid="search-input"
            placeholder="Search"
            type="search"
          >
        </label>

        <PrimaryButton
          :label="`+ Service Package`"
          @click:event="createNewService()"
        />
      </div>
    </div>

    <div
      v-if="loading"
      class="catalog"
    >
      <ServiceCardSkeleton
        v-for="ii in PAGE_SIZE"
        :key="ii"
      />
    </div>

    <template v-else-if="paginatedListItems.length">
      <div class="catalog">
        <section
          v-for="service in paginatedListItems"
          :key="service.id"
          class="service-card"
          @click="() => onServiceCardClick(service)"
        >
          <ServiceCard :service="service" />
        </section>
      </div>
      <Pagination
        v-if="totalPageCount > 1"
        :current-page="currentPage"
        :total-items="totalListItems"
        :total-pages="totalPageCount"
        @navigate="handlePagination"
      />
    </template>
    <div
      v-else
      class="no-results"
      data-testid="no-results"
    >
      {{
        searchQuery
          ? `No services found for '${searchQuery}'`
          : "No services present. "
      }}
    </div>
    <Teleport to="#modal">
      <ModalComponent
        v-if="isModalVisible"
        @close="hideModal"
      >
        <template v-if="selectedServiceData">
          <ServiceDetails :service="selectedServiceData" />
        </template>
      </ModalComponent>
    </Teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, onBeforeMount, markRaw, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { type ServiceType } from '@/types/appTypes'
import useDebouncedRef from '@/composables/useDebouncedRef'
import useServices from '@/composables/useServices'
import useModal from '@/composables/useModal'
import useGetPaginatedData from '@/composables/useGetPaginatedData'
import ServiceCard from './ServiceCard.vue'
import PrimaryButton from '../common/PrimaryButton.vue'
import Pagination from '../pagination/PaginationComponent.vue'
import ModalComponent from '../common/ModalComponent.vue'
import ServiceDetails from './ServiceDetails.vue'
import ServiceCardSkeleton from './ServiceCardSkeleton.vue'

const PAGE_SIZE = 10
export default defineComponent({
  name: 'ServiceCatalog',
  components: {
    ServiceCard,
    PrimaryButton,
    Pagination,
    ServiceDetails,
    ModalComponent,
    ServiceCardSkeleton,
  },
  setup() {
    // Import services from the composable
    const { services, loading, getServices } = useServices()
    const router = useRouter()
    const { query } = useRoute()
    const {
      show: isModalVisible,
      component,
      showModal,
      hideModal,
    } = useModal()

    const openConfirm = () => {
      // Attach the modal to the root and toggle visibility to true
      component.value = markRaw(ModalComponent)
      showModal()
    }

    // Set the search string to a Vue ref - debounced to 300ms
    const searchQuery = useDebouncedRef('', 300)
    // Ref to hold the selected service data
    const selectedServiceData = ref<ServiceType | undefined>()

    const {
      currentPage,
      totalPageCount,
      totalListItems,
      paginatedListItems,
      handlePagination,
    } = useGetPaginatedData(services)

    watch(searchQuery, (newQuery) => {
      console.log(searchQuery)
      // Fetch services based on queryParam
      getServices(newQuery)
      if (newQuery) {
        router.replace({
          query: {
            ...query,
            search: newQuery,
            page: 1,
          },
        })
      } else {
        // Resetting query params on input clear
        router.push({ query: {} })
      }
      currentPage.value = 1
    })

    const createNewService = () => {
      alert('New Service created successfully')
    }

    const onServiceCardClick = (selectedService: ServiceType): void => {
      // Store the service data in the ref and toggles the modal visibility to true
      selectedServiceData.value = selectedService
      console.log(isModalVisible)
      openConfirm()
    }
    onBeforeMount(() => {
      // Initialize searchQuery from parameters if present
      const existingParams = query['search'] as string
      if (existingParams) {
        searchQuery.value = existingParams
      }
    })

    return {
      isModalVisible,
      component,
      services,
      loading,
      searchQuery,
      currentPage,
      totalPageCount,
      totalListItems,
      paginatedListItems,
      selectedServiceData,
      hideModal,
      openConfirm,
      createNewService,
      handlePagination,
      onServiceCardClick,
      PAGE_SIZE,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/serviceList.scss'
</style>
