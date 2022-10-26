import { Server } from 'socket.io';
import sqlite3 from 'sqlite3';
const SQLite3 = sqlite3.verbose();

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

console.log('Starting IOEN Protocol Socket SQLLite');
const ecoGridTransactionsToProcess = [];
const retailTransactionsToProcess = [];

let ecoGridTransactionInProgress = false;
function processEcoGridTransactions() {
    if (ecoGridTransactionInProgress == true) return;
    const payload = ecoGridTransactionsToProcess.shift();
    if (payload == undefined) return;
    ecoGridTransactionInProgress = true;
    console.log(payload);
    // createEcoGridTransaction(payload, (elapsedTime) => {
    //     console.log('Elapsed time createEcoGridTransaction ' + elapsedTime + ' ms');
        ecoGridTransactionInProgress = false;
    // });
};

let retailTransactionInProgress = false;
function processRetailTransactions() {
    if (retailTransactionInProgress == true) return;
    const payload = retailTransactionsToProcess.shift();
    if (payload == undefined) return;
    retailTransactionInProgress = true;
    console.log(payload);
    // createRetailTransaction(payload, (elapsedTime) => {
    //     console.log('Elapsed time createRetailTransaction ' + elapsedTime + ' ms');
        retailTransactionInProgress = false;
    // });
}

setInterval(processRetailTransactions, 10);
setInterval(processEcoGridTransactions, 10);

let ioenProtocolDb = null;
let energyLoggerDb = null; 

