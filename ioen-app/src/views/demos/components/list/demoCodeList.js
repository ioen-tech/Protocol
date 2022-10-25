export const actionAndItemGroup = {
  ts: `<template>
  <VList
    lines="three"
    density="compact"
    select-strategy="classic"
  >
    <VListSubheader>General</VListSubheader>

    <VListItem value="notifications">
      <template #prepend="{ isActive }">
        <VListItemAction start>
          <VCheckbox
            :model-value="isActive"
            color="primary"
            class="mt-2"
          />
        </VListItemAction>
      </template>

      <VListItemTitle>Notifications</VListItemTitle>
      <VListItemSubtitle>Notify me about updates to apps or games that I downloaded</VListItemSubtitle>
    </VListItem>

    <VListItem value="sound">
      <template #prepend="{ isActive }">
        <VListItemAction start>
          <VCheckbox
            :model-value="isActive"
            color="primary"
            class="mt-2"
          />
        </VListItemAction>
      </template>

      <VListItemTitle>Sound</VListItemTitle>
      <VListItemSubtitle>Auto-update apps at any time. Data charges may apply</VListItemSubtitle>
    </VListItem>

    <VListItem value="widgets">
      <template #prepend="{ isActive }">
        <VListItemAction start>
          <VCheckbox
            :model-value="isActive"
            color="primary"
            class="mt-2"
          />
        </VListItemAction>
      </template>

      <VListItemTitle>Auto-add widgets</VListItemTitle>
      <VListItemSubtitle>Automatically add home screen widgets when downloads complete</VListItemSubtitle>
    </VListItem>
  </VList>
</template>
`,
  js: `<template>
  <VList
    lines="three"
    density="compact"
    select-strategy="classic"
  >
    <VListSubheader>General</VListSubheader>

    <VListItem value="notifications">
      <template #prepend="{ isActive }">
        <VListItemAction start>
          <VCheckbox
            :model-value="isActive"
            color="primary"
            class="mt-2"
          />
        </VListItemAction>
      </template>

      <VListItemTitle>Notifications</VListItemTitle>
      <VListItemSubtitle>Notify me about updates to apps or games that I downloaded</VListItemSubtitle>
    </VListItem>

    <VListItem value="sound">
      <template #prepend="{ isActive }">
        <VListItemAction start>
          <VCheckbox
            :model-value="isActive"
            color="primary"
            class="mt-2"
          />
        </VListItemAction>
      </template>

      <VListItemTitle>Sound</VListItemTitle>
      <VListItemSubtitle>Auto-update apps at any time. Data charges may apply</VListItemSubtitle>
    </VListItem>

    <VListItem value="widgets">
      <template #prepend="{ isActive }">
        <VListItemAction start>
          <VCheckbox
            :model-value="isActive"
            color="primary"
            class="mt-2"
          />
        </VListItemAction>
      </template>

      <VListItemTitle>Auto-add widgets</VListItemTitle>
      <VListItemSubtitle>Automatically add home screen widgets when downloads complete</VListItemSubtitle>
    </VListItem>
  </VList>
</template>
`,
}
export const shaped = {
  ts: `<script lang="ts" setup>
const items = [
  { text: 'Cupcake sesame snaps dessert marzipan.', icon: 'mdi-instagram' },
  { text: 'Jelly beans jelly-o gummi bears chupa chups marshmallow.', icon: 'mdi-facebook' },
  { text: 'Bonbon macaroon gummies pie jelly', icon: 'mdi-twitter' },
]
</script>

<template>
  <VList>
    <VListItem
      v-for="(item, i) in items"
      :key="i"
      :value="item"
      rounded="shaped"
    >
      <template #prepend>
        <VIcon
          :icon="item.icon"
          class="me-3"
        />
      </template>
      <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
      <VListItemTitle v-text="item.text" />
    </VListItem>
  </VList>
</template>
`,
  js: `<script setup>
const items = [
  {
    text: 'Cupcake sesame snaps dessert marzipan.',
    icon: 'mdi-instagram'
  },
  {
    text: 'Jelly beans jelly-o gummi bears chupa chups marshmallow.',
    icon: 'mdi-facebook'
  },
  {
    text: 'Bonbon macaroon gummies pie jelly',
    icon: 'mdi-twitter'
  }
]
</script>

<template>
  <VList>
    <VListItem
      v-for="(item, i) in items"
      :key="i"
      :value="item"
      rounded="shaped"
    >
      <template #prepend>
        <VIcon
          :icon="item.icon"
          class="me-3"
        />
      </template>
      <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
      <VListItemTitle v-text="item.text" />
    </VListItem>
  </VList>
</template>
`,
}
export const density = {
  ts: `<script lang="ts" setup>
const items = [
  { title: 'halvah icing marshmallow', value: 1 },
  { title: 'Cake caramels donut danish muffin biscuit', value: 2 },
  { title: 'Chocolate cake pie lollipop', value: 3 },
  { title: 'Apple pie toffee pudding gummi bears', value: 4 },
  { title: 'Jujubes chupa chups cheesecake tart', value: 5 },
  { title: 'Candy fruitcake bonbon sesame snaps dessert', value: 6 },
  { title: 'Candy wafer tiramisu sugar plum sweet.', value: 7 },
  { title: 'Toffee gingerbread muffin macaroon cotton candy bonbon lollipop.', value: 8 },
]
</script>

<template>
  <VList
    density="compact"
    :items="items"
  />
</template>
`,
  js: `<script setup>
const items = [
  {
    title: 'halvah icing marshmallow',
    value: 1
  },
  {
    title: 'Cake caramels donut danish muffin biscuit',
    value: 2
  },
  {
    title: 'Chocolate cake pie lollipop',
    value: 3
  },
  {
    title: 'Apple pie toffee pudding gummi bears',
    value: 4
  },
  {
    title: 'Jujubes chupa chups cheesecake tart',
    value: 5
  },
  {
    title: 'Candy fruitcake bonbon sesame snaps dessert',
    value: 6
  },
  {
    title: 'Candy wafer tiramisu sugar plum sweet.',
    value: 7
  },
  {
    title: 'Toffee gingerbread muffin macaroon cotton candy bonbon lollipop.',
    value: 8
  }
]
</script>

<template>
  <VList
    density="compact"
    :items="items"
  />
</template>
`,
}
export const nav = {
  ts: `<script lang="ts" setup>
const items = [
  { title: 'My Files', value: 1, prependIcon: 'mdi-folder-outline' },
  { title: 'Shared with me', value: 2, prependIcon: 'mdi-account-multiple-outline' },
  { title: 'Starred', value: 3, prependIcon: 'mdi-star-outline' },
  { title: 'Recent', value: 4, prependIcon: 'mdi-history' },
  { title: 'Offline', value: 5, prependIcon: 'mdi-check-circle-outline' },
  { title: 'Uploads', value: 6, prependIcon: 'mdi-upload-outline' },
  { title: 'Backups', value: 7, prependIcon: 'mdi-cloud-upload-outline' },
]
</script>

<template>
  <VList
    nav
    :lines="false"
  >
    <VListItem
      v-for="item in items"
      :key="item.value"
      :value="item.value"
    >
      <template #prepend>
        <VIcon
          :icon="item.prependIcon"
          class="me-3"
        />
      </template>

      <VListItemTitle>
        {{ item.title }}
      </VListItemTitle>
    </VListItem>
  </VList>
</template>
`,
  js: `<script setup>
const items = [
  {
    title: 'My Files',
    value: 1,
    prependIcon: 'mdi-folder-outline'
  },
  {
    title: 'Shared with me',
    value: 2,
    prependIcon: 'mdi-account-multiple-outline'
  },
  {
    title: 'Starred',
    value: 3,
    prependIcon: 'mdi-star-outline'
  },
  {
    title: 'Recent',
    value: 4,
    prependIcon: 'mdi-history'
  },
  {
    title: 'Offline',
    value: 5,
    prependIcon: 'mdi-check-circle-outline'
  },
  {
    title: 'Uploads',
    value: 6,
    prependIcon: 'mdi-upload-outline'
  },
  {
    title: 'Backups',
    value: 7,
    prependIcon: 'mdi-cloud-upload-outline'
  }
]
</script>

<template>
  <VList
    nav
    :lines="false"
  >
    <VListItem
      v-for="item in items"
      :key="item.value"
      :value="item.value"
    >
      <template #prepend>
        <VIcon
          :icon="item.prependIcon"
          class="me-3"
        />
      </template>

      <VListItemTitle>
        {{ item.title }}
      </VListItemTitle>
    </VListItem>
  </VList>
</template>
`,
}
export const threeLine = {
  ts: `<script lang="ts" setup>
import avatar1 from '@/assets/images/avatars/avatar-1.png'
import avatar2 from '@/assets/images/avatars/avatar-2.png'
import avatar3 from '@/assets/images/avatars/avatar-3.png'
import avatar4 from '@/assets/images/avatars/avatar-4.png'
import avatar5 from '@/assets/images/avatars/avatar-5.png'

const items = [
  { type: 'subheader', title: 'Today' },
  {
    prependAvatar: avatar1,
    title: 'Brunch this weekend?',
    subtitle: '<span class="text-primary">Ali Connors</span> &mdash; I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: avatar2,
    title: 'Summer BBQ',
    subtitle: '<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I\'m out of town this weekend.',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: avatar3,
    title: 'Oui oui',
    subtitle: '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: avatar4,
    title: 'Birthday gift',
    subtitle: '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: avatar5,
    title: 'Recipe to try',
    subtitle: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
  },
]
</script>

<template>
  <VList
    id="three-line-list"
    lines="three"
    :items="items"
    item-props
    density="compact"
  >
    <template #subtitle="{ subtitle }">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="subtitle" />
    </template>
  </VList>
</template>

<style lang="scss">
#three-line-list {
  .v-list-item-title {
    margin-block-end: 0.25rem;
  }

  .v-divider {
    margin-block: 0.25rem;
  }
}
</style>
`,
  js: `<script setup>
import avatar1 from '@/assets/images/avatars/avatar-1.png'
import avatar2 from '@/assets/images/avatars/avatar-2.png'
import avatar3 from '@/assets/images/avatars/avatar-3.png'
import avatar4 from '@/assets/images/avatars/avatar-4.png'
import avatar5 from '@/assets/images/avatars/avatar-5.png'

const items = [
  {
    type: 'subheader',
    title: 'Today'
  },
  {
    prependAvatar: avatar1,
    title: 'Brunch this weekend?',
    subtitle: '<span class="text-primary">Ali Connors</span> &mdash; I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?'
  },
  {
    type: 'divider',
    inset: true
  },
  {
    prependAvatar: avatar2,
    title: 'Summer BBQ',
    subtitle: '<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I\'m out of town this weekend.'
  },
  {
    type: 'divider',
    inset: true
  },
  {
    prependAvatar: avatar3,
    title: 'Oui oui',
    subtitle: '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?'
  },
  {
    type: 'divider',
    inset: true
  },
  {
    prependAvatar: avatar4,
    title: 'Birthday gift',
    subtitle: '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?'
  },
  {
    type: 'divider',
    inset: true
  },
  {
    prependAvatar: avatar5,
    title: 'Recipe to try',
    subtitle: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
  }
]
</script>

<template>
  <VList
    id="three-line-list"
    lines="three"
    :items="items"
    item-props
    density="compact"
  >
    <template #subtitle="{ subtitle }">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="subtitle" />
    </template>
  </VList>
</template>

<style lang="scss">
#three-line-list {
  .v-list-item-title {
    margin-block-end: 0.25rem;
  }

  .v-divider {
    margin-block: 0.25rem;
  }
}
</style>
`,
}
export const basic = {
  ts: `<script setup lang="ts">
const items = ['Cras justo odio', 'Dapibus ac facilisis in', 'Morbi leo risus', 'Porta ac consectetur ac']
</script>

<template>
  <VList :items="items" />
</template>
`,
  js: `<script setup>
const items = [
  'Cras justo odio',
  'Dapibus ac facilisis in',
  'Morbi leo risus',
  'Porta ac consectetur ac'
]
</script>

<template>
  <VList :items="items" />
</template>
`,
}
export const twoLinesAndSubheader = {
  ts: `<script lang="ts" setup>
const files = [
  {
    color: 'blue',
    icon: 'mdi-clipboard-text',
    subtitle: 'Jan 20, 2014',
    title: 'Vacation itinerary',
  },
  {
    color: 'amber',
    icon: 'mdi-gesture-tap-button',
    subtitle: 'Jan 10, 2014',
    title: 'Kitchen remodel',
  },
]
const folders = [
  {
    subtitle: 'Jan 9, 2014',
    title: 'Photos',
  },
  {
    subtitle: 'Jan 17, 2014',
    title: 'Recipes',
  },
  {
    subtitle: 'Jan 28, 2014',
    title: 'Work',
  },
]
</script>

<template>
  <VList lines="two">
    <VListSubheader inset>
      Folders
    </VListSubheader>

    <VListItem
      v-for="folder in folders"
      :key="folder.title"
      :title="folder.title"
      :subtitle="folder.subtitle"
    >
      <template #prepend>
        <VAvatar
          color="secondary"
          variant="tonal"
        >
          <VIcon
            :size="26"
            icon="mdi-folder-outline"
          />
        </VAvatar>
      </template>

      <template #append>
        <VBtn
          variant="text"
          color="default"
          icon="mdi-information-outline"
        />
      </template>
    </VListItem>

    <VDivider inset />

    <VListSubheader inset>
      Files
    </VListSubheader>

    <VListItem
      v-for="file in files"
      :key="file.title"
      :title="file.title"
      :subtitle="file.subtitle"
    >
      <template #prepend>
        <VAvatar
          color="secondary"
          variant="tonal"
        >
          <VIcon
            :size="26"
            :icon="file.icon"
          />
        </VAvatar>
      </template>

      <template #append>
        <VBtn
          variant="text"
          color="default"
          icon="mdi-information-outline"
        />
      </template>
    </VListItem>
  </VList>
</template>
`,
  js: `<script setup>
const files = [
  {
    color: 'blue',
    icon: 'mdi-clipboard-text',
    subtitle: 'Jan 20, 2014',
    title: 'Vacation itinerary'
  },
  {
    color: 'amber',
    icon: 'mdi-gesture-tap-button',
    subtitle: 'Jan 10, 2014',
    title: 'Kitchen remodel'
  }
]
const folders = [
  {
    subtitle: 'Jan 9, 2014',
    title: 'Photos'
  },
  {
    subtitle: 'Jan 17, 2014',
    title: 'Recipes'
  },
  {
    subtitle: 'Jan 28, 2014',
    title: 'Work'
  }
]
</script>

<template>
  <VList lines="two">
    <VListSubheader inset>
      Folders
    </VListSubheader>

    <VListItem
      v-for="folder in folders"
      :key="folder.title"
      :title="folder.title"
      :subtitle="folder.subtitle"
    >
      <template #prepend>
        <VAvatar
          color="secondary"
          variant="tonal"
        >
          <VIcon
            :size="26"
            icon="mdi-folder-outline"
          />
        </VAvatar>
      </template>

      <template #append>
        <VBtn
          variant="text"
          color="default"
          icon="mdi-information-outline"
        />
      </template>
    </VListItem>

    <VDivider inset />

    <VListSubheader inset>
      Files
    </VListSubheader>

    <VListItem
      v-for="file in files"
      :key="file.title"
      :title="file.title"
      :subtitle="file.subtitle"
    >
      <template #prepend>
        <VAvatar
          color="secondary"
          variant="tonal"
        >
          <VIcon
            :size="26"
            :icon="file.icon"
          />
        </VAvatar>
      </template>

      <template #append>
        <VBtn
          variant="text"
          color="default"
          icon="mdi-information-outline"
        />
      </template>
    </VListItem>
  </VList>
</template>
`,
}
export const subGroup = {
  ts: `<script lang="ts" setup>
const open = ref(['Users', 'Admin'])

const admins = [
  ['Management', 'mdi-account-multiple-outline'],
  ['Settings', 'mdi-cog-outline'],
]
const cruds = [
  ['Create', 'mdi-plus-outline'],
  ['Read', 'mdi-file-outline'],
  ['Update', 'mdi-update'],
  ['Delete', 'mdi-delete-outline'],
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
`,
  js: `<script setup>
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
`,
}
export const rounded = {
  ts: `<script lang="ts" setup>
const items = [
  {
    title: 'Cupcake sesame snaps dessert marzipan.',
    value: 1,
    prependIcon: 'mdi-instagram',

  },
  {
    title: 'Jelly beans jelly-o gummi bears chupa chups marshmallow.',
    value: 2,
    prependIcon: 'mdi-facebook',
  },
  {
    title: 'Bonbon macaroon gummies pie jelly',
    value: 3,
    prependIcon: 'mdi-twitter',
  },
  {
    title: 'halvah icing marshmallow',
    value: 4,
    prependIcon: 'mdi-instagram',
  },
]
</script>

<template>
  <VList>
    <VListItem
      v-for="item in items"
      :key="item.title"
      :value="item.value"
      rounded="xl"
    >
      <template #prepend>
        <VIcon
          :icon="item.prependIcon"
          class="me-3"
        />
      </template>

      <VListItemTitle>
        {{ item.title }}
      </VListItemTitle>
    </VListItem>
  </VList>
</template>
`,
  js: `<script setup>
const items = [
  {
    title: 'Cupcake sesame snaps dessert marzipan.',
    value: 1,
    prependIcon: 'mdi-instagram'
  },
  {
    title: 'Jelly beans jelly-o gummi bears chupa chups marshmallow.',
    value: 2,
    prependIcon: 'mdi-facebook'
  },
  {
    title: 'Bonbon macaroon gummies pie jelly',
    value: 3,
    prependIcon: 'mdi-twitter'
  },
  {
    title: 'halvah icing marshmallow',
    value: 4,
    prependIcon: 'mdi-instagram'
  }
]
</script>

<template>
  <VList>
    <VListItem
      v-for="item in items"
      :key="item.title"
      :value="item.value"
      rounded="xl"
    >
      <template #prepend>
        <VIcon
          :icon="item.prependIcon"
          class="me-3"
        />
      </template>

      <VListItemTitle>
        {{ item.title }}
      </VListItemTitle>
    </VListItem>
  </VList>
</template>
`,
}
