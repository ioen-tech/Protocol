<script setup>
import AddNewUserDrawer from '@/views/apps/user/list/AddNewUserDrawer.vue'
import { useUserListStore } from '@/views/apps/user/useUserListStore'
import { avatarText } from '@core/utils/formatters'

const userListStore = useUserListStore()
const searchQuery = ref('')
const selectedRole = ref()
const selectedPlan = ref()
const selectedStatus = ref()
const rowPerPage = ref(10)
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

// 👉 search filters
const roles = [
  {
    title: 'Admin',
    value: 'admin'
  },
  {
    title: 'Author',
    value: 'author'
  },
  {
    title: 'Editor',
    value: 'editor'
  },
  {
    title: 'Maintainer',
    value: 'maintainer'
  },
  {
    title: 'Subscriber',
    value: 'subscriber'
  }
]
const plans = [
  {
    title: 'Basic',
    value: 'basic'
  },
  {
    title: 'Company',
    value: 'company'
  },
  {
    title: 'Enterprise',
    value: 'enterprise'
  },
  {
    title: 'Team',
    value: 'team'
  }
]
const status = [
  {
    title: 'Pending',
    value: 'pending'
  },
  {
    title: 'Active',
    value: 'active'
  },
  {
    title: 'Inactive',
    value: 'inactive'
  }
]
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
const isAddNewUserDrawerVisible = ref(false)

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = users.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex = users.value.length + (currentPage.value - 1) * rowPerPage.value
  
  return `${ firstIndex }-${ lastIndex } of ${ totalUsers.value }`
})

// SECTION Checkbox toggle
const selectedRows = ref([])
const selectAllUser = ref(false)

// 👉 add/remove all checkbox ids in array
const selectUnselectAll = () => {
  selectAllUser.value = !selectAllUser.value
  if (selectAllUser.value) {
    users.value.forEach(user => {
      if (!selectedRows.value.includes(`check${ user.id }`))
        selectedRows.value.push(`check${ user.id }`)
    })
  } else {
    selectedRows.value = []
  }
}

// 👉 watch if checkbox array is empty all select should be uncheck
watch(selectedRows, () => {
  if (!selectedRows.value.length)
    selectAllUser.value = false
}, { deep: true })
const addRemoveIndividualCheckbox = checkID => {
  if (selectedRows.value.includes(checkID)) {
    const index = selectedRows.value.indexOf(checkID)
    selectedRows.value.splice(index, 1)
  } else {
    selectedRows.value.push(checkID)
    selectAllUser.value = true
  }
}
const addNewUser = userData => {
  userListStore.addUser(userData)

  // refetch User
  fetchUsers()
}
</script>

