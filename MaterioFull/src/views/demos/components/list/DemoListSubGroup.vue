<script setup>
const open = ref([
  'Users',
  'Admin'
])
const admins = [
  [
    'Management',
    'mdi-account-multiple-outline'
  ],
  [
    'Settings',
    'mdi-cog-outline'
  ]
]
const cruds = [
  [
    'Create',
    'mdi-plus-outline'
  ],
  [
    'Read',
    'mdi-file-outline'
  ],
  [
    'Update',
    'mdi-update'
  ],
  [
    'Delete',
    'mdi-delete-outline'
  ]
]
</script>

<template>
  <VList v-model:opened="open">
    <VListItem
      title="Home"
      value="Home"
    >
      <template #prepend>
        <VIcon
          size="24"
          icon="mdi-home-outline"
          class="me-3"
        />
      </template>
    </VListItem>

    <VListGroup value="Users">
      <template #activator="{ props }">
        <VListItem
          v-bind="props"
          title="Users"
        >
          <template #prepend>
            <VIcon
              size="24"
              icon="mdi-account-circle-outline"
              class="me-3"
            />
          </template>
        </VListItem>
      </template>

      <VListGroup value="Admin">
        <template #activator="{ props }">
          <VListItem
            v-bind="props"
            title="Admin"
          />
        </template>

        <VListItem
          v-for="([title, icon], i) in admins"
          :key="i"
          :value="title"
          :title="title"
        >
          <template #prepend>
            <VIcon
              size="24"
              :icon="icon"
              class="me-3"
            />
          </template>
        </VListItem>
      </VListGroup>

      <VListGroup value="Actions">
        <template #activator="{ props }">
          <VListItem
            v-bind="props"
            title="Actions"
          />
        </template>

        <VListItem
          v-for="([title, icon], i) in cruds"
          :key="i"
          :value="title"
          :title="title"
        >
          <template #prepend>
            <VIcon
              size="24"
              :icon="icon"
              class="me-3"
            />
          </template>
        </VListItem>
      </VListGroup>
    </VListGroup>
  </VList>
</template>
