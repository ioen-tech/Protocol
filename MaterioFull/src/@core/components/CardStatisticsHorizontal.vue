<script setup>
import { kFormatter } from '@core/utils/formatters'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: false,
    default: 'primary'
  },
  icon: {
    type: String,
    required: true
  },
  stats: {
    type: Number,
    required: true
  },
  change: {
    type: Number,
    required: true
  }
})

const isPositive = controlledComputed(() => props.change, () => Math.sign(props.change) === 1)
</script>

<template>
  <VCard
    variant="text"
    border
  >
    <VCardText class="d-flex align-center">
      <VAvatar
        size="44"
        rounded
        :color="props.color"
        variant="tonal"
        class="me-4"
      >
        <VIcon
          :icon="props.icon"
          :size="24"
        />
      </VAvatar>

      <div>
        <span class="text-caption">{{ props.title }}</span>
        <div class="d-flex align-center flex-wrap">
          <span class="text-h6 font-weight-medium">{{ kFormatter(props.stats) }}</span>
          <div
            v-if="props.change"
            :class="`${isPositive ? 'text-success' : 'text-error'} mt-1`"
          >
            <VIcon :icon="isPositive ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
            <span class="text-xs">{{ Math.abs(props.change) }}%</span>
          </div>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>
