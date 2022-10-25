
- Supply Agreement: A Neighbour 2 Neighbour Agreement to supply energy at an agreed tariff with a credit limit and per interval limit. Stored in the nanogrid DHT.
- Supplier Block: This is the amount of energy in Watts a Supplier has available for Supply Agreements in the current interval. The entry is linked to Path SupplierAgentPubKey.HH.INTERVAL in the energy_logger DHT
- Consumer Block: This is the amount of energy in Watts a Consumer requires from Supply Agreements in the current interval. The entry is linked to Path ConsumerAgentPubKey.HH.INTERVAL in the energy_logger DHT
- Energy Request: Consumer remote_calls Suppliers in their Supply Agreements with amount of energy required.
- Executed Supply Agreement: An entry that records the amount of energy traded with the total cost that links the Supplier Block and Consumer Block.
> energy_logger is cloned each day

``` mermaid
  sequenceDiagram
    loop Every 5 minutes
      Supplier->>Energy Logger: Record Supplier Block
      Consumer->>Energy Logger: Record Consumer Block
      Consumer->>Nanogrid DHT: Get Supply Agreements
      loop Consumers's Supply Agreements
        Consumer->>Supplier: Energy Request
        Note left of Consumer: 1st request is full amount, second is amount left etc
        Supplier->>Energy Logger: Get Supply Block and linked Executed Supply Agreements.
        Note right of Supplier: Each sold amount linked to Supply Agreement & Supplier Block
        Energy Logger-->>Energy Logger: Calculate remaining energy
        Supplier->>Nanogrid DHT: Get Supply Agreement
        Supplier->>Energy Logger: Link executed Supply Agreement to Supplier Block
        Supplier->>Consumer: Amount supplied
        Consumer->>Energy Logger: Link executed Supply Agreement to Consumer Block
        Note right of Consumer: If more energy required use next Supply Agreement
      end
    end
```
- EcoGrid Transaction: Record of sale of energy between neighbours.
```rust 
pub struct EcoGridTransaction {
  pub supply_time: f64,
  pub consumer_nano_grid: AgentPubKey,
  pub amount_supplied: f32, 
  pub supplier_nano_grid: AgentPubKey,
  pub tariff: f32,
}
``` 