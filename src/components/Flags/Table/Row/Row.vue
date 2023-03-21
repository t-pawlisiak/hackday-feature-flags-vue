<template>
  <div>
    <code class="name">
      {{ props.flag }}
    </code>
  </div>

  <div>
    <template
      v-if="typeof props.value === 'object' && props.value !== null && 'enabled' in props.value"
    >
      <code>
        {{ props.value.enabled }}
      </code>
      <template v-if="props.value.variationKey">
        /
        <code>
          {{ props.value.variationKey }}
        </code>
      </template>
    </template>
    <code v-else>
      {{ props.value }}
    </code>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  flag: string
  value:
    | string
    | boolean
    | number
    | {
        enabled: boolean
        variationKey?: string | number | boolean
      }
}>()
</script>

<style scoped lang="scss">
.name {
  font-weight: 700;
}
</style>
