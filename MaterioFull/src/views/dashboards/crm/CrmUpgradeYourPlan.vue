<script setup>
import briefcase from '@/assets/images/cards/briefcase.png'
import logoCreditCard2 from '@/assets/images/cards/logo-credit-card-2.png'
import logoMastercardSmall from '@/assets/images/cards/logo-mastercard-small.png'

const savedCards = [
  {
    logo: logoMastercardSmall,
    type: 'Credit card',
    number: '2566 xxxx xxxx 8908'
  },
  {
    logo: logoCreditCard2,
    type: 'Credit card',
    number: '8990 xxxx xxxx 6852'
  }
]
</script>

<template>
  <VCard>
    <!-- SECTION Card Header and Menu -->
    <VCardItem>
      <!-- 👉 Title -->
      <VCardTitle>Upgrade Your Plan</VCardTitle>

      <!-- 👉 menu -->
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
    <!-- !SECTION -->

    <VCardText>
      <p class="text-xs">
        Please make the payment to start enjoying all the features of our premium plan as soon as possible.
      </p>

      <!-- SECTION Upgrade plan banner -->
      <div class="plan-upgrade-banner pa-3 d-flex bg-light-primary rounded align-center">
        <VAvatar
          rounded
          size="40"
          class="plan-details me-2 border-opacity-100 border-primary"
        >
          <VImg
            :src="briefcase"
            alt="briefcase"
            width="23"
            height="20"
          />
        </VAvatar>

        <div class="d-flex flex-column">
          <h6 class="text-sm font-weight-semibold mb-1">
            Platinum
          </h6>
          <span class="text-primary text-xs">Upgrade Plan</span>
        </div>
        <VSpacer />
        <div class="d-flex align-center">
          <sup>
            <h6 class="text-xs font-weight-regular">$</h6>
          </sup>
          <span class="text-h5 font-weight-medium">5250</span>
          <sub>
            <h6 class="text-sm font-weight-regular">/Year</h6>
          </sub>
        </div>
      </div>
      <!-- !SECTION -->

      <!-- SECTION Payment Details -->
      <VList class="card-list mt-1">
        <VListSubheader class="font-weight-semibold">
          Payment details
        </VListSubheader>

        <VListItem
          v-for="card in savedCards"
          :key="card.logo"
          class="mb-3"
        >
          <!-- 👉 Avatar -->
          <template #prepend>
            <VAvatar
              rounded
              start
              :size="45"
              :image="card.logo"
            />
          </template>

          <!-- 👉 Title and Subtitle -->

          <VListItemTitle class="text-sm font-weight-semibold mb-1">
            {{ card.type }}
          </VListItemTitle>
          <VListItemSubtitle class="text-xs">
            {{ card.number }}
          </VListItemSubtitle>

          <!-- 👉 Action -->
          <template #append>
            <VListItemAction>
              <VTextField
                density="compact"
                label="CVV"
                style="width: 5rem;"
              />
            </VListItemAction>
          </template>
        </VListItem>

        <!-- 👉 Add Payment  -->
        <VListItem class="mb-3">
          <a
            href="javascript:void(0)"
            class="text-xs"
          >Add Payment Method</a>
        </VListItem>
      </VList>
      <!-- !SECTION -->

      <!-- 👉 Email -->
      <VForm>
        <VRow>
          <VCol cols="12">
            <VTextField
              placeholder="Email Address"
              class="mb-3"
            />
            <VBtn
              block
              append-icon="mdi-arrow-right"
            >
              Process To Payment
            </VBtn>
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.plan-upgrade-banner {
  .plan-details {
    border: 1px solid rgb(var(--v-theme-primary));
  }
}

.card-list {
  --v-card-list-gap: 0;
}
</style>
