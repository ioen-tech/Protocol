<script setup>
const notifications = ref([
  {
    type: 'New for you',
    email: true,
    browser: false,
    app: false
  },
  {
    type: 'Account activity',
    email: false,
    browser: true,
    app: true
  },
  {
    type: 'A new browser used to sign in',
    email: true,
    browser: true,
    app: true
  },
  {
    type: 'A new device is linked',
    email: false,
    browser: true,
    app: false
  }
])
</script>

<template>
  <VCard
    title="Notifications"
    subtitle="You will receive notification for the below selected items."
    class="user-tab-notification"
  >
    <VTable class="text-no-wrap">
      <thead>
        <tr>
          <th scope="col">
            TYPE
          </th>
          <th scope="col">
            EMAIL
          </th>
          <th scope="col">
            BROWSER
          </th>
          <th scope="col">
            APP
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="notification in notifications"
          :key="notification.type"
        >
          <td>{{ notification.type }}</td>
          <td>
            <VCheckbox
              v-model="notification.email"
              class="mt-2"
            />
          </td>
          <td>
            <VCheckbox
              v-model="notification.browser"
              class="mt-2"
            />
          </td>
          <td>
            <VCheckbox
              v-model="notification.app"
              class="mt-2"
            />
          </td>
        </tr>
      </tbody>
    </VTable>

    <VDivider />

    <VCardText class="d-flex flex-wrap gap-4">
      <VBtn>Save changes</VBtn>
      <VBtn
        color="secondary"
        variant="tonal"
      >
        Discard
      </VBtn>
    </VCardText>
  </VCard>
</template>
