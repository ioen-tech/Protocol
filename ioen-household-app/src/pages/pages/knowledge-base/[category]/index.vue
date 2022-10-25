<script setup>
import { useRoute } from 'vue-router'
import KnowledgeBaseSearchSectionVue from '@core/components/KnowledgeBaseSearchSection.vue'
import axios from '@axios'

const kBSearchQuery = ref('')
const knowledgeBaseSubcategories = ref([])
const route = useRoute()

// fetching data from the @fake-db
const fetchKnowledgeBaseSubcategoryData = () => {
  return axios.get(`/pages/knowledge-base/categories/${ route.params.category }`, { params: { q: kBSearchQuery.value } }).then(r => {
    knowledgeBaseSubcategories.value = r.data
  })
}

// watching the search query to fetch the data again
watch(kBSearchQuery, fetchKnowledgeBaseSubcategoryData, { immediate: true })
</script>

<template>
  <section id="page-knowledge-base">
    <!-- 👉 Search Section -->
    <KnowledgeBaseSearchSectionVue v-model="kBSearchQuery" />

    <!-- 👉 Kb Search  content -->
    <div id="knowledge-base-content">
      <VRow class="match-height">
        <VCol
          v-for="item in knowledgeBaseSubcategories"
          :key="item.icon"
          md="4"
          sm="6"
          cols="12"
        >
          <VCard>
            <!-- 👉 title -->
            <VCardItem class="bg-var-theme-background">
              <template #prepend>
                <VIcon
                  :color="item.iconColor ? item.iconColor : '' "
                  :size="24"
                  :icon="item.icon"
                />
              </template>

              <VCardTitle>
                {{ item.title }} ({{ item.questions.length }})
              </VCardTitle>
            </VCardItem>

            <!-- 👉 Questions -->
            <VList density="compact">
              <VListItem
                v-for="que in item.questions"
                :key="que.question"
                :to="{ name: 'pages-knowledge-base-category-question', params: { category: $route.params.category, question: que.slug } }"
              >
                <template #prepend>
                  <VIcon
                    size="14"
                    color="secondary"
                    class="me-2"
                    icon="mdi-checkbox-blank-circle-outline"
                  />
                </template>

                <VListItemSubtitle>{{ que.question }}</VListItemSubtitle>
              </VListItem>
            </VList>
          </VCard>
        </VCol>

        <!-- 👉 No result found -->
        <VCol
          v-show="!knowledgeBaseSubcategories.length"
          cols="12"
          class="text-center"
        >
          <h4 class="mt-4">
            Search result not found!!
          </h4>
        </VCol>
      </VRow>
    </div>
  </section>
</template>

<style lang="scss">
@use "@core/scss/pages/knowledge-base";
</style>

<route lang="yaml">
meta:
  navActiveLink: pages-knowledge-base
</route>
