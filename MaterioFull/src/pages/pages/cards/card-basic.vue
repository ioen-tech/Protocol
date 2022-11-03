<script setup>
import CardBasic from '@/views/pages/cards/card-basic/CardBasic.vue'
import CardNavigation from '@/views/pages/cards/card-basic/CardNavigation.vue'
import CardSolid from '@/views/pages/cards/card-basic/CardSolid.vue'
</script>

<template>
  <div>
    <h6 class="text-2xl font-weight-medium mb-6">
      Basic Cards
    </h6>

    <CardBasic />

    <h6 class="text-2xl font-weight-medium mb-6 mt-14">
      Navigation Cards
    </h6>

    <CardNavigation />

    <h6 class="text-2xl font-weight-medium mt-14 mb-6 ">
      Solid Cards
    </h6>

    <CardSolid />
  </div>
</template>
