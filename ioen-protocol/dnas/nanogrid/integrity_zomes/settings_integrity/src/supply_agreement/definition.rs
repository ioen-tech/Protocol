use hdi::prelude::*;





#[hdk_entry_helper]
#[derive(Clone)]
#[serde(rename_all = "camelCase")]  
pub struct SupplyAgreement {
  pub supplier: AgentPubKey,
  pub tariff_ioen_fuel: f32,
  pub transaction_energy_limit: f32,
  pub credit_limit: f32,
}