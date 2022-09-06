
import { DnaSource, Record, ActionHash } from "@holochain/client";
import { pause, runScenario } from "@holochain/tryorama";
import { decode } from '@msgpack/msgpack';
import pkg from 'tape-promise/tape';
const { test } = pkg;

import { energyDna } from  "../../utils";


export default () => test("retail_transaction CRUD tests", async (t) => {
  await runScenario(async scenario => {

    const dnas: DnaSource[] = [{path: energyDna }];

    const [alice, bob]  = await scenario.addPlayersWithHapps([dnas, dnas]);

    await scenario.shareAllAgents();

    const createInput = {
  "supplyTime": 1662424529558,
  "consumerNanoGrid": Buffer.from(new Uint8Array([132,32,36,41,46,115,50,134,245,75,194,253,72,22,98,97,243,190,202,64,200,172,141,250,233,229,121,53,28,73,10,46,21,207,95,161,243,184,138])),
  "amountSupplied": "Just my luck, no ice. Remind me to thank John for a lovely weekend. Goodbye!",
  "tariff": "Remind me to thank John for a lovely weekend. I love to be directed. This thing comes fully loaded."
};

    // Alice creates a retail_transaction
    const createActionHash: ActionHash = await alice.cells[0].callZome({
      zome_name: "transactions",
      fn_name: "create_retail_transaction",
      payload: createInput,
    });
    t.ok(createActionHash);

    // Wait for the created entry to be propagated to the other node.
    await pause(100);

    
    // Bob gets the created retail_transaction
    const createReadOutput: Record = await bob.cells[0].callZome({
      zome_name: "transactions",
      fn_name: "get_retail_transaction",
      payload: createActionHash,
    });
    t.deepEqual(createInput, decode((createReadOutput.entry as any).Present.entry) as any);
    
    
    // Alice updates the retail_transaction
    const contentUpdate = {
  "supplyTime": 1662424529559,
  "consumerNanoGrid": Buffer.from(new Uint8Array([132,32,36,156,220,56,108,84,116,154,40,227,249,154,59,82,187,154,229,68,64,234,117,246,197,79,107,4,51,193,58,120,155,254,82,231,213,145,152])),
  "amountSupplied": "Yes, Yes, without the oops! Hey, you know how I'm, like. You know what?",
  "tariff": "I gave it a cold? Yes, Yes, without the oops! God creates dinosaurs."
}

    const updateInput = {
      original_action_hash: createActionHash,
      updated_retail_transaction: contentUpdate,
    };

    const updateActionHash: ActionHash = await alice.cells[0].callZome({
      zome_name: "transactions",
      fn_name: "update_retail_transaction",
      payload: updateInput,
    });
    t.ok(updateActionHash); 

    // Wait for the updated entry to be propagated to the other node.
    await pause(100);

      
    // Bob gets the updated retail_transaction
    const readUpdatedOutput: Record = await bob.cells[0].callZome({
      zome_name: "transactions",
      fn_name: "get_retail_transaction",
      payload: updateActionHash,
    });
    t.deepEqual(contentUpdate, decode((readUpdatedOutput.entry as any).Present.entry) as any); 

    
    
    // Alice deletes the retail_transaction
    const deleteActionHash = await alice.cells[0].callZome({
      zome_name: "transactions",
      fn_name: "delete_retail_transaction",
      payload: createActionHash,
    });
    t.ok(deleteActionHash); 

      
    // Wait for the deletion action to be propagated to the other node.
    await pause(100);

    // Bob tries to get the deleted retail_transaction, but he doesn't get it because it has been deleted
    const readDeletedOutput = await bob.cells[0].callZome({
      zome_name: "transactions",
      fn_name: "get_retail_transaction",
      payload: createActionHash,
    });
    t.notOk(readDeletedOutput);

    
  });



});
