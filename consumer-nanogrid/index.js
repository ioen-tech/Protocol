const io = require("socket.io-client");
const fs = require('fs');
const socket = io("http://localhost:8080", {
  auth: {
    id: "Consumer Household"
  }
});

const agentPubKeyFileName = path.resolve(__dirname, 'agentPubKey.txt');
let agentPubKey = '';
let protocolAppInfo = '';
let supplyAgreements = [];
const retailerAgentPubKey = '';
function calculatePowerRequirements() {
  // Use CSIRO data
  const requiredEnergy = 0.5;
  // Executed Supply Agreements to buy required energy
  socket.emit('GetRequiredEnergyFromSupplyAgreements', agentPubKey, requiredEnergy,  supplyAgreements);
};

setInterval(() => {
  calculatePowerRequirements();
}, 30000);

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
        nanoGridName: 'neighbour house 1',
        numberOfSolarPanels: 0,
        storageCapacity: 0
    };
    isCreatingNewNanoGrid = true;
    socket.emit('CreateNewNanoGrid', nanogrid)
  } else {
    // get installed app info here
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

socket.on('AppInfo', appInfo => {
  protocolAppInfo = appInfo;
});

socket.on('SupplyAgreementsRetrieved', supplyAgreementArray => {
  supplyAgreements = supplyAgreementArray;
});

socket.on('SupplyAgreementsExecuted', (requiredEnergy) => {
  if (requiredEnergy > 0) {
    // Buy from Retailer
    // Get tariff from retailer
    const tariff = 1; // await get from holochain.
    const transaction = {
      supplyTime: '',
      consumerNanoGrid: agentPubKey,
      amountSupplied: requiredEnergy,
      retailerAgentPubKey,
      tariff,
      transactionsCellId: protocolAppInfo.transactionsCellId
    }
    socket.emit('AddRetailTransactionToProcessingList', transaction);
  }
});


// loadProfile = [];
// loadProfile[1, 0] = 0.537;
// loadProfile[1, 1] = 0.49;
// loadProfile[1, 2] = 0.455;
// loadProfile[1, 3] = 0.434;
// loadProfile[1, 4] = 0.425;
// loadProfile[1, 5] = 0.450;
// loadProfile[1, 6] = 0.510;
// loadProfile[1, 7] = 0.537;
// loadProfile[1, 8] = 0.577;
// loadProfile[1, 9] = 0.6;
// loadProfile[1, 10] = 0.646;
// loadProfile[1, 11] = 0.687;
// loadProfile[1, 12] = 0.734;
// loadProfile[1, 13] = 0.779;
// loadProfile[1, 14] = 0.813;
// loadProfile[1, 15] = 0.861;
// loadProfile[1, 16] = 0.928;
// loadProfile[1, 17] = 1.013;
// loadProfile[1, 18] = 1.031;
// loadProfile[1, 19] = 1.002;
// loadProfile[1, 20] = 0.965;
// loadProfile[1, 21] = 0.9;
// loadProfile[1, 22] = 0.764;
// loadProfile[1, 23] = 0.621;

// loadProfile[2, 0] = 0.504;
// loadProfile[2, 1] = 0.469;
// loadProfile[2, 2] = 0.440;
// loadProfile[2, 3] = 0.414;
// loadProfile[2, 4] = 0.408;
// loadProfile[2, 5] = 0.450;
// loadProfile[2, 6] = 0.532;
// loadProfile[2, 7] = 0.563;
// loadProfile[2, 8] = 0.569;
// loadProfile[2, 9] = 0.569;
// loadProfile[2, 10] = 0.601;
// loadProfile[2, 11] = 0.653;
// loadProfile[2, 12] = 0.703;
// loadProfile[2, 13] = 0.743;
// loadProfile[2, 14] = 0.788;
// loadProfile[2, 15] = 0.865;
// loadProfile[2, 16] = 0.963;
// loadProfile[2, 17] = 1.051;
// loadProfile[2, 18] = 1.076;
// loadProfile[2, 19] = 1.045;
// loadProfile[2, 20] = 0.993;
// loadProfile[2, 21] = 0.885;
// loadProfile[2, 22] = 0.734;
// loadProfile[2, 23] = 0.593;

// loadProfile[3, 0] = 0.485;
// loadProfile[3, 1] = 0.462;
// loadProfile[3, 2] = 0.438;
// loadProfile[3, 3] = 0.409;
// loadProfile[3, 4] = 0.401;
// loadProfile[3, 5] = 0.444;
// loadProfile[3, 6] = 0.526;
// loadProfile[3, 7] = 0.574;
// loadProfile[3, 8] = 0.571;
// loadProfile[3, 9] = 0.571;
// loadProfile[3, 10] = 0.582;
// loadProfile[3, 11] = 0.610;
// loadProfile[3, 12] = 0.644;
// loadProfile[3, 13] = 0.671;
// loadProfile[3, 14] = 0.692;
// loadProfile[3, 15] = 0.752;
// loadProfile[3, 16] = 0.843;
// loadProfile[3, 17] = 0.933;
// loadProfile[3, 18] = 0.979;
// loadProfile[3, 19] = 0.979;
// loadProfile[3, 20] = 0.946;
// loadProfile[3, 21] = 0.851;
// loadProfile[3, 22] = 0.704;
// loadProfile[3, 23] = 0.567;

// loadProfile[4, 0] = 0.483;
// loadProfile[4, 1] = 0.440;
// loadProfile[4, 2] = 0.414;
// loadProfile[4, 3] = 0.379;
// loadProfile[4, 4] = 0.374;
// loadProfile[4, 5] = 0.413;
// loadProfile[4, 6] = 0.520;
// loadProfile[4, 7] = 0.607;
// loadProfile[4, 8] = 0.624;
// loadProfile[4, 9] = 0.602;
// loadProfile[4, 10] = 0.588;
// loadProfile[4, 11] = 0.579;
// loadProfile[4, 12] = 0.582;
// loadProfile[4, 13] = 0.589;
// loadProfile[4, 14] = 0.586;
// loadProfile[4, 15] = 0.599;
// loadProfile[4, 16] = 0.666;
// loadProfile[4, 17] = 0.815;
// loadProfile[4, 18] = 0.976;
// loadProfile[4, 19] = 0.966;
// loadProfile[4, 20] = 0.912;
// loadProfile[4, 21] = 0.835;
// loadProfile[4, 22] = 0.705;
// loadProfile[4, 23] = 0.567;

// loadProfile[5, 0] = 0.521;
// loadProfile[5, 1] = 0.473;
// loadProfile[5, 2] = 0.434;
// loadProfile[5, 3] = 0.409;
// loadProfile[5, 4] = 0.401;
// loadProfile[5, 5] = 0.457;
// loadProfile[5, 6] = 0.616;
// loadProfile[5, 7] = 0.762;
// loadProfile[5, 8] = 0.737;
// loadProfile[5, 9] = 0.660;
// loadProfile[5, 10] = 0.619;
// loadProfile[5, 11] = 0.601;
// loadProfile[5, 12] = 0.600;
// loadProfile[5, 13] = 0.594;
// loadProfile[5, 14] = 0.595;
// loadProfile[5, 15] = 0.605;
// loadProfile[5, 16] = 0.710;
// loadProfile[5, 17] = 0.970;
// loadProfile[5, 18] = 1.149;
// loadProfile[5, 19] = 1.137;
// loadProfile[5, 20] = 1.085;
// loadProfile[5, 21] = 1.001;
// loadProfile[5, 22] = 0.819;
// loadProfile[5, 23] = 0.626;

// loadProfile[6, 0] = 0.540;
// loadProfile[6, 1] = 0.485;
// loadProfile[6, 2] = 0.444;
// loadProfile[6, 3] = 0.416;
// loadProfile[6, 4] = 0.415;
// loadProfile[6, 5] = 0.484;
// loadProfile[6, 6] = 0.660;
// loadProfile[6, 7] = 0.840;
// loadProfile[6, 8] = 0.869;
// loadProfile[6, 9] = 0.790;
// loadProfile[6, 10] = 0.737;
// loadProfile[6, 11] = 0.692;
// loadProfile[6, 12] = 0.671;
// loadProfile[6, 13] = 0.663;
// loadProfile[6, 14] = 0.665;
// loadProfile[6, 15] = 0.695;
// loadProfile[6, 16] = 0.832;
// loadProfile[6, 17] = 1.140;
// loadProfile[6, 18] = 1.299;
// loadProfile[6, 19] = 1.299;
// loadProfile[6, 20] = 1.235;
// loadProfile[6, 21] = 1.136;
// loadProfile[6, 22] = 0.924;
// loadProfile[6, 23] = 0.690;

// loadProfile[7, 0] = 0.546;
// loadProfile[7, 1] = 0.480;
// loadProfile[7, 2] = 0.439;
// loadProfile[7, 3] = 0.419;
// loadProfile[7, 4] = 0.420;
// loadProfile[7, 5] = 0.476;
// loadProfile[7, 6] = 0.638;
// loadProfile[7, 7] = 0.817;
// loadProfile[7, 8] = 0.836;
// loadProfile[7, 9] = 0.781;
// loadProfile[7, 10] = 0.715;
// loadProfile[7, 11] = 0.674;
// loadProfile[7, 12] = 0.667;
// loadProfile[7, 13] = 0.666;
// loadProfile[7, 14] = 0.661;
// loadProfile[7, 15] = 0.688;
// loadProfile[7, 16] = 0.816;
// loadProfile[7, 17] = 1.101;
// loadProfile[7, 18] = 1.287;
// loadProfile[7, 19] = 1.289;
// loadProfile[7, 20] = 1.238;
// loadProfile[7, 21] = 1.129;
// loadProfile[7, 22] = 0.913;
// loadProfile[7, 23] = 0.681;

// loadProfile[8, 0] = 0.544;
// loadProfile[8, 1] = 0.485;
// loadProfile[8, 2] = 0.445;
// loadProfile[8, 3] = 0.426;
// loadProfile[8, 4] = 0.425;
// loadProfile[8, 5] = 0.498;
// loadProfile[8, 6] = 0.675;
// loadProfile[8, 7] = 0.862;
// loadProfile[8, 8] = 0.836;
// loadProfile[8, 9] = 0.736;
// loadProfile[8, 10] = 0.678;
// loadProfile[8, 11] = 0.640;
// loadProfile[8, 12] = 0.638;
// loadProfile[8, 13] = 0.631;
// loadProfile[8, 14] = 0.631;
// loadProfile[8, 15] = 0.644;
// loadProfile[8, 16] = 0.762;
// loadProfile[8, 17] = 1.024;
// loadProfile[8, 18] = 1.261;
// loadProfile[8, 19] = 1.282;
// loadProfile[8, 20] = 1.231;
// loadProfile[8, 21] = 1.125;
// loadProfile[8, 22] = 0.900;
// loadProfile[8, 23] = 0.681;

// loadProfile[9, 0] = 0.522;
// loadProfile[9, 1] = 0.472;
// loadProfile[9, 2] = 0.434;
// loadProfile[9, 3] = 0.411;
// loadProfile[9, 4] = 0.404;
// loadProfile[9, 5] = 0.453;
// loadProfile[9, 6] = 0.601;
// loadProfile[9, 7] = 0.707;
// loadProfile[9, 8] = 0.686;
// loadProfile[9, 9] = 0.643;
// loadProfile[9, 10] = 0.604;
// loadProfile[9, 11] = 0.595;
// loadProfile[9, 12] = 0.590;
// loadProfile[9, 13] = 0.578;
// loadProfile[9, 14] = 0.577;
// loadProfile[9, 15] = 0.596;
// loadProfile[9, 16] = 0.670;
// loadProfile[9, 17] = 0.842;
// loadProfile[9, 18] = 1.038;
// loadProfile[9, 19] = 1.094;
// loadProfile[9, 20] = 1.066;
// loadProfile[9, 21] = 0.990;
// loadProfile[9, 22] = 0.815;
// loadProfile[9, 23] = 0.628;

// loadProfile[10, 0] = 0.475;
// loadProfile[10, 1] = 0.448;
// loadProfile[10, 2] = 0.416;
// loadProfile[10, 3] = 0.394;
// loadProfile[10, 4] = 0.395;
// loadProfile[10, 5] = 0.462;
// loadProfile[10, 6] = 0.586;
// loadProfile[10, 7] = 0.633;
// loadProfile[10, 8] = 0.604;
// loadProfile[10, 9] = 0.586;
// loadProfile[10, 10] = 0.576;
// loadProfile[10, 11] = 0.575;
// loadProfile[10, 12] = 0.575;
// loadProfile[10, 13] = 0.577;
// loadProfile[10, 14] = 0.576;
// loadProfile[10, 15] = 0.610;
// loadProfile[10, 16] = 0.686;
// loadProfile[10, 17] = 0.801;
// loadProfile[10, 18] = 0.885;
// loadProfile[10, 19] = 0.941;
// loadProfile[10, 20] = 0.940;
// loadProfile[10, 21] = 0.853;
// loadProfile[10, 22] = 0.692;
// loadProfile[10, 23] = 0.549;

// loadProfile[11, 0] = 0.453;
// loadProfile[11, 1] = 0.434;
// loadProfile[11, 2] = 0.404;
// loadProfile[11, 3] = 0.384;
// loadProfile[11, 4] = 0.379;
// loadProfile[11, 5] = 0.432;
// loadProfile[11, 6] = 0.539;
// loadProfile[11, 7] = 0.579;
// loadProfile[11, 8] = 0.567;
// loadProfile[11, 9] = 0.557;
// loadProfile[11, 10] = 0.557;
// loadProfile[11, 11] = 0.568;
// loadProfile[11, 12] = 0.575;
// loadProfile[11, 13] = 0.582;
// loadProfile[11, 14] = 0.586;
// loadProfile[11, 15] = 0.627;
// loadProfile[11, 16] = 0.711;
// loadProfile[11, 17] = 0.806;
// loadProfile[11, 18] = 0.868;
// loadProfile[11, 19] = 0.886;
// loadProfile[11, 20] = 0.875;
// loadProfile[11, 21] = 0.798;
// loadProfile[11, 22] = 0.660;
// loadProfile[11, 23] = 0.535;

// loadProfile[12, 0] = 0.493;
// loadProfile[12, 1] = 0.456;
// loadProfile[12, 2] = 0.428;
// loadProfile[12, 3] = 0.401;
// loadProfile[12, 4] = 0.393;
// loadProfile[12, 5] = 0.426;
// loadProfile[12, 6] = 0.499;
// loadProfile[12, 7] = 0.552;
// loadProfile[12, 8] = 0.576;
// loadProfile[12, 9] = 0.593;
// loadProfile[12, 10] = 0.623;
// loadProfile[12, 11] = 0.653;
// loadProfile[12, 12] = 0.684;
// loadProfile[12, 13] = 0.702;
// loadProfile[12, 14] = 0.730;
// loadProfile[12, 15] = 0.763;
// loadProfile[12, 16] = 0.833;
// loadProfile[12, 17] = 0.891;
// loadProfile[12, 18] = 0.908;
// loadProfile[12, 19] = 0.891;
// loadProfile[12, 20] = 0.880;
// loadProfile[12, 21] = 0.832;
// loadProfile[12, 22] = 0.720;
// loadProfile[12, 23] = 0.584;