function cloneEnergyLogger(happNetworkSeed, dailyNetworkSeed, callback) {
    energyLoggerDb = new sqlite3.Database(`./energy_logger/energy_logger_${happNetworkSeed}_${dailyNetworkSeed}.db`, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log(`Connected to the ${happNetworkSeed}_${dailyNetworkSeed} energy logger.`);
        energyLoggerDb.serialize(() => {
            energyLoggerDb.run('CREATE TABLE IF NOT EXISTS eco_grid_consumer_blocks (eco_grid_consumer_block_id INTEGER PRIMARY KEY, consumer TEXT, supply_time INTEGER, consumer_required_amount REAL)');
            energyLoggerDb.run('CREATE TABLE IF NOT EXISTS eco_grid_supplier_blocks (eco_grid_suppplier_block_id INTEGER PRIMARY KEY, supplier TEXT, interval_time INTEGER, interval_supply_amount REAL)');
            energyLoggerDb.run('CREATE TABLE IF NOT EXISTS retail_consumer_blocks (retail_consumer_block_id INTEGER PRIMARY KEY, consumer TEXT, supply_time INTEGER, consumer_required_amount REAL)');
        });
        const protocolAppInfo = {
            installedAppId: happNetworkSeed,
            nanoGridSettingsCellId: happNetworkSeed,
            ioenFuelCellId: '',
            billingCellId: '',
            transactionsCellId: `${happNetworkSeed}_${dailyNetworkSeed}`,
            tomorrowTransactionsCellId: ''
        }
        callback(protocolAppInfo);
      });
}
io.on('connection', (socket) => {
  var cnt = 0;
  console.log('[' + (new Date()).toUTCString() + '] IOEN Protocol connecting with NanoGridName ' + socket.handshake.auth.id);	

  socket.on('CreateNewRetailer', (retailer) => {        
    //   createNewAgent(retailer.retailerName, retailer.happNetworkSeed, retailer.dailyNetworkSeed, (agent, protocolAppInfo) => {
    //       socket.emit('AgentPubKeyGenerated', agent);
    //       socket.emit('AppInfo', protocolAppInfo);
    //   });
  });

  socket.on('CreateNewNanoGrid', (nanoGrid) => {
    ioenProtocolDb = new SQLite3.Database(`./ioen-protocol_${nanoGrid.happNetworkSeed}.db`, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log(`Connected to the ${nanoGrid.happNetworkSeed} database.`);
        ioenProtocolDb.serialize(() => {
            ioenProtocolDb.run('CREATE TABLE IF NOT EXISTS nanogrids (nano_grid_id INTEGER PRIMARY KEY, nano_grid_name TEXT, number_of_solar_panels INTEGER, storage_capacity REAL)');
            ioenProtocolDb.run(`INSERT INTO nanogrids (nano_grid_name, number_of_solar_panels, storage_capacity) VALUES(?, ?, ?)`, [nanoGrid.nanoGridName, nanoGrid.numberOfSolarPanels, nanoGrid.storageCapacity], function(err) {
                if (err) {
                  return console.log(err.message);
                }
                // get the last insert id
                console.log(`A nanogrid has been inserted with nano_grid_id ${this.lastID}`);
                const agent = {
                    agentPubKey: this.lastID,
                    installedAppId: nanoGrid.nanoGridName
                }
                socket.emit('AgentPubKeyGenerated', agent);
                socket.emit('NanoGridCreated', this.lastID);
              });
        });
    });
    cloneEnergyLogger(nanoGrid.happNetworkSeed, nanoGrid.dailyNetworkSeed, (protocolAppInfo) => {
        socket.emit('AppInfo', protocolAppInfo);
    });
    
    //   createNewAgent(nanoGrid.nanoGridName, nanoGrid.happNetworkSeed, nanoGrid.dailyNetworkSeed, (agent, protocolAppInfo) => {
    //       socket.emit('AgentPubKeyGenerated', agent);
    //       socket.emit('AppInfo', protocolAppInfo);
    //       createNewNanoGrid(nanoGrid, agent.agentPubKey, protocolAppInfo, (actionHash) => {
    //           socket.emit('NanoGridCreated', actionHash);
    //       });
    //   });     
  });

  socket.on('CreateSupplyAgreements', (nanoGridSupplyAgreements) => {
      console.log(nanoGridSupplyAgreements);  
      // createSupplyAgreements(nanoGridSupplyAgreements, (agent, protocolAppInfo) => {
      //     socket.emit('AgentPubKeyGenerated', agent);
      // }); 
  });

  socket.on('CloneEnergyCell', (protocolAppInfo) => {   
    cloneEnergyLogger(protocolAppInfo.happNetworkSeed, protocolAppInfo.dailyNetworkSeed, (protocolAppInfo) => {
        socket.emit('ClonedEnergyCell', protocolAppInfo);
    });
    //   cloneEnergyCell(protocolAppInfo.installedAppId, protocolAppInfo.happNetworkSeed + protocolAppInfo.dailyNetworkSeed, (clonedEnergyCell) => {
    //       protocolAppInfo.tomorrowTransactionsCellId = clonedEnergyCell;
    //       console.log('');
    //       console.log('CloneEnergyCell');
    //       console.log(protocolAppInfo);
    //       socket.emit('ClonedEnergyCell', protocolAppInfo);
    //   });
  });

  socket.on('GetSupplyAgreements', (nanoGrid) => {        
      getSupplyAgreements(nanoGrid, (supplyAgreements) => {
          socket.emit('SupplyAgreementsRetrieved', supplyAgreements);
      });
  });

  socket.on('AddEcoGridTransactionToProcessingList', (transaction) => {
    console.log(transaction);
    ecoGridTransactionsToProcess.push(transaction);
  });

  socket.on('AddRetailTransactionToProcessingList', (transaction) => {
      console.log(transaction);
      retailTransactionsToProcess.push(transaction);
  });

  socket.on('disconnect', (reason) => {
      console.log('[' + (new Date()).toUTCString() + '] ' + socket.id + ' disconnected after ' + cnt + ' pings. Reason: ' + reason);
  });

});




// const sqlite3 = require('sqlite3').verbose();
// let ioenProtocolDb = new sqlite3.Database('./ioen-protocol.db', (err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Connected to the chinook database.');
// });
// let db = new sqlite3.Database('./energy_logger/energy_logger20221022.db', (err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Connected to the chinook database.');
// });

// db.serialize(() => {
//     db.run("CREATE TABLE lorem (info TEXT)");

//     const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//     for (let i = 0; i < 10; i++) {
//         stmt.run("Ipsum " + i);
//     }
//     stmt.finalize();

//     db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
//         console.log(row.id + ": " + row.info);
//     });
// });

// db.close();