<script setup>
import { useUserListStore } from '@/views/apps/user/useUserListStore'
import { avatarText } from '@core/utils/formatters'

const userListStore = useUserListStore()
const searchQuery = ref('')
const selectedRole = ref('')
const selectedPlan = ref('')
const selectedStatus = ref('')
const rowPerPage = ref(7)
const currentPage = ref(1)
const totalPage = ref(1)
const totalUsers = ref(0)
const users = ref([])

// 👉 Fetching users
const fetchUsers = () => {
  userListStore.fetchUsers({
    q: searchQuery.value,
    status: selectedStatus.value,
    plan: selectedPlan.value,
    role: selectedRole.value,
    perPage: rowPerPage.value,
    currentPage: currentPage.value
  }).then(response => {
    users.value = response.data.users
    totalPage.value = response.data.totalPage
    totalUsers.value = response.data.totalUsers
  }).catch(error => {
    console.error(error)
  })
}
watchEffect(fetchUsers)

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})
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
      icon: 'mdi-chart-donut'
    }
  if (role === 'editor')
    return {
      color: 'info',
      icon: 'mdi-pencil-outline'
    }
  if (role === 'admin')
    return {
      color: 'error',
      icon: 'mdi-laptop'
    }
  
  return {
    color: 'primary',
    icon: 'mdi-account-outline'
  }
}
const resolveUserStatusVariant = stat => {
  if (stat === 'pending')
    return 'warning'
  if (stat === 'active')
    return 'success'
  if (stat === 'inactive')
    return 'secondary'
  
  return 'primary'
}

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

// SECTION Checkbox toggle
const selectedRows = ref([])
const selectAllUser = ref(false)

// 👉 watch if checkbox array is empty all select should be uncheck
watch(selectedRows, () => {
  if (!selectedRows.value.length)
    selectAllUser.value = false
}, { deep: true })
</script>

<template>
  <VCard>
    <VTable class="text-no-wrap">
      <!-- 👉 table head -->
      <thead>
        <tr>
          <th scope="col">
            USER
          </th>
          <th scope="col">
            EMAIL
          </th>
          <th scope="col">
            ROLE
          </th>
          <th scope="col">
            STATUS
          </th>
        </tr>
      </thead>

      <!-- 👉 table body -->
      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
        >
          <!-- 👉 User -->
          <td>
            <div class="d-flex align-center">
              <VAvatar
                :color="resolveUserRoleVariant(user.role).color"
                variant="tonal"
                class="me-3"
                size="30"
              >
                <VImg
                  v-if="user.avatar"
                  :src="user.avatar"
                />
                <span v-else>{{ avatarText(user.fullName) }}</span>
              </VAvatar>

              <div class="d-flex flex-column">
                <h6 class="text-sm">
                  <RouterLink
                    :to="{ name: 'user-view-id', params: { id: user.id } }"
                    class="font-weight-medium"
                    style="color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));"
                  >
                    {{ user.fullName }}
                  </RouterLink>
                </h6>
                <span class="text-xs text-medium-emphasis">@{{ user.username }}</span>
              </div>
            </div>
          </td>

          <!-- 👉 Email -->
          <td class="text-medium-emphasis">
            {{ user.email }}
          </td>

          <!-- 👉 Role -->
          <td>
            <VIcon
              :icon="resolveUserRoleVariant(user.role).icon"
              :color="resolveUserRoleVariant(user.role).color"
              :size="22"
              class="me-3"
            />
            <span class="text-capitalize text-medium-emphasis">{{ user.role }}</span>
          </td>

          <!-- 👉 Status -->
          <td>
            <VChip
              :color="resolveUserStatusVariant(user.status)"
              size="small"
              class="text-capitalize"
            >
              {{ user.status }}
            </VChip>
          </td>
        </tr>
      </tbody>

      <!-- 👉 table footer  -->
      <tfoot v-show="!users.length">
        <tr>
          <td
            colspan="7"
            class="text-center"
          >
            No data available
          </td>
        </tr>
      </tfoot>
    </VTable>
  </VCard>
</template>

<style lang="scss">
.text-capitalize {
  text-transform: capitalize;
}
</style>
