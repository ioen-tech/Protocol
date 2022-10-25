<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { getDonutChartConfig } from '@core/libs/apex-chart/apexCharConfig'

const {theme} = useThemeConfig()
const vuetifyTheme = useTheme()
const expenseRationChartConfig = controlledComputed(theme, () => getDonutChartConfig(vuetifyTheme.current.value))
const series = [
  85,
  16,
  50,
  50
]
</script>

<template>
  <VueApexCharts
    type="donut"
    height="410"
    :options="expenseRationChartConfig"
    :series="series"
  />
</template>
