<script setup>
import avatar1 from '@/assets/images/avatars/avatar-1.png'
import avatar2 from '@/assets/images/avatars/avatar-2.png'
import avatar3 from '@/assets/images/avatars/avatar-3.png'
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Finance Summary</VCardTitle>
      <VCardSubtitle>Check out each Column for more details</VCardSubtitle>

      <template #append>
        <VAvatar
          size="48"
          class="primary"
          variant="tonal"
        >
          <VIcon
            size="28"
            icon="mdi-help-circle-outline"
          />
        </VAvatar>
      </template>
    </VCardItem>

    <VCardText class="pt-3">
      <VRow class="gap-y-1">
        <VCol
          cols="12"
          sm="6"
        >
          <p class="mb-1">
            Annual Companies Taxes
          </p>
          <h6 class="text-h6">
            $1450.35
          </h6>
        </VCol>

        <VCol
          cols="12"
          sm="6"
        >
          <p class="mb-1">
            Next Tax Review Date
          </p>
          <h6 class="text-h6">
            July 14, 2021
          </h6>
        </VCol>

        <VCol
          cols="12"
          sm="6"
        >
          <p class="mb-1">
            Average Product Price
          </p>
          <h6 class="text-h6">
            $85.50
          </h6>
        </VCol>

        <VCol>
          <p>Satisfaction Rate</p>
          <div
            class="d-flex align-center"
            style="width: 130px;"
          >
            <VProgressLinear
              color="primary"
              :model-value="75"
              :height="6"
              class="me-4"
            />
            <span>75%</span>
          </div>
        </VCol>

        <VCol
          cols="12"
          sm="6"
        >
          <div class="v-avatar-group">
            <VAvatar
              :size="44"
              :image="avatar1"
            />
            <VAvatar
              :size="44"
              :image="avatar2"
            />
            <VAvatar
              :size="44"
              :image="avatar3"
            />
            <VAvatar
              color="grey-200"
              size="large"
            >
              <span class="text-secondary"> +3</span>
            </VAvatar>
          </div>
        </VCol>

        <VCol>
          <VChip
            color="primary"
            size="small"
            class="mt-2"
          >
            5 days Ago
          </VChip>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
