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

const emailFrom = ref('shelbyComapny@email.com')
const emailTo = ref('qConsolidated@email.com')
const invoiceSubject = ref('Invoice of purchased Admin Templates')
const paymentMessage = ref(`Dear Queen Consolidated,

Thank you for your business, always a pleasure to work with you!

We have generated a new invoice in the amount of $95.59

We would appreciate payment of this invoice by 05/11/2019`)
const onSubmit = () => {
  emit('update:isDrawerOpen', false)
  emit('submit', {
    emailFrom: emailFrom.value,
    emailTo: emailTo.value,
    invoiceSubject: invoiceSubject.value,
    paymentMessage: paymentMessage.value
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
      <VCardTitle class="d-flex align-center bg-var-theme-background">
        <span>Send Invoice</span>
        <VSpacer />
        <VBtn
          size="small"
          color="secondary"
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
                v-model="emailFrom"
                label="Form"
              />
            </VCol>

            <VCol cols="12">
              <VTextField
                v-model="emailTo"
                label="To"
              />
            </VCol>

            <VCol cols="12">
              <VTextField
                v-model="invoiceSubject"
                label="Subject"
              />
            </VCol>

            <VCol cols="12">
              <VTextarea
                v-model="paymentMessage"
                rows="10"
                label="Message"
              />
            </VCol>

            <VCol cols="12">
              <div class="mb-6">
                <VChip
                  label
                  color="primary"
                  size="small"
                >
                  <VIcon
                    start
                    icon="mdi-link"
                  />
                  Invoice Attached
                </VChip>
              </div>
              <VBtn
                type="submit"
                class="me-3"
              >
                Send
              </VBtn>

              <VBtn
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
