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
  const disabledColor = `rgba(${ hexToRgb(currentTheme.value['on-surface']) },${ variableTheme.value['disabled-opacity'] })`
  const borderColor = `rgba(${ hexToRgb(String(variableTheme.value['border-color'])) },${ variableTheme.value['border-opacity'] })`
  
  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    colors: [
      currentTheme.value.primary,
      currentTheme.value.info
    ],
    plotOptions: {
      radar: {
        size: 110,
        polygons: {
          strokeColors: borderColor,
          connectorColors: borderColor
        }
      }
    },
    legend: { labels: { colors: secondaryTextColor } },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: [
          currentTheme.value.primary,
          currentTheme.value.info
        ],
        shadeIntensity: 1,
        type: 'vertical',
        opacityFrom: 1,
        opacityTo: 0.9,
        stops: [
          0,
          100
        ]
      }
    },
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun'
    ],
    markers: { size: 0 },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontSize: '14px',
          colors: [
            disabledColor,
            disabledColor,
            disabledColor,
            disabledColor,
            disabledColor,
            disabledColor
          ]
        }
      }
    },
    yaxis: { show: false },
    grid: { show: false }
  }
})
const series = [
  {
    name: 'Income',
    data: [
      70,
      90,
      90,
      90,
      80,
      90
    ]
  },
  {
    name: 'Net Worth',
    data: [
      118,
      80,
      100,
      80,
      100,
      80
    ]
  }
]
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Performance</VCardTitle>

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
        type="radar"
        :options="options"
        :series="series"
        :height="295"
      />
    </VCardText>
  </VCard>
</template>
