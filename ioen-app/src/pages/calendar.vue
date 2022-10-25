<script setup>
import '@fullcalendar/core/vdom'

// Local imports
import FullCalendar from '@fullcalendar/vue3'
import {
  blankEvent,
  useCalendar
} from '@/views/apps/calendar/useCalendar'
import { useCalendarStore } from '@/views/apps/calendar/useCalendarStore'
import { useResponsiveLeftSidebar } from '@core/composable/useResponsiveSidebar'

// Components
import CalendarEventHandler from '@/views/apps/calendar/CalendarEventHandler.vue'

const store = useCalendarStore()

// 👉 Event
const event = ref(structuredClone(blankEvent))
const isEventHandlerSidebarActive = ref(false)
watch(isEventHandlerSidebarActive, val => {
  if (!val)
    event.value = structuredClone(blankEvent)
})
const {isLeftSidebarOpen} = useResponsiveLeftSidebar({ sidebarWidth: 250 })
const {refCalendar, calendarOptions, addEvent, updateEvent, removeEvent} = useCalendar(event, isEventHandlerSidebarActive, isLeftSidebarOpen)

// 👉 Check all
const checkAll = computed({
  get: () => store.selectedCalendars.length === store.availableCalendars.length,
  set: val => {
    if (val)
      store.selectedCalendars = store.availableCalendars.map(i => i.label)
    else if (store.selectedCalendars.length === store.availableCalendars.length)
      store.selectedCalendars = []
  }
})
</script>

<template>
  <div>
    <VCard>
      <!-- `z-index: 0` Allows overlapping vertical nav on calendar -->
      <VLayout style="z-index: 0;">
        <!-- 👉 Navigation drawer -->
        <VNavigationDrawer
          v-model="isLeftSidebarOpen"
          width="250"
          absolute
          touchless
          location="start"
          class="calendar-add-event-drawer"
          :temporary="$vuetify.display.mdAndDown"
        >
          <div class="pa-5 d-flex flex-column gap-y-8">
            <VBtn
              block
              @click="isEventHandlerSidebarActive = true"
            >
              Add event
            </VBtn>
            <div>
              <p class="text-sm text-uppercase text-medium-emphasis mb-3">
                Calendars
              </p>

              <div class="d-flex flex-column calendars-checkbox">
                <VCheckbox
                  v-model="checkAll"
                  label="View all"
                  density="default"
                />
                <VCheckbox
                  v-for="calendar in store.availableCalendars"
                  :key="calendar.label"
                  v-model="store.selectedCalendars"
                  :value="calendar.label"
                  :color="calendar.color"
                  :label="calendar.label"
                  density="default"
                />
              </div>
            </div>
          </div>
        </VNavigationDrawer>
        <VMain>
          <VCard elevation="0">
            <FullCalendar
              ref="refCalendar"
              :options="calendarOptions"
            />
          </VCard>
        </VMain>
      </VLayout>
    </VCard>
    <CalendarEventHandler
      v-model:isDrawerOpen="isEventHandlerSidebarActive"
      :event="event"
      @add-event="addEvent"
      @update-event="updateEvent"
      @remove-event="removeEvent"
    />
  </div>
</template>

<style lang="scss">
@use "@core/scss/libs/full-calendar";

.calendars-checkbox {
  .v-label {
    color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
    opacity: var(--v-high-emphasis-opacity);
  }
}

.calendar-add-event-drawer {
  &.v-navigation-drawer {
    border-end-start-radius: 0.375rem;
    border-start-start-radius: 0.375rem;
  }
}
</style>

<style lang="scss" scoped>
.v-layout {
  overflow: visible !important;

  .v-card {
    overflow: visible;
  }
}
</style>
