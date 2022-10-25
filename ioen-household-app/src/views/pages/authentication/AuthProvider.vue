<script setup>
import { useThemeConfig } from '@core/composable/useThemeConfig'

const {theme} = useThemeConfig()
const authProviders = [
  {
    icon: 'mdi-facebook',
    color: '#4267b2',
    colorInDark: '#4267b2'
  },
  {
    icon: 'mdi-twitter',
    color: '#1da1f2',
    colorInDark: '#1da1f2'
  },
  {
    icon: 'mdi-github',
    color: '#272727',
    colorInDark: '#fff'
  },
  {
    icon: 'mdi-google',
    color: '#db4437',
    colorInDark: '#db4437'
  }
]
</script>

<template>
  <VBtn
    v-for="link in authProviders"
    :key="link.icon"
    :icon="link.icon"
    variant="text"
    :color="theme === 'dark' ? link.colorInDark : link.color"
  />
</template>
