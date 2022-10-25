<script setup>
const statistics = [
  {
    title: 'Sales',
    stats: '245k',
    icon: 'mdi-trending-up',
    color: 'primary'
  },
  {
    title: 'Customers',
    stats: '12.5k',
    icon: 'mdi-account-outline',
    color: 'success'
  },
  {
    title: 'Product',
    stats: '1.54k',
    icon: 'mdi-cellphone-link',
    color: 'warning'
  }
]
</script>

<template>
  <VCard title="Transactions">
    <VCardText>
      <h6 class="text-sm mb-6">
        <span>Total 48.5% growth 😎</span>
        <span class="font-weight-regular"> this month</span>
      </h6>
      <VRow>
        <VCol
          v-for="item in statistics"
          :key="item.title"
          cols="12"
          sm="4"
        >
          <div class="d-flex align-center">
            <div class="me-3">
              <VAvatar
                :color="item.color"
                rounded
                size="44"
                class="elevation-1"
              >
                <VIcon
                  size="24"
                  :icon="item.icon"
                />
              </VAvatar>
            </div>

            <div class="d-flex flex-column">
              <span class="text-caption">
                {{ item.title }}
              </span>
              <span class="text-h6 font-weight-medium">{{ item.stats }}</span>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
