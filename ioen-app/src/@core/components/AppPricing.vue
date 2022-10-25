<script setup>
import tree1 from '@/assets/images/misc/pricing-tree-1.png'
import tree2 from '@/assets/images/misc/pricing-tree-2.png'
import tree3 from '@/assets/images/misc/pricing-tree-3.png'

const props = defineProps({
  xs: {
    type: [
      Number,
      String
    ],
    required: false
  },
  sm: {
    type: [
      Number,
      String
    ],
    required: false
  },
  md: {
    type: [
      String,
      Number
    ],
    required: false
  },
  lg: {
    type: [
      String,
      Number
    ],
    required: false
  },
  xl: {
    type: [
      String,
      Number
    ],
    required: false
  }
})

const annualMonthlyPlanPriceToggler = ref(true)
const pricingPlans = [
  {
    name: 'Basic',
    tagLine: 'A simple start for everyone',
    logo: tree1,
    monthlyPrice: 0,
    yearlyPrice: 0,
    isPopular: false,
    current: true,
    features: [
      '100 responses a month',
      'Unlimited forms and surveys',
      'Unlimited fields',
      'Basic form creation tools',
      'Up to 2 subdomains'
    ]
  },
  {
    name: 'Standard',
    tagLine: 'For small to medium businesses',
    logo: tree2,
    monthlyPrice: 42,
    yearlyPrice: 460,
    isPopular: true,
    current: false,
    features: [
      'Unlimited responses',
      'Unlimited forms and surveys',
      'Instagram profile page',
      'Google Docs integration',
      'Custom “Thank you” page'
    ]
  },
  {
    name: 'Enterprise',
    tagLine: 'Solution for big organizations',
    logo: tree3,
    monthlyPrice: 84,
    yearlyPrice: 690,
    isPopular: false,
    current: false,
    features: [
      'PayPal payments',
      'Logic Jumps',
      'File upload with 5GB storage',
      'Custom domain support',
      'Stripe integration'
    ]
  }
]
</script>

<template>
  <!-- 👉 Title and subtitle -->
  <div class="text-center">
    <h4 class="text-h4 pricing-title mb-4">
      Pricing Plans
    </h4>
    <p class="mb-0">
      All plans include 40+ advanced tools and features to boost your product.
    </p>
    <p>Choose the best plan to fit your needs.</p>
  </div>

  <!-- 👉 Annual and monthly price toggler -->
  <div class="d-flex align-center justify-center mx-auto mb-10">
    <VLabel
      for="pricing-plan-toggle"
      class="me-2 mb-2"
    >
      Monthly
    </VLabel>

    <div>
      <VSwitch
        id="pricing-plan-toggle"
        v-model="annualMonthlyPlanPriceToggler"
        label="Annual"
      />
    </div>
  </div>

  <!-- SECTION pricing plans -->
  <VRow>
    <VCol
      v-for="plan in pricingPlans"
      :key="plan.logo"
      v-bind="props"
      cols="12"
    >
      <!-- 👉  Card -->
      <VCard
        flat
        border
        :class="plan.isPopular ? 'border-primary border-opacity-100' : ''"
      >
        <VCardText
          style="height: 4.125rem;"
          class="text-end"
        >
          <!-- 👉 Popular -->
          <VChip
            v-show="plan.isPopular"
            color="primary"
            size="small"
          >
            Popular
          </VChip>
        </VCardText>

        <!-- 👉 Plan logo -->
        <VCardText class="text-center">
          <VImg
            :height="120"
            :src="plan.logo"
            class="mx-auto mb-5"
          />

          <!-- 👉 Plan name -->
          <h5 class="text-h5 mb-2">
            {{ plan.name }}
          </h5>
          <p class="mb-0">
            {{ plan.tagLine }}
          </p>
        </VCardText>

        <!-- 👉 Plan price  -->
        <VCardText class="position-relative text-center">
          <div class="d-flex justify-center align-center">
            <sup class="text-sm font-weight-medium me-1">$</sup>
            <h1 class="text-5xl font-weight-medium text-primary">
              {{ annualMonthlyPlanPriceToggler ? Math.floor(Number(plan.yearlyPrice) / 12) : plan.monthlyPrice }}
            </h1>
            <sub class="text-sm font-weight-medium ms-1 mt-4">/month</sub>
          </div>

          <!-- 👉 Annual Price -->
          <span
            v-show="annualMonthlyPlanPriceToggler"
            class="position-absolute text-xs text-disabled"
            style="inset-inline: 0;"
          >
            {{ plan.yearlyPrice === 0 ? 'free' : `USD ${plan.yearlyPrice}/Year` }}
          </span>
        </VCardText>

        <!-- 👉 Plan features -->
        <VCardText class="pt-2">
          <VList class="card-list">
            <VListItem
              v-for="feature in plan.features"
              :key="feature"
            >
              <template #prepend>
                <VIcon
                  :size="14"
                  icon="mdi-circle-outline"
                  class="me-3"
                />
              </template>

              <VListItemTitle class="text-body-2">
                {{ feature }}
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <!-- 👉 Plan actions -->
        <VCardActions>
          <VBtn
            block
            :color="plan.current ? 'success' : 'primary'"
            :variant="plan.isPopular ? 'elevated' : 'tonal'"
          >
            {{ plan.yearlyPrice === 0 ? 'Your Current Plan' : 'Upgrade' }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VCol>
  </VRow>
  <!-- !SECTION  -->
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.75rem;
}
</style>
