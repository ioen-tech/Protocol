<script setup>
import VueApexCharts from 'vue3-apexcharts'
import {
  useDisplay,
  useTheme
} from 'vuetify'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { hexToRgb } from '@layouts/utils'

const vuetifyTheme = useTheme()
const {theme} = useThemeConfig()
const {thresholds} = useDisplay()
const options = controlledComputed(theme, () => {
  const currentTheme = ref(vuetifyTheme.current.value.colors)
  const variableTheme = ref(vuetifyTheme.current.value.variables)
  const borderColor = `rgba(${ hexToRgb(String(variableTheme.value['border-color'])) },${ variableTheme.value['border-opacity'] })`
  
  return {
    chart: {
      offsetY: -25,
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '35%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    legend: { show: false },
    grid: {
      borderColor,
      strokeDashArray: 10,
      padding: {
        left: -15,
        right: -5
      }
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 6,
      curve: 'smooth',
      lineCap: 'round',
      colors: [currentTheme.value.surface]
    },
    colors: [
      currentTheme.value.success,
      currentTheme.value.secondary,
      currentTheme.value.warning
    ],
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      crosshairs: { opacity: 0 },
      axisBorder: { show: false }
    },
    yaxis: { labels: { show: false } },
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } }
    },
    responsive: [
      {
        breakpoint: thresholds.value.xl,
        options: { plotOptions: { bar: { columnWidth: '40%' } } }
      },
      {
        breakpoint: thresholds.value.lg,
        options: { plotOptions: { bar: { columnWidth: '50%' } } }
      },
      {
        breakpoint: thresholds.value.sm,
        options: { plotOptions: { bar: { columnWidth: '35%' } } }
      },
      {
        breakpoint: 430,
        options: { plotOptions: { bar: { columnWidth: '45%' } } }
      }
    ]
  }
})
const series = [
  {
    name: 'Product A',
    data: [
      16000,
      12000,
      16000,
      18000,
      15000,
      35000,
      16000
    ]
  },
  {
    name: 'Product B',
    data: [
      10000,
      12000,
      10000,
      0,
      10000,
      10000,
      10000
    ]
  },
  {
    name: 'Product C',
    data: [
      0,
      15000,
      0,
      0,
      12000,
      0,
      10000
    ]
  }
]
const analytics = [
  {
    title: 'Revenue',
    amount: '$845k',
    percentage: '82%',
    profit: true
  },
  {
    title: 'Transactions',
    amount: '$12.5k',
    percentage: '52%',
    profit: false
  },
  {
    title: 'Total Profit',
    amount: '$27.6k',
    percentage: '42%',
    profit: true
  }
]
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Analytics</VCardTitle>

      <template #append>
        <div class="me-n3">
          <VBtn
            icon
            size="x-small"
            color="default"
            variant="text"
          >
            <VIcon
              size="24"
              icon="mdi-dots-vertical"
            />
          </VBtn>
        </div>
      </template>
    </VCardItem>

    <VCardText>
      <VueApexCharts
        type="bar"
        :options="options"
        :series="series"
        :height="210"
      />

      <div
        v-for="(item, index) in analytics"
        :key="item.title"
        class="d-flex align-center"
        :class="index > 0 ? 'mt-3' : ''"
      >
        <h6 class="text-sm font-weight-semibold">
          {{ item.title }}
        </h6>
        <VSpacer />
        <p class="me-6 mb-0">
          {{ item.amount }}
        </p>
        <h6 class="text-sm font-weight-semibold me-6">
          {{ item.percentage }}
        </h6>
        <VIcon
          :color="item.profit ? 'success' : 'error'"
          :icon="item.profit ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        />
      </div>
    </VCardText>
  </VCard>
</template>
