<script setup>
import VueApexCharts from 'vue3-apexcharts'
import {
  useDisplay,
  useTheme
} from 'vuetify'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { hexToRgb } from '@layouts/utils'

const vuetifyTheme = useTheme()
const {theme} = useThemeConfig()
const {thresholds} = useDisplay()
const options = controlledComputed(theme, () => {
  const currentTheme = ref(vuetifyTheme.current.value.colors)
  const variableTheme = ref(vuetifyTheme.current.value.variables)
  const disabledColor = `rgba(${ hexToRgb(currentTheme.value['on-surface']) },${ variableTheme.value['disabled-opacity'] })`
  const borderColor = `rgba(${ hexToRgb(String(variableTheme.value['border-color'])) },${ variableTheme.value['border-opacity'] })`
  
  return {
    chart: {
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '35%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    xaxis: {
      axisTicks: { show: false },
      crosshairs: { opacity: 0 },
      axisBorder: { show: false },
      categories: [
        2016,
        2017,
        2018,
        2019,
        2020,
        2021,
        2022
      ],
      labels: {
        style: {
          fontSize: '12px',
          colors: disabledColor,
          fontFamily: 'inter'
        }
      }
    },
    yaxis: {
      labels: {
        offsetX: -17,
        style: {
          fontSize: '12px',
          colors: disabledColor,
          fontFamily: 'inter'
        },
        formatter: value => value > 999 ? `${ (value / 1000).toFixed(0) }k` : `${ value }`
      }
    },
    colors: [
      currentTheme.value.primary,
      currentTheme.value.success,
      currentTheme.value.secondary
    ],
    grid: {
      borderColor,
      strokeDashArray: 7,
      padding: {
        top: -1,
        right: 0,
        left: -12,
        bottom: 5
      }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 6,
      curve: 'smooth',
      lineCap: 'round',
      colors: [currentTheme.value.surface]
    },
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } }
    },
    responsive: [
      {
        breakpoint: thresholds.value.xl,
        options: { plotOptions: { bar: { columnWidth: '45%' } } }
      },
      {
        breakpoint: thresholds.value.lg,
        options: { plotOptions: { bar: { columnWidth: '50%' } } }
      },
      {
        breakpoint: thresholds.value.sm,
        options: { plotOptions: { bar: { columnWidth: '45%' } } }
      },
      {
        breakpoint: 430,
        options: { plotOptions: { bar: { columnWidth: '55%' } } }
      }
    ]
  }
})
const series = [
  {
    name: 'Product A',
    data: [
      29000,
      22000,
      25000,
      18500,
      29000,
      20000,
      34500
    ]
  },
  {
    name: 'Product B',
    data: [
      0,
      16000,
      11000,
      15500,
      0,
      12500,
      9500
    ]
  },
  {
    name: 'Product C',
    data: [
      0,
      0,
      0,
      14000,
      0,
      11500,
      12000
    ]
  }
]
const lastThreeTransactions = [
  {
    avatar: {
      icon: 'mdi-trending-up',
      color: 'success'
    },
    title: '$48,568.20',
    subtitle: 'Total Profit'
  },
  {
    avatar: {
      icon: 'mdi-account-outline',
      color: 'primary'
    },
    title: '$38,453.25',
    subtitle: 'Total Income'
  },
  {
    avatar: {
      icon: 'mdi-currency-usd',
      color: 'secondary'
    },
    title: '$2,453.45',
    subtitle: 'Total Expense'
  }
]
</script>

<template>
  <VCard>
    <VRow no-gutters>
      <VCol
        cols="12"
        sm="7"
        class="responsive-border"
      >
        <VCardText>
          <h6 class="text-h6">
            Total Profit
          </h6>

          <VueApexCharts
            type="bar"
            :options="options"
            :series="series"
            :height="280"
          />
        </VCardText>
      </VCol>

      <VCol
        cols="12"
        sm="5"
      >
        <VCardItem>
          <VCardTitle class="text-h5">
            $482.85k
          </VCardTitle>
          <VCardSubtitle>Last month balance $234.40k</VCardSubtitle>

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

        <VCardText class="pt-2">
          <VList class="card-list">
            <VListItem
              v-for="transaction in lastThreeTransactions"
              :key="transaction.title"
            >
              <template #prepend>
                <VAvatar
                  variant="tonal"
                  :color="transaction.avatar.color"
                  rounded
                >
                  <VIcon :icon="transaction.avatar.icon" />
                </VAvatar>
              </template>

              <VListItemTitle class="font-weight-semibold">
                {{ transaction.title }}
              </VListItemTitle>
              <VListItemSubtitle>
                {{ transaction.subtitle }}
              </VListItemSubtitle>
            </VListItem>
          </VList>

          <VBtn
            block
            class="mt-6"
          >
            View Report
          </VBtn>
        </VCardText>
      </VCol>
    </VRow>
  </VCard>
</template>

<style lang="scss">
$responsive-border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));

@media screen and (min-width: 600px) {
  .responsive-border {
    border-inline-end: $responsive-border;
  }
}

@media screen and (max-width: 599px) {
  .responsive-border {
    border-block-end: $responsive-border;
  }
}
</style>
