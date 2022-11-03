<script setup>
import page401 from '@/assets/images/pages/401.png'
import miscMaskDark from '@/assets/images/pages/misc-mask-dark.png'
import miscMaskLight from '@/assets/images/pages/misc-mask-light.png'
import tree2 from '@/assets/images/pages/tree-2.png'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'

const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark)
</script>

<template>
  <div class="misc-wrapper">
    <div class="misc-center-content text-center mb-4">
      <!-- 👉 Title and subtitle -->
      <h1 class="text-h1 font-weight-medium">
        401
      </h1>
      <h5 class="text-h5 font-weight-medium mb-3">
        You are not authorized! 🔐
      </h5>
      <p>You don't have permission to access this page. Go Home!</p>
    </div>

    <!-- 👉 Image -->
    <div class="misc-avatar w-100 text-center">
      <VImg
        :src="page401"
        alt="Coming Soon"
        :max-width="800"
        class="mx-auto"
      />
      <VBtn
        to="/"
        class="mt-10"
      >
        Back to Home
      </VBtn>
    </div>

    <!-- 👉 Footer -->
    <VImg
      :src="tree2"
      class="misc-footer-tree d-none d-md-block"
    />

    <VImg
      :src="authThemeMask"
      class="misc-footer-img d-none d-md-block flip-in-rtl"
    />
  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/misc.scss";

.misc-footer-tree {
  inline-size: 8rem;
  inset-block-end: 3.5rem;
  inset-inline-start: 0.375rem;
}
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
</route>
