<template>
  <div v-if="ecoGridTransaction" style="display: flex; flex-direction: column">
    <span style="font-size: 18px">EcoGridTransaction</span>


    <date-time-detail
    
     :value="ecoGridTransaction.supply_time"
      style="margin-top: 16px"
    ></date-time-detail>


    <copiable-hash
    
     :value="ecoGridTransaction.consumer_nano_grid"
      style="margin-top: 16px"
    ></copiable-hash>


    <content-detail
    
     :value="ecoGridTransaction.amount_supplied"
      style="margin-top: 16px"
    ></content-detail>


    <copiable-hash
    
     :value="ecoGridTransaction.supplier_nano_grid"
      style="margin-top: 16px"
    ></copiable-hash>


    <content-detail
    
     :value="ecoGridTransaction.tariff"
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
import { EcoGridTransaction } from '../../../types/energy/transactions';
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
  data(): { ecoGridTransaction: EcoGridTransaction | undefined } {
    return {
      ecoGridTransaction: undefined
    }
  },
  async mounted() {
    const cellData = this.appInfo.cell_data.find((c: InstalledCell) => c.role_id === 'energy')!;

    const record: Record | undefined = await this.appWebsocket.callZome({
      cap_secret: null,
      cell_id: cellData.cell_id,
      zome_name: 'transactions',
      fn_name: 'get_eco_grid_transaction',
      payload: this.actionHash,
      provenance: cellData.cell_id[1]
    });
    
    if (record) {
      this.ecoGridTransaction = decode((record.entry as any).Present.entry) as EcoGridTransaction;
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