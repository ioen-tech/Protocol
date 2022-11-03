<script setup>
const props = defineProps({
  cardDetails: {
    type: Object,
    required: false,
    default: () => ({
      number: '',
      name: '',
      expiry: '',
      cvv: '',
      isPrimary: false,
      type: ''
    })
  },
  isDialogVisible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits([
  'submit',
  'update:isDialogVisible'
])

const cardDetails = ref(structuredClone(toRaw(props.cardDetails)))
watch(props, () => {
  cardDetails.value = structuredClone(toRaw(props.cardDetails))
})
const formSubmit = () => {
  emit('submit', cardDetails.value)
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 650 "
    :model-value="props.isDialogVisible"
    @update:model-value="val => $emit('update:isDialogVisible', val)"
  >
    <VCard class="pa-5 pa-sm-15">
      <!-- 👉 Title -->
      <VCardItem class="text-center">
        <VCardTitle class="text-h5 font-weight-medium mb-4">
          {{ props.cardDetails.name ? 'Edit Card' : 'Add Card' }}
        </VCardTitle>
        <VCardSubtitle>
          {{ props.cardDetails.name ? 'Edit your saved card details' : 'Add your saved card details' }}
        </VCardSubtitle>
      </VCardItem>

      <VCardText class="mt-6">
        <VForm @submit.prevent="() => {}">
          <VRow>
            <!-- 👉 Card Number -->
            <VCol cols="12">
              <VTextField
                v-model="cardDetails.number"
                label="Card Number"
                type="number"
              />
            </VCol>

            <!-- 👉 Card Name -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="cardDetails.name"
                label="Name"
              />
            </VCol>

            <!-- 👉 Card Expiry -->
            <VCol
              cols="6"
              md="3"
            >
              <VTextField
                v-model="cardDetails.expiry"
                label="Expiry Date"
              />
            </VCol>

            <!-- 👉 Card CVV -->
            <VCol
              cols="6"
              md="3"
            >
              <VTextField
                v-model="cardDetails.cvv"
                type="password"
                label="CVV Code"
              />
            </VCol>

            <!-- 👉 Card Primary Set -->
            <VCol cols="12">
              <VSwitch
                v-model="cardDetails.isPrimary"
                label="Set as primary card"
              />
            </VCol>

            <!-- 👉 Card actions -->
            <VCol
              cols="12"
              class="d-flex flex-wrap justify-center gap-4"
            >
              <VBtn
                type="submit"
                @click="formSubmit"
              >
                Submit
              </VBtn>
              <VBtn
                color="secondary"
                variant="tonal"
                @click="$emit('update:isDialogVisible', false)"
              >
                Cancel
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
