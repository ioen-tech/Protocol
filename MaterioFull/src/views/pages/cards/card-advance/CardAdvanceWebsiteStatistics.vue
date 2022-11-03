<script setup>
import VueApexCharts from 'vue3-apexcharts'

const chartOptions = {
  chart: {
    type: 'bar',
    parentHeightOffset: 0,
    toolbar: { show: false },
    sparkline: { enabled: true }
  },
  grid: { show: false },
  colors: ['rgba(var(--v-theme-primary))'],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '30%',
      startingShape: 'rounded',
      endingShape: 'rounded',
      borderRadius: 4
    }
  },
  legend: { show: false },
  dataLabels: { enabled: false },
  xaxis: {
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: { show: false },
  tooltip: { enabled: false }
}
const series = [{
  name: '2020',
  data: [
    50,
    40,
    110,
    80,
    40,
    60,
    40
  ]
}]
const websiteStatistics = [
  {
    title: 'Direct',
    color: 'success',
    traffic: '86,471',
    percentage: '-15'
  },
  {
    title: 'Organic Search',
    color: 'primary',
    traffic: '57,484',
    percentage: '+85'
  },
  {
    title: 'Referral',
    color: 'warning',
    traffic: '2,534',
    percentage: '+48'
  },
  {
    title: 'Mail',
    color: 'error',
    traffic: '977',
    percentage: '-36'
  },
  {
    title: 'Social',
    color: 'info',
    traffic: '92',
    percentage: '+55'
  },
  {
    title: 'Other',
    color: 'secondary',
    traffic: '28',
    percentage: '+12'
  }
]
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Transactions</VCardTitle>

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

    <VCardText class="pt-3">
      <div class="d-flex align-center justify-space-between mb-4">
        <div>
          <h3 class="text-h3">
            4,590
          </h3>
          <span>Total Traffic</span>
        </div>
        <div style="max-width: 7.5rem; height: 5rem;">
          <VueApexCharts
            :options="chartOptions"
            :series="series"
          />
        </div>
      </div>

      <div
        v-for="data in websiteStatistics"
        :key="data.title"
        class="statistics-table d-flex align-center"
      >
        <VBadge
          :color="data.color"
          variant="elevated"
          class="badge-size"
        />

        <h6 class="text-sm font-weight-regular">
          {{ data.title }}
        </h6>
        <VSpacer />
        <h6 class="text-sm font-weight-semibold me-6">
          {{ data.traffic }}
        </h6>
        <h6 class="text-sm font-weight-semibold me-1">
          {{ data.percentage.slice(1) }}%
        </h6>
        <VIcon
          :size="24"
          :color="data.percentage.charAt(0) === '+' ? 'success' : 'error'"
        >
          {{ data.percentage.charAt(0) === '+' ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
        </VIcon>
      </div>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.chart-wrapper {
  max-inline-size: 130px;
}

.statistics-table {
  border-block-start: solid 1px rgba(var(--v-border-color), var(--v-border-opacity));
  padding-block: 0.6rem;

  .badge-size {
    block-size: 0.4375rem;
    inline-size: 0.75rem;
    margin-inline-end: 0.8rem;

    .v-badge__badge {
      block-size: 0.8125rem;
      min-inline-size: 0.8125rem;
    }
  }
}
</style>
