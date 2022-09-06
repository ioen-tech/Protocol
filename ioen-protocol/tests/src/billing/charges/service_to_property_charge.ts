
import { DnaSource, Record, ActionHash } from "@holochain/client";
import { pause, runScenario } from "@holochain/tryorama";
import { decode } from '@msgpack/msgpack';
import pkg from 'tape-promise/tape';
const { test } = pkg;

import { billingDna } from  "../../utils";


export default () => test("service_to_property_charge CRUD tests", async (t) => {
  await runScenario(async scenario => {

    const dnas: DnaSource[] = [{path: billingDna }];

    const [alice, bob]  = await scenario.addPlayersWithHapps([dnas, dnas]);

    await scenario.shareAllAgents();

    const createInput = {
  "numberOfDays": "virus like radio",
  "ratePerDay": "God creates Man. You know what? And the clock is ticking."
};

    // Alice creates a service_to_property_charge
    const createActionHash: ActionHash = await alice.cells[0].callZome({
      zome_name: "charges",
      fn_name: "create_service_to_property_charge",
      payload: createInput,
    });
    t.ok(createActionHash);

    // Wait for the created entry to be propagated to the other node.
    await pause(100);

    
    // Bob gets the created service_to_property_charge
    const createReadOutput: Record = await bob.cells[0].callZome({
      zome_name: "charges",
      fn_name: "get_service_to_property_charge",
      payload: createActionHash,
    });
    t.deepEqual(createInput, decode((createReadOutput.entry as any).Present.entry) as any);
    
    
    // Alice updates the service_to_property_charge
    const contentUpdate = {
  "numberOfDays": "long got oops",
  "ratePerDay": "'Cause maybe if we screw up this planet enough, they won't want it anymore! My dad once told me, laugh and the world laughs with you, Cry, and I'll give you something to cry about you little bastard! Eventually, you do plan to have dinosaurs on your dinosaur tour, right?"
}

    const updateInput = {
      original_action_hash: createActionHash,
      updated_service_to_property_charge: contentUpdate,
    };

    const updateActionHash: ActionHash = await alice.cells[0].callZome({
      zome_name: "charges",
      fn_name: "update_service_to_property_charge",
      payload: updateInput,
    });
    t.ok(updateActionHash); 

    // Wait for the updated entry to be propagated to the other node.
    await pause(100);

      
    // Bob gets the updated service_to_property_charge
    const readUpdatedOutput: Record = await bob.cells[0].callZome({
      zome_name: "charges",
      fn_name: "get_service_to_property_charge",
      payload: updateActionHash,
    });
    t.deepEqual(contentUpdate, decode((readUpdatedOutput.entry as any).Present.entry) as any); 

    
    
    // Alice deletes the service_to_property_charge
    const deleteActionHash = await alice.cells[0].callZome({
      zome_name: "charges",
      fn_name: "delete_service_to_property_charge",
      payload: createActionHash,
    });
    t.ok(deleteActionHash); 

      
    // Wait for the deletion action to be propagated to the other node.
    await pause(100);

    // Bob tries to get the deleted service_to_property_charge, but he doesn't get it because it has been deleted
    const readDeletedOutput = await bob.cells[0].callZome({
      zome_name: "charges",
      fn_name: "get_service_to_property_charge",
      payload: createActionHash,
    });
    t.notOk(readDeletedOutput);

    
  });



});
