import {
  connectToHolochain,
  createNewAgent,
  createNewNanoGrid,
  createEcoGridTransaction,
  createRetailTransaction } from '../ioen-protocol-client/index.js';
import { Server } from "socket.io";
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
exec('curl ip-adresim.app', function(error, stdout, stderr){
  if(error)
      return;
  console.log('your ip is :'+ stdout);
});
const calculatePowerRequirementsInterval = 10000;
const nanoGridName = '58 Alice St';
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const agentPubKeyFileName = path.resolve(__dirname, 'agentPubKey.txt');
const protocolAppInfoFileName = path.resolve(__dirname, 'protocolAppInfo.json');
const io = new Server(5858, { //local port we are binding the pingpong server to
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
let agentPubKey = '';
let appInfo = {};

async function connect() {
  await connectToHolochain();
  try {
    agentPubKey = fs.readFileSync(agentPubKeyFileName, {encoding:'utf8'});
    appInfo = JSON.parse(fs.readFileSync(protocolAppInfoFileName, {encoding:'utf8'}));
    console.log('agentPubkey ' + agentPubKey)
    setInterval(calculatePowerRequirements, calculatePowerRequirementsInterval);
  } catch (err) {
    // console.log(err)
  }
  if (agentPubKey == '' || appInfo == '') {
    console.log('First time setup')
    createNewAgent(nanoGridName, (agent, protocolAppInfo) => {
      fs.writeFileSync(agentPubKeyFileName, agent.agentPubKey, {encoding:'utf8',flag:'w'});
      fs.writeFileSync(protocolAppInfoFileName, JSON.stringify(protocolAppInfo), {encoding:'utf8',flag:'w'});
      agentPubKey = agent.agentPubKey;
      appInfo = protocolAppInfo;
      const nanoGrid = {
        nanoGridName,
        numberOfSolarPanels: 32,
        storageCapacity: 13
      };
      createNewNanoGrid(nanoGrid, agent.agentPubKey, protocolAppInfo, (actionHash) => {
        console.log('NanoGridCreated', actionHash);
        setInterval(calculatePowerRequirements, calculatePowerRequirementsInterval);
      });
    });
  };
};

connect();

const url = 'https://192.168.0.185/api/meters/aggregates';
const port = process.argv[2];
const email = 'philip.beadle@live.com.au';
const password = 'IoenRocks!';
let supplyAgreements = [];
import axios from 'axios';
import https from 'https';
let token = '';
axios
  .post('https://192.168.0.185/api/login/Basic', {
    email,
    password,
    username: 'customer'
  },
  {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    }),
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => {
    console.log(`statusCode: ${res.status}`)
    token = res.data.token
    console.log(token)
  })
  .catch(error => {
    console.error(error)
  });

let availableEnergy = 0;
function calculatePowerRequirements() {
  if (availableEnergy > 0) {
    // Any left over energy is used to charge the local community battery
    console.log(availableEnergy + ' W to charge local community battery');
    availableEnergy = 0;
  };
  axios
    .get('https://192.168.0.185/api/meters/aggregates', 
    {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const currentTime = new Date()
      const hour = currentTime.getHours() + 1
      const day = currentTime.getDate()
      const month = currentTime.getMonth() + 1
      const year = currentTime.getFullYear()
  
      // Tesla Gateway value for site.instant_power is the amount either being bought from the retailer or sold as Feed In Tariff
      // hence its the amount of available energy that can be sold to other nano grids via a supply agreement.
      // availableEnergy = res.data.site.instant_power * -1;
      availableEnergy = 8000;
      console.log(availableEnergy + ' W from solar panels');
      if (availableEnergy < 0) {
        let requiredEnergy = availableEnergy;
        // Executed Supply Agreements to buy required energy
        // getRequiredEnergyFromSupplyAgreements(agentPubKey,  supplyAgreements);
      }
    });
};

io.on('connection', (socket) => {
  console.log('[' + (new Date()).toUTCString() + '] Consumer Nanogrid ' + socket.handshake.auth.id + ' connecting with NanoGridName ' + nanoGridName);	

  socket.on('GetRequiredEnergyFromSupplyAgreement', (requiredEnergy, callback) => {
    // socket.handshake.auth.
    // get supplyagreement from IOEN Protocol for socket.handshake.auth.consumerAgentPubKey
    let amountSupplied = 0;
    if (availableEnergy > requiredEnergy) {
      availableEnergy -= requiredEnergy;
      amountSupplied = requiredEnergy;
      requiredEnergy = 0;
    } else {
      requiredEnergy -= availableEnergy;
      amountSupplied = availableEnergy;
      availableEnergy = 0;
    }
    console.log(availableEnergy + ' W left after selling ' + amountSupplied + ' W to ' + socket.handshake.auth.id);
    callback(amountSupplied, requiredEnergy);
  });
});
