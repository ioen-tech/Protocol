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
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityTo: 0.2,
        opacityFrom: 1,
        shadeIntensity: 0,
        type: 'horizontal',
        stops: [
          0,
          100,
          100
        ]
      }
    },
    stroke: {
      width: 5,
      curve: 'smooth',
      lineCap: 'round'
    },
    legend: { show: false },
    colors: [currentTheme.value.success],
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
        bottom: -10
      }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun'
      ],
      labels: { style: { colors: disabledColor } }
    },
    yaxis: { labels: { show: false } },
    tooltip: { enabled: false }
  }
})
const series = [{
  name: 'Total Sales',
  data: [
    0,
    258,
    30,
    240,
    150,
    400
  ]
}]
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>
        <p class="mb-0">
          Total Sales
        </p>
        <p class="mb-0">
          $21,845
        </p>
      </VCardTitle>

      <template #append>
        <div class="mt-n7 me-n3">
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
        type="line"
        :options="options"
        :series="series"
        :height="206"
      />
    </VCardText>
  </VCard>
</template>
