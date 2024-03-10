<script lang="ts">
import type { Menu } from '../base/models/BaseModel';

// import type { Menu } from '@/components/base/model/BaseModel.vue'
export interface MenuItem extends Menu {
  order: number
  status: string
  code: string
}
</script>
