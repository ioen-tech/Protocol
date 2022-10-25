<script setup>
import CardAdvanceActivityTimeline from '@/views/pages/cards/card-advance/CardActivityTimeline.vue'
import CardAdvanceAnalytics from '@/views/pages/cards/card-advance/CardAdvanceAnalytics.vue'
import CardAdvanceCafeBadilico from '@/views/pages/cards/card-advance/CardAdvanceCafeBadilico.vue'
import CardAdvanceDepositWithdraw from '@/views/pages/cards/card-advance/CardAdvanceDepositWithdraw.vue'
import CardAdvanceDeveloperMeetup from '@/views/pages/cards/card-advance/CardAdvanceDeveloperMeetup.vue'
import CardAdvanceFinanceSummary from '@/views/pages/cards/card-advance/CardAdvanceFinanceSummary.vue'
import CardAdvanceMeetingSchedule from '@/views/pages/cards/card-advance/CardAdvanceMeetingSchedule.vue'
import CardAdvanceSalesByCountries from '@/views/pages/cards/card-advance/CardAdvanceSalesByCountries.vue'
import CardAdvanceTeamMembers from '@/views/pages/cards/card-advance/CardAdvanceTeamMembers.vue'
import CardAdvanceTotalEarning from '@/views/pages/cards/card-advance/CardAdvanceTotalEarning.vue'
import CardAdvanceTransactions from '@/views/pages/cards/card-advance/CardAdvanceTransactions.vue'
import CardAdvanceUpgradeYourPlan from '@/views/pages/cards/card-advance/CardAdvanceUpgradeYourPlan.vue'
import CardAdvanceWebsiteStatistics from '@/views/pages/cards/card-advance/CardAdvanceWebsiteStatistics.vue'
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <CardAdvanceTransactions />
    </VCol>

    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <CardAdvanceUpgradeYourPlan />
    </VCol>

    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <CardAdvanceMeetingSchedule />
    </VCol>

    <VCol
      cols="12"
      md="6"
      lg="5"
    >
      <CardAdvanceTeamMembers />
    </VCol>

    <VCol
      cols="12"
      lg="7"
    >
      <CardAdvanceDepositWithdraw />
    </VCol>

    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <CardAdvanceTotalEarning />
    </VCol>

    <VCol
      cols="12"
      md="6"
      lg="5"
    >
      <CardAdvanceFinanceSummary />
    </VCol>

    <VCol
      cols="12"
      md="6"
      lg="3"
    >
      <CardAdvanceAnalytics />
    </VCol>

    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <CardAdvanceWebsiteStatistics />
    </VCol>

    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <CardAdvanceDeveloperMeetup />
    </VCol>

    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <CardAdvanceSalesByCountries />
    </VCol>

    <VCol
      cols="12"
      md="8"
    >
      <CardAdvanceActivityTimeline />
    </VCol>

    <VCol
      cols="12"
      md="4"
    >
      <CardAdvanceCafeBadilico />
    </VCol>
  </VRow>
</template>
