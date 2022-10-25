<script setup>
import illustration1 from '@/assets/images/cards/illustration-1.png'
import illustration2 from '@/assets/images/cards/illustration-2.png'
import illustration3 from '@/assets/images/cards/illustration-3.png'
import illustration4 from '@/assets/images/cards/illustration-4.png'
import CardStatisticsAreaCharts from '@/views/pages/cards/card-statistics/CardStatisticsAreaCharts.vue'
import CardStatisticsBarCharts from '@/views/pages/cards/card-statistics/CardStatisticsBarCharts.vue'
import CardStatisticsBarWithGapCharts from '@/views/pages/cards/card-statistics/CardStatisticsBarWithGapCharts.vue'
import CardStatisticsLineCharts from '@/views/pages/cards/card-statistics/CardStatisticsLineCharts.vue'
import CardStatisticsRadialBarCharts from '@/views/pages/cards/card-statistics/CardStatisticsRadialBarCharts.vue'
import CardStatisticsTotalProfitLineCharts from '@/views/pages/cards/card-statistics/CardStatisticsTotalProfitLineCharts.vue'
import CardStatisticsTotalSalesCharts from '@/views/pages/cards/card-statistics/CardStatisticsTotalSalesCharts.vue'
import CardStatisticsTransactions from '@/views/pages/cards/card-statistics/CardStatisticsTransactions.vue'
import CardStatisticsHorizontal from '@core/components/CardStatisticsHorizontal.vue'
import CardStatisticsVertical from '@core/components/CardStatisticsVertical.vue'
import CardStatisticsWithImages from '@core/components/CardStatisticsWithImages.vue'

const statisticsHorizontal = [
  {
    title: 'New Customers',
    color: 'primary',
    icon: 'mdi-account-outline',
    stats: 2856,
    change: -11.9
  },
  {
    title: 'Total Revenue',
    color: 'success',
    icon: 'mdi-currency-usd',
    stats: 28600,
    change: 25.8
  },
  {
    title: 'New Transactions',
    color: 'info',
    icon: 'mdi-trending-up',
    stats: 13600,
    change: -42.4
  },
  {
    title: 'Total Profit',
    color: 'warning',
    icon: 'mdi-poll',
    stats: 2856,
    change: 18.2
  }
]
const statisticsVertical = [
  {
    title: 'New Project',
    color: 'primary',
    icon: 'mdi-briefcase-variant-outline',
    stats: '862',
    change: -18,
    subtitle: 'Yearly Project'
  },
  {
    title: 'Total Profit',
    color: 'secondary',
    icon: 'mdi-poll',
    stats: '$25.6k',
    change: 42,
    subtitle: 'Weekly Project'
  },
  {
    title: 'Revenue',
    color: 'success',
    icon: 'mdi-currency-usd',
    stats: '$95.2k',
    change: 12,
    subtitle: 'Revenue Increase'
  },
  {
    title: 'Logistics',
    color: 'error',
    icon: 'mdi-truck-outline',
    stats: '44.10k',
    change: 12,
    subtitle: 'Revenue Increase'
  },
  {
    title: 'Reports',
    color: 'warning',
    icon: 'mdi-check',
    stats: '268',
    change: -8,
    subtitle: 'System Bugs'
  },
  {
    title: 'Transactions',
    color: 'info',
    icon: 'mdi-trending-up',
    stats: '12k',
    change: 32,
    subtitle: 'Daily Transactions'
  }
]
const statisticsWithImages = [
  {
    title: 'Ratings',
    subtitle: 'Year of 2021',
    stats: '13k',
    change: 38,
    image: illustration1,
    color: 'primary'
  },
  {
    title: 'Sessions',
    subtitle: 'Last Week',
    stats: '24.5k',
    change: -22,
    image: illustration2,
    color: 'secondary'
  },
  {
    title: 'Customers',
    subtitle: 'Daily Customers',
    stats: '2,856',
    change: 59,
    image: illustration3,
    color: 'info'
  },
  {
    title: 'Total Orders',
    subtitle: 'Last Month',
    stats: '42.5k',
    change: 26,
    image: illustration4,
    color: 'warning'
  }
]
</script>

<template>
  <VRow class="match-height">
    <!-- 👉 Horizontal Cards -->
    <VCol
      v-for="statistics in statisticsHorizontal"
      :key="statistics.title"
      cols="12"
      sm="6"
      md="3"
    >
      <CardStatisticsHorizontal v-bind="statistics" />
    </VCol>

    <!-- 👉 Transition Card  -->
    <VCol
      cols="12"
      md="8"
    >
      <CardStatisticsTransactions />
    </VCol>

    <!-- 👉 Total sales -->
    <VCol
      cols="12"
      md="4"
    >
      <CardStatisticsTotalSalesCharts />
    </VCol>

    <!-- 👉 Vertical Cards -->
    <VCol
      v-for="statistics in statisticsVertical"
      :key="statistics.title"
      cols="12"
      sm="4"
      lg="2"
    >
      <CardStatisticsVertical v-bind="statistics" />
    </VCol>

    <!-- 👉 Blank Column for make space above the Images cards -->
    <VCol
      cols="12"
    />

    <!-- 👉 Images Cards -->
    <VCol
      v-for="statistics in statisticsWithImages"
      :key="statistics.title"
      cols="12"
      lg="3"
      sm="6"
    >
      <CardStatisticsWithImages v-bind="statistics" />
    </VCol>

    <!-- 👉 Total Revenue Line Chart -->

    <VCol
      cols="12"
      sm="6"
      md="4"
      lg="2"
    >
      <CardStatisticsLineCharts />
    </VCol>

    <!-- 👉 Sessions Bar Chart with Gaps -->
    <VCol
      cols="12"
      sm="6"
      md="4"
      lg="2"
    >
      <CardStatisticsBarWithGapCharts />
    </VCol>

    <!-- 👉 Total Growth Area Chart -->
    <VCol
      cols="12"
      sm="6"
      md="4"
      lg="2"
    >
      <CardStatisticsAreaCharts />
    </VCol>

    <!-- 👉 Total Revenue Radial Bar Chart -->
    <VCol
      cols="12"
      sm="6"
      md="4"
      lg="2"
    >
      <CardStatisticsRadialBarCharts />
    </VCol>

    <!-- 👉 Session Bar Chart -->
    <VCol
      cols="12"
      sm="6"
      md="4"
      lg="2"
    >
      <CardStatisticsBarCharts />
    </VCol>

    <!-- 👉 Total Profit Line Chart -->
    <VCol
      cols="12"
      sm="6"
      md="4"
      lg="2"
    >
      <CardStatisticsTotalProfitLineCharts />
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/libs/apex-chart.scss";
</style>
