<script setup>
import avatar1 from '@/assets/images/avatars/avatar-1.png'
import timelineCardHeader from '@/assets/images/cards/timeline-card-header.png'
import pdf from '@/assets/images/icons/project-icons/pdf.png'
</script>

<template>
  <VCard>
    <VImg
      cover
      height="210"
      :src="timelineCardHeader"
    />

    <VCardItem>
      <VCardTitle>Activity Timeline</VCardTitle>
    </VCardItem>

    <VCardText>
      <VTimeline
        side="end"
        align="start"
        line-inset="8"
        truncate-line="both"
        density="compact"
      >
        <VTimelineItem
          dot-color="error"
          size="x-small"
        >
          <div class="d-flex justify-space-between flex-wrap">
            <h6 class="text-base font-weight-semibold me-3">
              8 Invoices have been paid
            </h6>
            <small class="text-xs text-disabled my-1">Wednesday</small>
          </div>

          <p>Invoices have been paid to the company.</p>

          <div class="d-flex align-center">
            <img
              :src="pdf"
              width="20"
              class="me-2"
              alt="img"
            >

            <h6 class="font-weight-semibold text-sm">
              invoice.pdf
            </h6>
          </div>
        </VTimelineItem>

        <VTimelineItem
          dot-color="primary"
          size="x-small"
        >
          <div class="d-flex justify-space-between flex-wrap">
            <h6 class="text-base font-weight-semibold me-3">
              Create a new project for client 😎
            </h6>
            <small class="text-xs text-disabled my-1">April, 18</small>
          </div>

          <p>Invoices have been paid to the company.</p>

          <div class="d-flex align-center">
            <VAvatar
              size="24"
              :image="avatar1"
              class="me-3"
            />

            <span class="font-weight-semibold text-sm">
              John Doe (Client)
            </span>
          </div>
        </VTimelineItem>

        <VTimelineItem
          dot-color="info"
          size="x-small"
        >
          <div class="d-flex justify-space-between flex-wrap">
            <h6 class="text-base font-weight-semibold me-3">
              Order #37745 from September
            </h6>
            <small class="text-xs text-disabled my-1">January, 10</small>
          </div>

          <p class="mb-0">
            Invoices have been paid to the company.
          </p>
        </VTimelineItem>
      </VTimeline>
    </VCardText>
  </VCard>
</template>
