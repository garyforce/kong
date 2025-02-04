import type { MenuItem } from '@/types/appTypes'

export const NAVIGATION_MENU_ITEMS: MenuItem[] = [
  {
    title: 'Organization',
    icon: new URL('@/assets/icons/organization.svg', import.meta.url).href
  },
  {
    title: 'Settings',
    icon: new URL('@/assets/icons/settings.svg', import.meta.url).href
  }
]