<template>
  <section>
    <VCard
      title="Filters"
      class="mb-6"
    >
      <VCardText>
        <VRow>
          <!-- 👉 Select Role -->
          <VCol
            cols="12"
            sm="4"
          >
            <VSelect
              v-model="selectedRole"
              label="Select Role"
              :items="roles"
              clearable
              clear-icon="mdi-close"
            />
          </VCol>

          <!-- 👉 Select Plan -->
          <VCol
            cols="12"
            sm="4"
          >
            <VSelect
              v-model="selectedPlan"
              label="Select Plan"
              :items="plans"
              clearable
              clear-icon="mdi-close"
            />
          </VCol>

          <!-- 👉 Select Status -->
          <VCol
            cols="12"
            sm="4"
          >
            <VSelect
              v-model="selectedStatus"
              label="Select Status"
              :items="status"
              clearable
              clear-icon="mdi-close"
            />
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <VCard>
      <VCardText class="d-flex flex-wrap gap-4">
        <!-- 👉 Export button -->
        <VBtn
          variant="tonal"
          color="secondary"
          prepend-icon="mdi-tray-arrow-up"
        >
          Export
        </VBtn>

        <VSpacer />

        <div class="app-user-search-filter d-flex align-center">
          <!-- 👉 Search  -->
          <VTextField
            v-model="searchQuery"
            placeholder="Search User"
            density="compact"
            class="me-3"
          />

          <!-- 👉 Add user button -->
          <VBtn @click="isAddNewUserDrawerVisible = true">
            Add User
          </VBtn>
        </div>
      </VCardText>

      <VDivider />

      <VTable class="text-no-wrap">
        <!-- 👉 table head -->
        <thead>
          <tr>
            <th scope="col">
              <div
                class="mb-n2"
                style="width: 1.875rem;"
              >
                <VCheckbox
                  :model-value="selectAllUser"
                  :indeterminate="(users.length !== selectedRows.length) && !!selectedRows.length"
                  @click="selectUnselectAll"
                />
              </div>
            </th>
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
              PLAN
            </th>
            <th scope="col">
              STATUS
            </th>
            <th scope="col">
              ACTIONS
            </th>
          </tr>
        </thead>

        <!-- 👉 table body -->
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
          >
            <!-- 👉 Checkbox -->
            <td>
              <div
                class="mb-n2"
                style="width: 1.875rem;"
              >
                <VCheckbox
                  :id="`check${user.id}`"
                  :model-value="selectedRows.includes(`check${user.id}`)"
                  @click="addRemoveIndividualCheckbox(`check${user.id}`)"
                />
              </div>
            </td>

            <!-- 👉 User -->
            <td>
              <div class="d-flex align-center">
                <VAvatar
                  variant="tonal"
                  :color="resolveUserRoleVariant(user.role).color"
                  class="me-3"
                  size="34"
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

            <!-- 👉 Plan -->
            <td class="text-capitalize">
              {{ user.currentPlan }}
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

            <!-- 👉 Actions -->
            <td>
              <VBtn
                size="x-small"
                color="default"
                variant="plain"
                icon
              >
                <VIcon
                  size="24"
                  icon="mdi-dots-vertical"
                />

                <VMenu activator="parent">
                  <VList>
                    <VListItem :to="{ name: 'user-view-id', params: { id: user.id } }">
                      <template #prepend>
                        <VIcon
                          icon="mdi-eye-outline"
                          :size="20"
                          class="me-3"
                        />
                      </template>

                      <VListItemTitle>View</VListItemTitle>
                    </VListItem>

                    <VListItem href="javascript:void(0)">
                      <template #prepend>
                        <VIcon
                          icon="mdi-pencil-outline"
                          :size="20"
                          class="me-3"
                        />
                      </template>
                      <VListItemTitle>Edit</VListItemTitle>
                    </VListItem>

                    <VListItem href="javascript:void(0)">
                      <template #prepend>
                        <VIcon
                          icon="mdi-delete-outline"
                          :size="20"
                          class="me-3"
                        />
                      </template>

                      <VListItemTitle>Delete</VListItemTitle>
                    </VListItem>
                  </VList>
                </VMenu>
              </VBtn>
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

      <VDivider />

      <VCardText class="d-flex align-center flex-wrap justify-end gap-4 pa-2">
        <div
          class="d-flex align-center me-3"
          style="width: 171px;"
        >
          <span class="text-no-wrap me-3">Rows per page:</span>

          <VSelect
            v-model="rowPerPage"
            density="compact"
            variant="plain"
            class="user-pagination-select"
            :items="[10, 20, 30, 50]"
          />
        </div>

        <div class="d-flex align-center">
          <h6 class="text-sm font-weight-regular">
            {{ paginationData }}
          </h6>

          <VPagination
            v-model="currentPage"
            size="small"
            :total-visible="1"
            :length="totalPage"
            @next="selectedRows = []"
            @prev="selectedRows = []"
          />
        </div>
      </VCardText>
    </VCard>

    <!-- 👉 Add New User -->
    <AddNewUserDrawer
      v-model:isDrawerOpen="isAddNewUserDrawerVisible"
      @user-data="addNewUser"
    />
  </section>
</template>

<style lang="scss">
.app-user-search-filter {
  inline-size: 24.0625rem;
}

.text-capitalize {
  text-transform: capitalize;
}
</style>

<style lang="scss" scope>
.user-pagination-select {
  .v-field__input,
  .v-field__append-inner {
    padding-block-start: 0.3rem;
  }
}
</style>
