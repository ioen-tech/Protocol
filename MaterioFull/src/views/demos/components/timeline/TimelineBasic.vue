<script setup>
import avatar1 from '@/assets/images/avatars/avatar-1.png'
import avatar2 from '@/assets/images/avatars/avatar-2.png'
import pdf from '@/assets/images/icons/project-icons/pdf.png'
import pumaShoes from '@/assets/images/pages/puma-shoes.jpeg'
</script>

<template>
  <VCard title="Basic Timeline">
    <VCardText>
      <VTimeline
        side="end"
        align="start"
        line-inset="8"
        truncate-line="start"
        density="compact"
      >
        <!-- SECTION Timeline Item: Flight -->
        <VTimelineItem
          dot-color="error"
          size="x-small"
        >
          <!-- 👉 Header -->
          <div class="d-flex justify-space-between flex-wrap">
            <h6 class="text-sm font-weight-semibold me-3">
              Get on the flight
            </h6>
            <small class="text-xs my-1">Wednesday</small>
          </div>

          <!-- 👉 Content -->
          <p class="mb-1">
            <span>Charles de Gaulle Airport, Paris</span>
            <VIcon
              size="20"
              icon="mdi-arrow-right"
              class="mx-2"
            />
            <span>Heathrow Airport, London</span>
          </p>

          <p>6:30 AM</p>

          <div class="d-flex align-center">
            <img
              :src="pdf"
              width="28"
              class="me-2"
              alt="img"
            >

            <h6 class="font-weight-semibold text-sm">
              booking-card.pdf
            </h6>
          </div>
        </VTimelineItem>
        <!-- !SECTION -->

        <!-- SECTION Timeline Item: Interview Schedule -->
        <VTimelineItem
          size="x-small"
          dot-color="primary"
        >
          <!-- 👉 Header -->
          <div class="d-flex justify-space-between flex-wrap">
            <h6 class="text-sm font-weight-semibold me-3">
              Interview Schedule
            </h6>
            <small class="text-xs text-no-wrap my-1">April, 18</small>
          </div>

          <p class="mb-0">
            Bonbon gummies caramels brownie topping fruitcake gingerbread jelly-o marzipan.
          </p>

          <!-- 👉 Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Person -->
          <div class="d-flex justify-space-between align-center flex-wrap">
            <!-- 👉 Avatar & Personal Info -->
            <span class="d-flex align-bottom mt-2">
              <VAvatar
                size="32"
                class="me-2"
                :image="avatar2"
              />
              <div>
                <h6 class="text-sm font-weight-semibold">Rebecca Godman</h6>
                <span>Javascript Developer</span>
              </div>
            </span>

            <!-- 👉 Person Actions -->
            <div>
              <VBtn
                size="x-small"
                variant="plain"
                color="secondary"
                icon
                class="me-2"
              >
                <VIcon
                  size="20"
                  icon="mdi-message-outline"
                />
              </VBtn>
              <VBtn
                size="x-small"
                variant="plain"
                color="secondary"
                icon
              >
                <VIcon
                  size="20"
                  icon="mdi-phone"
                />
              </VBtn>
            </div>
          </div>
        </VTimelineItem>
        <!-- !SECTION -->

        <!-- SECTION Timeline Item: Puma Shoes -->
        <VTimelineItem
          size="x-small"
          dot-color="info"
        >
          <div class="d-flex align-start flex-sm-row flex-column mb-3">
            <VImg
              height="100"
              width="100"
              :src="pumaShoes"
              class="rounded me-4"
            />

            <div>
              <!-- Header -->
              <div class="d-flex justify-space-between flex-wrap">
                <h6 class="font-weight-semibold text-sm me-3">
                  Sold Puma POPX Blue Color
                </h6>
                <small class="text-xs text-no-wrap my-1">January, 10</small>
              </div>
              <span>PUMA presents the latest shoes from its collection. Light &amp; comfortable made with highly durable material.</span>
            </div>
          </div>

          <!-- 👉 Timeline Item: Meta Content -->
          <div class="d-flex justify-space-between flex-column flex-sm-row gap-3">
            <div class="text-sm-center">
              <h6 class="text-base font-weight-semibold mb-1">
                Customer
              </h6>
              <span class="text-xs">Micheal Scott</span>
            </div>
            <div class="text-sm-center">
              <h6 class="text-base font-weight-semibold mb-1">
                Price
              </h6>
              <span class="text-xs">$375.00</span>
            </div>
            <div class="text-sm-center">
              <h6 class="text-base font-weight-semibold mb-1">
                Quantity
              </h6>
              <span class="text-xs">1</span>
            </div>
          </div>
        </VTimelineItem>
        <!-- !SECTION -->

        <!-- SECTION Design Review -->
        <VTimelineItem
          size="x-small"
          dot-color="success"
        >
          <!-- 👉 Header -->
          <div class="d-flex justify-space-between flex-wrap">
            <h6 class="text-sm font-weight-semibold me-3">
              Design Review
            </h6>
            <small class="text-xs text-no-wrap my-1">September, 20</small>
          </div>

          <!-- 👉 Content -->
          <p>
            Weekly review of freshly prepared design for our new application.
          </p>
          <div class="d-flex align-center">
            <VAvatar
              size="32"
              :image="avatar1"
              class="me-2"
            />
            <h6 class="text-sm font-weight-semibold">
              John Doe (Client)
            </h6>
          </div>
        </VTimelineItem>
        <!-- !SECTION -->
      </VTimeline>
    </VCardText>
  </VCard>
</template>
