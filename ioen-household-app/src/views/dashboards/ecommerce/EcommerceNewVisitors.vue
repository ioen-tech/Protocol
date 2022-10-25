<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { hexToRgb } from '@layouts/utils'

const vuetifyTheme = useTheme()
const currentTheme = vuetifyTheme.current.value.colors
const series = [{
  data: [
    40,
    60,
    50,
    60,
    90,
    40,
    50
  ]
}]
const options = {
  chart: {
    parentHeightOffset: 0,
    toolbar: { show: false }
  },
  grid: {
    show: false,
    padding: {
      top: -5,
      left: -10,
      right: -7,
      bottom: -12
    }
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      distributed: true,
      columnWidth: '60%',
      endingShape: 'rounded',
      startingShape: 'rounded'
    }
  },
  legend: { show: false },
  dataLabels: { enabled: false },
  colors: [
    `rgba(${ hexToRgb(currentTheme.primary) },0.1)`,
    `rgba(${ hexToRgb(currentTheme.primary) },0.1)`,
    `rgba(${ hexToRgb(currentTheme.primary) },0.1)`,
    `rgba(${ hexToRgb(currentTheme.primary) },0.1)`,
    `rgba(${ hexToRgb(currentTheme.primary) },0.1)`,
    currentTheme.primary,
    `rgba(${ hexToRgb(currentTheme.primary) },0.1)`,
    `rgba(${ hexToRgb(currentTheme.primary) },0.1)`
  ],
  states: {
    hover: { filter: { type: 'none' } },
    active: { filter: { type: 'none' } }
  },
  xaxis: {
    tickPlacement: 'on',
    labels: { show: false },
    axisTicks: { show: false },
    axisBorder: { show: false },
    categories: [
      'S',
      'M',
      'T',
      'W',
      'T',
      'F',
      'S'
    ]
  },
  yaxis: { show: false },
  tooltip: { enabled: false }
}
</script>

<template>
  <VCard>
    <VRow no-gutters>
      <VCol cols="6">
        <VCardItem>
          <VCardTitle>New Visitors</VCardTitle>
        </VCardItem>

        <VCardText class="pt-3">
          <p class="text-xs mb-1">
            48% new visitors
          </p>
          <p>this week.</p>

          <div class="d-flex align-center">
            <h6 class="text-h6">
              12,480
            </h6>
            <VIcon
              icon="mdi-chevron-up"
              color="success"
            />
            <span class="text-success font-weight-semibold">28</span>
          </div>
        </VCardText>
      </VCol>

      <VCol cols="6">
        <VCardText>
          <VueApexCharts
            type="bar"
            :options="options"
            :series="series"
            :height="144"
          />
        </VCardText>
      </VCol>
    </VRow>
  </VCard>
</template>
