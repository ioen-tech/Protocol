<script setup>
import miscComingSoon from '@/assets/images/pages/misc-coming-soon.png'
import miscMaskDark from '@/assets/images/pages/misc-mask-dark.png'
import miscMaskLight from '@/assets/images/pages/misc-mask-light.png'
import tree2 from '@/assets/images/pages/tree-2.png'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'

const email = ref('')
const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark)
</script>

<template>
  <div class="misc-wrapper">
    <div>
      <!-- 👉 Title and subtitle -->
      <div class="text-center mb-8">
        <h5 class="text-h5 mb-1">
          We are launching soon 🚀
        </h5>
        <p class="text-sm">
          Our website is opening soon. Please register to get notified when it's ready!
        </p>
      </div>

      <!-- 👉 Email input -->
      <VForm
        class="d-flex align-center justify-center flex-wrap gap-4"
        @submit.prevent="() => {}"
      >
        <VTextField
          v-model="email"
          density="compact"
          placeholder="Enter your email or username"
          class="misc-email-input"
        />
        <VBtn type="submit">
          Notify
        </VBtn>
      </VForm>
    </div>

    <!-- 👉 Image -->
    <div class="misc-avatar w-100 mt-12">
      <VImg
        :src="miscComingSoon"
        alt="Coming Soon"
        :max-width="700"
        class="mx-auto"
      />
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

.misc-email-input {
  max-inline-size: 21.875rem;
  min-inline-size: 12.5rem;
}

.misc-footer-tree {
  inline-size: 8rem;
  inset-block-end: 6rem;
  inset-inline-start: 0.375rem;
}
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
