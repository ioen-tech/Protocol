<script setup>
import { VForm } from 'vuetify/components'
import authV2MaskDark from '@/assets/images/pages/auth-v2-mask-dark.png'
import authV2MaskLight from '@/assets/images/pages/auth-v2-mask-light.png'
import authV2RegisterIllustrationBorderedDark from '@/assets/images/pages/auth-v2-register-illustration-bordered-dark.png'
import authV2RegisterIllustrationBorderedLight from '@/assets/images/pages/auth-v2-register-illustration-bordered-light.png'
import authV2RegisterIllustrationDark from '@/assets/images/pages/auth-v2-register-illustration-dark.png'
import authV2RegisterIllustrationLight from '@/assets/images/pages/auth-v2-register-illustration-light.png'
import tree2 from '@/assets/images/pages/tree-2.png'
import { useAppAbility } from '@/plugins/casl/useAppAbility'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import axios from '@axios'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import {
  alphaDashValidator,
  emailValidator,
  requiredValidator
} from '@validators'

const refVForm = ref()
const username = ref('johnDoe')
const email = ref('john@example.com')
const password = ref('john@MATERIO#123')
const privacyPolicies = ref(true)

// Router
const route = useRoute()
const router = useRouter()

// Ability
const ability = useAppAbility()

// Form Errors
const errors = ref({
  email: undefined,
  password: undefined
})
const register = () => {
  axios.post('/auth/register', {
    username: username.value,
    email: email.value,
    password: password.value
  }).then(r => {
    const {accessToken, userData, userAbilities} = r.data
    localStorage.setItem('userAbilities', JSON.stringify(userAbilities))
    ability.update(userAbilities)
    localStorage.setItem('userData', JSON.stringify(userData))
    localStorage.setItem('accessToken', JSON.stringify(accessToken))
    if (route.query.to)
      router.replace(String(route.query.to))
    else
      router.replace('/')
    
    return null
  }).catch(e => {
    const {errors: formErrors} = e.response.data
    errors.value = formErrors
    console.error(e.response.data)
  })
}
const imageVariant = useGenerateImageVariant(authV2RegisterIllustrationLight, authV2RegisterIllustrationDark, authV2RegisterIllustrationBorderedLight, authV2RegisterIllustrationBorderedDark, true)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)
const isPasswordVisible = ref(false)
const onSubmit = () => {
  refVForm.value?.validate().then(({valid: isValid}) => {
    if (isValid)
      register()
  })
}
</script>

<template>
  <div>
    <!-- Title and Logo -->
    <div class="auth-logo d-flex align-start gap-x-3">
      <VNodeRenderer :nodes="themeConfig.app.logo" />

      <h1 class="font-weight-semibold leading-normal text-2xl text-uppercase">
        {{ themeConfig.app.title }}
      </h1>
    </div>

    <VRow
      no-gutters
      class="auth-wrapper"
    >
      <VCol
        lg="8"
        class="d-none d-lg-flex align-center justify-center position-relative"
      >
        <div
          class="d-flex align-center justify-center w-100 pa-10 pe-0"
        >
          <VImg
            max-width="768px"
            :src="imageVariant"
            class="auth-illustration"
          />
        </div>

        <VImg
          :width="150"
          :src="tree2"
          class="auth-footer-start-tree"
        />

        <VImg
          class="auth-footer-mask"
          :src="authThemeMask"
        />
      </VCol>

      <VCol
        cols="12"
        lg="4"
        class="auth-bg d-flex align-center justify-center"
      >
        <VCard
          flat
          :max-width="500"
          class="mt-12 mt-sm-0 pa-4"
        >
          <VCardText>
            <h5 class="text-h5 font-weight-semibold mb-1">
              Adventure starts here 🚀
            </h5>
            <p class="mb-0">
              Make your app management easy and fun!
            </p>
          </VCardText>

          <VCardText>
            <VForm
              ref="refVForm"
              @submit.prevent="onSubmit"
            >
              <VRow>
                <!-- Username -->
                <VCol cols="12">
                  <VTextField
                    v-model="username"
                    :rules="[requiredValidator, alphaDashValidator]"
                    label="Username"
                  />
                </VCol>

                <!-- email -->
                <VCol cols="12">
                  <VTextField
                    v-model="email"
                    :rules="[requiredValidator, emailValidator]"
                    label="Email"
                    type="email"
                  />
                </VCol>

                <!-- password -->
                <VCol cols="12">
                  <VTextField
                    v-model="password"
                    :rules="[requiredValidator]"
                    label="Password"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  />

                  <div class="d-flex align-center mt-1 mb-4">
                    <VCheckbox
                      id="privacy-policy"
                      v-model="privacyPolicies"
                      inline
                    />
                    <VLabel
                      for="privacy-policy"
                      class="pb-1"
                      style="opacity: 1;"
                    >
                      <span class="me-1">I agree to</span>
                      <a
                        href="javascript:void(0)"
                        class="text-primary"
                      >privacy policy & terms</a>
                    </VLabel>
                  </div>

                  <VBtn
                    block
                    type="submit"
                  >
                    Sign up
                  </VBtn>
                </VCol>

                <!-- create account -->
                <VCol
                  cols="12"
                  class="text-center text-base"
                >
                  <span>Already have an account?</span>
                  <RouterLink
                    class="text-primary ms-2"
                    :to="{ name: 'login' }"
                  >
                    Sign in instead
                  </RouterLink>
                </VCol>

                <VCol
                  cols="12"
                  class="d-flex align-center"
                >
                  <VDivider />
                  <span class="mx-4">or</span>
                  <VDivider />
                </VCol>

                <!-- auth providers -->
                <VCol
                  cols="12"
                  class="text-center"
                >
                  <AuthProvider />
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
