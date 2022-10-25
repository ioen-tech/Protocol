<script setup>
const switchMe = ref(false)
</script>

<template>
  <VSwitch v-model="switchMe">
    <template #label>
      Turn on the progress: <VProgressCircular
        :indeterminate="switchMe"
        :value="0"
        size="24"
        class="ms-2"
      />
    </template>
  </VSwitch>
</template>
