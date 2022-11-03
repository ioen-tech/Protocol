import { icons } from '@iconify-json/mdi'
import { addCollection } from '@iconify/vue'

// addCollection(icons)
// console.log('icons.icons :>> ', icons.icons)
const fIcons = Object.fromEntries(Object.entries(icons.icons).filter(([iconName, _]) => (iconName === 'ab-testing' || iconName === 'home')))

// icons.icons = fIcons
const _icons = {
  ...icons,
  icons: fIcons,
}
console.log('_icons :>> ', _icons)
addCollection(_icons)
