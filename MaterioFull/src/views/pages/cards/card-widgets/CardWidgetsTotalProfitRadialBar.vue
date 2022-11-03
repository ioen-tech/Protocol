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
  const primaryTextColor = `rgba(${ hexToRgb(currentTheme.value['on-surface']) },${ variableTheme.value['high-emphasis-opacity'] })`
  
  return {
    chart: { sparkline: { enabled: true } },
    stroke: { dashArray: 5 },
    colors: [currentTheme.value.primary],
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } }
    },
    plotOptions: {
      radialBar: {
        endAngle: 90,
        startAngle: -90,
        hollow: { size: '55%' },
        track: { background: currentTheme.value.background },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: -5,
            fontSize: '20px',
            fontWeight: 500,
            color: primaryTextColor,
            formatter: val => {
              const num = val * 35250 / 100
              
              return num > 999 ? `${ (num / 1000).toFixed(1) }k` : `${ num }`
            }
          }
        }
      }
    }
  }
})
const series = [80]
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Total Profit</VCardTitle>

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

    <VCardText class="text-center">
      <VueApexCharts
        type="radialBar"
        :options="options"
        :series="series"
        :height="243"
      />

      <div class="mt-16">
        <p class="text-xs mb-2 mt-4">
          18k new sales
        </p>
        <VChip
          color="primary"
          size="small"
        >
          This Year
        </VChip>
      </div>
    </VCardText>
  </VCard>
</template>
