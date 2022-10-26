use hdi::prelude::*;







#[hdk_entry_helper]
#[derive(Clone)]
#[serde(rename_all = "camelCase")]
pub struct RetailConsumerBlock {
  pub supply_time: f64,
  pub consumer: AgentPubKey,
  pub amount_supplied: f32,
  pub tariff: f32,
}