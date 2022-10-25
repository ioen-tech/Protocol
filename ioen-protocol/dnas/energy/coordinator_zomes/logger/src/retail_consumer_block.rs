use hdk::prelude::*;
use logger_integrity::RetailConsumerBlock;
use logger_integrity::EntryTypes;

#[hdk_extern]
pub fn get_retail_consumer_block(action_hash: ActionHash) -> ExternResult<Option<Record>> {
  get(action_hash, GetOptions::default())
}


#[hdk_extern]
pub fn create_retail_consumer_block(retail_consumer_block: RetailConsumerBlock) -> ExternResult<ActionHash> {
  create_entry(&EntryTypes::RetailConsumerBlock(retail_consumer_block.clone()))
}
