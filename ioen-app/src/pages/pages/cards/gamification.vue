<script setup>
import CardAward from '@/views/pages/cards/gamification/CardAward.vue'
import CardCongratulations from '@/views/pages/cards/gamification/CardCongratulations.vue'
import CardUpgrade from '@/views/pages/cards/gamification/CardUpgrade.vue'
import CardWelcome from '@/views/pages/cards/gamification/CardWelcome.vue'
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      sm="6"
      md="4"
      order="2"
      order-md="1"
    >
      <CardAward />
    </VCol>

    <VCol
      cols="12"
      md="8"
      order="1"
      order-md="2"
      class="align-self-end mt-sm-10 mt-md-0"
    >
      <CardCongratulations />
    </VCol>

    <VCol
      cols="12"
      md="8"
      order="4"
      order-md="3"
      class="align-self-end mt-sm-10 mt-md-0"
    >
      <CardWelcome />
    </VCol>

    <VCol
      cols="12"
      md="4"
      sm="6"
      order="3"
      order-md="4"
    >
      <CardUpgrade />
    </VCol>
  </VRow>
</template>
