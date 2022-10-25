<script setup>
import cafeBadilico from '@/assets/images/cards/cafe-badilico.png'
</script>

<template>
  <VCard>
    <VImg
      cover
      height="230"
      :src="cafeBadilico"
    />

    <VCardItem>
      <VCardTitle>Cafe Badilico</VCardTitle>
      <VCardSubtitle class="d-flex align-center flex-wrap mt-2">
        <VRating
          density="compact"
          color="warning"
          :model-value="4"
          :size="24"
          background-color="warning"
        />
        <span class="text-base ms-3">4 Star (12.4k)</span>
      </VCardSubtitle>

      <template #append>
        <div class="me-n3 mt-n3">
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
      <p>Italian Cafe</p>
      <p>
        The refrigerated dairy aisle of your local grocery store can be a great source tasty, convenient selections for your.
      </p>

      <VDivider />

      <p class="my-3">
        Tonight's availability
      </p>

      <div class="demo-space-x">
        <VChip>5:30PM</VChip>
        <VChip>7:00PM</VChip>
        <VChip>7:15PM</VChip>
      </div>
    </VCardText>

    <VCardActions>
      <VBtn>Book Now</VBtn>
    </VCardActions>
  </VCard>
</template>
