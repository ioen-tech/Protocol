<script setup>
import { useRoute } from 'vue-router'
import axios from '@axios'

const route = useRoute()
const knowledgeBaseQuestionAndAnswer = ref()
const fetchKnowledgeBaseQuestionsAndAnswers = () => {
  return axios.get(`/pages/knowledge-base/categories/questions/${ route.params.question }`).then(r => {
    knowledgeBaseQuestionAndAnswer.value = r.data
  })
}
watch(route, fetchKnowledgeBaseQuestionsAndAnswers, { immediate: true })
</script>

<template>
  <VRow id="page-knowledge-base">
    <VCol
      cols="12"
      md="4"
      lg="3"
      class="kb-question-related-col"
    >
      <VCard>
        <!-- 👉 title -->
        <VCardItem class="bg-var-theme-background">
          <template #prepend>
            <VIcon
              color="warning"
              :size="24"
              icon="mdi-lock-open-outline"
            />
          </template>

          <VCardTitle>Copyright & Legal (5)</VCardTitle>
        </VCardItem>

        <VList density="compact">
          <VListItem
            v-for="que in knowledgeBaseQuestionAndAnswer?.relatedQuestions"
            :key="que.question"
          >
            <template #prepend>
              <VIcon
                size="14"
                class="me-2"
                icon="mdi-checkbox-blank-circle-outline"
              />
            </template>

            <VListItemTitle
              class="text-body-2"
              href="#"
              tag="a"
            >
              {{ que.question }}
            </VListItemTitle>
          </VListItem>
        </VList>
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="8"
      lg="9"
    >
      <VCard>
        <VImg
          cover
          :src="knowledgeBaseQuestionAndAnswer?.postImg"
        />
        <!-- 👉 Post Title -->
        <VCardItem>
          <template #prepend>
            <VIcon
              icon="mdi-cellphone"
              class="mx-n1"
            />
          </template>

          <VCardTitle>{{ knowledgeBaseQuestionAndAnswer?.postContent?.title }}</VCardTitle>
        </VCardItem>

        <!-- 👉 Post Content -->
        <VCardText v-html="knowledgeBaseQuestionAndAnswer?.postContent?.postDesc" />
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@import "@core/scss/pages/knowledge-base";
</style>

<route lang="yaml">
meta:
  navActiveLink: pages-knowledge-base
</route>
