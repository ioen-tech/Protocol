use hdi::prelude::*;







#[hdk_entry_helper]
#[derive(Clone)]
#[serde(rename_all = "camelCase")]
pub struct EcoGridSupplierBlock {
  pub supplier: AgentPubKey,
  pub interval_time: f64,           // start of interval
  pub interval_supply_amount: f32,  // total available at beginning of interval
}