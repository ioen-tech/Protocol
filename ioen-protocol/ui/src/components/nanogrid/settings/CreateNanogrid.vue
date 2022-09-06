<template>
  <div style="display: flex; flex-direction: column">
    <span style="font-size: 18px">Create Nanogrid</span>

    <create-title 
      
      @change="nanoGridName = $event.target.value"
      style="margin-top: 16px"
    ></create-title>

    <create-content 
      
      @change="numberOfSolarPanels = $event.target.value"
      style="margin-top: 16px"
    ></create-content>

    <create-content 
      
      @change="storageCapacity = $event.target.value"
      style="margin-top: 16px"
    ></create-content>

    <mwc-button 
      label="Create Nanogrid"
      :disabled="!isNanogridValid()"
      @click="createNanogrid()"
    ></mwc-button>
  </div>
</template>
<script lang="ts">
import '@material/mwc-button';
import { defineComponent, inject, ComputedRef } from 'vue';
import { InstalledCell, AppWebsocket, InstalledAppInfo } from '@holochain/client';
import { Nanogrid } from '../../../types/nanogrid/settings';
import '@type-craft/title/create-title';
import '@type-craft/content/create-content';

export default defineComponent({
  data(): Partial<Nanogrid> {
    return {
      nanoGridName: undefined,
numberOfSolarPanels: undefined,
storageCapacity: undefined
    }
  },

  methods: {
    isNanogridValid() {
      return this.nanoGridName && 
      this.numberOfSolarPanels && 
      this.storageCapacity;
    },
    async createNanogrid() {
      const cellData = this.appInfo.cell_data.find((c: InstalledCell) => c.role_id === 'nanogrid')!;

      const nanogrid: Nanogrid = {
        nano_grid_name: this.nanoGridName!,
        number_of_solar_panels: this.numberOfSolarPanels!,
        storage_capacity: this.storageCapacity!,
      };

      const actionHash = await this.appWebsocket.callZome({
        cap_secret: null,
        cell_id: cellData.cell_id,
        zome_name: 'settings',
        fn_name: 'create_nanogrid',
        payload: nanogrid,
        provenance: cellData.cell_id[1]
      });

      this.$emit('nanogrid-created', actionHash);
    },
  },
  emits: ['nanogrid-created'],
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