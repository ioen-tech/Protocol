<script setup>
import BillingHistoryTable from './BillingHistoryTable.vue'
import mastercard from '@/assets/images/icons/payments/mastercard.png'
import visa from '@/assets/images/icons/payments/visa.png'

const selectedPaymentMethod = ref('credit-debit-atm-card')
const isPricingPlanDialogVisible = ref(false)
const isConfirmDialogVisible = ref(false)
const isCardEditDialogVisible = ref(false)
const isCardDetailSaveBilling = ref(false)
const creditCards = [
  {
    name: 'Tom McBride',
    number: '5531234567899856',
    expiry: '12/23',
    isPrimary: true,
    type: 'visa',
    cvv: '456',
    image: visa
  },
  {
    name: 'Mildred Wagner',
    number: '4851234567895896',
    expiry: '10/27',
    isPrimary: false,
    type: 'mastercard',
    cvv: '123',
    image: mastercard
  }
]
const countryList = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'New Zealand',
  'India',
  'Russia',
  'China',
  'Japan'
]
const currentCardDetails = ref()
const openEditCardDialog = cardDetails => {
  currentCardDetails.value = cardDetails
  isCardEditDialogVisible.value = true
}
</script>

<template>
  <VRow>
    <!-- 👉 Current Plan -->
    <VCol cols="12">
      <VCard title="Current Plan">
        <VCardText>
          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <div>
                <div class="mb-6">
                  <h3 class="text-base font-weight-medium mb-2">
                    Your Current Plan is Basic
                  </h3>
                  <p class="text-base">
                    A simple start for everyone
                  </p>
                </div>

                <div class="mb-6">
                  <h3 class="text-base font-weight-medium mb-2">
                    Active until Dec 09, 2021
                  </h3>
                  <p class="text-base">
                    We will send you a notification upon Subscription expiration
                  </p>
                </div>

                <div>
                  <h3 class="text-base font-weight-medium mb-2">
                    <span class="me-3">$199 Per Month</span>
                    <VChip
                      color="primary"
                      size="small"
                      label
                    >
                      Popular
                    </VChip>
                  </h3>
                  <p class="text-base mb-0">
                    Standard plan for small to medium businesses
                  </p>
                </div>
              </div>
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <VAlert
                color="warning"
                variant="tonal"
              >
                <VAlertTitle class="mb-1">
                  We need your attention!
                </VAlertTitle>

                <span>Your plan requires update</span>
              </VAlert>

              <!-- progress -->
              <div class="d-flex font-weight-bold text-base mt-8 mb-2">
                <span>Days</span>
                <VSpacer />
                <span>24 of 30 Days</span>
              </div>
              <VProgressLinear
                color="primary"
                rounded
                height="12"
                model-value="75"
              />
              <p class="text-base mt-2">
                6 days remaining until your plan requires update
              </p>
            </VCol>

            <VCol cols="12">
              <div class="d-flex flex-wrap gap-y-4">
                <VBtn
                  class="me-3"
                  @click="isPricingPlanDialogVisible = true"
                >
                  upgrade plan
                </VBtn>

                <VBtn
                  color="secondary"
                  variant="tonal"
                  @click="isConfirmDialogVisible = true"
                >
                  Cancel Subscription
                </VBtn>
              </div>
            </VCol>
          </VRow>

          <!-- 👉 Confirm Dialog -->
          <ConfirmDialog
            v-model:isDialogVisible="isConfirmDialogVisible"
            confirmation-msg="Are you sure to cancel your subscription?"
          />

          <!-- 👉 plan and pricing dialog -->
          <VDialog
            v-model="isPricingPlanDialogVisible"
            class="v-dialog-xl"
          >
            <VCard class="pricing-dialog pa-5 pa-sm-15">
              <VCardText>
                <AppPricing lg="4" />
              </VCardText>
            </VCard>
          </VDialog>
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Payment Methods -->
    <VCol cols="12">
      <VCard title="Payment Methods">
        <VCardText>
          <VForm>
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <VForm @submit.prevent="() => {}">
                  <VRow>
                    <!-- 👉 card type switch -->
                    <VCol cols="12">
                      <VRadioGroup
                        v-model="selectedPaymentMethod"
                        inline
                      >
                        <VRadio
                          value="credit-debit-atm-card"
                          label="Credit/Debit/ATM Card"
                          color="primary"
                        />
                        <VRadio
                          value="paypal-account"
                          label="Paypal account"
                          color="primary"
                        />
                      </VRadioGroup>
                    </VCol>

                    <!-- 👉 Card Number -->
                    <VCol cols="12">
                      <VTextField
                        label="Card Number"
                        :model-value="135632156548789"
                        type="number"
                      />
                    </VCol>

                    <!-- 👉 Name -->
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        label="Name"
                        model-value="john Doe"
                      />
                    </VCol>

                    <!-- 👉 Expiry date -->
                    <VCol
                      cols="6"
                      md="3"
                    >
                      <VTextField
                        label="Expiry Date"
                        model-value="0524"
                      />
                    </VCol>

                    <!-- 👉 Cvv code -->
                    <VCol
                      cols="6"
                      md="3"
                    >
                      <VTextField
                        type="password"
                        label="CVV Code"
                        model-value="0524"
                      />
                    </VCol>

                    <!-- 👉 Future Billing switch -->
                    <VCol cols="12">
                      <VSwitch
                        v-model="isCardDetailSaveBilling"
                        density="compact"
                        label="Save card for future billing?"
                      />
                    </VCol>

                    <!-- 👉 Payment method action button -->
                    <VCol
                      cols="12"
                      class="d-flex flex-wrap gap-4"
                    >
                      <VBtn type="submit">
                        Save changes
                      </VBtn>
                      <VBtn
                        type="reset"
                        color="secondary"
                        variant="tonal"
                      >
                        Reset
                      </VBtn>
                    </VCol>
                  </VRow>
                </VForm>
              </VCol>

              <!-- 👉 Saved Cards -->
              <VCol
                cols="12"
                md="6"
              >
                <p class="text-base font-weight-medium">
                  My Cards
                </p>

                <div class="d-flex flex-column gap-y-4">
                  <VCard
                    v-for="card in creditCards"
                    :key="card.name"
                    class="bg-var-theme-background"
                    flat
                  >
                    <VCardText class="d-flex flex-sm-row flex-column">
                      <div class="text-no-wrap">
                        <VImg
                          :src="card.image"
                          width="46"
                        />
                        <h4 class="my-3">
                          {{ card.name }}
                          <VChip
                            v-if="card.isPrimary"
                            label
                            color="primary"
                            size="small"
                          >
                            Primary
                          </VChip>
                        </h4>
                        <span class="text-base">**** **** **** {{ card.number.substring(card.number.length - 4) }}</span>
                      </div>

                      <VSpacer />

                      <div class="d-flex flex-column text-sm-end">
                        <div class="d-flex flex-wrap gap-4 order-sm-0 order-1">
                          <VBtn
                            variant="tonal"
                            @click="openEditCardDialog(card)"
                          >
                            Edit
                          </VBtn>
                          <VBtn
                            color="secondary"
                            variant="tonal"
                          >
                            Delete
                          </VBtn>
                        </div>
                        <span class="mt-sm-auto mb-sm-0 my-5 order-sm-1 order-0">Card expires at {{ card.expiry }}</span>
                      </div>
                    </VCardText>
                  </VCard>
                </div>

                <!-- 👉 Add Edit Card Dialog -->
                <CardAddEditDialog
                  v-model:isDialogVisible="isCardEditDialogVisible"
                  :card-details="currentCardDetails"
                  class="v-dialog-lg"
                />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Billing Address -->
    <VCol cols="12">
      <VCard title="Billing Address">
        <VCardText>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <!-- 👉 Company name -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField label="Company Name" />
              </VCol>

              <!-- 👉 Billing Email -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField label="Billing Email" />
              </VCol>

              <!-- 👉 Tax ID -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField label="Tax ID" />
              </VCol>

              <!-- 👉 Vat Number -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField label="VAT Number" />
              </VCol>

              <!-- 👉 Mobile -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  dirty
                  label="Phone Number"
                  type="number"
                  prefix="US (+1)"
                />
              </VCol>

              <!-- 👉 Country -->
              <VCol
                cols="12"
                md="6"
              >
                <VSelect
                  label="Country"
                  :items="countryList"
                />
              </VCol>

              <!-- 👉 Billing Address -->
              <VCol cols="12">
                <VTextField label="Billing Address" />
              </VCol>

              <!-- 👉 State -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField label="State" />
              </VCol>

              <!-- 👉 Zip Code -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField label="Zip Code" />
              </VCol>

              <!-- 👉 Actions Button -->
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn type="submit">
                  Save changes
                </VBtn>
                <VBtn
                  type="reset"
                  color="secondary"
                  variant="tonal"
                >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Billing History -->
    <VCol cols="12">
      <BillingHistoryTable />
    </VCol>
  </VRow>
</template>

<style lang="scss">
.pricing-dialog {
  .pricing-title {
    font-size: 1.5rem !important;
  }

  .v-card {
    border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    box-shadow: none;
  }
}
</style>
