use hdi::prelude::*;







#[hdk_entry_helper]
#[derive(Clone)]
#[serde(rename_all = "camelCase")]
pub struct RetailTransaction {
  pub supply_time: u64,
  pub consumer_nano_grid: AgentPubKey,
  pub amount_supplied: String,
  pub tariff: String,
}