<script setup>
import chartDark from '@/assets/images/cards/chart-dark.png'
import chartLight from '@/assets/images/cards/chart-light.png'
import heartDark from '@/assets/images/cards/heart-dark.png'
import heartLight from '@/assets/images/cards/heart-light.png'
import messageDark from '@/assets/images/cards/message-dark.png'
import messageLight from '@/assets/images/cards/message-light.png'
import userDark from '@/assets/images/cards/user-dark.png'
import userLight from '@/assets/images/cards/user-light.png'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'

const analytics = [
  {
    title: '42.8k',
    subtitle: 'Number of like',
    img: useGenerateImageVariant(heartLight, heartDark)
  },
  {
    title: '21.2k',
    subtitle: 'Number of Followers',
    img: useGenerateImageVariant(chartLight, chartDark)
  },
  {
    title: '2.4k',
    subtitle: 'Number of Comments',
    img: useGenerateImageVariant(messageLight, messageDark)
  },
  {
    title: '389.50k',
    subtitle: 'Number of Visits',
    img: useGenerateImageVariant(userLight, userDark)
  }
]
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>
        Analytics
      </VCardTitle>

      <template #append>
        <div class="me-n3">
          <VBtn
            icon
            size="x-small"
            variant="text"
            color="default"
          >
            <VIcon
              size="24"
              icon="mdi-dots-vertical"
            />
          </VBtn>
        </div>
      </template>
    </VCardItem>

    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="item in analytics"
          :key="item.title"
        >
          <template #prepend>
            <VAvatar :image="item.img.value" />
          </template>

          <VListItemTitle class="text-h6 font-weight-medium mb-1">
            {{ item.title }}
          </VListItemTitle>
          <VListItemSubtitle class="text-xs">
            {{ item.subtitle }}
          </VListItemSubtitle>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

