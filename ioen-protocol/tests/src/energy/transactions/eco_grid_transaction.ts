
import { DnaSource, Record, ActionHash } from "@holochain/client";
import { pause, runScenario } from "@holochain/tryorama";
import { decode } from '@msgpack/msgpack';
import pkg from 'tape-promise/tape';
const { test } = pkg;

import { energyDna } from  "../../utils";


export default () => test("eco_grid_transaction CRUD tests", async (t) => {
  await runScenario(async scenario => {

    const dnas: DnaSource[] = [{path: energyDna }];

    const [alice, bob]  = await scenario.addPlayersWithHapps([dnas, dnas]);

    await scenario.shareAllAgents();

    const createInput = {
  "supplyTime": 1662424529557,
  "consumerNanoGrid": Buffer.from(new Uint8Array([132,32,36,202,83,121,39,165,216,44,214,28,66,183,239,121,113,103,90,184,18,222,168,92,249,247,159,102,238,84,52,27,181,230,192,76,248,105,96])),
  "amountSupplied": "No matter how you travel, it's still you going. They can trust me and go. I gave it a virus.",
  "supplierNanoGrid": Buffer.from(new Uint8Array([132,32,36,235,133,22,149,14,208,144,137,187,162,240,70,8,233,100,223,122,54,5,180,195,130,205,140,205,85,98,195,39,182,235,155,20,173,27,2])),
  "tariff": "What do they got in there? Yeah, but your scientists were so preoccupied with whether or not they could, they didn't stop to think if they should. Yes, Yes, without the oops!"
};

    // Alice creates a eco_grid_transaction
    const createActionHash: ActionHash = await alice.cells[0].callZome({
      zome_name: "transactions",
      fn_name: "create_eco_grid_transaction",
      payload: createInput,
    });
    t.ok(createActionHash);

    // Wait for the created entry to be propagated to the other node.
    await pause(100);

    
    // Bob gets the created eco_grid_transaction
    const createReadOutput: Record = await bob.cells[0].callZome({
      zome_name: "transactions",
      fn_name: "get_eco_grid_transaction",
      payload: createActionHash,
    });
    t.deepEqual(createInput, decode((createReadOutput.entry as any).Present.entry) as any);
    
    
    // Alice updates the eco_grid_transaction
    const contentUpdate = {
  "supplyTime": 1662424529558,
  "consumerNanoGrid": Buffer.from(new Uint8Array([132,32,36,69,130,55,221,38,157,105,177,24,57,125,199,89,39,183,35,109,254,247,232,76,169,9,167,67,102,140,229,160,112,225,122,16,160,21,188])),
  "amountSupplied": "It is beets. I love to be directed. They're using our own satellites against us.",
  "supplierNanoGrid": Buffer.from(new Uint8Array([132,32,36,18,241,5,212,189,177,178,36,45,93,47,236,42,209,69,0,77,59,224,79,246,141,227,101,170,240,58,201,183,248,244,36,221,35,62,78])),
  "tariff": "It's mysterious what attracts you to a person. I've crashed into a beet truck. 'Cause maybe if we screw up this planet enough, they won't want it anymore!"
}

    const updateInput = {
      original_action_hash: createActionHash,
      updated_eco_grid_transaction: contentUpdate,
    };

    const updateActionHash: ActionHash = await alice.cells[0].callZome({
      zome_name: "transactions",
      fn_name: "update_eco_grid_transaction",
      payload: updateInput,
    });
    t.ok(updateActionHash); 

    // Wait for the updated entry to be propagated to the other node.
    await pause(100);

      
    // Bob gets the updated eco_grid_transaction
    const readUpdatedOutput: Record = await bob.cells[0].callZome({
      zome_name: "transactions",
      fn_name: "get_eco_grid_transaction",
      payload: updateActionHash,
    });
    t.deepEqual(contentUpdate, decode((readUpdatedOutput.entry as any).Present.entry) as any); 

    
    
    // Alice deletes the eco_grid_transaction
    const deleteActionHash = await alice.cells[0].callZome({
      zome_name: "transactions",
      fn_name: "delete_eco_grid_transaction",
      payload: createActionHash,
    });
    t.ok(deleteActionHash); 

      
    // Wait for the deletion action to be propagated to the other node.
    await pause(100);

    // Bob tries to get the deleted eco_grid_transaction, but he doesn't get it because it has been deleted
    const readDeletedOutput = await bob.cells[0].callZome({
      zome_name: "transactions",
      fn_name: "get_eco_grid_transaction",
      payload: createActionHash,
    });
    t.notOk(readDeletedOutput);

    
  });



});
