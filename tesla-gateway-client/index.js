const io = require("socket.io-client");
const fs = require('fs');
const path = require('path');
const socket = io("http://localhost:8080", {
  auth: {
    id: "Tesla Gateway"
  }
});
const { exec } = require('child_process')
exec('curl ip-adresim.app', function(error, stdout, stderr){
  if(error)
      return;
  console.log('your ip is :'+ stdout);
})
const agentPubKeyFileName = path.resolve(__dirname, 'agentPubKey.txt');
const url = 'https://192.168.0.185/api/meters/aggregates';
const port = process.argv[2];
const email = 'philip.beadle@live.com.au';
const password = 'IoenRocks!';
let agentPubKey = '';
let protocolAppInfo = '';
let supplyAgreements = [];
const axios = require('axios');
const https = require('https');
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
      availableEnergy = res.data.site.instant_power * -1;
      if (availableEnergy < 0) {
        let requiredEnergy = availableEnergy;
        // Executed Supply Agreements to buy required energy
        socket.emit('GetRequiredEnergyFromSupplyAgreements', agentPubKey,  supplyAgreements);
      }
    });
};
setInterval(calculatePowerRequirements, 60000);

let isCreatingNewNanoGrid = false;
socket.on("connect", () => {
  console.log(socket.id);
  try {
    agentPubKey = fs.readFileSync(agentPubKeyFileName);
    console.log('agentPubkey ' + agentPubKey)
  } catch (err) {
    console.log(err)
  }
  if (agentPubKey == '' && isCreatingNewNanoGrid == false) {
    console.log('first time agent')
    const nanogrid = {
        nanoGridName: '58 Alice St',
        numberOfSolarPanels: 32,
        storageCapacity: 13
    };
    isCreatingNewNanoGrid = true;
    socket.emit('CreateNewNanoGrid', nanogrid)
  }

  if (agentPubKey != '') {
    socket.emit('GetSupplyAgreements', nanogrid)
  }
});
socket.on('AgentPubKeyGenerated', agent => {
  agentPubKey = agent.agentPubKey;
  console.log('AgentPubKeyGenerated ' + JSON.stringify(agent));
  console.log('AgentPubKey ' + agentPubKey);
  try {
      fs.writeFileSync(agentPubKeyFileName, agentPubKey, {encoding:'utf8',flag:'w'});
      socket.emit('GetSupplyAgreements', nanogrid)
  } catch (err) {
      console.log('err' + err)
  }
  isCreatingNewNanoGrid = false;
});
socket.on('AppBundleInstalled', appInfo => {
  protocolAppInfo = appInfo;
});
socket.on('SupplyAgreementsRetrieved', supplyAgreementArray => {
  supplyAgreements = supplyAgreementArray;
});
socket.on('SupplyAgreementsExecuted', requiredEnergy => {
  if (requiredEnergy > 0) {
    // Buy from Retailer
  }
});

// fs.writeFileSync('/tmp/test-sync', 'Hey there!');