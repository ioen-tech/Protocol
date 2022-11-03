<script setup>
import illustration1 from '@/assets/images/cards/illustration-1.png'
import illustration2 from '@/assets/images/cards/illustration-2.png'
import CrmActivityTimeline from '@/views/dashboards/crm/CrmActivityTimeline.vue'
import CrmAreaCharts from '@/views/dashboards/crm/CrmAreaCharts.vue'
import CrmDeveloperMeetup from '@/views/dashboards/crm/CrmDeveloperMeetup.vue'
import CrmMeetingSchedule from '@/views/dashboards/crm/CrmMeetingSchedule.vue'
import CrmRevenueReport from '@/views/dashboards/crm/CrmRevenueReport.vue'
import CrmSalesOverview from '@/views/dashboards/crm/CrmSalesOverview.vue'
import CrmTotalSales from '@/views/dashboards/crm/CrmTotalSales.vue'
import CrmTransactions from '@/views/dashboards/crm/CrmTransactions.vue'
import CrmUpgradeYourPlan from '@/views/dashboards/crm/CrmUpgradeYourPlan.vue'
import CrmWeeklySales from '@/views/dashboards/crm/CrmWeeklySales.vue'
import CardStatisticsWithImages from '@core/components/CardStatisticsWithImages.vue'

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
  }
]
const statistic = {
  title: 'New Project',
  color: 'primary',
  icon: 'mdi-briefcase-variant-outline',
  stats: '862',
  change: -18,
  subtitle: 'Yearly Project'
}
</script>

<template>
  <section>
    <VRow class="mb-2">
      <VCol
        v-for="statistics in statisticsWithImages"
        :key="statistics.title"
        cols="12"
        md="3"
        sm="6"
        class="d-flex flex-column align-self-end"
      >
        <CardStatisticsWithImages v-bind="statistics" />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <CrmTransactions />
      </VCol>

      <VCol
        cols="12"
        sm="6"
        md="3"
      >
        <CrmTotalSales />
      </VCol>

      <VCol
        cols="12"
        sm="6"
        md="3"
      >
        <CrmRevenueReport />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <CrmSalesOverview />
      </VCol>
    </VRow>

    <VRow class="match-height">
      <VCol
        cols="12"
        md="6"
      >
        <CrmActivityTimeline />
      </VCol>

      <VCol
        cols="12"
        md="4"
        sm="8"
      >
        <CrmWeeklySales />
      </VCol>

      <VCol
        cols="12"
        md="2"
        sm="4"
      >
        <VRow>
          <VCol
            cols="6"
            sm="12"
          >
            <CrmAreaCharts />
          </VCol>

          <VCol
            cols="6"
            sm="12"
          >
            <CardStatisticsVertical v-bind="statistic" />
          </VCol>
        </VRow>
      </VCol>

      <VCol
        cols="12"
        md="4"
      >
        <CrmUpgradeYourPlan />
      </VCol>

      <VCol
        cols="12"
        md="4"
      >
        <CrmMeetingSchedule />
      </VCol>

      <VCol
        cols="12"
        md="4"
      >
        <CrmDeveloperMeetup />
      </VCol>
    </VRow>
  </section>
</template>

