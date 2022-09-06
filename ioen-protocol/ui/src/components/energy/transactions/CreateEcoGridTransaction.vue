<template>
  <div style="display: flex; flex-direction: column">
    <span style="font-size: 18px">Create EcoGridTransaction</span>

    <create-date-time 
      
      @change="supplyTime = $event.target.value"
      style="margin-top: 16px"
    ></create-date-time>

    

    <create-content 
      
      @change="amountSupplied = $event.target.value"
      style="margin-top: 16px"
    ></create-content>

    

    <create-content 
      
      @change="tariff = $event.target.value"
      style="margin-top: 16px"
    ></create-content>

    <mwc-button 
      label="Create EcoGridTransaction"
      :disabled="!isEcoGridTransactionValid()"
      @click="createEcoGridTransaction()"
    ></mwc-button>
  </div>
</template>
<script lang="ts">
import '@material/mwc-button';
import { defineComponent, inject, ComputedRef } from 'vue';
import { InstalledCell, AppWebsocket, InstalledAppInfo } from '@holochain/client';
import { EcoGridTransaction } from '../../../types/energy/transactions';
import '@type-craft/date-time/create-date-time';
import '@type-craft/content/create-content';

export default defineComponent({
  data(): Partial<EcoGridTransaction> {
    return {
      supplyTime: undefined,
consumerNanoGrid: undefined,
amountSupplied: undefined,
supplierNanoGrid: undefined,
tariff: undefined
    }
  },

  methods: {
    isEcoGridTransactionValid() {
      return this.supplyTime && 
      this.consumerNanoGrid && 
      this.amountSupplied && 
      this.supplierNanoGrid && 
      this.tariff;
    },
    async createEcoGridTransaction() {
      const cellData = this.appInfo.cell_data.find((c: InstalledCell) => c.role_id === 'energy')!;

      const ecoGridTransaction: EcoGridTransaction = {
        supply_time: this.supplyTime!,
        consumer_nano_grid: this.consumerNanoGrid!,    // TODO: set the consumer_nano_grid
        amount_supplied: this.amountSupplied!,
        supplier_nano_grid: this.supplierNanoGrid!,    // TODO: set the supplier_nano_grid
        tariff: this.tariff!,
      };

      const actionHash = await this.appWebsocket.callZome({
        cap_secret: null,
        cell_id: cellData.cell_id,
        zome_name: 'transactions',
        fn_name: 'create_eco_grid_transaction',
        payload: ecoGridTransaction,
        provenance: cellData.cell_id[1]
      });

      this.$emit('eco-grid-transaction-created', actionHash);
    },
  },
  emits: ['eco-grid-transaction-created'],
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