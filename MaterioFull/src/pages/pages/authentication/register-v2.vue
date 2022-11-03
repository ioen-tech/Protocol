<script setup>
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import authV2MaskDark from '@/assets/images/pages/auth-v2-mask-dark.png'
import authV2MaskLight from '@/assets/images/pages/auth-v2-mask-light.png'
import authV2RegisterIllustrationBorderedDark from '@/assets/images/pages/auth-v2-register-illustration-bordered-dark.png'
import authV2RegisterIllustrationBorderedLight from '@/assets/images/pages/auth-v2-register-illustration-bordered-light.png'
import authV2RegisterIllustrationDark from '@/assets/images/pages/auth-v2-register-illustration-dark.png'
import authV2RegisterIllustrationLight from '@/assets/images/pages/auth-v2-register-illustration-light.png'
import tree2 from '@/assets/images/pages/tree-2.png'

const form = ref({
  username: '',
  email: '',
  password: '',
  privacyPolicies: false
})
const imageVariant = useGenerateImageVariant(authV2RegisterIllustrationLight, authV2RegisterIllustrationDark, authV2RegisterIllustrationBorderedLight, authV2RegisterIllustrationBorderedDark, true)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)
const isPasswordVisible = ref(false)
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
        md="8"
        class="d-none d-md-flex align-center justify-center position-relative"
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
        md="4"
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
            <VForm @submit.prevent="() => {}">
              <VRow>
                <!-- Username -->
                <VCol cols="12">
                  <VTextField
                    v-model="form.username"
                    label="Username"
                  />
                </VCol>

                <!-- email -->
                <VCol cols="12">
                  <VTextField
                    v-model="form.email"
                    label="Email"
                    type="email"
                  />
                </VCol>

                <!-- password -->
                <VCol cols="12">
                  <VTextField
                    v-model="form.password"
                    label="Password"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  />

                  <div class="d-flex align-center mt-1 mb-4">
                    <VCheckbox
                      id="privacy-policy"
                      v-model="form.privacyPolicies"
                      inline
                    />
                    <VLabel
                      for="privacy-policy"
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
                    :to="{ name: 'pages-authentication-login-v2' }"
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
</route>
