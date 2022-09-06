use hdk::prelude::*;
use transactions_integrity::RetailTransaction;
use transactions_integrity::EntryTypes;

#[hdk_extern]
pub fn get_retail_transaction(action_hash: ActionHash) -> ExternResult<Option<Record>> {
  get(action_hash, GetOptions::default())
}


#[hdk_extern]
pub fn create_retail_transaction(retail_transaction: RetailTransaction) -> ExternResult<ActionHash> {
  create_entry(&EntryTypes::RetailTransaction(retail_transaction.clone()))
}


#[derive(Serialize, Deserialize, Debug)]
pub struct UpdateRetailTransactionInput {
  original_action_hash: ActionHash,
  updated_retail_transaction: RetailTransaction
}

#[hdk_extern]
pub fn update_retail_transaction(input: UpdateRetailTransactionInput) -> ExternResult<ActionHash> {
  update_entry(input.original_action_hash, &input.updated_retail_transaction)
}


#[hdk_extern]
pub fn delete_retail_transaction(action_hash: ActionHash) -> ExternResult<ActionHash> {
  delete_entry(action_hash)
}

