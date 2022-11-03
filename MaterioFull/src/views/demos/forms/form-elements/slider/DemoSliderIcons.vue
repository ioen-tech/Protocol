<script setup>
const mediaSlider = ref(0)
const alarmSlider = ref(0)
const zoomInOut = useClamp(0, 0, 100)
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VSlider
        v-model="mediaSlider"
        prepend-icon="mdi-volume-high"
      />
    </VCol>

    <VCol cols="12">
      <VSlider
        v-model="alarmSlider"
        append-icon="mdi-alarm"
      />
    </VCol>

    <VCol cols="12">
      <VSlider
        v-model="zoomInOut"
        append-icon="mdi-magnify-plus-outline"
        prepend-icon="mdi-magnify-minus-outline"
        @click:append="zoomInOut += 10"
        @click:prepend="zoomInOut -= 10"
      />
    </VCol>
  </VRow>
</template>
