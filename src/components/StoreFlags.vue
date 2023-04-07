<template>
  <main>
    <Flags :flags="featureFlags" />
  </main>
</template>

<script setup lang="ts">
import { useFeatureFlagsStore } from '@/stores/featureFlags.store'
import { ref, watch } from 'vue'
import Flags from './Flags/Flags.vue'

const featureFlagsStore = useFeatureFlagsStore()

featureFlagsStore.fetchConfigCatFlags()
featureFlagsStore.fetchLaunchDarklyFlags()
featureFlagsStore.fetchOptimizelyFlags()
featureFlagsStore.fetchStatsigFlags()

const featureFlags = ref<
  {
    title: string
    flags: Record<
      string,
      | string
      | boolean
      | number
      | {
          enabled: boolean
          variationKey?: string | number | boolean
        }
    >
  }[]
>([])

const createFeatureFlagsObject = (state: typeof featureFlagsStore.$state) => {
  featureFlags.value = []

  Object.keys(state).forEach((key) => {
    featureFlags.value.push({
      title: key,
      flags: state[key]
    })
  })
}

watch(
  () => featureFlagsStore.$state,
  (value) => {
    createFeatureFlagsObject(value)
  },
  {
    deep: true,
    immediate: true
  }
)
</script>
