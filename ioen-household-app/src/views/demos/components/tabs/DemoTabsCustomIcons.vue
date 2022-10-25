<template>
  <VTabs
    next-icon="mdi-arrow-right"
    prev-icon="mdi-arrow-left"
    show-arrows
  >
    <VTab
      v-for="i in 10"
      :key="i"
    >
      Item {{ i }}
    </VTab>
  </VTabs>
</template>
