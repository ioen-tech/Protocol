<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { getRadarChartConfig } from '@core/libs/apex-chart/apexCharConfig'

const {theme} = useThemeConfig()
const vuetifyTheme = useTheme()
const series = [
  {
    name: 'iPhone 12',
    data: [
      41,
      64,
      81,
      60,
      42,
      42,
      33,
      23
    ]
  },
  {
    name: 'Samsung s20',
    data: [
      65,
      46,
      42,
      25,
      58,
      63,
      76,
      43
    ]
  }
]
const chartConfig = controlledComputed(theme, () => getRadarChartConfig(vuetifyTheme.current.value))
</script>

<template>
  <VueApexCharts
    type="radar"
    height="400"
    :options="chartConfig"
    :series="series"
  />
</template>
