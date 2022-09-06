use hdk::prelude::*;
use settings_integrity::Nanogrid;
use settings_integrity::EntryTypes;

#[hdk_extern]
pub fn get_nanogrid(action_hash: ActionHash) -> ExternResult<Option<Record>> {
  get(action_hash, GetOptions::default())
}


#[hdk_extern]
pub fn create_nanogrid(nanogrid: Nanogrid) -> ExternResult<ActionHash> {
  create_entry(&EntryTypes::Nanogrid(nanogrid.clone()))
}


#[derive(Serialize, Deserialize, Debug)]
pub struct UpdateNanogridInput {
  original_action_hash: ActionHash,
  updated_nanogrid: Nanogrid
}

#[hdk_extern]
pub fn update_nanogrid(input: UpdateNanogridInput) -> ExternResult<ActionHash> {
  update_entry(input.original_action_hash, &input.updated_nanogrid)
}


#[hdk_extern]
pub fn delete_nanogrid(action_hash: ActionHash) -> ExternResult<ActionHash> {
  delete_entry(action_hash)
}

