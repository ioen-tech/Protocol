import { AppWebsocket, AdminWebsocket } from '@holochain/client';
import { Server } from "socket.io";
import * as base64 from "byte-base64";
const { exec } = require('child_process');
const io = new Server(8080, { //8124 is the local port we are binding the pingpong server to
    pingInterval: 30005,		//An interval how often a ping is sent
    pingTimeout: 5000,		//The time a client has to respont to a ping before it is desired dead
    upgradeTimeout: 3000,		//The time a client has to fullfill the upgrade
    allowUpgrades: true,		//Allows upgrading Long-Polling to websockets. This is strongly recommended for connecting for WebGL builds or other browserbased stuff and true is the default.
    cookie: false,			//We do not need a persistence cookie for the demo - If you are using a load balöance, you might need it.
    serveClient: true,		//This is not required for communication with our asset but we enable it for a web based testing tool. You can leave it enabled for example to connect your webbased service to the same server (this hosts a js file).
    allowEIO3: false,			//This is only for testing purpose. We do make sure, that we do not accidentially work with compat mode.
    cors: {
        origin: "*"				//Allow connection from any referrer (most likely this is what you will want for game clients - for WebGL the domain of your sebsite MIGHT also work)
    }
});
  
console.log('Starting IOEN Protocol Socket');
const TIMEOUT = 30000;
let adminClient = {};
let appClient = {};
let adminPort = 65000;
const ecoGridTransactionsToProcess = [];
const retailTransactionsToProcess = [];
const signalCb = (signal) => {
    // impl...

    resolve()
  }
async function connectToHolochain() {
    adminClient = await AdminWebsocket.connect(`ws://localhost:${adminPort}`, TIMEOUT);
    const appPort = await adminClient.attachAppInterface({ port: 0 });
    appClient = await AppWebsocket.connect(`ws://localhost:${appPort.port}`, TIMEOUT, signalCb);
}

connectToHolochain();

async function createNewAgent(socket, installed_app_id, callback) {
    const agent_key = await adminClient.generateAgentPubKey();
    console.log(agent_key);
    const base64AgentPubKey = base64.bytesToBase64(agent_key);
    const agent = {
        agentPubKey: base64AgentPubKey
    }
    console.log(agent);
    socket.emit('AgentPubKeyGenerated', agent);
    const path = '/Users/philipbeadle/IOEN/Protocol/ioen-protocol/workdir/ioen-protocol.happ';
    const installedApp = await adminClient.installAppBundle({
        path,
        agent_key,
        installed_app_id,
        membrane_proofs: {},
    });
    console.log(installedApp);
    await adminClient.enableApp({ installed_app_id });
    const nano_grid_settings_cell_id = installedApp.cell_data.find(data => data.role_id === 'nanogrid').cell_id;
    const nanoGridSettingsCellId = base64.bytesToBase64(nano_grid_settings_cell_id[0]);
    const transactions_cell_id = installedApp.cell_data.find(data => data.role_id === 'energy').cell_id;
    const transactionsCellId = base64.bytesToBase64(transactions_cell_id[0]);
    const billing_cell_id = installedApp.cell_data.find(data => data.role_id === 'billing').cell_id;
    const billingCellId = base64.bytesToBase64(billing_cell_id[0]);
    const ioenFuelCellId = "ioenFuelCellId";
    const protocolAppInfo = {
        installedAppId: installed_app_id,
        nanoGridSettingsCellId,
        ioenFuelCellId,
        billingCellId,
        transactionsCellId
    }
    console.log(protocolAppInfo);
    socket.emit('AppInfo', protocolAppInfo);
    callback(agent_key, protocolAppInfo)
}

function createNewNanoGrid(socket, nanoGrid) {
    try {
        console.log(nanoGrid);
        createNewAgent(socket, nanoGrid.nanoGridName, (agent_key, protocolAppInfo) => {
            const cell_id = [base64.base64ToBytes(protocolAppInfo.nanoGridSettingsCellId), agent_key];
            appClient.callZome({
                cap_secret: null,
                cell_id,
                zome_name: 'settings',
                fn_name: 'create_nanogrid',
                payload: nanoGrid,
                provenance: agent_key
            })
            .then(actionHash => {
                console.log(base64.bytesToBase64(actionHash));
                socket.emit('NanoGridCreated', base64.bytesToBase64(actionHash));
            });
        })
    } catch (error) {
        console.error(error);
    }
};

