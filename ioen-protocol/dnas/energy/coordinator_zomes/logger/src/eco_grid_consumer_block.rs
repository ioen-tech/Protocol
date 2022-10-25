use hdk::prelude::*;
use logger_integrity::EcoGridConsumerBlock;
use logger_integrity::EntryTypes;

#[hdk_extern]
pub fn get_eco_grid_consumer_block(action_hash: ActionHash) -> ExternResult<Option<Record>> {
  get(action_hash, GetOptions::default())
}


#[hdk_extern]
pub fn create_eco_grid_consumer_block(eco_grid_consumer_block: EcoGridConsumerBlock) -> ExternResult<ActionHash> {
  create_entry(&EntryTypes::EcoGridConsumerBlock(eco_grid_consumer_block.clone()))
  // Get consumers supply agreements
  // Iterate
  // remote_call supplier with required energy

  // if amount supplied = required break out of loop
  // else do next sa
}

// request energy purchase
// Supplier gets supply agreement
// Supplier gets suppplier block and linked execurted supply agreemetns
// Calculate reamining supplier energy
// supply to consumer execute a sa
// link it to sb
// return amount supplied

