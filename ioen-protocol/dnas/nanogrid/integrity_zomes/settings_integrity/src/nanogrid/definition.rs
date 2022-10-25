use hdi::prelude::*;





#[hdk_entry_helper]
#[derive(Clone)]
#[serde(rename_all = "camelCase")]  
pub struct Nanogrid {
  pub nano_grid_name: String,
  pub number_of_solar_panels: u32,
  pub storage_capacity: f32,
}