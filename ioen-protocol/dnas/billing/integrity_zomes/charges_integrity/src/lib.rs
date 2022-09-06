use hdi::prelude::*;

mod eco_grid_charge;
pub use eco_grid_charge::EcoGridCharge;

mod retail_charge;
pub use retail_charge::RetailCharge;

mod service_to_property_charge;
pub use service_to_property_charge::ServiceToPropertyCharge;


#[hdk_entry_defs]
#[unit_enum(UnitEntryTypes)]
pub enum EntryTypes {
#[entry_def()]
EcoGridCharge(EcoGridCharge),
#[entry_def()]
RetailCharge(RetailCharge),
#[entry_def()]
ServiceToPropertyCharge(ServiceToPropertyCharge),

}

#[hdk_extern]
pub fn validate(_op: Op) -> ExternResult<ValidateCallbackResult> {
  Ok(ValidateCallbackResult::Valid)
}
