<script setup>
import avatar1 from '@/assets/images/avatars/avatar-1.png'
import avatar2 from '@/assets/images/avatars/avatar-2.png'
import avatar3 from '@/assets/images/avatars/avatar-3.png'
import avatar4 from '@/assets/images/avatars/avatar-4.png'
import avatar5 from '@/assets/images/avatars/avatar-5.png'
import avatar6 from '@/assets/images/avatars/avatar-6.png'
</script>

<template>
  <div class="v-avatar-group">
    <VAvatar size="large">
      <VImg :src="avatar1" />
      <VTooltip
        activator="parent"
        location="start"
      >
        John Doe
      </VTooltip>
    </VAvatar>

    <VAvatar size="large">
      <VImg :src="avatar2" />
      <VTooltip
        activator="parent"
        location="start"
      >
        Jennie Obrien
      </VTooltip>
    </VAvatar>

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

    <VAvatar size="large">
      <VImg :src="avatar6" />
      <VTooltip
        activator="parent"
        location="start"
      >
        Angel Bishop
      </VTooltip>
    </VAvatar>
  </div>
</template>
