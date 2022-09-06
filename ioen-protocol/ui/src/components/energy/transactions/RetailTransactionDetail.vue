<template>
  <div v-if="retailTransaction" style="display: flex; flex-direction: column">
    <span style="font-size: 18px">RetailTransaction</span>


    <date-time-detail
    
     :value="retailTransaction.supply_time"
      style="margin-top: 16px"
    ></date-time-detail>


    <copiable-hash
    
     :value="retailTransaction.consumer_nano_grid"
      style="margin-top: 16px"
    ></copiable-hash>


    <content-detail
    
     :value="retailTransaction.amount_supplied"
      style="margin-top: 16px"
    ></content-detail>


    <content-detail
    
     :value="retailTransaction.tariff"
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
import { RetailTransaction } from '../../../types/energy/transactions';
import '@type-craft/date-time/date-time-detail';
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
  data(): { retailTransaction: RetailTransaction | undefined } {
    return {
      retailTransaction: undefined
    }
  },
  async mounted() {
    const cellData = this.appInfo.cell_data.find((c: InstalledCell) => c.role_id === 'energy')!;

    const record: Record | undefined = await this.appWebsocket.callZome({
      cap_secret: null,
      cell_id: cellData.cell_id,
      zome_name: 'transactions',
      fn_name: 'get_retail_transaction',
      payload: this.actionHash,
      provenance: cellData.cell_id[1]
    });
    
    if (record) {
      this.retailTransaction = decode((record.entry as any).Present.entry) as RetailTransaction;
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