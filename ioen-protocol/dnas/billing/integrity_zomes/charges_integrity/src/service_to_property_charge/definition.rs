use hdi::prelude::*;





#[hdk_entry_helper]
#[derive(Clone)]
#[serde(rename_all = "camelCase")]
pub struct ServiceToPropertyCharge {
  pub number_of_days: String,
  pub rate_per_day: String,
}