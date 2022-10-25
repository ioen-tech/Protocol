<script setup>
import knowledgeBaseBgDark from '@/assets/images/pages/knowledge-base-bg-dark.png'
import knowledgeBaseBgLight from '@/assets/images/pages/knowledge-base-bg-light.png'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'

const props = defineProps({
  title: {
    type: String,
    required: false
  },
  subtitle: {
    type: String,
    required: false
  }
})

defineOptions({ inheritAttrs: false })
const themeBackgroundImg = useGenerateImageVariant(knowledgeBaseBgLight, knowledgeBaseBgDark)
</script>

<template>
  <!-- 👉 Search Banner  -->
  <VCard
    flat
    class="text-center search-header mb-7"
    :style="`background: url(${themeBackgroundImg});`"
  >
    <VCardText>
      <h5 class="text-h5 font-weight-medium text-primary mb-6">
        {{ props.title }}
      </h5>

      <!-- 👉 Search Input -->
      <VTextField
        v-bind="$attrs"
        density="default"
        placeholder="Ask a question.."
        class="search-header-input mx-auto my-3"
      >
        <template #prepend-inner>
          <VIcon
            icon="mdi-magnify"
            size="23"
          />
        </template>
      </VTextField>

      <p>{{ props.subtitle }}</p>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.search-header {
  padding: 4rem;
  background-repeat: no-repeat !important;
  background-size: cover !important;
}

// search input
.search-header-input {
  background-color: rgb(var(--v-theme-surface));
  border-radius: 0.3125rem;
  max-inline-size: 28.125rem;
}

@media (max-width: 37.5rem) {
  .search-header {
    padding: 1.5rem !important;
  }
}
</style>
