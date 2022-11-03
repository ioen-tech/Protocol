<script setup>
import asana from '@/assets/images/icons/brands/asana.png'
import behance from '@/assets/images/icons/brands/behance.png'
import dribbble from '@/assets/images/icons/brands/dribbble.png'
import facebook from '@/assets/images/icons/brands/facebook.png'
import github from '@/assets/images/icons/brands/github.png'
import google from '@/assets/images/icons/brands/google.png'
import linkedin from '@/assets/images/icons/brands/linkedin.png'
import mailchimp from '@/assets/images/icons/brands/mailchimp.png'
import slack from '@/assets/images/icons/brands/slack.png'
import twitter from '@/assets/images/icons/brands/twitter.png'

const connectedAccounts = ref([
  {
    img: google,
    title: 'Google',
    text: 'Calendar and contacts',
    connected: true
  },
  {
    img: slack,
    title: 'Slack',
    text: 'Communication',
    connected: false
  },
  {
    img: github,
    title: 'Github',
    text: 'Manage your Git repositories',
    connected: true
  },
  {
    img: mailchimp,
    title: 'Mailchimp',
    text: 'Email marketing service',
    connected: false
  },
  {
    img: asana,
    title: 'Asana',
    text: 'Communication',
    connected: false
  }
])
const socialAccounts = ref([
  {
    img: facebook,
    title: 'Facebook',
    connected: false
  },
  {
    img: twitter,
    title: 'Twitter',
    link: 'https://twitter.com/theme_selection',
    username: '@Theme_Selection',
    connected: true
  },
  {
    img: linkedin,
    title: 'Linkedin',
    link: 'https://www.linkedin.com/company/themeselection',
    username: '@ThemeSelection',
    connected: true
  },
  {
    img: dribbble,
    title: 'Dribbble',
    connected: false
  },
  {
    img: behance,
    title: 'Behance',
    connected: false
  }
])
</script>

<template>
  <VRow>
    <!-- 👉 connected accounts -->
    <VCol cols="12">
      <VCard
        title="Connected Accounts"
        subtitle="Display content from your connected accounts on your site"
      >
        <VCardText>
          <VList class="card-list">
            <VListItem
              v-for="account in connectedAccounts"
              :key="account.title"
              :title="account.title"
              :subtitle="account.text"
            >
              <template #prepend>
                <VAvatar
                  start
                  :size="35"
                  :image="account.img"
                />
              </template>

              <template #append>
                <VSwitch
                  v-model="account.connected"
                  density="compact"
                  class="me-1"
                />
              </template>
            </VListItem>
          </VList>
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 social accounts -->
    <VCol cols="12">
      <VCard
        title="Social Accounts"
        subtitle="Display content from social accounts on your site"
      >
        <VCardText>
          <VList class="card-list">
            <VListItem
              v-for="(account) in socialAccounts"
              :key="account.title"
              :title="account.title"
            >
              <template #prepend>
                <VAvatar
                  start
                  size="35"
                  rounded="0"
                  :image="account.img"
                />
              </template>

              <VListItemSubtitle v-if="account.connected">
                <a
                  :href="account.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-caption"
                >
                  {{ account.username }}
                </a>
              </VListItemSubtitle>

              <VListItemSubtitle
                v-else
                class="text-caption"
              >
                Not connected
              </VListItemSubtitle>

              <template #append>
                <VBtn
                  icon
                  color="secondary"
                  variant="tonal"
                  size="small"
                  class="rounded"
                >
                  <VIcon
                    size="20"
                    :icon="account.connected ? 'mdi-close' : 'mdi-link-variant'"
                  />
                </VBtn>
              </template>
            </VListItem>
          </VList>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
