use hdk::prelude::*;
use charges_integrity::ServiceToPropertyCharge;
use charges_integrity::EntryTypes;

#[hdk_extern]
pub fn get_service_to_property_charge(action_hash: ActionHash) -> ExternResult<Option<Record>> {
  get(action_hash, GetOptions::default())
}


#[hdk_extern]
pub fn create_service_to_property_charge(service_to_property_charge: ServiceToPropertyCharge) -> ExternResult<ActionHash> {
  create_entry(&EntryTypes::ServiceToPropertyCharge(service_to_property_charge.clone()))
}


#[derive(Serialize, Deserialize, Debug)]
pub struct UpdateServiceToPropertyChargeInput {
  original_action_hash: ActionHash,
  updated_service_to_property_charge: ServiceToPropertyCharge
}

#[hdk_extern]
pub fn update_service_to_property_charge(input: UpdateServiceToPropertyChargeInput) -> ExternResult<ActionHash> {
  update_entry(input.original_action_hash, &input.updated_service_to_property_charge)
}


#[hdk_extern]
pub fn delete_service_to_property_charge(action_hash: ActionHash) -> ExternResult<ActionHash> {
  delete_entry(action_hash)
}

