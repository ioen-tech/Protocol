<template>
  <div v-if="nanogrid" style="display: flex; flex-direction: column">
    <span style="font-size: 18px">Nanogrid</span>


    <title-detail
    
     :value="nanogrid.nano_grid_name"
      style="margin-top: 16px"
    ></title-detail>


    <content-detail
    
     :value="nanogrid.number_of_solar_panels"
      style="margin-top: 16px"
    ></content-detail>


    <content-detail
    
     :value="nanogrid.storage_capacity"
      style="margin-top: 16px"
    ></content-detail>

  </div>
  <div v-else style="display: flex; flex: 1; align-items: center; justify-content: center">
    <mwc-circular-progress indeterminate></mwc-circular-progress>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, ComputedRef } from 'vue';
import { decode } from '@msgpack/msgpack';
import { InstalledCell, AppWebsocket, InstalledAppInfo, Record } from '@holochain/client';
import { Nanogrid } from '../../../types/nanogrid/settings';
import '@type-craft/title/title-detail';
import '@type-craft/content/content-detail';
import '@material/mwc-circular-progress';

export default defineComponent({
  props: {
    actionHash: {
      type: Object,
      required: true
    }
  },
  data(): { nanogrid: Nanogrid | undefined } {
    return {
      nanogrid: undefined
    }
  },
  async mounted() {
    const cellData = this.appInfo.cell_data.find((c: InstalledCell) => c.role_id === 'nanogrid')!;

    const record: Record | undefined = await this.appWebsocket.callZome({
      cap_secret: null,
      cell_id: cellData.cell_id,
      zome_name: 'settings',
      fn_name: 'get_nanogrid',
      payload: this.actionHash,
      provenance: cellData.cell_id[1]
    });
    
    if (record) {
      this.nanogrid = decode((record.entry as any).Present.entry) as Nanogrid;
    }
  },
  setup() {
    const appWebsocket = (inject('appWebsocket') as ComputedRef<AppWebsocket>).value;
    const appInfo = (inject('appInfo') as ComputedRef<InstalledAppInfo>).value;
    return {
      appInfo,
      appWebsocket,
    };
  },
})
</script>