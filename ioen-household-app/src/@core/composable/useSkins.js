// @ts-expect-error There won't be declaration file for it
import { VThemeProvider } from 'vuetify/lib/components/VThemeProvider/VThemeProvider'
import { AppContentLayoutNav } from '@layouts/enums'

// TODO: Use `VThemeProvider` from dist instead of lib (Using this component from dist causes navbar to loose sticky positioning)
import { useThemeConfig } from '@core/composable/useThemeConfig'
export const useSkins = () => {
  const { isVerticalNavSemiDark, skin, appContentLayoutNav } = useThemeConfig()
  const layoutAttrs = computed(() => {
    return isVerticalNavSemiDark.value && appContentLayoutNav.value === AppContentLayoutNav.Vertical
      ? { verticalNavAttrs: { wrapper: h(VThemeProvider, { tag: 'aside' }), wrapperProps: { withBackground: true, theme: 'dark' } } }
      : {}
  })
  const injectSkinClasses = () => {
    const bodyClasses = document.body.classList
    const genSkinClass = _skin => `skin--${_skin}`
    watch(skin, (val, oldVal) => {
      bodyClasses.remove(genSkinClass(oldVal))
      bodyClasses.add(genSkinClass(val))
    }, { immediate: true })
  }
  
  return {
    injectSkinClasses,
    layoutAttrs,
  }
}
