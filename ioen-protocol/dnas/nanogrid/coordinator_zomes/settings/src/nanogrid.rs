use hdk::prelude::*;
use settings_integrity::Nanogrid;
use settings_integrity::SupplyAgreement;
use settings_integrity::EntryTypes;

#[derive(Clone, Debug, Serialize, Deserialize, SerializedBytes)]
#[repr(transparent)]
#[serde(transparent)]
pub struct IPAddress(pub String);

impl From<String> for IPAddress {
    fn from(s: String) -> Self {
        Self(s)
    }
}

impl From<&str> for IPAddress {
    fn from(s: &str) -> Self {
        Self(s.to_owned())
    }
}

#[hdk_extern]
pub fn get_nanogrid(action_hash: ActionHash) -> ExternResult<Option<Record>> {
  get(action_hash, GetOptions::default())
}


#[hdk_extern]
pub fn create_nanogrid(nanogrid: Nanogrid) -> ExternResult<ActionHash> {
  create_entry(&EntryTypes::Nanogrid(nanogrid.clone()))
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SupplyAgreementInput {
  nano_grid_action_hash: ActionHash,
  supply_agreement: SupplyAgreement
}

#[hdk_extern]
pub fn create_supply_agreement(input: SupplyAgreementInput) -> ExternResult<ActionHash> {
  create_entry(&EntryTypes::SupplyAgreement(input.supply_agreement.clone()))
  // link to input.nano_grid_action_hash

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

#[hdk_extern]
pub fn get_nanogrid_address(_: ()) -> ExternResult<IPAddress> {
    match emit_signal(&IPAddress::from(String::from("i am a signal"))) {
        Ok(()) => Ok(IPAddress::from(String::from("bar"))),
        Err(e) => Err(e),
    }
}