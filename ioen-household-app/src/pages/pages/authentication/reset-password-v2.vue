<script setup>
import tree3 from '@/assets/images/pages/tree-3.png'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import authV2MaskDark from '@/assets/images/pages/auth-v2-mask-dark.png'
import authV2MaskLight from '@/assets/images/pages/auth-v2-mask-light.png'
import authV2ResetPasswordIllustrationBorderedDark from '@/assets/images/pages/auth-v2-reset-password-illustration-bordered-dark.png'
import authV2ResetPasswordIllustrationBorderedLight from '@/assets/images/pages/auth-v2-reset-password-illustration-bordered-light.png'
import authV2ResetPasswordIllustrationDark from '@/assets/images/pages/auth-v2-reset-password-illustration-dark.png'
import authV2ResetPasswordIllustrationLight from '@/assets/images/pages/auth-v2-reset-password-illustration-light.png'

const {isAppRtl} = useThemeConfig()
const form = ref({
  newPassword: '',
  confirmPassword: ''
})
const authThemeImg = useGenerateImageVariant(authV2ResetPasswordIllustrationLight, authV2ResetPasswordIllustrationDark, authV2ResetPasswordIllustrationBorderedLight, authV2ResetPasswordIllustrationBorderedDark, true)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)
const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
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
            :src="authThemeImg"
            class="auth-illustration"
          />
        </div>

        <VImg
          :width="276"
          :src="tree3"
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
              Reset Password 🔒
            </h5>
            <p class="mb-0">
              Enter your email and we'll send you instructions to reset your password
            </p>
          </VCardText>

          <VCardText>
            <VForm @submit.prevent="() => {}">
              <VRow>
                <!-- password -->
                <VCol cols="12">
                  <VTextField
                    v-model="form.newPassword"
                    label="New Password"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  />
                </VCol>

                <!-- Confirm Password -->
                <VCol cols="12">
                  <VTextField
                    v-model="form.confirmPassword"
                    label="Confirm Password"
                    :type="isConfirmPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="isConfirmPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                  />
                </VCol>

                <!-- Set password -->
                <VCol cols="12">
                  <VBtn
                    block
                    type="submit"
                  >
                    Set New Password
                  </VBtn>
                </VCol>

                <!-- back to login -->
                <VCol
                  cols="12"
                  class="text-center"
                >
                  <RouterLink
                    class="text-primary ms-2"
                    :to="{ name: 'pages-authentication-login-v2' }"
                  >
                    <VIcon
                      icon="mdi-chevron-left"
                      :rotate="isAppRtl ? '180deg' : null"
                    />
                    <span>Back to login</span>
                  </RouterLink>
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
