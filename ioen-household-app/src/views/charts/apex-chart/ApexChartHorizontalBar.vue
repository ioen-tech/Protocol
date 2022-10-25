<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { getBarChartConfig } from '@core/libs/apex-chart/apexCharConfig'

const {theme} = useThemeConfig()
const vuetifyTheme = useTheme()
const horizontalBarChartConfig = controlledComputed(theme, () => getBarChartConfig(vuetifyTheme.current.value))
const series = [{
  data: [
    700,
    350,
    480,
    600,
    210,
    550,
    150
  ]
}]
</script>

<template>
  <VueApexCharts
    type="bar"
    height="400"
    :options="horizontalBarChartConfig"
    :series="series"
  />
</template>
