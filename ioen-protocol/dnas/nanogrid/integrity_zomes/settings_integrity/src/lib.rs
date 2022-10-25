use hdi::prelude::*;

mod nanogrid;
pub use nanogrid::Nanogrid;

mod supply_agreement;
pub use supply_agreement::SupplyAgreement;

#[hdk_entry_defs]
#[unit_enum(UnitEntryTypes)]
pub enum EntryTypes {
#[entry_def()]
Nanogrid(Nanogrid),
SupplyAgreement(SupplyAgreement),

}

#[hdk_extern]
pub fn validate(_op: Op) -> ExternResult<ValidateCallbackResult> {
  Ok(ValidateCallbackResult::Valid)
}
