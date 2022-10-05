import { Server } from "socket.io";
import {
    connectToHolochain,
    createNewAgent,
    createNewNanoGrid,
    cloneEnergyCell,
    createEcoGridTransaction,
    createRetailTransaction } from "../ioen-protocol-client/index.js"

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
const ecoGridTransactionsToProcess = [];
const retailTransactionsToProcess = [];

connectToHolochain();

let ecoGridTransactionInProgress = false;
function processEcoGridTransactions() {
    if (ecoGridTransactionInProgress == true) return;
    const payload = ecoGridTransactionsToProcess.shift();
    if (payload == undefined) return;
    ecoGridTransactionInProgress = true;
    createEcoGridTransaction(payload, () => {
        ecoGridTransactionInProgress = false;
    });
};

let retailTransactionInProgress = false;
function processRetailTransactions() {
    if (retailTransactionInProgress == true) return;
    const payload = retailTransactionsToProcess.shift();
    if (payload == undefined) return;
    retailTransactionInProgress = true;
    createRetailTransaction(payload, () => {
        retailTransactionInProgress = false;
    });
}

setInterval(processRetailTransactions, 10);
setInterval(processEcoGridTransactions, 10);

io.on('connection', (socket) => {
    var cnt = 0;
    console.log('[' + (new Date()).toUTCString() + '] IOEN Protocol connecting with NanoGridName ' + socket.handshake.auth.id);	

    socket.on('CreateNewRetailer', () => {        
        createNewAgent('Redgrid Energy', (agent, protocolAppInfo) => {
            socket.emit('AgentPubKeyGenerated', agent);
            socket.emit('AppInfo', protocolAppInfo);
        });
    });         

    socket.on('CreateNewNanoGrid', (nanoGrid) => {
        createNewAgent(nanoGrid.nanoGridName, (agent, protocolAppInfo) => {
            socket.emit('AgentPubKeyGenerated', agent);
            socket.emit('AppInfo', protocolAppInfo);
            createNewNanoGrid(nanoGrid, agent.agentPubKey, protocolAppInfo, (actionHash) => {
                socket.emit('NanoGridCreated', actionHash);
            });
        });     
    });

    socket.on('CloneEnergyCell', (protocolAppInfo) => {        
        cloneEnergyCell(protocolAppInfo.installedAppId, protocolAppInfo.networkSeed, (clonedEnergyCell) => {
            protocolAppInfo.transactionsCellId = protocolAppInfo.tomorrowTransactionsCellId;
            protocolAppInfo.tomorrowTransactionsCellId = clonedEnergyCell;
            socket.emit('ClonedEnergyCell', protocolAppInfo);
        });
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

    // socket.on('GetRequiredEnergyFromSupplyAgreements', (nanoGrid, requiredEnergy, supplyAgreements) => {        
    //     getRequiredEnergyFromSupplyAgreements(nanoGrid, requiredEnergy, supplyAgreements, (requiredEnergy) => {
    //         socket.emit('SupplyAgreementsExecuted', requiredEnergy);
    //     });
    // });

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

