use hdi::prelude::*;







#[hdk_entry_helper]
#[derive(Clone)]
#[serde(rename_all = "camelCase")]
pub struct EcoGridConsumerBlock {
  pub supply_time: f64,               // time consumer bought during interval
  pub consumer: AgentPubKey,
  pub consumer_required_amount: f32,  // amount consumer bought
}