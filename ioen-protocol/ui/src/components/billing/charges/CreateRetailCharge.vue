<template>
  <div style="display: flex; flex-direction: column">
    <span style="font-size: 18px">Create RetailCharge</span>

    

    <create-content 
      
      @change="totalSupplied = $event.target.value"
      style="margin-top: 16px"
    ></create-content>

    <create-content 
      
      @change="totalCost = $event.target.value"
      style="margin-top: 16px"
    ></create-content>

    <mwc-button 
      label="Create RetailCharge"
      :disabled="!isRetailChargeValid()"
      @click="createRetailCharge()"
    ></mwc-button>
  </div>
</template>
<script lang="ts">
import '@material/mwc-button';
import { defineComponent, inject, ComputedRef } from 'vue';
import { InstalledCell, AppWebsocket, InstalledAppInfo } from '@holochain/client';
import { RetailCharge } from '../../../types/billing/charges';
import '@type-craft/content/create-content';

export default defineComponent({
  data(): Partial<RetailCharge> {
    return {
      consumerNanoGrid: undefined,
totalSupplied: undefined,
totalCost: undefined
    }
  },

  methods: {
    isRetailChargeValid() {
      return this.consumerNanoGrid && 
      this.totalSupplied && 
      this.totalCost;
    },
    async createRetailCharge() {
      const cellData = this.appInfo.cell_data.find((c: InstalledCell) => c.role_id === 'billing')!;

      const retailCharge: RetailCharge = {
        consumer_nano_grid: this.consumerNanoGrid!,    // TODO: set the consumer_nano_grid
        total_supplied: this.totalSupplied!,
        total_cost: this.totalCost!,
      };

      const actionHash = await this.appWebsocket.callZome({
        cap_secret: null,
        cell_id: cellData.cell_id,
        zome_name: 'charges',
        fn_name: 'create_retail_charge',
        payload: retailCharge,
        provenance: cellData.cell_id[1]
      });

      this.$emit('retail-charge-created', actionHash);
    },
  },
  emits: ['retail-charge-created'],
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