async function getSupplyAgreements(nanoGrid) {
    let supplyAgreements = [
        {
            supplierAgentPubKey: 'agent 1',
            tariffIoenFuel: 1,
            transactionEnergyLimit: 1
        },
        {
            supplierAgentPubKey: 'agent 2',
            tariffIoenFuel: 1,
            transactionEnergyLimit: 1
        }
    ];
    return supplyAgreements;
};

async function getRequiredEnergyFromSupplyAgreements(nanoGrid, requiredEnergy, supplyAgreements, callback) {
    supplyAgreements.forEach(supplyAgreement => {
        // Somehow use Holochain remote call or signal to work out how much energy
        // await the supplier in the agreement's response to see if we need to ask next supplier in list
        // ecoGridTransactionsToProcess.push(transaction);
        // if requiredEnergy - amount from supplier > 0 execute next agreement
        // else requiredEnergy = 0;
        // break;
    });
    callback(requiredEnergy);
};

let ecoGridTransactionInProgress = false;
async function createEcoGridTransaction(payload) {
    const start = new Date();
    try {
        ecoGridTransactionInProgress = true;
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
        console.log("Elapsed time createEcoGridTransaction " + (end.getTime() - start.getTime()) + " ms - left to process " + ecoGridTransactionsToProcess.length);
        ecoGridTransactionInProgress = false;
    } catch (error) {
        ecoGridTransactionInProgress = false;
        console.error(error);
    }
};

let retailTransactionInProgress = false;
async function createRetailTransaction(payload) {
    const start = new Date();
    try {
        retailTransactionInProgress = true;
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
        console.log("Elapsed time createRetailTransaction " + (end.getTime() - start.getTime()) + " ms - left to process " + retailTransactionsToProcess.length);
        retailTransactionInProgress = false;
    } catch (error) {
        retailTransactionInProgress = false;
        console.error(error);
    }
}

function processEcoGridTransactions() {
    if (ecoGridTransactionInProgress == true) return;
    const payload = ecoGridTransactionsToProcess.shift();
    if (payload == undefined) return;
    createEcoGridTransaction(payload);
};

function processRetailTransactions() {
    if (retailTransactionInProgress == true) return;
    const payload = retailTransactionsToProcess.shift();
    if (payload == undefined) return;
    createRetailTransaction(payload);
}

setInterval(processRetailTransactions, 10);
setInterval(processEcoGridTransactions, 10);

io.on('connection', (socket) => {
    var cnt = 0;
    console.log('[' + (new Date()).toUTCString() + '] IOEN Protocol connecting with NanoGridName ' + socket.handshake.auth.id);	

    socket.on('CreateNewRetailer', () => {        
        createNewAgent(socket, 'Redgrid Energy' , (agent_key, protocolAppInfo) => {
            console.log('CreateNewRetailer' + agent_key);
        });
    });

    socket.on('CreateNewNanoGrid', (nanoGrid) => {        
        createNewNanoGrid(socket, nanoGrid);
    });

    socket.on('GetSupplyAgreements', (nanoGrid) => {        
        getSupplyAgreements(nanoGrid, (supplyAgreements) => {
            socket.emit('SupplyAgreementsRetrieved', supplyAgreements);
        });
    });

    socket.on('GetAppInfo', (nanoGrid) => {        
    //     hcClient = socket
    // socket
    //   .appInfo({
    //     installed_app_id: nanoGrid.nanoGridName,
    //   })
    //   .then(appInfo => {
    //     console.log(appInfo)
    //     profileCellId = appInfo.cell_data.find(data => data.role_id === 'ioen_profiles').cell_id
    //     energyMonitorCellId = appInfo.cell_data.find(data => data.role_id === 'ioen_energy_monitor').cell_id
    // socket.emit('AppInfo', protocolAppInfo);
    });

    socket.on('GetRequiredEnergyFromSupplyAgreements', (nanoGrid, requiredEnergy, supplyAgreements) => {        
        getRequiredEnergyFromSupplyAgreements(nanoGrid, requiredEnergy, supplyAgreements, (requiredEnergy) => {
            socket.emit('SupplyAgreementsExecuted', requiredEnergy);
        });
    });

    socket.on('AddEcoGridTransactionToProcessingList', (transaction) => {
        ecoGridTransactionsToProcess.push(transaction);
    });

    socket.on('AddRetailTransactionToProcessingList', (transaction) => {
        retailTransactionsToProcess.push(transaction);
    });

    socket.on('disconnect', (reason) => {
        console.log('[' + (new Date()).toUTCString() + '] ' + socket.id + ' disconnected after ' + cnt + ' pings. Reason: ' + reason);
    });

});

