<template>
  <div>
    <div v-for="provider in props.flags" :key="provider.title">
      <h2>{{ provider.title }}</h2>
      <p>{{ provider.description }}</p>

      <Table :flags="provider.flags" :service="provider.service" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Table from './Table/Table.vue'

const props = defineProps<{
  flags: {
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
}>()
</script>

<style scoped></style>
