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
    labels: [
      'Returning',
      'New Users',
      'Referrals'
    ],
    legend: { show: false },
    stroke: { lineCap: 'round' },
    colors: [
      currentTheme.value.primary,
      currentTheme.value.success,
      currentTheme.value.warning
    ],
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } }
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '40%' },
        track: {
          background: 'transparent',
          margin: 10
        },
        dataLabels: {
          name: {
            offsetY: 28,
            color: secondaryTextColor
          },
          value: {
            fontSize: '2.125rem',
            offsetY: -12,
            color: primaryTextColor,
            formatter(value) {
              return `${ value }k`
            }
          },
          total: {
            show: true,
            label: `${ new Date().getFullYear() }`,
            color: secondaryTextColor,
            fontSize: '12px',
            formatter(value) {
              return `${ value.globals.seriesTotals.reduce((total, num) => total + num) }k`
            }
          }
        }
      }
    }
  }
})
const series = [
  71,
  78,
  86
]
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Total Revenue</VCardTitle>

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
        type="radialBar"
        :options="options"
        :series="series"
        :height="243"
      />

      <div class="d-flex justify-space-around mt-2">
        <div>
          <div class="d-flex align-center">
            <VIcon
              size="12"
              color="success"
              icon="mdi-checkbox-blank-circle"
              class="me-1"
            />
            <h6 class="text-sm font-weight-semibold">
              856
            </h6>
          </div>

          <span class="text-xs">New User</span>
        </div>
        <VDivider vertical />
        <div>
          <div class="d-flex align-center">
            <VIcon
              size="12"
              color="primary"
              icon="mdi-checkbox-blank-circle"
              class="me-1"
            />
            <h6 class="text-sm font-weight-semibold">
              345
            </h6>
          </div>

          <span class="text-xs">Returning</span>
        </div>
        <VDivider vertical />
        <div>
          <div class="d-flex align-center">
            <VIcon
              size="12"
              color="warning"
              icon="mdi-checkbox-blank-circle"
              class="me-1"
            />
            <h6 class="text-sm font-weight-semibold">
              258
            </h6>
          </div>

          <span class="text-xs">Referrals</span>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>
