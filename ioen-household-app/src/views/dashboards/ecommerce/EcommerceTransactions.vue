<script setup>
import arrowGrowth from '@/assets/images/cards/arrow-growth.png'
import atmCard from '@/assets/images/cards/atm-card.png'
import creditCard from '@/assets/images/cards/credit-card.png'
import paypal from '@/assets/images/cards/paypal.png'
import wallet from '@/assets/images/cards/wallet.png'
import { kFormatter } from '@core/utils/formatters'

const transactions = [
  {
    gateway: 'Paypal',
    for: 'Freelance Work',
    amount: 2482,
    img: paypal
  },
  {
    gateway: 'Credit Card',
    for: 'Digital Ocean',
    amount: -1250,
    img: creditCard
  },
  {
    gateway: 'Mastercard',
    for: 'Netflix',
    amount: -99,
    img: atmCard
  },
  {
    gateway: 'Wallet',
    for: 'Mac\'D',
    amount: -82,
    img: wallet
  },
  {
    gateway: 'Transfer',
    for: 'Refund',
    amount: 8934,
    img: arrowGrowth
  }
]
const transactionsColors = {
  'Paypal': 'error',
  'Credit Card': 'success',
  'Mastercard': 'warning',
  'Wallet': 'primary',
  'Transfer': 'info'
}
const formateAmount = amount => {
  return Math.sign(amount) === 1 ? `+$${ kFormatter(amount) }` : `-$${ Math.abs(amount) }`
}
</script>

<template>
  <VCard>
    <!-- SECTION Card Header and Menu -->
    <VCardItem>
      <!-- 👉 Title -->
      <VCardTitle>Transactions</VCardTitle>

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

    <!-- SECTION Transactions List -->
    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="transaction in transactions"
          :key="transaction.for"
        >
          <!-- 👉 Avatar -->
          <template #prepend>
            <VAvatar
              rounded
              :color="transactionsColors[transaction.gateway]"
              variant="tonal"
              class="me-3"
            >
              <img
                width="20"
                :src="transaction.img"
                alt="transition"
              >
            </VAvatar>
          </template>

          <!-- 👉 Title and Subtitle  -->
          <VListItemTitle class="font-weight-semibold text-sm mb-1">
            {{ transaction.gateway }}
          </VListItemTitle>
          <VListItemSubtitle class="text-xs">
            {{ transaction.for }}
          </VListItemSubtitle>

          <!-- 👉 Amounts -->
          <template #append>
            <VListItemAction class="font-weight-semibold">
              <span class="text-base me-3">{{ formateAmount(transaction.amount) }}</span>
              <VIcon
                :size="24"
                :color="Math.sign(transaction.amount) === 1 ? 'success' : 'error'"
                :icon="Math.sign(transaction.amount) === 1 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              />
            </VListItemAction>
          </template>
        </VListItem>
      </VList>
    </VCardText>
    <!-- !SECTION -->
  </VCard>
</template>

 <style lang="scss" scoped>
  .card-list {
    --v-card-list-gap: 1.625rem;
  }
  </style>
