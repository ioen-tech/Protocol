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
    plotOptions: {
      bar: {
        borderRadius: 4,
        distributed: true,
        columnWidth: '60%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    colors: [
      `rgba(${ hexToRgb(currentTheme.value.primary) }, 0.1)`,
      `rgba(${ hexToRgb(currentTheme.value.primary) }, 0.1)`,
      `rgba(${ hexToRgb(currentTheme.value.primary) }, 0.1)`,
      `rgba(${ hexToRgb(currentTheme.value.primary) }, 0.1)`,
      currentTheme.value.primary,
      `rgba(${ hexToRgb(currentTheme.value.primary) }, 0.1)`,
      `rgba(${ hexToRgb(currentTheme.value.primary) }, 0.1)`
    ],
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } }
    },
    xaxis: {
      categories: [
        'S',
        'M',
        'T',
        'W',
        'T',
        'F',
        'S'
      ],
      axisTicks: { show: false },
      crosshairs: { opacity: 0 },
      axisBorder: { show: false },
      tickPlacement: 'on',
      labels: {
        style: {
          fontSize: '12px',
          colors: disabledColor
        }
      }
    },
    yaxis: { show: false },
    grid: {
      show: false,
      padding: {
        top: -15,
        left: -10,
        right: -10
      }
    },
    tooltip: { enabled: false }
  }
})
const series = [{
  data: [
    40,
    60,
    50,
    60,
    90,
    40,
    50
  ]
}]
const weeklySalesData = [
  {
    avatar: {
      icon: 'mdi-trending-up',
      color: 'primary'
    },
    title: '34.6k',
    subtitle: 'Sales'
  },
  {
    avatar: {
      icon: 'mdi-currency-usd',
      color: 'success'
    },
    title: '$482k',
    subtitle: 'Total Profit'
  }
]
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Weekly Sales</VCardTitle>
      <VCardSubtitle>Total 85.4k Sales</VCardSubtitle>

      <template #append>
        <div class="mt-n7 me-n3">
          <VBtn
            icon
            color="default"
            size="x-small"
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
        :height="203"
      />
    </VCardText>

    <VCardText class="d-flex justify-space-around">
      <div
        v-for="data in weeklySalesData"
        :key="data.title"
        class="d-flex align-center me-3"
      >
        <div>
          <VAvatar
            rounded
            :color="data.avatar.color"
            variant="tonal"
            class="me-3"
          >
            <VIcon :icon="data.avatar.icon" />
          </VAvatar>
        </div>

        <div>
          <h6 class="text-base">
            {{ data.title }}
          </h6>
          <span class="text-sm text-no-wrap">{{ data.subtitle }}</span>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>

