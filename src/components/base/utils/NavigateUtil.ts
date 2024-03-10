import { useRouter } from 'vue-router'

export function navigate(urlPath: string) {
  const router = useRouter() // Get Vue Router instance
  router?.push(urlPath) // Redirect to dashboard
}
