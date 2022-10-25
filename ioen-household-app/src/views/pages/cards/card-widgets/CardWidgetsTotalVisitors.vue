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
  const secondaryTextColor = `rgba(${ hexToRgb(currentTheme.value['on-surface']) },${ variableTheme.value['medium-emphasis-opacity'] })`
  const primaryTextColor = `rgba(${ hexToRgb(currentTheme.value['on-surface']) },${ variableTheme.value['high-emphasis-opacity'] })`
  
  return {
    colors: [
      currentTheme.value.primary,
      `rgba(${ hexToRgb(currentTheme.value.primary) }, 0.7)`,
      `rgba(${ hexToRgb(currentTheme.value.primary) }, 0.5)`,
      currentTheme.value.background
    ],
    stroke: { width: 0 },
    dataLabels: { enabled: false },
    legend: {
      show: true,
      position: 'bottom',
      labels: { colors: secondaryTextColor }
    },
    labels: [
      'FR',
      'UK',
      'ESP',
      'USA'
    ],
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } }
    },
    plotOptions: {
      pie: {
        customScale: 0.9,
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              offsetY: 25,
              color: secondaryTextColor
            },
            value: {
              offsetY: -15,
              fontWeight: 600,
              color: primaryTextColor,
              formatter: value => `${ value }%`
            },
            total: {
              show: true,
              label: 'Weekly Visits',
              fontSize: '12px',
              color: secondaryTextColor,
              formatter: value => `${ value.globals.seriesTotals.reduce((total, num) => total + num) }%`
            }
          }
        }
      }
    }
  }
})
const series = [
  12,
  25,
  13,
  50
]
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Total Visitors</VCardTitle>
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
        type="donut"
        :options="options"
        :series="series"
        :height="292"
      />
    </VCardText>
  </VCard>
</template>

