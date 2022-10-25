<script setup>
import EcommerceBillingTable from '@/views/dashboards/ecommerce/EcommerceBillingTable.vue'
import EcommerceCongratulations from '@/views/dashboards/ecommerce/EcommerceCongratulations.vue'
import EcommerceLineCharts from '@/views/dashboards/ecommerce/EcommerceLineCharts.vue'
import EcommerceMeetingSchedule from '@/views/dashboards/ecommerce/EcommerceMeetingSchedule.vue'
import EcommerceNewVisitors from '@/views/dashboards/ecommerce/EcommerceNewVisitors.vue'
import EcommerceRadialBarCharts from '@/views/dashboards/ecommerce/EcommerceRadialBarCharts.vue'
import EcommerceTotalProfit from '@/views/dashboards/ecommerce/EcommerceTotalProfit.vue'
import EcommerceTotalSalesCharts from '@/views/dashboards/ecommerce/EcommerceTotalSalesCharts.vue'
import EcommerceTransactions from '@/views/dashboards/ecommerce/EcommerceTransactions.vue'
import EcommerceWebsiteStatistics from '@/views/dashboards/ecommerce/EcommerceWebsiteStatistics.vue'

const statisticsVertical = [
  {
    title: 'Transactions',
    color: 'info',
    icon: 'mdi-trending-up',
    stats: '1.2k',
    change: 38,
    subtitle: 'Daily Transactions'
  },
  {
    title: 'Revenue',
    color: 'success',
    icon: 'mdi-currency-usd',
    stats: '$95.2k',
    change: 12,
    subtitle: 'Revenue Increase'
  }
]
const statisticsVerticalTwo = [
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
  }
]
</script>

<template>
  <VRow class="match-height">
    <VCol
      cols="12"
      md="6"
      lg="8"
      class="d-flex flex-column align-self-end"
    >
      <EcommerceCongratulations />
    </VCol>

    <VCol
      v-for="statistics in statisticsVertical"
      :key="statistics.title"
      cols="12"
      sm="6"
      md="3"
      lg="2"
    >
      <CardStatisticsVertical v-bind="statistics" />
    </VCol>

    <VCol
      cols="12"
      md="8"
    >
      <EcommerceTotalProfit />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <VRow>
        <VCol cols="12">
          <EcommerceTotalSalesCharts />
        </VCol>
        <VCol cols="6">
          <EcommerceLineCharts />
        </VCol>
        <VCol cols="6">
          <EcommerceRadialBarCharts />
        </VCol>
      </VRow>
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <EcommerceTransactions />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <VRow>
        <VCol
          v-for="statistics in statisticsVerticalTwo"
          :key="statistics.title"
          cols="6"
        >
          <CardStatisticsVertical v-bind="statistics" />
        </VCol>

        <VCol cols="12">
          <EcommerceNewVisitors />
        </VCol>
      </VRow>
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <EcommerceWebsiteStatistics />
    </VCol>

    <VCol
      cols="12"
      md="8"
    >
      <EcommerceBillingTable />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <EcommerceMeetingSchedule />
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/libs/apex-chart.scss";
</style>
