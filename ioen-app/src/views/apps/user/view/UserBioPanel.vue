<script setup>
import {
  avatarText,
  kFormatter
} from '@core/utils/formatters'

const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
})

const standardPlan = {
  plan: 'Standard',
  price: 99,
  benefits: [
    '10 Users',
    'Up to 10GB storage',
    'Basic Support'
  ]
}
const isUserInfoEditDialogVisible = ref(false)
const isUpgradePlanDialogVisible = ref(false)
const resolveUserStatusVariant = stat => {
  if (stat === 'pending')
    return 'warning'
  if (stat === 'active')
    return 'success'
  if (stat === 'inactive')
    return 'secondary'
  
  return 'primary'
}
const resolveUserRoleVariant = role => {
  if (role === 'subscriber')
    return {
      color: 'primary',
      icon: 'mdi-account-outline'
    }
  if (role === 'author')
    return {
      color: 'warning',
      icon: 'mdi-cog-outline'
    }
  if (role === 'maintainer')
    return {
      color: 'success',
      icon: 'mdi-database-outline'
    }
  if (role === 'editor')
    return {
      color: 'info',
      icon: 'mdi-pencil-outline'
    }
  if (role === 'admin')
    return {
      color: 'error',
      icon: 'mdi-dns-outline'
    }
  
  return {
    color: 'primary',
    icon: 'mdi-account-outline'
  }
}
</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard v-if="props.userData">
        <VCardText class="text-center pt-15">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded="sm"
            :size="120"
            color="primary"
            variant="tonal"
          >
            <VImg
              v-if="props.userData.avatar"
              :src="props.userData.avatar"
            />
            <span
              v-else
              class="text-5xl font-weight-semibold"
            >
              {{ avatarText(props.userData.fullName) }}
            </span>
          </VAvatar>

          <!-- 👉 User fullName -->
          <h6 class="text-h6 mt-4">
            {{ props.userData.fullName }}
          </h6>

          <!-- 👉 Role chip -->
          <VChip
            label
            :color="resolveUserRoleVariant(props.userData.role).color"
            size="small"
            class="text-capitalize mt-4"
          >
            {{ props.userData.role }}
          </VChip>
        </VCardText>

        <VCardText class="d-flex justify-center flex-wrap mt-3">
          <!-- 👉 Done task -->
          <div class="d-flex align-center me-8 mb-2">
            <VAvatar
              :size="44"
              rounded
              color="primary"
              variant="tonal"
              class="me-3"
            >
              <VIcon
                size="22"
                icon="mdi-check"
              />
            </VAvatar>

            <div>
              <h6 class="text-h6">
                {{ kFormatter(props.userData.taskDone) }}
              </h6>
              <span>Task Done</span>
            </div>
          </div>

          <!-- 👉 Done Project -->
          <div class="d-flex align-center me-4 mb-2">
            <VAvatar
              :size="44"
              rounded
              color="primary"
              variant="tonal"
              class="me-3"
            >
              <VIcon
                size="22"
                icon="mdi-briefcase-variant-outline"
              />
            </VAvatar>

            <div>
              <h6 class="text-h6">
                {{ kFormatter(props.userData.projectDone) }}
              </h6>
              <span>Project Done</span>
            </div>
          </div>
        </VCardText>

        <!-- 👉 Details -->
        <VCardText>
          <h6 class="text-h6">
            Details
          </h6>

          <VDivider class="mt-4" />

          <!-- 👉 User Details list -->
          <VList class="card-list mt-2">
            <VListItem>
              <VListItemSubtitle>
                <h6 class="text-sm">
                  Username:
                  <span class="text-body-2">
                    @{{ props.userData.username }}
                  </span>
                </h6>
              </VListItemSubtitle>
            </VListItem>

            <VListItem>
              <VListItemSubtitle>
                <h6 class="text-sm">
                  Billing Email:
                  <span class="text-body-2">{{ props.userData.email }}</span>
                </h6>
              </VListItemSubtitle>
            </VListItem>

            <VListItem>
              <VListItemSubtitle>
                <h6 class="text-sm">
                  Status:

                  <VChip
                    label
                    size="small"
                    :color="resolveUserStatusVariant(props.userData.status)"
                    class="text-capitalize"
                  >
                    {{ props.userData.status }}
                  </VChip>
                </h6>
              </VListItemSubtitle>
            </VListItem>

            <VListItem>
              <VListItemSubtitle>
                <h6 class="text-sm">
                  Role:
                  <span class="text-capitalize text-body-2">{{ props.userData.role }}</span>
                </h6>
              </VListItemSubtitle>
            </VListItem>

            <VListItem>
              <VListItemSubtitle>
                <h6 class="text-sm">
                  Tax ID:
                  <span class="text-body-2">
                    {{ props.userData.taxId }}
                  </span>
                </h6>
              </VListItemSubtitle>
            </VListItem>

            <VListItem>
              <VListItemSubtitle>
                <h6 class="text-sm">
                  Contact:
                  <span class="text-body-2">{{ props.userData.contact }}</span>
                </h6>
              </VListItemSubtitle>
            </VListItem>

            <VListItem>
              <VListItemSubtitle>
                <h6 class="text-sm">
                  Language:
                  <span class="text-body-2">{{ props.userData.language }}</span>
                </h6>
              </VListItemSubtitle>
            </VListItem>

            <VListItem>
              <VListItemSubtitle>
                <h6 class="text-sm">
                  Country:
                  <span class="text-body-2">{{ props.userData.country }}</span>
                </h6>
              </VListItemSubtitle>
            </VListItem>
          </VList>
        </VCardText>

        <!-- 👉 Edit and Suspend button -->
        <VCardText class="d-flex justify-center">
          <VBtn
            variant="elevated"
            class="me-3"
            @click="isUserInfoEditDialogVisible = true"
          >
            Edit
          </VBtn>
          <VBtn
            variant="tonal"
            color="error"
          >
            Suspend
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
    <!-- !SECTION -->

    <!-- SECTION Current Plan -->
    <VCol cols="12">
      <VCard
        flat
        class="current-plan"
      >
        <VCardText class="d-flex">
          <!-- 👉 Standard Chip -->
          <VChip
            label
            color="primary"
            size="small"
          >
            Standard
          </VChip>

          <VSpacer />

          <!-- 👉 Current Price  -->
          <div class="d-flex align-center">
            <sup class="text-primary text-sm font-weight-regular">$</sup>
            <h3 class="text-h3 text-primary font-weight-semibold">
              99
            </h3>
            <sub class="mt-3"><h6 class="text-sm font-weight-regular">/ month</h6></sub>
          </div>
        </VCardText>

        <VCardText>
          <!-- 👉 Price Benefits -->
          <VList class="card-list">
            <VListItem
              v-for="benefit in standardPlan.benefits"
              :key="benefit"
            >
              <VIcon
                size="10"
                color="#E0E0E0"
                class="me-2"
                icon="mdi-checkbox-blank-circle"
              />
              <span>{{ benefit }}</span>
            </VListItem>
          </VList>

          <!-- 👉 Days -->
          <div class="my-6">
            <div class="d-flex font-weight-semibold mt-3 mb-2">
              <h6 class="text-sm">
                Days
              </h6>
              <VSpacer />
              <h6 class="text-sm">
                26 of 30 Days
              </h6>
            </div>

            <!-- 👉 Progress -->
            <VProgressLinear
              rounded
              :model-value="86"
              height="8"
              color="primary"
            />

            <p class="text-xs mt-2">
              4 days remaining
            </p>
          </div>

          <!-- 👉 Upgrade Plan -->
          <VBtn
            block
            @click="isUpgradePlanDialogVisible = true"
          >
            Upgrade Plan
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
    <!-- !SECTION -->
  </VRow>

  <!-- 👉 Edit user info dialog -->
  <UserInfoEditDialog
    v-model:isDialogVisible="isUserInfoEditDialogVisible"
    :user-data="props.userData"
  />

  <!-- 👉 Upgrade plan dialog -->
  <UserUpgradePlanDialog v-model:isDialogVisible="isUpgradePlanDialogVisible" />
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.8rem;
}

.current-plan {
  border: 2px solid rgb(var(--v-theme-primary));
}

.text-capitalize {
  text-transform: capitalize !important;
}
</style>
