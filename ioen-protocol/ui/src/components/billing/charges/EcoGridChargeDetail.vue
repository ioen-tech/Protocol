<template>
  <div v-if="ecoGridCharge" style="display: flex; flex-direction: column">
    <span style="font-size: 18px">EcoGridCharge</span>


    <copiable-hash
    
     :value="ecoGridCharge.supplier_nano_grid"
      style="margin-top: 16px"
    ></copiable-hash>


    <content-detail
    
     :value="ecoGridCharge.total_supplied"
      style="margin-top: 16px"
    ></content-detail>


    <copiable-hash
    
     :value="ecoGridCharge.consumer_nano_grid"
      style="margin-top: 16px"
    ></copiable-hash>


    <content-detail
    
     :value="ecoGridCharge.total_cost"
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
import { EcoGridCharge } from '../../../types/billing/charges';
import '@holochain-open-dev/utils/copiable-hash';
import '@type-craft/content/content-detail';
import '@material/mwc-circular-progress';

export default defineComponent({
  props: {
    actionHash: {
      type: Object,
      required: true
    }
  },
  data(): { ecoGridCharge: EcoGridCharge | undefined } {
    return {
      ecoGridCharge: undefined
    }
  },
  async mounted() {
    const cellData = this.appInfo.cell_data.find((c: InstalledCell) => c.role_id === 'billing')!;

    const record: Record | undefined = await this.appWebsocket.callZome({
      cap_secret: null,
      cell_id: cellData.cell_id,
      zome_name: 'charges',
      fn_name: 'get_eco_grid_charge',
      payload: this.actionHash,
      provenance: cellData.cell_id[1]
    });
    
    if (record) {
      this.ecoGridCharge = decode((record.entry as any).Present.entry) as EcoGridCharge;
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