<script setup>
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
