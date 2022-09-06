
import { DnaSource, Record, ActionHash } from "@holochain/client";
import { pause, runScenario } from "@holochain/tryorama";
import { decode } from '@msgpack/msgpack';
import pkg from 'tape-promise/tape';
const { test } = pkg;

import { billingDna } from  "../../utils";


export default () => test("retail_charge CRUD tests", async (t) => {
  await runScenario(async scenario => {

    const dnas: DnaSource[] = [{path: billingDna }];

    const [alice, bob]  = await scenario.addPlayersWithHapps([dnas, dnas]);

    await scenario.shareAllAgents();

    const createInput = {
  "consumerNanoGrid": Buffer.from(new Uint8Array([132,32,36,29,253,64,48,102,137,234,200,185,19,74,248,23,241,165,230,229,57,91,17,136,23,116,216,234,190,235,135,119,66,152,25,70,41,183,0])),
  "totalSupplied": "It's a delight to trust somebody so completely. We gotta burn the rain forest, dump toxic waste, pollute the air, and rip up the OZONE! God creates Man.",
  "totalCost": "Yeah, but your scientists were so preoccupied with whether or not they could, they didn't stop to think if they should. I gave it a virus. Do you need a manager?"
};

    // Alice creates a retail_charge
    const createActionHash: ActionHash = await alice.cells[0].callZome({
      zome_name: "charges",
      fn_name: "create_retail_charge",
      payload: createInput,
    });
    t.ok(createActionHash);

    // Wait for the created entry to be propagated to the other node.
    await pause(100);

    
    // Bob gets the created retail_charge
    const createReadOutput: Record = await bob.cells[0].callZome({
      zome_name: "charges",
      fn_name: "get_retail_charge",
      payload: createActionHash,
    });
    t.deepEqual(createInput, decode((createReadOutput.entry as any).Present.entry) as any);
    
    
    // Alice updates the retail_charge
    const contentUpdate = {
  "consumerNanoGrid": Buffer.from(new Uint8Array([132,32,36,142,77,163,50,29,17,74,186,63,123,227,69,167,165,8,182,3,232,185,78,95,141,116,170,13,243,171,223,14,80,122,4,186,163,171,66])),
  "totalSupplied": "God destroys dinosaurs. Do you need a manager? Goodbye!",
  "totalCost": "King Kong? It must mean my character is interesting in some way. They can trust me and go."
}

    const updateInput = {
      original_action_hash: createActionHash,
      updated_retail_charge: contentUpdate,
    };

    const updateActionHash: ActionHash = await alice.cells[0].callZome({
      zome_name: "charges",
      fn_name: "update_retail_charge",
      payload: updateInput,
    });
    t.ok(updateActionHash); 

    // Wait for the updated entry to be propagated to the other node.
    await pause(100);

      
    // Bob gets the updated retail_charge
    const readUpdatedOutput: Record = await bob.cells[0].callZome({
      zome_name: "charges",
      fn_name: "get_retail_charge",
      payload: updateActionHash,
    });
    t.deepEqual(contentUpdate, decode((readUpdatedOutput.entry as any).Present.entry) as any); 

    
    
    // Alice deletes the retail_charge
    const deleteActionHash = await alice.cells[0].callZome({
      zome_name: "charges",
      fn_name: "delete_retail_charge",
      payload: createActionHash,
    });
    t.ok(deleteActionHash); 

      
    // Wait for the deletion action to be propagated to the other node.
    await pause(100);

    // Bob tries to get the deleted retail_charge, but he doesn't get it because it has been deleted
    const readDeletedOutput = await bob.cells[0].callZome({
      zome_name: "charges",
      fn_name: "get_retail_charge",
      payload: createActionHash,
    });
    t.notOk(readDeletedOutput);

    
  });



});
