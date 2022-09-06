use hdk::prelude::*;
use charges_integrity::RetailCharge;
use charges_integrity::EntryTypes;

#[hdk_extern]
pub fn get_retail_charge(action_hash: ActionHash) -> ExternResult<Option<Record>> {
  get(action_hash, GetOptions::default())
}


#[hdk_extern]
pub fn create_retail_charge(retail_charge: RetailCharge) -> ExternResult<ActionHash> {
  create_entry(&EntryTypes::RetailCharge(retail_charge.clone()))
}


#[derive(Serialize, Deserialize, Debug)]
pub struct UpdateRetailChargeInput {
  original_action_hash: ActionHash,
  updated_retail_charge: RetailCharge
}

#[hdk_extern]
pub fn update_retail_charge(input: UpdateRetailChargeInput) -> ExternResult<ActionHash> {
  update_entry(input.original_action_hash, &input.updated_retail_charge)
}


#[hdk_extern]
pub fn delete_retail_charge(action_hash: ActionHash) -> ExternResult<ActionHash> {
  delete_entry(action_hash)
}

