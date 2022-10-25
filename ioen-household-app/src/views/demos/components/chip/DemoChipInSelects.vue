<script setup>
const chips = ref([
  'Programming',
  'Playing video games',
  'Sleeping'
])
const items = ref([
  'Streaming',
  'Eating',
  'Programming',
  'Playing video games',
  'Sleeping'
])
</script>

<template>
  <VCombobox
    v-model="chips"
    chips
    clearable
    multiple
    closable-chips
    clear-icon="mdi-close-circle-outline"
    :items="items"
    label="Your favorite hobbies"
    prepend-icon="mdi-filter-variant"
  />
</template>
