<script setup>
import chrome from '@/assets/images/logos/chrome.png'

const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const smsVerificationNumber = ref('+1(968) 819-2547')
const isTwoFactorDialogOpen = ref(false)
const recentDevices = [
  {
    browser: 'Chrome on Windows',
    logo: chrome,
    device: 'Dell XPS 15',
    location: 'United States',
    activity: '10, Jan 2020 20:07'
  },
  {
    browser: 'Chrome on Android',
    logo: chrome,
    device: 'Google Pixel 3a',
    location: 'Ghana',
    activity: '11, Jan 2020 10:16'
  },
  {
    browser: 'Chrome on MacOS',
    logo: chrome,
    device: 'Apple iMac',
    location: 'Mayotte',
    activity: '11, Jan 2020 12:10'
  },
  {
    browser: 'Chrome on iPhone',
    logo: chrome,
    device: 'Apple iPhone XR',
    location: 'Mauritania',
    activity: '12, Jan 2020 8:29'
  }
]
</script>

<template>
  <VRow>
    <VCol cols="12">
      <!-- 👉 Change password -->
      <VCard title="Change Password">
        <VCardText>
          <VAlert
            variant="tonal"
            color="warning"
            class="mb-6"
          >
            <VAlertTitle>Ensure that these requirements are met</VAlertTitle>
            <span>Minimum 8 characters long, uppercase & symbol</span>
          </VAlert>

          <VForm @submit.prevent="() => {}">
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  label="New Password"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isNewPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  label="Confirm Password"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                />
              </VCol>

              <VCol cols="12">
                <VBtn type="submit">
                  Change Password
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- 👉 Two step verification -->
      <VCard
        title="Two-step verification"
        subtitle="Keep your account secure with authentication step."
      >
        <VCardText>
          <div>
            <h4 class="font-weight-semibold mb-1">
              SMS
            </h4>
            <VTextField
              variant="underlined"
              :model-value="smsVerificationNumber"
              readonly
            >
              <template #append-inner>
                <VBtn
                  icon
                  size="x-small"
                  color="default"
                  variant="plain"
                >
                  <VIcon
                    size="24"
                    icon="mdi-square-edit-outline"
                    @click="isTwoFactorDialogOpen = true"
                  />
                </VBtn>
                <VBtn
                  icon
                  size="x-small"
                  color="default"
                  variant="plain"
                >
                  <VIcon
                    size="24"
                    icon="mdi-delete-outline"
                  />
                </VBtn>
              </template>
            </VTextField>
          </div>

          <p class="mb-0 mt-4">
            Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to log in. <a
              href="javascript:void(0)"
              class="text-decoration-none"
            >Learn more</a>.
          </p>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- 👉 Recent devices -->
      <VCard title="Recent devices">
        <VDivider />
        <VTable class="text-no-wrap">
          <thead>
            <tr>
              <th scope="col">
                BROWSER
              </th>
              <th scope="col">
                DEVICE
              </th>
              <th scope="col">
                LOCATION
              </th>
              <th scope="col">
                RECENT ACTIVITY
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="device in recentDevices"
              :key="device.browser"
            >
              <td>
                <VAvatar
                  :size="22"
                  :image="device.logo"
                  class="me-3"
                />
                <span class="font-weight-medium">{{ device.browser }}</span>
              </td>

              <td class="text-medium-emphasis">
                {{ device.device }}
              </td>

              <td class="text-medium-emphasis">
                {{ device.location }}
              </td>

              <td class="text-medium-emphasis">
                {{ device.activity }}
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>

  <!-- 👉 Enable One Time Password Dialog -->
  <EnableOneTimePasswordDialog
    v-model:isDialogVisible="isTwoFactorDialogOpen"
    :mobile-number="smsVerificationNumber"
  />
</template>
