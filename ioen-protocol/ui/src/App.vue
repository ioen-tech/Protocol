<template>
  <div>
    <div v-if="loading">
      <mwc-circular-progress indeterminate></mwc-circular-progress>
    </div>
    <div v-else>
    <CreateNanogrid @nanogrid-created="actionHash = $event"/>
    <NanogridDetail v-if="actionHash" :action-hash="actionHash" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { AppWebsocket, ActionHash, InstalledAppInfo } from '@holochain/client';
import '@material/mwc-circular-progress';
import CreateNanogrid from './components/nanogrid/settings/CreateNanogrid.vue';
import NanogridDetail from './components/nanogrid/settings/NanogridDetail.vue';

export default defineComponent({
  components: {
    CreateNanogrid, NanogridDetail
  },
  data(): {
    appWebsocket: AppWebsocket | undefined;
    loading: boolean;
    appInfo: InstalledAppInfo | undefined;
    actionHash: ActionHash | undefined;
  } {
    return {
      appWebsocket: undefined,
      loading: true,
      appInfo: undefined,
      actionHash: undefined,
    };
  },
  async mounted() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.appWebsocket = await AppWebsocket.connect(`ws://localhost:${import.meta.env.VITE_HC_PORT}`);
    this.appInfo = await this.appWebsocket.appInfo({ installed_app_id: 'ioen-protocol-3' });

    this.loading = false;
  },
  provide() {
    return {
      appWebsocket: computed(() => this.appWebsocket),
      appInfo: computed(() => this.appInfo),
    };
  },
});
</script>
