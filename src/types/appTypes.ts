import type { Ref } from 'vue'

export interface MenuItem {
  title: string
  icon: string
}

export interface ServiceType {
  id: string
  name: string
  description: string
  type: 'REST' | 'HTTP'
  published: boolean
  configured: boolean
  versions: Version[]
  metrics?: Metrics
}

export interface Metrics {
  latency: number
  uptime: number
  requests: number
  errors: number
}

export interface Version {
  id: string
  name: string
  description: string
  developer?: Developer
  updated_at: string
}

export interface Developer {
  id: string
  name: string
  email: string
  avatar: string
}

export interface UseGetPaginatedDataReturnType {
  currentPage: Ref<number>
  totalPageCount: Ref<number>
  totalListItems: Ref<number>
  paginatedListItems: Ref<ServiceType[]>
  handlePagination: (direction: number) => void
}
