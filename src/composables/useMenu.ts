import { ref } from 'vue'
import { NAVIGATION_MENU_ITEMS } from '@/utils/headerMenuItem'

export function useMenu() {
  const menuItems = ref(NAVIGATION_MENU_ITEMS)
  return { menuItems }
}
