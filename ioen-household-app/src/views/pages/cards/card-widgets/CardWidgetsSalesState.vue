<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { useThemeConfig } from '@core/composable/useThemeConfig'

const vuetifyTheme = useTheme()
const {theme} = useThemeConfig()
const options = controlledComputed(theme, () => {
  const currentTheme = ref(vuetifyTheme.current.value.colors)
  
  return {
    chart: {
      offsetY: -30,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 5,
      curve: 'smooth'
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        top: -40,
        right: 0
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityTo: 0.7,
        opacityFrom: 0.5,
        shadeIntensity: 1,
        stops: [
          0,
          90,
          100
        ],
        colorStops: [[
          {
            offset: 0,
            opacity: 0.6,
            color: currentTheme.value.primary
          },
          {
            offset: 100,
            opacity: 0.1,
            color: currentTheme.value.surface
          }
        ]]
      }
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: 'light',
        shadeIntensity: 1,
        color: currentTheme.value.primary
      }
    },
    xaxis: {
      type: 'numeric',
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: { show: false },
    markers: {
      size: 1,
      offsetY: 1,
      offsetX: -10,
      strokeWidth: 5,
      colors: ['transparent'],
      strokeColors: 'transparent',
      discrete: [{
        size: 8,
        seriesIndex: 0,
        dataPointIndex: 5,
        strokeColor: currentTheme.value.primary,
        fillColor: currentTheme.value.surface
      }]
    }
  }
})
const series = [{
  name: 'Traffic Rate',
  data: [
    300,
    450,
    350,
    600,
    500,
    700
  ]
}]
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Sales State</VCardTitle>
      <VCardSubtitle>Total $42,580 Sales</VCardSubtitle>

      <template #append>
        <div class="me-n3 mt-n3">
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

    <VueApexCharts
      type="area"
      :options="options"
      :series="series"
      :height="295"
    />
  </VCard>
</template>
