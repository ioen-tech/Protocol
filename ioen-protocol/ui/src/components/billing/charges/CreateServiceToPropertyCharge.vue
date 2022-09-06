<template>
  <div style="display: flex; flex-direction: column">
    <span style="font-size: 18px">Create ServiceToPropertyCharge</span>

    <create-title 
      
      @change="numberOfDays = $event.target.value"
      style="margin-top: 16px"
    ></create-title>

    <create-content 
      
      @change="ratePerDay = $event.target.value"
      style="margin-top: 16px"
    ></create-content>

    <mwc-button 
      label="Create ServiceToPropertyCharge"
      :disabled="!isServiceToPropertyChargeValid()"
      @click="createServiceToPropertyCharge()"
    ></mwc-button>
  </div>
</template>
<script lang="ts">
import '@material/mwc-button';
import { defineComponent, inject, ComputedRef } from 'vue';
import { InstalledCell, AppWebsocket, InstalledAppInfo } from '@holochain/client';
import { ServiceToPropertyCharge } from '../../../types/billing/charges';
import '@type-craft/title/create-title';
import '@type-craft/content/create-content';

export default defineComponent({
  data(): Partial<ServiceToPropertyCharge> {
    return {
      numberOfDays: undefined,
ratePerDay: undefined
    }
  },

  methods: {
    isServiceToPropertyChargeValid() {
      return this.numberOfDays && 
      this.ratePerDay;
    },
    async createServiceToPropertyCharge() {
      const cellData = this.appInfo.cell_data.find((c: InstalledCell) => c.role_id === 'billing')!;

      const serviceToPropertyCharge: ServiceToPropertyCharge = {
        number_of_days: this.numberOfDays!,
        rate_per_day: this.ratePerDay!,
      };

      const actionHash = await this.appWebsocket.callZome({
        cap_secret: null,
        cell_id: cellData.cell_id,
        zome_name: 'charges',
        fn_name: 'create_service_to_property_charge',
        payload: serviceToPropertyCharge,
        provenance: cellData.cell_id[1]
      });

      this.$emit('service-to-property-charge-created', actionHash);
    },
  },
  emits: ['service-to-property-charge-created'],
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