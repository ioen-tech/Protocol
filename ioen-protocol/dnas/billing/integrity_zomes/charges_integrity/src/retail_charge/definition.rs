use hdi::prelude::*;





#[hdk_entry_helper]
#[derive(Clone)]
#[serde(rename_all = "camelCase")]
pub struct RetailCharge {
  pub consumer_nano_grid: AgentPubKey,
  pub total_supplied: String,
  pub total_cost: String,
}