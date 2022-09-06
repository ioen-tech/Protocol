
import { DnaSource, Record, ActionHash } from "@holochain/client";
import { pause, runScenario } from "@holochain/tryorama";
import { decode } from '@msgpack/msgpack';
import pkg from 'tape-promise/tape';
const { test } = pkg;

import { billingDna } from  "../../utils";


export default () => test("eco_grid_charge CRUD tests", async (t) => {
  await runScenario(async scenario => {

    const dnas: DnaSource[] = [{path: billingDna }];

    const [alice, bob]  = await scenario.addPlayersWithHapps([dnas, dnas]);

    await scenario.shareAllAgents();

    const createInput = {
  "supplierNanoGrid": Buffer.from(new Uint8Array([132,32,36,49,152,72,19,34,254,59,63,178,67,148,234,98,208,174,252,204,168,26,2,60,184,63,141,114,9,230,237,71,170,122,39,155,101,115,220])),
  "totalSupplied": "I travel for work, but recently, friends said I should take major trips. You know what? And the clock is ticking.",
  "consumerNanoGrid": Buffer.from(new Uint8Array([132,32,36,11,110,28,148,106,252,218,254,142,191,114,253,10,47,131,239,229,159,203,7,66,158,182,75,133,183,28,85,21,229,115,32,10,238,184,63])),
  "totalCost": "You're a very talented young man, with your own clever thoughts and ideas. Eventually, you do plan to have dinosaurs on your dinosaur tour, right? This thing comes fully loaded."
};

    // Alice creates a eco_grid_charge
    const createActionHash: ActionHash = await alice.cells[0].callZome({
      zome_name: "charges",
      fn_name: "create_eco_grid_charge",
      payload: createInput,
    });
    t.ok(createActionHash);

    // Wait for the created entry to be propagated to the other node.
    await pause(100);

    
    // Bob gets the created eco_grid_charge
    const createReadOutput: Record = await bob.cells[0].callZome({
      zome_name: "charges",
      fn_name: "get_eco_grid_charge",
      payload: createActionHash,
    });
    t.deepEqual(createInput, decode((createReadOutput.entry as any).Present.entry) as any);
    
    
    // Alice updates the eco_grid_charge
    const contentUpdate = {
  "supplierNanoGrid": Buffer.from(new Uint8Array([132,32,36,111,151,155,171,156,202,54,199,180,11,236,78,66,110,155,84,146,166,182,16,158,9,8,27,224,42,10,198,105,190,29,128,35,188,226,0])),
  "totalSupplied": "It's nice to play a character that has a soulful, dependent, close relationship. So you two dig up, dig up dinosaurs? It must mean my character is interesting in some way.",
  "consumerNanoGrid": Buffer.from(new Uint8Array([132,32,36,99,214,138,184,210,189,12,155,111,145,225,69,65,7,172,43,97,196,234,66,249,219,108,185,105,21,56,106,220,118,35,24,28,166,24,251])),
  "totalCost": "I love to be directed. Must go faster. No matter how you travel, it's still you going."
}

    const updateInput = {
      original_action_hash: createActionHash,
      updated_eco_grid_charge: contentUpdate,
    };

    const updateActionHash: ActionHash = await alice.cells[0].callZome({
      zome_name: "charges",
      fn_name: "update_eco_grid_charge",
      payload: updateInput,
    });
    t.ok(updateActionHash); 

    // Wait for the updated entry to be propagated to the other node.
    await pause(100);

      
    // Bob gets the updated eco_grid_charge
    const readUpdatedOutput: Record = await bob.cells[0].callZome({
      zome_name: "charges",
      fn_name: "get_eco_grid_charge",
      payload: updateActionHash,
    });
    t.deepEqual(contentUpdate, decode((readUpdatedOutput.entry as any).Present.entry) as any); 

    
    
    // Alice deletes the eco_grid_charge
    const deleteActionHash = await alice.cells[0].callZome({
      zome_name: "charges",
      fn_name: "delete_eco_grid_charge",
      payload: createActionHash,
    });
    t.ok(deleteActionHash); 

      
    // Wait for the deletion action to be propagated to the other node.
    await pause(100);

    // Bob tries to get the deleted eco_grid_charge, but he doesn't get it because it has been deleted
    const readDeletedOutput = await bob.cells[0].callZome({
      zome_name: "charges",
      fn_name: "get_eco_grid_charge",
      payload: createActionHash,
    });
    t.notOk(readDeletedOutput);

    
  });



});
