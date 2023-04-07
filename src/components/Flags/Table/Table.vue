<template>
  <div class="table">
    <div class="heading">Flag name</div>

    <div class="heading">Value</div>

    <Row v-for="(value, flag) in props.flags" :key="flag" :flag="flag" :value="value" />
  </div>
</template>

<script setup lang="ts">
import Row from './Row/Row.vue'

const props = defineProps<{
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
}>()
</script>

<style lang="scss">
$columns: 2;

.table {
  display: grid;
  grid-template-columns: auto repeat(($columns - 1), 1fr);
  margin-bottom: 3rem;

  > * {
    padding: 0.75em;
    border-bottom: 1px solid;
    border-color: var(--color-border);

    &:nth-child(#{$columns}n + 1) {
      padding-left: 0;
      padding-right: 3em;
    }

    &:nth-child(#{$columns}n + #{$columns}) {
      padding-right: 0;
    }
  }
}

.heading {
  font-weight: 700;
  border-bottom: 2px solid;
  border-color: var(--color-heading);
}
</style>
