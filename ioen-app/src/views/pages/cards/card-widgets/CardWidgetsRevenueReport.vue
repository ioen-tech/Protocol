<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { hexToRgb } from '@layouts/utils'

const vuetifyTheme = useTheme()
const {theme} = useThemeConfig()
const options = controlledComputed(theme, () => {
  const currentTheme = ref(vuetifyTheme.current.value.colors)
  const variableTheme = ref(vuetifyTheme.current.value.variables)
  const disabledColor = `rgba(${ hexToRgb(currentTheme.value['on-surface']) },${ variableTheme.value['disabled-opacity'] })`
  
  return {
    chart: {
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    grid: {
      yaxis: { lines: { show: false } },
      padding: {
        left: 0,
        right: 0
      }
    },
    legend: {
      offsetY: 8,
      markers: { radius: 15 },
      labels: { colors: disabledColor }
    },
    stroke: {
      width: 2,
      colors: [currentTheme.value.surface]
    },
    dataLabels: { enabled: false },
    colors: [
      currentTheme.value.success,
      currentTheme.value.secondary
    ],
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '50%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } }
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep'
      ],
      crosshairs: { opacity: 0 },
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: { labels: { show: false } },
    tooltip: { enabled: false }
  }
})
const series = [
  {
    name: 'Earning',
    data: [
      95,
      177,
      284,
      256,
      105,
      63,
      168,
      218,
      72
    ]
  },
  {
    name: 'Expense',
    data: [
      -145,
      -80,
      -60,
      -180,
      -100,
      -60,
      -85,
      -75,
      -100
    ]
  }
]
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Revenue Report</VCardTitle>

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
        :height="240"
      />
    </VCardText>
  </VCard>
</template>
