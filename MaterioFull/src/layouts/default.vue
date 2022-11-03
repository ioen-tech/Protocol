<script setup>
import DefaultLayoutWithHorizontalNav from './components/DefaultLayoutWithHorizontalNav.vue'
import DefaultLayoutWithVerticalNav from './components/DefaultLayoutWithVerticalNav.vue'
import { useThemeConfig } from '@core/composable/useThemeConfig'

// @layouts plugin
import { AppContentLayoutNav } from '@layouts/enums'

const {width: windowWidth} = useWindowSize()
const {appContentLayoutNav} = useThemeConfig()

// ℹ️ Performance: Only add `switchToVerticalNavOnLtOverlayNavBreakpoint` if `appContentLayoutNav` is horizontal
watchOnce(() => appContentLayoutNav.value === AppContentLayoutNav.Horizontal, () => {
  const {switchToVerticalNavOnLtOverlayNavBreakpoint} = useThemeConfig()

  // Remove below composable usage if you are not using horizontal nav layout in your app
  switchToVerticalNavOnLtOverlayNavBreakpoint(windowWidth)
})
</script>

<template>
  <template v-if="appContentLayoutNav === AppContentLayoutNav.Horizontal">
    <DefaultLayoutWithHorizontalNav />
  </template>
  <template v-else>
    <DefaultLayoutWithVerticalNav />
  </template>
</template>

<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
@use "@layouts/styles/default-layout";
</style>
