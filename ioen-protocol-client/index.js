import { AppWebsocket, AdminWebsocket } from '@holochain/client';
import * as base64 from 'byte-base64';
import * as path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const TIMEOUT = 30000;
let adminClient = {};
let appClient = {};
let adminPort = 65000;

const signalCb = (signal) => {
  // impl...

  resolve()
}

export const connectToHolochain = async() => {
  adminClient = await AdminWebsocket.connect(`ws://localhost:${adminPort}`, TIMEOUT);
  const appPort = await adminClient.attachAppInterface({ port: 0 });
  appClient = await AppWebsocket.connect(`ws://localhost:${appPort.port}`, TIMEOUT, signalCb);
}

export const createNewAgent = async(installed_app_id, happNetworkSeed, dailyNetworkSeed, callback) => {
  try {
    const agent_key = await adminClient.generateAgentPubKey();
    // console.log(agent_key);
    const base64AgentPubKey = base64.bytesToBase64(agent_key);
    const agent = {
      agentPubKey: base64AgentPubKey,
      installedAppId: installed_app_id
    }
    const installPath = path.resolve(__dirname, 'ioen-protocol.happ');
    const installedApp = await adminClient.installAppBundle({
      path: installPath,
      agent_key,
      installed_app_id,
      membrane_proofs: {},
      network_seed: happNetworkSeed
    });
    // console.log(installedApp);
    await adminClient.enableApp({ installed_app_id });
    const info = await appClient.appInfo({ installed_app_id });
    // console.log(info);
    cloneEnergyCell(installed_app_id, happNetworkSeed + dailyNetworkSeed, (cloneCellToday) => {
      const nano_grid_settings_cell_id = installedApp.cell_data.find(data => data.role_id === 'nanogrid').cell_id;
      const nanoGridSettingsCellId = base64.bytesToBase64(nano_grid_settings_cell_id[0]);
      const transactionsCellId = cloneCellToday;
      const tomorrowTransactionsCellId =  '';
      const billing_cell_id = installedApp.cell_data.find(data => data.role_id === 'billing').cell_id;
      const billingCellId = base64.bytesToBase64(billing_cell_id[0]);
      const ioenFuelCellId = 'ioenFuelCellId';
      const protocolAppInfo = {
        installedAppId: installed_app_id,
        nanoGridSettingsCellId,
        ioenFuelCellId,
        billingCellId,
        transactionsCellId,
        tomorrowTransactionsCellId
      }
      console.log(installed_app_id);
      console.log(base64AgentPubKey);
      console.log(protocolAppInfo);
      console.log("");
      callback(agent, protocolAppInfo);
    });
  } catch (e) {
    console.log(e);
    console.log("createNewAgent " + installed_app_id);
  }
}

export const cloneEnergyCell = (app_id, network_seed, callback) => {
  const createCloneTomorrow = {
    app_id,
    role_id: 'energy',
    modifiers: {
      network_seed,
    },
  };
  appClient.createCloneCell(createCloneTomorrow)
  .then(clonedCell => {
    callback(base64.bytesToBase64(clonedCell.cell_id[0]));
  })
}

export const createNewNanoGrid = (nanoGrid, agent_key, protocolAppInfo, callback) => {
  const agentPubKey = base64.base64ToBytes(agent_key);
  const cell_id = [base64.base64ToBytes(protocolAppInfo.nanoGridSettingsCellId), agentPubKey];
  appClient.callZome({
    cap_secret: null,
    cell_id,
    zome_name: 'settings',
    fn_name: 'create_nanogrid',
    payload: nanoGrid,
    provenance: agentPubKey
  })
  .then(actionHash => {
    callback(base64.bytesToBase64(actionHash));
  })
  .catch(e => {
    console.log(e);
  });
};

export const createSupplyAgreements = (nanoGridSupplyAgreements, callback) => {
  const agentPubKey = base64.base64ToBytes(nanoGridSupplyAgreements.agentPubKey);
  const nanoGridActionHash = base64.base64ToBytes(nanoGridSupplyAgreements.nanoGridActionHash);
  const cell_id = [base64.base64ToBytes(nanoGridSupplyAgreements.nanoGridSettingsCellId), agentPubKey];

  supplyAgreements.forEach(supplyAgreement => {
    supplyAgreement.supplier = base64.base64ToBytes(supplyAgreement.consumerNanoGrid);
    appClient.callZome({
      cap_secret: null,
      cell_id,
      zome_name: 'settings',
      fn_name: 'create_supply_agreement',
      payload: supplyAgreement,
      provenance: agentPubKey
    })
    .then(actionHash => {
      callback(base64.bytesToBase64(actionHash));
    })
    .catch(e => {
      console.log(e);
    });
  });
};

export const createEcoGridTransaction = async(payload, callback) => {
    const start = new Date();
    try {
      const cell_id = [base64.base64ToBytes(payload.transactionsCellId), base64.base64ToBytes(payload.consumerNanoGrid)];
      payload.consumerNanoGrid = base64.base64ToBytes(payload.consumerNanoGrid);
      payload.supplierNanoGrid = base64.base64ToBytes(payload.supplierNanoGrid);
      delete payload.transactionsCellId;
      await appClient.callZome({
          cap_secret: null,
          cell_id,
          zome_name: 'transactions',
          fn_name: 'create_eco_grid_transaction',
          payload,  
          provenance: cell_id[1]
      });
      const end = new Date();
      callback(end.getTime() - start.getTime());
    } catch (error) {
      callback();
      // console.error(error);
      // console.log("createEcoGridTransaction");
      // console.log(transactionsCellId);
      // console.log(base64.bytesToBase64(payload.consumerNanoGrid));
    }
};

export const createRetailTransaction = async(payload, callback) => {
    const start = new Date();
    const transactionsCellId = payload.transactionsCellId;
    try {
      const cell_id = [base64.base64ToBytes(payload.transactionsCellId), base64.base64ToBytes(payload.consumerNanoGrid)];
      payload.consumerNanoGrid = base64.base64ToBytes(payload.consumerNanoGrid);
      delete payload.transactionsCellId;
      await appClient.callZome({
        cap_secret: null,
        cell_id,
        zome_name: 'transactions',
        fn_name: 'create_retail_transaction',
        payload,
        provenance: cell_id[1]
      });
      const end = new Date();
      callback(end.getTime() - start.getTime());
    } catch (error) {
      callback();
      // console.error(error);
      // console.log("createRetailTransaction");
      // console.log(transactionsCellId);
      // console.log(base64.bytesToBase64(payload.consumerNanoGrid));
    }
};

