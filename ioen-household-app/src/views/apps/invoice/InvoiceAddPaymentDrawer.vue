<script setup>
const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'submit'
])

const invoiceBalance = ref('')
const paymentAmount = ref('')
const paymentDate = ref('')
const paymentMethod = ref()
const paymentNote = ref('')
const onSubmit = () => {
  emit('update:isDrawerOpen', false)
  emit('submit', {
    invoiceBalance: invoiceBalance.value,
    paymentAmount: paymentAmount.value,
    paymentDate: paymentDate.value,
    paymentMethod: paymentMethod.value,
    paymentNote: paymentNote.value
  })
}
</script>

<template>
  <VNavigationDrawer
    temporary
    location="end"
    :width="400"
    :model-value="props.isDrawerOpen"
    @update:model-value="(val) => $emit('update:isDrawerOpen', val)"
  >
    <VCard flat>
      <VCardTitle class="d-flex align-center justify-space-between bg-var-theme-background">
        <span>Add Payment</span>
        <VBtn
          size="small"
          color="default"
          variant="text"
          icon="mdi-close"
          @click="$emit('update:isDrawerOpen', false)"
        />
      </VCardTitle>

      <VCardText>
        <VForm
          class="mt-8"
          @submit.prevent="onSubmit"
        >
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="invoiceBalance"
                label="Invoice Balance"
              />
            </VCol>

            <VCol cols="12">
              <VTextField
                v-model="paymentAmount"
                label="Payment Amount"
              />
            </VCol>

            <VCol cols="12">
              <AppDateTimePicker
                v-model="paymentDate"
                label="Payment Date"
              />
            </VCol>

            <VCol cols="12">
              <VSelect
                v-model="paymentMethod"
                label="Select Payment Method"
                :items="['Cash', 'Bank Transfer', 'Debit', 'Credit', 'Paypal']"
              />
            </VCol>

            <VCol cols="12">
              <VTextarea
                v-model="paymentNote"
                label="Internal Payment Note"
              />
            </VCol>

            <VCol cols="12">
              <VBtn
                type="submit"
                class="me-3"
              >
                Send
              </VBtn>

              <VBtn
                type="reset"
                color="secondary"
                variant="tonal"
                @click="$emit('update:isDrawerOpen', false)"
              >
                Cancel
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VNavigationDrawer>
</template>
