<template>
  <div style="display: flex; flex-direction: column">
    <span style="font-size: 18px">Create RetailTransaction</span>

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
      label="Create RetailTransaction"
      :disabled="!isRetailTransactionValid()"
      @click="createRetailTransaction()"
    ></mwc-button>
  </div>
</template>
<script lang="ts">
import '@material/mwc-button';
import { defineComponent, inject, ComputedRef } from 'vue';
import { InstalledCell, AppWebsocket, InstalledAppInfo } from '@holochain/client';
import { RetailTransaction } from '../../../types/energy/transactions';
import '@type-craft/date-time/create-date-time';
import '@type-craft/content/create-content';

export default defineComponent({
  data(): Partial<RetailTransaction> {
    return {
      supplyTime: undefined,
consumerNanoGrid: undefined,
amountSupplied: undefined,
tariff: undefined
    }
  },

  methods: {
    isRetailTransactionValid() {
      return this.supplyTime && 
      this.consumerNanoGrid && 
      this.amountSupplied && 
      this.tariff;
    },
    async createRetailTransaction() {
      const cellData = this.appInfo.cell_data.find((c: InstalledCell) => c.role_id === 'energy')!;

      const retailTransaction: RetailTransaction = {
        supply_time: this.supplyTime!,
        consumer_nano_grid: this.consumerNanoGrid!,    // TODO: set the consumer_nano_grid
        amount_supplied: this.amountSupplied!,
        tariff: this.tariff!,
      };

      const actionHash = await this.appWebsocket.callZome({
        cap_secret: null,
        cell_id: cellData.cell_id,
        zome_name: 'transactions',
        fn_name: 'create_retail_transaction',
        payload: retailTransaction,
        provenance: cellData.cell_id[1]
      });

      this.$emit('retail-transaction-created', actionHash);
    },
  },
  emits: ['retail-transaction-created'],
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