/* eslint-disable import/order */
import '@/@fake-db/db'
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import ability from '@/plugins/casl/ability'
import i18n from '@/plugins/i18n'
import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@/styles/styles.scss'
import { abilitiesPlugin } from '@casl/vue'
import '@core/scss/index.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
loadFonts()
const app = createApp(App)
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(layoutsPlugin)
app.use(i18n)

// Extract acl to another file like vitesse
app.use(abilitiesPlugin, ability, {
  useGlobalProperties: true,
})
app.mount('#app')
