<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { hexToRgb } from '@layouts/utils'

const vuetifyTheme = useTheme()
const {theme} = useThemeConfig()
const currentTheme = controlledComputed(theme, () => {
  return vuetifyTheme.current.value.colors
})
const variableTheme = controlledComputed(theme, () => {
  return vuetifyTheme.current.value.variables
})
const chartOptions = controlledComputed(theme, () => {
  return {
    chart: {
      sparkline: { enabled: true },
      animations: { enabled: false }
    },
    stroke: {
      width: 6,
      colors: [currentTheme.value.surface]
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    colors: [
      currentTheme.value.primary,
      currentTheme.value.info,
      currentTheme.value.warning,
      currentTheme.value.error
    ],
    grid: {
      padding: {
        top: -7,
        bottom: 5
      }
    },
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } }
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '75%',
          labels: {
            show: true,
            name: {
              offsetY: -2,
              formatter: () => '28%'
            },
            value: {
              offsetY: 2,
              fontSize: '12px',
              color: `rgba(${ hexToRgb(currentTheme.value['on-surface']) },${ variableTheme.value['medium-emphasis-opacity'] })`,
              formatter: () => '1 Quarter'
            },
            total: {
              show: true,
              label: '18%',
              fontSize: '20px',
              fontWeight: 500,
              color: `rgba(${ hexToRgb(currentTheme.value['on-surface']) },${ variableTheme.value['high-emphasis-opacity'] })`,
              formatter: () => '1 Quarter'
            }
          }
        }
      }
    }
  }
})
</script>

<template>
  <VCard>
    <VCardText class="d-flex justify-space-between align-center gap-3">
      <div>
        <h6 class="text-h6 mb-5">
          Total Sales
        </h6>

        <span class="text-xs">Calculated in last 7 days</span>
        <div class="d-flex align-center">
          <h6 class="text-h6">
            $25,980
          </h6>
          <span class="text-success text-xs text-no-wrap">
            <VIcon icon="mdi-chevron-up" />
            <span>15.6%</span>
          </span>
        </div>
      </div>

      <VueApexCharts
        type="donut"
        :options="chartOptions"
        :series="[80, 22, 30, 50]"
        :height="120"
        :width="110"
      />
    </VCardText>
  </VCard>
</template>
