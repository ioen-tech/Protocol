<template>
  <div v-if="serviceToPropertyCharge" style="display: flex; flex-direction: column">
    <span style="font-size: 18px">ServiceToPropertyCharge</span>


    <title-detail
    
     :value="serviceToPropertyCharge.number_of_days"
      style="margin-top: 16px"
    ></title-detail>


    <content-detail
    
     :value="serviceToPropertyCharge.rate_per_day"
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
import { ServiceToPropertyCharge } from '../../../types/billing/charges';
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
  data(): { serviceToPropertyCharge: ServiceToPropertyCharge | undefined } {
    return {
      serviceToPropertyCharge: undefined
    }
  },
  async mounted() {
    const cellData = this.appInfo.cell_data.find((c: InstalledCell) => c.role_id === 'billing')!;

    const record: Record | undefined = await this.appWebsocket.callZome({
      cap_secret: null,
      cell_id: cellData.cell_id,
      zome_name: 'charges',
      fn_name: 'get_service_to_property_charge',
      payload: this.actionHash,
      provenance: cellData.cell_id[1]
    });
    
    if (record) {
      this.serviceToPropertyCharge = decode((record.entry as any).Present.entry) as ServiceToPropertyCharge;
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