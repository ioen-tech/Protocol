# Reconcile Power Requirements
Every interval (5 minutes) each nanogrid either has power to spare or needs power to satisfy it's load. A nanogrid that needs power will execute it's list of supply agreements with neighbours until it's load is satisfied.

```mermaid
sequenceDiagram
  Meter->>Consumer:Instant load
  loop Execute Supply Agreements
    Consumer->>Supplier:Request required power
    Supplier->>Consumer:Supply up to transaction limit
  end
  alt More Power Required
      Consumer->>Retailer:Request required power
      Retailer->>Consumer:Supply required power
  end
```