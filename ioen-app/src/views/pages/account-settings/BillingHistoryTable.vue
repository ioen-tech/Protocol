<script setup>
import { useInvoiceStore } from '@/views/apps/invoice/useInvoiceStore'
import { avatarText } from '@core/utils/formatters'

const invoiceListStore = useInvoiceStore()
const searchQuery = ref('')
const selectedStatus = ref()
const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPage = ref(1)
const totalInvoices = ref(0)
const invoices = ref([])
const selectedRows = ref([])

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

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = invoices.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex = invoices.value.length + (currentPage.value - 1) * rowPerPage.value
  
  return `${ firstIndex }-${ lastIndex } of ${ totalInvoices.value }`
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
    <VCardText class="d-flex align-center flex-wrap gap-3">
      <!-- 👉 Create invoice -->
      <VBtn
        prepend-icon="mdi-plus"
        :to="{ name: 'invoice-add' }"
        class="me-3"
      >
        Create invoice
      </VBtn>

      <VSpacer />

      <div class="d-flex align-center flex-wrap gap-3">
        <!-- 👉 Search  -->
        <div class="invoice-list-search">
          <VTextField
            v-model="searchQuery"
            placeholder="Search Invoice"
            density="compact"
            class="me-3"
          />
        </div>
        <div class="invoice-list-status">
          <VSelect
            v-model="selectedStatus"
            label="Select Status"
            clearable
            clear-icon="mdi-close"
            density="compact"
            :items="['Downloaded', 'Draft', 'Paid', 'Partial Payment', 'Past Due']"
          />
        </div>
      </div>
    </VCardText>

    <VDivider />
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
            ISSUED DATE
          </th>
          <th scope="col">
            BALANCE
          </th>
          <th scope="col">
            <span class="ms-2">ACTIONS</span>
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
                  :size="30"
                  v-bind="props"
                  :color="resolveInvoiceStatusVariantAndIcon(invoice.invoiceStatus).variant"
                  variant="tonal"
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
                size="33"
                variant="tonal"
                :color="resolveInvoiceStatusVariantAndIcon(invoice.invoiceStatus).variant"
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

          <!-- 👉 Date -->
          <td>{{ invoice.issuedDate }}</td>

          <!-- 👉 Balance -->
          <td>
            <VChip v-bind="resolveInvoiceBalanceVariant(invoice.balance, invoice.total).chip">
              {{ resolveInvoiceBalanceVariant(invoice.balance, invoice.total).status }}
            </VChip>
          </td>

          <!-- 👉 Actions -->
          <td style="width: 150px;">
            <VBtn
              icon
              variant="plain"
              color="default"
              size="x-small"
            >
              <VIcon
                icon="mdi-delete-outline"
                :size="24"
              />
            </VBtn>

            <VBtn
              icon
              variant="plain"
              color="default"
              size="x-small"
              :to="{ name: 'invoice-preview-id', params: { id: invoice.id } }"
            >
              <VIcon
                :size="24"
                icon="mdi-eye-outline"
              />
            </VBtn>

            <VBtn
              icon
              variant="plain"
              color="default"
              size="x-small"
            >
              <VIcon
                :size="24"
                icon="mdi-dots-vertical"
              />
              <VMenu activator="parent">
                <VList density="compact">
                  <VListItem value="#">
                    <template #prepend>
                      <VIcon
                        size="24"
                        class="me-3"
                        icon="mdi-download-outline"
                      />
                    </template>

                    <VListItemTitle>Download</VListItemTitle>
                  </VListItem>

                  <VListItem :to="{ name: 'invoice-edit-id', params: { id: invoice.id } }">
                    <template #prepend>
                      <VIcon
                        size="24"
                        class="me-3"
                        icon="mdi-pencil-outline"
                      />
                    </template>

                    <VListItemTitle>Edit</VListItemTitle>
                  </VListItem>
                  <VListItem value="#">
                    <template #prepend>
                      <VIcon
                        size="24"
                        class="me-3"
                        icon="mdi-layers-outline"
                      />
                    </template>

                    <VListItemTitle>Duplicate</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>
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

    <VDivider />

    <!-- SECTION Pagination -->
    <VCardText class="d-flex flex-wrap justify-end gap-4 pa-2">
      <!-- 👉 Rows per page -->
      <div
        class="d-flex align-center me-3"
        style="width: 171px;"
      >
        <span class="text-no-wrap me-3">Rows per page:</span>

        <VSelect
          v-model="rowPerPage"
          variant="plain"
          :items="[10, 20, 30, 50]"
          class="invoice-pagination-select"
        />
      </div>

      <!-- 👉 Pagination and pagination meta -->
      <div class="d-flex align-center">
        <span>{{ paginationData }}</span>

        <VPagination
          v-model="currentPage"
          size="small"
          :total-visible="1"
          :length="totalPage"
          @next="selectedRows = []"
          @prev="selectedRows = []"
        />
      </div>
    </VCardText>
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

<style lang="scss" scope>
.invoice-pagination-select {
  .v-field__input,
  .v-field__append-inner {
    padding-block-start: 0.5rem;
  }
}
</style>
