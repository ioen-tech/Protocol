<script setup>
import InvoiceProductEdit from './InvoiceProductEdit.vue'
import { useInvoiceStore } from './useInvoiceStore'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

const props = defineProps({
  data: {
    type: null,
    required: true
  }
})

const invoiceListStore = useInvoiceStore()

// 👉 Clients
const clients = ref([])

// 👉 fetchClients
invoiceListStore.fetchClients().then(response => {
  clients.value = response.data
}).catch(err => {
  console.log(err)
})

// 👉 Add item function
const addItem = () => {

  // eslint-disable-next-line vue/no-mutating-props
  props.data.purchasedProducts.push({
    title: 'App Design',
    cost: 24,
    hours: 1,
    description: 'Designed UI kit & app pages.'
  })
}
const removeProduct = id => {

  // eslint-disable-next-line vue/no-mutating-props
  props.data.purchasedProducts.splice(id, 1)
}
</script>

<template>
  <VCard>
    <!-- SECTION Header -->
    <!--  eslint-disable vue/no-mutating-props -->
    <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row">
      <!-- 👉 Left Content -->
      <div class="mb-6">
        <div class="d-flex align-center mb-6">
          <!-- 👉 Logo -->
          <VNodeRenderer
            :nodes="themeConfig.app.logo"
            class="me-3"
          />

          <!-- 👉 Title -->
          <h6 class="font-weight-semibold text-xl text-uppercase">
            {{ themeConfig.app.title }}
          </h6>
        </div>

        <!-- 👉 Address -->
        <p class="mb-0">
          Office 149, 450 South Brand Brooklyn
        </p>
        <p class="mb-0">
          San Diego County, CA 91905, USA
        </p>
        <p class="mb-0">
          +1 (123) 456 7891, +44 (876) 543 2198
        </p>
      </div>

      <!-- 👉 Right Content -->
      <div class="mb-3">
        <!-- 👉 Invoice Id -->
        <h6 class="d-flex align-center font-weight-medium justify-sm-end text-xl mb-3">
          <span class="me-3">Invoice:</span>
          <span>
            <VTextField
              v-model="props.data.invoice.id"
              disabled
              prefix="#"
              density="compact"
              style="width: 8rem;"
            />
          </span>
        </h6>

        <!-- 👉 Issue Date -->
        <p class="d-flex align-center justify-sm-end mb-3">
          <span class="me-3">Date Issued:</span>
          <span>
            <AppDateTimePicker
              v-model="props.data.invoice.issuedDate"
              density="compact"
              style="width: 8.5rem;"
            />
          </span>
        </p>

        <!-- 👉 Due Date -->
        <p class="d-flex align-center justify-sm-end mb-0">
          <span class="me-3">Due Date:</span>
          <span>
            <AppDateTimePicker
              v-model="props.data.invoice.dueDate"
              density="compact"
              style="width: 8.5rem;"
            />
          </span>
        </p>
      </div>
    </VCardText>
    <!-- !SECTION -->

    <VDivider class="mb-2" />

    <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row">
      <div
        class="mb-4 mb-sm-0"
        style="width: 15.5rem;"
      >
        <h6 class="text-sm font-weight-medium mb-3">
          Invoice To:
        </h6>

        <VSelect
          v-model="props.data.invoice.client"
          :items="clients"
          item-title="name"
          item-value="name"
          placeholder="Select Customer"
          return-object
          class="mb-6"
          density="compact"
        />
        <p class="mb-1">
          {{ props.data.invoice.client.name }}
        </p>
        <p class="mb-1">
          {{ props.data.invoice.client.company }}
        </p>
        <p
          v-if="props.data.invoice.client.address"
          class="mb-1"
        >
          {{ props.data.invoice.client.address }}, {{ props.data.invoice.client.country }}
        </p>
        <p class="mb-1">
          {{ props.data.invoice.client.contact }}
        </p>
        <p class="mb-1">
          {{ props.data.invoice.client.companyEmail }}
        </p>
      </div>

      <div>
        <h6 class="text-sm font-weight-medium mb-3">
          Bill To:
        </h6>

        <table>
          <tbody>
            <tr>
              <td class="pe-6">
                Total Due:
              </td>
              <td>{{ props.data.paymentDetails.totalDue }}</td>
            </tr>
            <tr>
              <td class="pe-6">
                Bank Name:
              </td>
              <td>{{ props.data.paymentDetails.bankName }}</td>
            </tr>
            <tr>
              <td class="pe-6">
                Country:
              </td>
              <td>{{ props.data.paymentDetails.country }}</td>
            </tr>
            <tr>
              <td class="pe-6">
                IBAN:
              </td>
              <td>{{ props.data.paymentDetails.iban }}</td>
            </tr>
            <tr>
              <td class="pe-6">
                SWIFT Code:
              </td>
              <td>{{ props.data.paymentDetails.swiftCode }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </VCardText>

    <VDivider />

    <!-- 👉 Add purchased products -->
    <VCardText class="add-products-form">
      <div
        v-for="(product, index) in props.data.purchasedProducts"
        :key="product.title"
        class="mb-4"
      >
        <InvoiceProductEdit
          :id="index"
          :data="product"
          @remove-product="removeProduct"
        />
      </div>

      <VBtn
        size="small"
        prepend-icon="mdi-plus"
        @click="addItem"
      >
        Add Item
      </VBtn>
    </VCardText>

    <VDivider class="my-2" />

    <!-- 👉 Total Amount -->
    <VCardText class="d-flex justify-space-between flex-wrap flex-column flex-sm-row">
      <div class="mb-6 mb-sm-0">
        <div class="d-flex align-center mb-4">
          <h6 class="text-sm font-weight-semibold me-2">
            Salesperson:
          </h6>
          <VTextField
            v-model="props.data.salesperson"
            style="width: 8rem;"
          />
        </div>

        <VTextField
          v-model="props.data.thanksNote"
          placeholder="Thanks for your business"
        />
      </div>

      <div>
        <table class="w-100">
          <tr>
            <td class="pe-16">
              Subtotal:
            </td>
            <td :class="$vuetify.rtl.isRtl ? 'text-start' : 'text-end'">
              <h6 class="text-sm">
                $1800
              </h6>
            </td>
          </tr>
          <tr>
            <td class="pe-16">
              Discount:
            </td>
            <td :class="$vuetify.rtl.isRtl ? 'text-start' : 'text-end'">
              <h6 class="text-sm">
                $28
              </h6>
            </td>
          </tr>
          <tr>
            <td class="pe-16">
              Tax:
            </td>
            <td :class="$vuetify.rtl.isRtl ? 'text-start' : 'text-end'">
              <h6 class="text-sm">
                21%
              </h6>
            </td>
          </tr>
        </table>

        <VDivider class="mt-4 mb-3" />

        <table class="w-100">
          <tr>
            <td>Total:</td>
            <td :class="$vuetify.rtl.isRtl ? 'text-start' : 'text-end'">
              <h6 class="text-sm">
                $1690
              </h6>
            </td>
          </tr>
        </table>
      </div>
    </VCardText>

    <VDivider class="mt-2" />

    <VCardText>
      <p class="font-weight-semibold mb-2">
        Note:
      </p>
      <VTextarea
        v-model="props.data.note"
        :rows="2"
      />
    </VCardText>
  </VCard>
</template>
