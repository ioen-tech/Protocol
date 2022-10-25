<script setup>
import ApexChartAreaChart from '@/views/charts/apex-chart/ApexChartAreaChart.vue'
import ApexChartBalance from '@/views/charts/apex-chart/ApexChartBalance.vue'
import ApexChartDailySalesStates from '@/views/charts/apex-chart/ApexChartDailySalesStates.vue'
import ApexChartDataScience from '@/views/charts/apex-chart/ApexChartDataScience.vue'
import ApexChartExpenseRatio from '@/views/charts/apex-chart/ApexChartExpenseRatio.vue'
import ApexChartHorizontalBar from '@/views/charts/apex-chart/ApexChartHorizontalBar.vue'
import ApexChartMobileComparison from '@/views/charts/apex-chart/ApexChartMobileComparison.vue'
import ApexChartNewTechnologiesData from '@/views/charts/apex-chart/ApexChartNewTechnologiesData.vue'
import ApexChartStatistics from '@/views/charts/apex-chart/ApexChartStatistics.vue'
import ApexChartStockPrice from '@/views/charts/apex-chart/ApexChartStockPrice.vue'
</script>

<template>
  <VRow>
    <!-- 👉  Area chart -->
    <VCol cols="12">
      <VCard>
        <VCardItem class="flex-wrap">
          <VCardTitle>Area Chart</VCardTitle>
          <VCardSubtitle>Commercial networks</VCardSubtitle>

          <template #append>
            <div class="date-picker-wrapper">
              <AppDateTimePicker
                model-value="2022-06-09"
                prepend-inner-icon="mdi-calendar-blank-outline"
                density="compact"
              />
            </div>
          </template>
        </VCardItem>

        <VCardText>
          <ApexChartAreaChart />
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Data Science -->
    <VCol cols="12">
      <VCard>
        <VCardItem class="flex-wrap">
          <VCardTitle>Data Science</VCardTitle>

          <template #append>
            <div class="date-picker-wrapper">
              <AppDateTimePicker
                model-value="2022-06-09"
                prepend-inner-icon="mdi-calendar-blank-outline"
                density="compact"
              />
            </div>
          </template>
        </VCardItem>

        <VCardText>
          <ApexChartDataScience />
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 New Technologies Data -->
    <VCol cols="12">
      <VCard>
        <VCardItem class="flex-wrap">
          <VCardTitle>New Technologies Data</VCardTitle>

          <template #append>
            <VBtnToggle
              density="compact"
              color="primary"
              variant="outlined"
              divided
            >
              <VBtn>Daily</VBtn>
              <VBtn>Monthly</VBtn>
              <VBtn>Yearly</VBtn>
            </VBtnToggle>
          </template>
        </VCardItem>

        <VCardText>
          <ApexChartNewTechnologiesData />
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Balance Line Chart  -->
    <VCol cols="12">
      <VCard>
        <VCardItem class="flex-wrap">
          <VCardTitle>Balance</VCardTitle>
          <VCardSubtitle>Commercial networks & enterprises</VCardSubtitle>

          <template #append>
            <div class="d-flex align-center">
              <h6 class="text-h6 me-3">
                $221,267
              </h6>
              <VChip
                label
                color="success"
                class="font-weight-bold"
              >
                <VIcon
                  start
                  icon="mdi-arrow-up"
                  size="15"
                />
                <span>22%</span>
              </VChip>
            </div>
          </template>
        </VCardItem>

        <VCardText>
          <ApexChartBalance />
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Balance Horizontal Bar -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard>
        <VCardItem class="flex-wrap">
          <VCardTitle>Balance</VCardTitle>
          <VCardSubtitle>$74,382.72</VCardSubtitle>

          <template #append>
            <div class="date-picker-wrapper">
              <AppDateTimePicker
                model-value="2022-06-09"
                prepend-inner-icon="mdi-calendar-blank-outline"
                density="compact"
              />
            </div>
          </template>
        </VCardItem>

        <VCardText>
          <ApexChartHorizontalBar />
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Stock Price Chart -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard>
        <VCardItem>
          <VCardTitle>Stocks Prices</VCardTitle>
          <VCardSubtitle>$50,863.98</VCardSubtitle>

          <template #append>
            <div class="date-picker-wrapper">
              <AppDateTimePicker
                model-value="2022-06-09"
                prepend-inner-icon="mdi-calendar-blank-outline"
                density="compact"
              />
            </div>
          </template>
        </VCardItem>

        <VCardText>
          <ApexChartStockPrice />
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Daily Sales States -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Daily Sales States">
        <VCardText>
          <ApexChartDailySalesStates />
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Statistics -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Statistics">
        <VCardText>
          <ApexChartStatistics />
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Mobile Comparison -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Mobile Comparison">
        <VCardText>
          <ApexChartMobileComparison />
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Expense Ratio Chart -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard
        title="Expense Ratio"
        subtitle="Spending on various categories"
      >
        <VCardText>
          <ApexChartExpenseRatio />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/libs/apex-chart.scss";

.date-picker-wrapper {
  inline-size: 10.5rem;
}
</style>
