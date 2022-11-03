<script setup>
import triangleDark from '@/assets/images/misc/triangle-dark.png'
import triangleLight from '@/assets/images/misc/triangle-light.png'
import trophy from '@/assets/images/misc/trophy.png'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'

const triangleBg = useGenerateImageVariant(triangleLight, triangleDark)
</script>

<template>
  <VCard
    title="Congratulations John! 🎉"
    subtitle="Best seller of the month"
    class="position-relative"
  >
    <VCardText>
      <h5 class="text-2xl font-weight-medium text-primary">
        $42.8k
      </h5>
      <p>78% of target 🚀</p>
      <VBtn size="small">
        View Sales
      </VBtn>
    </VCardText>

    <!-- Triangle Background -->
    <VImg
      :src="triangleBg"
      class="triangle-bg flip-in-rtl"
    />

    <!-- Trophy -->
    <VImg
      :src="trophy"
      class="trophy"
    />
  </VCard>
</template>

<style lang="scss">
@use "@layouts/styles/mixins" as layoutsMixins;

.triangle-bg {
  position: absolute;
  inline-size: 10.375rem;
  inset-block-end: 0;
  inset-inline-end: 0;
}

.trophy {
  position: absolute;
  inline-size: 4.9375rem;
  inset-block-end: 2rem;
  inset-inline-end: 2rem;
}

// for rtl only
.flip-in-rtl {
  @include layoutsMixins.rtl {
    transform: scaleX(-1);
  }
}
</style>
