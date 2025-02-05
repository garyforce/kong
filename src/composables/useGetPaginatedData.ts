import { ref, computed, type Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type {
  ServiceType,
  UseGetPaginatedDataReturnType
} from '../types/appTypes'

const DEFAULT_PAGE_LIMIT = 10
/**
 * Generic hook to manage paginated data fetching and display in Vue applications.
 *
 * @param itemList - Reference to an array of items
 * @param limit (optional) - The number of items to display per page. Defaults to 10.
 */
export default function useGetPaginatedData(
  itemList: Ref<ServiceType[]>,
  limit = DEFAULT_PAGE_LIMIT
): UseGetPaginatedDataReturnType {
  const router = useRouter()
  const route = useRoute()

  // Ref to track the current page number
  const currentPage = ref(1)
  const totalListItems = computed(() => itemList.value.length)
  const totalPageCount = computed(() => Math.ceil(totalListItems.value / limit))

  const paginatedListItems = computed(() => {
    const startIndex = (currentPage.value - 1) * limit
    const endIndex = startIndex + limit
    // Slice the itemList to get the current page's data - not mutating original list
    return itemList.value.slice(startIndex, endIndex)
  })

  /**
   * Handles pagination logic based on the provided direction (positive/negative).
   * Updates the current page and router query parameter for page.
   *
   * @param {number} direction - Positive (1) for next page, Negative (-1) for previous page.
   */
  async function handlePagination(direction: number): Promise<void> {
    if (
      (direction === -1 && currentPage.value > 1) ||
      (direction === 1 && currentPage.value < totalPageCount.value)
    ) {
      currentPage.value += direction
      await router.replace({
        query: {
          ...route.query,
          page: currentPage.value
        }
      })
    }
  }

  const pageQueryParam = Math.floor(Number(route.query['page']))
  // Initialize currentPage from parameters if present
  if (pageQueryParam && pageQueryParam > 0) {
    currentPage.value = pageQueryParam
  }

  return {
    currentPage,
    totalListItems,
    totalPageCount,
    paginatedListItems,
    handlePagination
  }
}
