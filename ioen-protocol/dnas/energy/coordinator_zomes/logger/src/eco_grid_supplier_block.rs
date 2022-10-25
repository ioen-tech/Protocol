use hdk::prelude::*;
use logger_integrity::EcoGridSupplierBlock;
use logger_integrity::EntryTypes;

#[hdk_extern]
pub fn get_eco_grid_supplier_block(action_hash: ActionHash) -> ExternResult<Option<Record>> {
  get(action_hash, GetOptions::default())
}

#[hdk_extern]
pub fn create_eco_grid_supplier_block(eco_grid_supplier_block: EcoGridSupplierBlock) -> ExternResult<ActionHash> {
  create_entry(&EntryTypes::EcoGridSupplierBlock(eco_grid_supplier_block.clone()))
}
