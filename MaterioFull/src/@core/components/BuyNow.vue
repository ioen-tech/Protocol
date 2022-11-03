<script setup>
import { useRoute } from 'vue-router'

const buyNowUrl = ref('https://themeselection.com/item/materio-vuetify-vuejs-admin-template/')
const route = useRoute()
onMounted(() => {
  const {marketplace} = route.query
  if (marketplace === 'vuetify')
    buyNowUrl.value = 'https://store.vuetifyjs.com/products/materio-vuetify-vuejs-admin-template'
})
</script>

<template>
  <VBtn
    color="error"
    class="product-buy-now"
    :href="buyNowUrl"
    target="_blank"
    rel="noopener noreferrer"
  >
    Buy Now
  </VBtn>
</template>

<style lang="scss" scoped>
.product-buy-now {
  position: fixed;
  z-index: 4;
  inset-block-end: 5%;
  inset-inline-end: 79px;

  .v-application &.v-btn.v-btn--elevated {
    box-shadow: 0 1px 20px 1px rgb(var(--v-theme-error)) !important;

    &:hover {
      box-shadow: none !important;
    }
  }
}
</style>
