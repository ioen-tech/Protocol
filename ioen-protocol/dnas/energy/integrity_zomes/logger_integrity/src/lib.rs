use hdi::prelude::*;

mod eco_grid_consumer_block;
pub use eco_grid_consumer_block::EcoGridConsumerBlock;

mod retail_consumer_block;
pub use retail_consumer_block::RetailConsumerBlock;

mod eco_grid_supplier_block;
pub use eco_grid_supplier_block::EcoGridSupplierBlock;

#[hdk_entry_defs]
#[unit_enum(UnitEntryTypes)]
pub enum EntryTypes {
#[entry_def()]
EcoGridConsumerBlock(EcoGridConsumerBlock),
#[entry_def()]
RetailConsumerBlock(RetailConsumerBlock),
EcoGridSupplierBlock(EcoGridSupplierBlock),
}

#[hdk_extern]
pub fn validate(_op: Op) -> ExternResult<ValidateCallbackResult> {
  Ok(ValidateCallbackResult::Valid)
}
