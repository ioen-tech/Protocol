use hdk::prelude::*;
use transactions_integrity::EcoGridTransaction;
use transactions_integrity::EntryTypes;

#[hdk_extern]
pub fn get_eco_grid_transaction(action_hash: ActionHash) -> ExternResult<Option<Record>> {
  get(action_hash, GetOptions::default())
}


#[hdk_extern]
pub fn create_eco_grid_transaction(eco_grid_transaction: EcoGridTransaction) -> ExternResult<ActionHash> {
  create_entry(&EntryTypes::EcoGridTransaction(eco_grid_transaction.clone()))
}


#[derive(Serialize, Deserialize, Debug)]
pub struct UpdateEcoGridTransactionInput {
  original_action_hash: ActionHash,
  updated_eco_grid_transaction: EcoGridTransaction
}

#[hdk_extern]
pub fn update_eco_grid_transaction(input: UpdateEcoGridTransactionInput) -> ExternResult<ActionHash> {
  update_entry(input.original_action_hash, &input.updated_eco_grid_transaction)
}


#[hdk_extern]
pub fn delete_eco_grid_transaction(action_hash: ActionHash) -> ExternResult<ActionHash> {
  delete_entry(action_hash)
}

