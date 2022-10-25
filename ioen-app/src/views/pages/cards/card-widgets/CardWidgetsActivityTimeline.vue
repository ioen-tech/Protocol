<script setup>
import avatar2 from '@/assets/images/avatars/avatar-2.png'
</script>

<template>
  <VCard title="Activity Timeline">
    <VCardText>
      <VTimeline
        density="compact"
        align="start"
        line-inset="8"
        truncate-line="both"
      >
        <VTimelineItem
          dot-color="error"
          size="x-small"
        >
          <div class="d-flex justify-space-between align-center flex-wrap">
            <h4 class="text-base font-weight-semibold me-1">
              8 Invoices have been paid
            </h4>
            <small class="text-xs text-no-wrap">Wednesday</small>
          </div>
          <p class="mb-0">
            Invoices have been paid to the company.
          </p>
          <span class="d-flex align-center mt-2">
            <VIcon
              color="error"
              icon="mdi-file-pdf-box"
              class="me-1"
            />
            <span class="font-weight-semibold text-sm">invoice.pdf</span>
          </span>
        </VTimelineItem>

        <VTimelineItem
          dot-color="primary"
          size="x-small"
        >
          <div class="d-flex justify-space-between align-center flex-wrap">
            <h4 class="text-base font-weight-medium me-1">
              Create a new project for client 😎
            </h4>
            <small class="text-xs text-no-wrap">April, 18</small>
          </div>

          <p class="mb-1">
            Invoices have been paid to the company.
          </p>

          <div class="d-flex align-center mt-3">
            <VAvatar
              size="24"
              class="me-2"
              :image="avatar2"
            />
            <div>
              <p class="font-weight-medium mb-0">
                John Doe (Client)
              </p>
            </div>
          </div>
        </VTimelineItem>

        <VTimelineItem
          dot-color="info"
          size="x-small"
        >
          <div class="d-flex justify-space-between align-center flex-wrap">
            <h4 class="text-base font-weight-medium me-1">
              Order #37745 from September
            </h4>
            <small class="text-xs text-no-wrap">January, 10</small>
          </div>
          <p class="mb-0">
            Invoices have been paid to the company.
          </p>
        </VTimelineItem>
      </VTimeline>
    </VCardText>
  </VCard>
</template>
