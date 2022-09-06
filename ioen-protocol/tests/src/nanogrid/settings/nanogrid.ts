
import { DnaSource, Record, ActionHash } from "@holochain/client";
import { pause, runScenario } from "@holochain/tryorama";
import { decode } from '@msgpack/msgpack';
import pkg from 'tape-promise/tape';
const { test } = pkg;

import { nanogridDna } from  "../../utils";


export default () => test("nanogrid CRUD tests", async (t) => {
  await runScenario(async scenario => {

    const dnas: DnaSource[] = [{path: nanogridDna }];

    const [alice, bob]  = await scenario.addPlayersWithHapps([dnas, dnas]);

    await scenario.shareAllAgents();

    const createInput = {
  "nanoGridName": "said to Man",
  "numberOfSolarPanels": "Eventually, you do plan to have dinosaurs on your dinosaur tour, right? You wanna sell some tickets, act like you know what you're talking about. If any movie people are watching this show, please, for me, have some respect.",
  "storageCapacity": "Remind me to thank John for a lovely weekend. I love to be directed.  go, go, go, go, go!"
};

    // Alice creates a nanogrid
    const createActionHash: ActionHash = await alice.cells[0].callZome({
      zome_name: "settings",
      fn_name: "create_nanogrid",
      payload: createInput,
    });
    t.ok(createActionHash);

    // Wait for the created entry to be propagated to the other node.
    await pause(100);

    
    // Bob gets the created nanogrid
    const createReadOutput: Record = await bob.cells[0].callZome({
      zome_name: "settings",
      fn_name: "get_nanogrid",
      payload: createActionHash,
    });
    t.deepEqual(createInput, decode((createReadOutput.entry as any).Present.entry) as any);
    
    
    // Alice updates the nanogrid
    const contentUpdate = {
  "nanoGridName": "I'm we're cups",
  "numberOfSolarPanels": "No matter how you travel, it's still you going. Forget the fat lady! What do they got in there?",
  "storageCapacity": "It's nice to play a character that has a soulful, dependent, close relationship. We gotta burn the rain forest, dump toxic waste, pollute the air, and rip up the OZONE!  God help us, we're in the hands of engineers."
}

    const updateInput = {
      original_action_hash: createActionHash,
      updated_nanogrid: contentUpdate,
    };

    const updateActionHash: ActionHash = await alice.cells[0].callZome({
      zome_name: "settings",
      fn_name: "update_nanogrid",
      payload: updateInput,
    });
    t.ok(updateActionHash); 

    // Wait for the updated entry to be propagated to the other node.
    await pause(100);

      
    // Bob gets the updated nanogrid
    const readUpdatedOutput: Record = await bob.cells[0].callZome({
      zome_name: "settings",
      fn_name: "get_nanogrid",
      payload: updateActionHash,
    });
    t.deepEqual(contentUpdate, decode((readUpdatedOutput.entry as any).Present.entry) as any); 

    
    
    // Alice deletes the nanogrid
    const deleteActionHash = await alice.cells[0].callZome({
      zome_name: "settings",
      fn_name: "delete_nanogrid",
      payload: createActionHash,
    });
    t.ok(deleteActionHash); 

      
    // Wait for the deletion action to be propagated to the other node.
    await pause(100);

    // Bob tries to get the deleted nanogrid, but he doesn't get it because it has been deleted
    const readDeletedOutput = await bob.cells[0].callZome({
      zome_name: "settings",
      fn_name: "get_nanogrid",
      payload: createActionHash,
    });
    t.notOk(readDeletedOutput);

    
  });



});
