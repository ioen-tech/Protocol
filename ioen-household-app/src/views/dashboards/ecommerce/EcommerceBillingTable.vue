<script setup>
import { useInvoiceStore } from '@/views/apps/invoice/useInvoiceStore'
import { avatarText } from '@core/utils/formatters'

const invoiceListStore = useInvoiceStore()
const searchQuery = ref('')
const selectedStatus = ref('')
const rowPerPage = ref(8)
const currentPage = ref(1)
const totalPage = ref(1)
const totalInvoices = ref(0)
const invoices = ref([])

// 👉 Fetch Invoices
watchEffect(() => {
  invoiceListStore.fetchInvoices({
    q: searchQuery.value,
    status: selectedStatus.value,
    perPage: rowPerPage.value,
    currentPage: currentPage.value
  }).then(response => {
    invoices.value = response.data.invoices
    totalPage.value = response.data.totalPage
    totalInvoices.value = response.data.totalInvoices
  }).catch(error => {
    console.log(error)
  })
})

// 👉 Fetch Invoices
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

// 👉 Invoice balance variant resolver
const resolveInvoiceBalanceVariant = (balance, total) => {
  if (balance === total)
    return {
      status: 'Unpaid',
      chip: { color: 'error' }
    }
  if (balance === 0)
    return {
      status: 'Paid',
      chip: { color: 'success' }
    }
  
  return {
    status: balance,
    chip: { variant: 'text' }
  }
}
const resolveInvoiceStatusVariantAndIcon = status => {
  if (status === 'Partial Payment')
    return {
      variant: 'warning',
      icon: 'mdi-chart-timeline-variant'
    }
  if (status === 'Paid')
    return {
      variant: 'success',
      icon: 'mdi-check'
    }
  if (status === 'Downloaded')
    return {
      variant: 'info',
      icon: 'mdi-arrow-down'
    }
  if (status === 'Draft')
    return {
      variant: 'secondary',
      icon: 'mdi-content-save-outline'
    }
  if (status === 'Sent')
    return {
      variant: 'primary',
      icon: 'mdi-email-outline'
    }
  if (status === 'Past Due')
    return {
      variant: 'error',
      icon: 'mdi-alert-circle-outline'
    }
  
  return {
    variant: 'secondary',
    icon: 'mdi-close'
  }
}
</script>

<template>
  <VCard
    v-if="invoices"
    id="invoice-list"
  >
    <!-- SECTION Table -->
    <VTable class="text-no-wrap invoice-list-table">
      <!-- 👉 Table head -->
      <thead>
        <tr>
          <th scope="col">
            #ID
          </th>
          <th scope="col">
            <VIcon icon="mdi-trending-up" />
          </th>
          <th scope="col">
            CLIENT
          </th>
          <th scope="col">
            TOTAL
          </th>
          <th scope="col">
            BALANCE
          </th>
        </tr>
      </thead>

      <!-- 👉 Table Body -->
      <tbody>
        <tr
          v-for="invoice in invoices"
          :key="invoice.id"
        >
          <!-- 👉 Id -->
          <td>
            <RouterLink :to="{ name: 'invoice-preview-id', params: { id: invoice.id } }">
              #{{ invoice.id }}
            </RouterLink>
          </td>

          <!-- 👉 Trending -->
          <td>
            <VTooltip>
              <template #activator="{ props }">
                <VAvatar
                  :size="34"
                  v-bind="props"
                  variant="tonal"
                  :color="resolveInvoiceStatusVariantAndIcon(invoice.invoiceStatus).variant"
                >
                  <VIcon
                    :size="20"
                    :icon="resolveInvoiceStatusVariantAndIcon(invoice.invoiceStatus).icon"
                  />
                </VAvatar>
              </template>

              <p class="mb-0">
                {{ invoice.invoiceStatus }}
              </p>
              <p class="mb-0">
                Balance: {{ invoice.balance }}
              </p>
              <p class="mb-0">
                Due date: {{ invoice.dueDate }}
              </p>
            </VTooltip>
          </td>

          <!-- 👉 Client Avatar and Email -->
          <td>
            <div class="d-flex align-center">
              <VAvatar
                size="34"
                :color="resolveInvoiceStatusVariantAndIcon(invoice.invoiceStatus).variant"
                variant="tonal"
                class="me-3"
              >
                <VImg
                  v-if="invoice.avatar.length"
                  :src="invoice.avatar"
                />
                <span v-else>{{ avatarText(invoice.client.name) }}</span>
              </VAvatar>

              <div class="d-flex flex-column">
                <h6 class="text-sm font-weight-medium mb-0">
                  {{ invoice.client.name }}
                </h6>
                <span class="text-caption">{{ invoice.client.companyEmail }}</span>
              </div>
            </div>
          </td>

          <!-- 👉 total -->
          <td>${{ invoice.total }}</td>

          <!-- 👉 Balance -->
          <td>
            <VChip
              v-bind="resolveInvoiceBalanceVariant(invoice.balance, invoice.total).chip"
              size="small"
            >
              {{ resolveInvoiceBalanceVariant(invoice.balance, invoice.total).status }}
            </VChip>
          </td>
        </tr>
      </tbody>

      <!-- 👉 table footer  -->
      <tfoot v-show="!invoices.length">
        <tr>
          <td
            colspan="8"
            class="text-center text-body-1"
          >
            No data available
          </td>
        </tr>
      </tfoot>
    </VTable>
    <!-- !SECTION -->
  </VCard>
</template>

<style lang="scss">
#invoice-list {
  .invoice-list-status {
    inline-size: 15rem;
  }

  .invoice-list-search {
    inline-size: 12rem;
  }
}
</style>
