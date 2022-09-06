use hdk::prelude::*;
use charges_integrity::EcoGridCharge;
use charges_integrity::EntryTypes;

#[hdk_extern]
pub fn get_eco_grid_charge(action_hash: ActionHash) -> ExternResult<Option<Record>> {
  get(action_hash, GetOptions::default())
}


#[hdk_extern]
pub fn create_eco_grid_charge(eco_grid_charge: EcoGridCharge) -> ExternResult<ActionHash> {
  create_entry(&EntryTypes::EcoGridCharge(eco_grid_charge.clone()))
}


#[derive(Serialize, Deserialize, Debug)]
pub struct UpdateEcoGridChargeInput {
  original_action_hash: ActionHash,
  updated_eco_grid_charge: EcoGridCharge
}

#[hdk_extern]
pub fn update_eco_grid_charge(input: UpdateEcoGridChargeInput) -> ExternResult<ActionHash> {
  update_entry(input.original_action_hash, &input.updated_eco_grid_charge)
}


#[hdk_extern]
pub fn delete_eco_grid_charge(action_hash: ActionHash) -> ExternResult<ActionHash> {
  delete_entry(action_hash)
}

