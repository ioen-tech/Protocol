<script setup>
import CardWidgetsActivityTimeline from '@/views/pages/cards/card-widgets/CardWidgetsActivityTimeline.vue'
import CardWidgetsAnalytics from '@/views/pages/cards/card-widgets/CardWidgetsAnalytics.vue'
import CardWidgetsPerformance from '@/views/pages/cards/card-widgets/CardWidgetsPerformance.vue'
import CardWidgetsRevenueReport from '@/views/pages/cards/card-widgets/CardWidgetsRevenueReport.vue'
import CardWidgetsSalesOverview from '@/views/pages/cards/card-widgets/CardWidgetsSalesOverview.vue'
import CardWidgetsSalesState from '@/views/pages/cards/card-widgets/CardWidgetsSalesState.vue'
import CardWidgetsTotalProfit from '@/views/pages/cards/card-widgets/CardWidgetsTotalProfit.vue'
import CardWidgetsTotalProfitRadialBar from '@/views/pages/cards/card-widgets/CardWidgetsTotalProfitRadialBar.vue'
import CardWidgetsTotalRevenue from '@/views/pages/cards/card-widgets/CardWidgetsTotalRevenue.vue'
import CardWidgetsTotalSales from '@/views/pages/cards/card-widgets/CardWidgetsTotalSales.vue'
import CardWidgetsTotalVisitors from '@/views/pages/cards/card-widgets/CardWidgetsTotalVisitors.vue'
import CardWidgetsTotalVisits from '@/views/pages/cards/card-widgets/CardWidgetsTotalVisits.vue'
import CardWidgetsWeeklyOverview from '@/views/pages/cards/card-widgets/CardWidgetsWeeklyOverview.vue'
import CardWidgetsWeeklySales from '@/views/pages/cards/card-widgets/CardWidgetsWeeklySales.vue'
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="8"
    >
      <CardWidgetsTotalProfit />
    </VCol>

    <VCol
      cols="12"
      sm="6"
      md="4"
    >
      <CardWidgetsTotalVisitors />
    </VCol>

    <VCol
      cols="12"
      sm="6"
      md="4"
    >
      <CardWidgetsWeeklySales />
    </VCol>

    <VCol
      cols="12"
      sm="6"
      md="4"
    >
      <CardWidgetsTotalRevenue />
    </VCol>

    <VCol
      cols="12"
      sm="6"
      md="4"
    >
      <CardWidgetsWeeklyOverview />
    </VCol>

    <VCol
      cols="12"
      sm="6"
      md="4"
    >
      <CardWidgetsPerformance />
    </VCol>

    <VCol
      cols="12"
      sm="6"
      md="4"
    >
      <CardWidgetsAnalytics />
    </VCol>

    <VCol
      cols="12"
      sm="6"
      md="4"
    >
      <CardWidgetsSalesState />
    </VCol>

    <VCol
      cols="12"
      sm="6"
      md="3"
    >
      <CardWidgetsTotalProfitRadialBar />
    </VCol>

    <VCol
      cols="12"
      sm="4"
      md="3"
    >
      <CardWidgetsTotalSales />
    </VCol>

    <VCol
      cols="12"
      sm="4"
      md="3"
    >
      <CardWidgetsTotalVisits />
    </VCol>

    <VCol
      cols="12"
      sm="4"
      md="3"
    >
      <CardWidgetsRevenueReport />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <CardWidgetsActivityTimeline />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <CardWidgetsSalesOverview />
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/libs/apex-chart.scss";
</style>
