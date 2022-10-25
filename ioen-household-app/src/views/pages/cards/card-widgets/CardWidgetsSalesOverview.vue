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
    chart: { sparkline: { enabled: true } },
    colors: [
      currentTheme.value.primary,
      `rgba(${ hexToRgb(currentTheme.value.primary) }, 0.7)`,
      `rgba(${ hexToRgb(currentTheme.value.primary) }, 0.5)`,
      currentTheme.value.background
    ],
    stroke: { width: 0 },
    legend: { show: false },
    dataLabels: { enabled: false },
    labels: [
      'Apparel',
      'Electronics',
      'FMCG',
      'Other Sales'
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
              fontSize: '24px',
              color: primaryTextColor,
              formatter: value => `${ value }k`
            },
            total: {
              show: true,
              label: 'Weekly Sales',
              fontSize: '12px',
              color: secondaryTextColor,
              formatter: value => `${ value.globals.seriesTotals.reduce((total, num) => total + num) }k`
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
const salesOverviews = [
  {
    product: 'Apparel',
    sales: '$1,840'
  },
  {
    product: 'Electronic',
    sales: '$11,420'
  },
  {
    product: 'FMCG',
    sales: '$1,840'
  },
  {
    product: 'Other Sales',
    sales: '$11,420'
  }
]
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Sales Overview</VCardTitle>

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

    <VCardText class="pt-11">
      <VRow>
        <VCol
          sm="6"
          cols="12"
        >
          <VueApexCharts
            type="donut"
            :options="options"
            :series="series"
            :height="220"
          />
        </VCol>

        <VCol
          cols="12"
          sm="6"
        >
          <div class="d-flex align-center">
            <div class="me-3">
              <VAvatar
                rounded
                color="primary"
                variant="tonal"
              >
                <VIcon icon="mdi-currency-usd" />
              </VAvatar>
            </div>

            <div>
              <p class="mb-0">
                Number of Sales
              </p>
              <h6 class="text-h6">
                $86,400
              </h6>
            </div>
          </div>

          <VDivider class="my-3" />
          <VRow>
            <VCol
              v-for="sale in salesOverviews"
              :key="sale.product"
              cols="6"
            >
              <p class="mb-1">
                <VIcon
                  icon="mdi-checkbox-blank-circle"
                  color="primary"
                  size="12"
                  class="me-2"
                />
                <span>{{ sale.product }}</span>
              </p>
              <p class="text-base font-weight-semibold mb-0">
                {{ sale.sales }}
              </p>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
