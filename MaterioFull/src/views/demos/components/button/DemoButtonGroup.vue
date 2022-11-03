<script setup>
const toggleExclusive = ref(1)
</script>

<template>
  <VBtnToggle
    v-model="toggleExclusive"
    variant="outlined"
    color="primary"
    divided
  >
    <VBtn icon="mdi-format-align-left" />
    <VBtn icon="mdi-format-align-center" />
    <VBtn icon="mdi-format-align-right" />
    <VBtn icon="mdi-format-align-justify" />
  </VBtnToggle>
</template>
