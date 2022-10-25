<script setup>
const props = defineProps({
  mobileNumber: {
    type: String,
    required: false
  },
  isDialogVisible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits([
  'update:isDialogVisible',
  'submit'
])

const phoneNumber = ref(structuredClone(toRaw(props.mobileNumber)))
const formSubmit = () => {
  if (phoneNumber.value) {
    emit('submit', phoneNumber.value)
    emit('update:isDialogVisible', false)
  }
}
const resetPhoneNumber = () => {
  phoneNumber.value = structuredClone(toRaw(props.mobileNumber))
  emit('update:isDialogVisible', false)
}
</script>

<template>
  <VDialog
    max-width="650"
    :model-value="props.isDialogVisible"
    @update:model-value="(val) => $emit('update:isDialogVisible', val)"
  >
    <VCard class="pa-5 pa-sm-15">
      <VCardItem>
        <VCardTitle class="text-h5 font-weight-medium text-center">
          Enable One Time Password
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-6">
        <h6 class="text-disabled text-base font-weight-medium mb-3">
          Verify Your Mobile Number for SMS
        </h6>

        <p class="mb-6">
          Enter your mobile phone number with country code and  we will send you a verification code.
        </p>

        <VForm @submit.prevent="() => {}">
          <VTextField
            v-model="phoneNumber"
            dirty
            name="mobile"
            type="number"
            prefix="+1"
            label="Phone Number"
            placeholder="202 555 0111"
            class="mb-4"
          />

          <div class="d-flex flex-wrap justify-center gap-4">
            <VBtn
              type="submit"
              @click="formSubmit"
            >
              Submit
            </VBtn>
            <VBtn
              color="secondary"
              variant="tonal"
              @click="resetPhoneNumber"
            >
              Cancel
            </VBtn>
          </div>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
