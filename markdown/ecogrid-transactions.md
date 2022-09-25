
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
- Supply Block: This is the amount of energy in Watts a Supplier has available for EcoGrid Transactions in the current interval. The entry is linked to Path BASE64SupplierAgentPubKey.YYYY.MM.DD.HH.INTERVAL
- Energy Request: Consumer remote_calls Suppliers in their Supply Agreements with amount of energy required.

``` mermaid
  sequenceDiagram
    loop Every 5 minutes
      Supplier->>Energy DHT: Record Supply Block
      loop Supply Agreements
        Consumer->>Supplier: Energy Request
        Supplier->>NanoGrid DHT: Get Supply Agreement
        Supplier->>Energy DHT: Get Supply Block and any transactions.
        Energy DHT-->>Energy DHT: Calculate remaining energy
        Supplier->>Energy DHT: Link EcoGrid Transaction to Supply Block & Consumer
        Supplier->>Consumer: Return amount supplied
      end
    end
```