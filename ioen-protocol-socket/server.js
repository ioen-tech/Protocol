import { AppWebsocket, AdminWebsocket } from '@holochain/client';
import { Server } from "socket.io";
import * as base64 from "byte-base64";

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
  
console.log('Starting Socket.IO pingpong server');
const TIMEOUT = 30000;
let adminClient = {};
let appClient = {};
let adminPort = 65000;
async function connectToHolochain() {
    adminClient = await AdminWebsocket.connect(`ws://localhost:${adminPort}`, TIMEOUT);
    const appPort = await adminClient.attachAppInterface({ port: 0 });
    appClient = await AppWebsocket.connect(`ws://localhost:${appPort.port}`, TIMEOUT);
}

connectToHolochain();

async function createNewAgent(socket, nanoGrid) {
    try {
        console.log(nanoGrid);
        const nanoGridName = nanoGrid.nanoGridName;
        const agent_key = await adminClient.generateAgentPubKey();
        console.log(agent_key);
        const base64AgentPubKey = base64.bytesToBase64(agent_key);
        const agent = {
            nanoGridName,
            agentPubKey: base64AgentPubKey
        }
        console.log(agent);
        socket.emit('AgentPubKeyGenerated', agent);
        const installed_app_id = nanoGridName;
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
            installedAppId: nanoGridName,
            nanoGridSettingsCellId,
            ioenFuelCellId,
            billingCellId,
            transactionsCellId
        }
        console.log(protocolAppInfo);

        socket.emit('AppBundleInstalled', protocolAppInfo);
        const actionHash = await appClient.callZome({
            cap_secret: null,
            cell_id: nano_grid_settings_cell_id,
            zome_name: 'settings',
            fn_name: 'create_nanogrid',
            payload: nanoGrid,
            provenance: nano_grid_settings_cell_id[1]
        });
        console.log(base64.bytesToBase64(actionHash));
        socket.emit('NanoGridCreated', base64.bytesToBase64(actionHash));
    } catch (error) {
        console.error(error);
    }
   
};

async function createEcoGridTransaction(agentPubKey, transactionsCellId, ecoGridTransaction) {
    try {
        const agent_key = base64.base64ToBytes(agentPubKey);
        const transactions_cell_id = [base64.base64ToBytes(transactionsCellId), agent_key];
        ecoGridTransaction.consumerNanoGrid = base64.base64ToBytes(ecoGridTransaction.consumerNanoGrid);
        ecoGridTransaction.supplierNanoGrid = base64.base64ToBytes(ecoGridTransaction.supplierNanoGrid);
        const actionHash = await appClient.callZome({
            cap_secret: null,
            cell_id: transactions_cell_id,
            zome_name: 'transactions',
            fn_name: 'create_eco_grid_transaction',
            payload: ecoGridTransaction,
            provenance: agent_key
        });
        console.log(base64.bytesToBase64(actionHash));
    } catch (error) {
        console.error(error);
    }
}
io.on('connection', (socket) => {
    var cnt = 0;
    console.log('[' + (new Date()).toUTCString() + '] unity connecting with SocketID ' + socket.id);	
    
    socket.on('PING', (data) => {
        cnt++;
        console.log('[' + (new Date()).toUTCString() + '] incoming PING #' + data + ' answering PONG with some jitter...');
        setTimeout(() => {
            socket.emit('PONG', data);
        }, 1000)
    });

    socket.on('CreateNewAgent', (nanoGrid) => {        
        createNewAgent(socket, nanoGrid);
    });

    socket.on('CreateEcoGridTransaction', (transaction) => {
        console.log("payload", transaction);
        const agentPubKey = transaction.supplierNanoGrid;
        const transactionsCellId = transaction.transactionsCellId;
        delete transaction.transactionsCellId;
        createEcoGridTransaction(agentPubKey, transactionsCellId, transaction);
    });

    socket.on('disconnect', (reason) => {
        console.log('[' + (new Date()).toUTCString() + '] ' + socket.id + ' disconnected after ' + cnt + ' pings. Reason: ' + reason);
    });

});

