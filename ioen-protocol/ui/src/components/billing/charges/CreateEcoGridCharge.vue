<template>
  <div style="display: flex; flex-direction: column">
    <span style="font-size: 18px">Create EcoGridCharge</span>

    

    <create-content 
      
      @change="totalSupplied = $event.target.value"
      style="margin-top: 16px"
    ></create-content>

    

    <create-content 
      
      @change="totalCost = $event.target.value"
      style="margin-top: 16px"
    ></create-content>

    <mwc-button 
      label="Create EcoGridCharge"
      :disabled="!isEcoGridChargeValid()"
      @click="createEcoGridCharge()"
    ></mwc-button>
  </div>
</template>
<script lang="ts">
import '@material/mwc-button';
import { defineComponent, inject, ComputedRef } from 'vue';
import { InstalledCell, AppWebsocket, InstalledAppInfo } from '@holochain/client';
import { EcoGridCharge } from '../../../types/billing/charges';
import '@type-craft/content/create-content';

export default defineComponent({
  data(): Partial<EcoGridCharge> {
    return {
      supplierNanoGrid: undefined,
totalSupplied: undefined,
consumerNanoGrid: undefined,
totalCost: undefined
    }
  },

  methods: {
    isEcoGridChargeValid() {
      return this.supplierNanoGrid && 
      this.totalSupplied && 
      this.consumerNanoGrid && 
      this.totalCost;
    },
    async createEcoGridCharge() {
      const cellData = this.appInfo.cell_data.find((c: InstalledCell) => c.role_id === 'billing')!;

      const ecoGridCharge: EcoGridCharge = {
        supplier_nano_grid: this.supplierNanoGrid!,    // TODO: set the supplier_nano_grid
        total_supplied: this.totalSupplied!,
        consumer_nano_grid: this.consumerNanoGrid!,    // TODO: set the consumer_nano_grid
        total_cost: this.totalCost!,
      };

      const actionHash = await this.appWebsocket.callZome({
        cap_secret: null,
        cell_id: cellData.cell_id,
        zome_name: 'charges',
        fn_name: 'create_eco_grid_charge',
        payload: ecoGridCharge,
        provenance: cellData.cell_id[1]
      });

      this.$emit('eco-grid-charge-created', actionHash);
    },
  },
  emits: ['eco-grid-charge-created'],
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