use hdi::prelude::*;

mod eco_grid_transaction;
pub use eco_grid_transaction::EcoGridTransaction;

mod retail_transaction;
pub use retail_transaction::RetailTransaction;


#[hdk_entry_defs]
#[unit_enum(UnitEntryTypes)]
pub enum EntryTypes {
#[entry_def()]
EcoGridTransaction(EcoGridTransaction),
#[entry_def()]
RetailTransaction(RetailTransaction),

}

#[hdk_extern]
pub fn validate(_op: Op) -> ExternResult<ValidateCallbackResult> {
  Ok(ValidateCallbackResult::Valid)
}
