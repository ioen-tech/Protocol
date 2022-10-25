<script setup>
import avatar3 from '@/assets/images/avatars/avatar-3.png'
import avatar4 from '@/assets/images/avatars/avatar-4.png'
import avatar5 from '@/assets/images/avatars/avatar-5.png'
</script>

<template>
  <div class="v-avatar-group">
    <VAvatar size="large">
      <VImg :src="avatar3" />
      <VTooltip
        activator="parent"
        location="start"
      >
        Peter Harper
      </VTooltip>
    </VAvatar>

    <VAvatar size="large">
      <VImg :src="avatar4" />
      <VTooltip
        activator="parent"
        location="start"
      >
        Vivian Padilla
      </VTooltip>
    </VAvatar>

    <VAvatar size="large">
      <VImg :src="avatar5" />
      <VTooltip
        activator="parent"
        location="start"
      >
        Scott Wells
      </VTooltip>
    </VAvatar>

    <VAvatar
      color="grey-200"
      size="large"
    >
      <span class="text-secondary"> +3</span>
      <VTooltip
        activator="parent"
        location="top"
      >
        3 and more
      </VTooltip>
    </VAvatar>
  </div>
</template>
