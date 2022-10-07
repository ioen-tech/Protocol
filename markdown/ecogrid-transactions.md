
- Supply Agreement: Each supplier has their own energy_supply DHT with the list of Supply Agreements. Each consumer is also part of this DHT.
- Supply Block: This is the amount of energy in Watts a Supplier has available for EcoGrid Transactions in the current interval. The entry is linked to Path YYYY.MM.DD.HH.INTERVAL
- Energy Request: Consumer remote_calls Suppliers in their Supply Agreements with amount of energy required.

``` mermaid
  sequenceDiagram
    loop Every 5 minutes
      Supplier->>Energy Supply DHT: Record Supply Block
      loop Supply Agreements
        Consumer->>Supplier: Energy Request
        Supplier->>Energy Supply DHT: Get Supply Block and amounts sold.
        Note right of Supplier: Each sold amount linked to Supply Agreement & Block
        Energy Supply DHT-->>Energy Supply DHT: Calculate remaining energy
        Supplier->>Energy Supply DHT: Get Supply Agreement
        Supplier->>Energy Supply DHT: Link amount sold to Supply Agreement & Block
        Supplier->>Consumer: Amount supplied
        Consumer->>Energy DHT: Record transaction
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