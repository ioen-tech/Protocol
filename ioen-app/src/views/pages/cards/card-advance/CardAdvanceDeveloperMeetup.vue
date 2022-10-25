<script setup>
import cardMeetup from '@/assets/images/cards/card-meetup.png'

const developerMeetup = [
  {
    icon: 'mdi-clock-outline',
    title: 'Tuesday, 24 january, 10:20 - 12:30',
    subtitle: 'After 1 week'
  },
  {
    icon: 'mdi-map-marker-outline',
    title: 'The Richard NYC',
    subtitle: '1305 Lexington Ave, New York'
  }
]
</script>

<template>
  <VCard>
    <VImg
      cover
      :height="160"
      :src="cardMeetup"
    />

    <VCardText>
      <div class="d-flex align-center pb-4">
        <div class="me-3">
          <VAvatar
            rounded
            size="56"
            color="primary"
            variant="tonal"
          >
            <div class="py-2">
              <p class="text-sm mb-1">
                Jan
              </p>
              <p class="text-xl font-weight-medium mb-0">
                24
              </p>
            </div>
          </VAvatar>
        </div>

        <div>
          <h6 class="text-base mb-1">
            Developer Meetup
          </h6>
          <span class="text-xs text-two-line-ellipsis">The WordPress open source,free software project is the community behind the…</span>
        </div>
      </div>

      <VRow class="border-t border-b ma-0">
        <VCol
          cols="3"
          class="text-center"
        >
          <div class="mb-1">
            <VIcon
              size="24"
              icon="mdi-star-outline"
            />
          </div>

          <span class="text-xs text-no-wrap">
            Interested
          </span>
        </VCol>
        <VCol
          cols="3"
          class="text-center"
        >
          <div class="mb-1">
            <VIcon
              size="24"
              icon="mdi-check-circle-outline"
            />
          </div>

          <span class="text-xs text-no-wrap">
            Joined
          </span>
        </VCol>
        <VCol
          cols="3"
          class="text-center"
        >
          <div class="mb-1">
            <VIcon
              size="24"
              icon="mdi-account-outline"
            />
          </div>

          <span class="text-xs text-no-wrap">
            Invited
          </span>
        </VCol>
        <VCol
          cols="3"
          class="text-center"
        >
          <div class="mb-1">
            <VIcon
              size="24"
              icon="mdi-dots-horizontal"
            />
          </div>

          <span class="text-xs text-no-wrap">
            More
          </span>
        </VCol>
      </VRow>

      <div
        v-for="meetup in developerMeetup"
        :key="meetup.icon"
        class="d-flex align-start pt-3"
      >
        <VIcon
          :icon="meetup.icon"
          class="me-2"
        />
        <div>
          <p class="mb-1">
            {{ meetup.title }}
          </p>
          <span>{{ meetup.subtitle }}</span>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.text-two-line-ellipsis {
  /* stylelint-disable-next-line value-no-vendor-prefix */
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
}
</style>
