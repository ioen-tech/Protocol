<script setup>
import avatar1 from '@/assets/images/avatars/avatar-1.png'
import avatar2 from '@/assets/images/avatars/avatar-2.png'
import avatar3 from '@/assets/images/avatars/avatar-3.png'
import avatar4 from '@/assets/images/avatars/avatar-4.png'
import avatar7 from '@/assets/images/avatars/avatar-7.png'
import avatar8 from '@/assets/images/avatars/avatar-8.png'

const meetingSchedules = [
  {
    profile: avatar4,
    with: 'Call with Woods',
    dateTime: '21 Jul | 08:20-10:30',
    type: 'Business'
  },
  {
    profile: avatar8,
    with: 'Call with hilda',
    dateTime: '24 Jul | 11:30-12:00',
    type: 'Meditation'
  },
  {
    profile: avatar7,
    with: 'Conference call',
    dateTime: '28 Jul | 05:00-6:45',
    type: 'Meditation'
  },
  {
    profile: avatar3,
    with: 'Meeting with Mark',
    dateTime: '03 Aug | 07:00-8:30',
    type: 'Meetup'
  },
  {
    profile: avatar2,
    with: 'Meeting in Oakland',
    dateTime: '14 Aug | 04:15-05:30',
    type: 'Business'
  },
  {
    profile: avatar1,
    with: 'Meeting with Carl',
    dateTime: '05 Oct | 10:00-12:45',
    type: 'Party'
  }
]
const meetingTypeUiColors = {
  Business: 'primary',
  Meditation: 'success',
  Meetup: 'secondary',
  Party: 'warning'
}
</script>

<template>
  <VCard>
    <!-- SECTION Card Header and Menu -->
    <VCardItem>
      <!-- 👉 Title -->
      <VCardTitle>Meeting Schedule</VCardTitle>

      <!-- 👉 menu -->

      <template #append>
        <div class="me-n3">
          <VBtn
            icon
            size="x-small"
            variant="text"
            color="default"
          >
            <VIcon
              size="24"
              icon="mdi-dots-vertical"
            />
          </VBtn>
        </div>
      </template>
    </VCardItem>
    <!-- !SECTION -->

    <!-- SECTION Meting Schedule -->
    <VCardText>
      <VList
        lines="two"
        class="card-list"
      >
        <VListItem
          v-for="meeting in meetingSchedules"
          :key="meeting.type"
        >
          <!-- 👉 Avatar -->
          <template #prepend>
            <VAvatar
              start
              :size="38"
              :image="meeting.profile"
            />
          </template>

          <!-- 👉 Title and Subtitle -->

          <VListItemTitle class="text-sm font-weight-semibold mb-1">
            {{ meeting.with }}
          </VListItemTitle>
          <VListItemSubtitle class="text-no-wrap text-xs">
            <VIcon
              start
              size="16"
              icon="mdi-calendar-blank"
            />
            <span>{{ meeting.dateTime }}</span>
          </VListItemSubtitle>

          <!-- 👉 Business Types -->
          <template #append>
            <VListItemAction>
              <VChip
                size="small"
                :color="meetingTypeUiColors[meeting.type]"
              >
                {{ meeting.type }}
              </VChip>
            </VListItemAction>
          </template>
        </VListItem>
      </VList>
    </VCardText>
    <!-- !SECTION -->
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 1.5625rem;
}
</style>
