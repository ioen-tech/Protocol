<script setup>
import knowledgeBaseBgDark from '@/assets/images/pages/knowledge-base-bg-dark.png'
import knowledgeBaseBgLight from '@/assets/images/pages/knowledge-base-bg-light.png'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'

defineOptions({ inheritAttrs: false })
const themeBackgroundImg = useGenerateImageVariant(knowledgeBaseBgLight, knowledgeBaseBgDark)
</script>

<template>
  <!-- 👉 Search Banner  -->
  <VCard
    flat
    class="text-center page-knowledge-base mb-6"
    :style="`background:url(${themeBackgroundImg})`"
  >
    <VCardText>
      <h5 class="text-h5 font-weight-semibold text-primary mb-3">
        Hello, how can we help?
      </h5>
      <p>or choose a category to quickly find the help you need</p>

      <!-- 👉 Search Input -->
      <VTextField
        v-bind="$attrs"
        placeholder="Ask a question.."
        density="default"
        class="page-kb-search-input mx-auto"
      >
        <template #prependInner>
          <VIcon
            icon="mdi-magnify"
            size="23"
          />
        </template>
      </VTextField>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.page-knowledge-base {
  padding: 4.5rem;
  background-repeat: no-repeat !important;
  background-size: cover !important;
}

// search input
.page-kb-search-input {
  background-color: rgb(var(--v-theme-surface));
  border-radius: 0.3125rem;
  max-inline-size: 28.125rem;
}

@media (max-width: 37.5rem) {
  #page-knowledge-base {
    .page-knowledge-base {
      padding: 1.5rem !important;
    }
  }
}
</style>
