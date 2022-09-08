use hdi::prelude::*;







#[hdk_entry_helper]
#[derive(Clone)]
#[serde(rename_all = "camelCase")]
pub struct RetailTransaction {
  pub supply_time: f64,
  pub consumer_nano_grid: AgentPubKey,
  pub amount_supplied: f32,
  pub tariff: f32,
}