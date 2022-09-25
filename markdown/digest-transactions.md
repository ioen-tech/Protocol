# Digesting Eco grid Transactions
Each time a nanogrid purchases energy from a neighbour a transaction entry is created in the Energy DNA. A nanogrid that doesnt produce any energy could create approximately 1000 transactions a day, given there could be 1000s of nanogrids in a DHT it is necessary to digest those transactions into the billing DNA on a regular basis. For now digesting will be done daily and triggered to run at 00:00:00.
The Energy DNA is installed when creating a new NanoGrid. Today's an the next day's Energy DNAs are then cloned from the running hApp with a network seed of the date in this format YYYYMMDD. Each days transactions are then recorded in separate DHTs which can then be archived, restored or deleted to optimise the IOEN Protocol.
> Clonable DNAs in hApps, is the ability to spawn a new DNA hash from a template DNA packaged in a hApp at any point AFTER installation.


``` mermaid
  sequenceDiagram
    Nanogrid Client->>Conductor Admin:Clone Energy DNA with next day's Network Seed YYYYMMDD
    Conductor Admin->>Nanogrid Client:New CellId of Cloned Energy DHT
    Nanogrid Client->>Nanogrid Client:tomorrowsTransactionsCellId New CellId of Cloned Energy DHT
```
``` javascript
const protocolAppInfo = {
      installedAppId,
      nanoGridSettingsCellId,
      ioenFuelCellId,
      billingCellId,
      transactionsCellId,
      tomorrowsTransactionsCellId
    }
```
At midnight update protocolAppInfo 
```
transactionsCellId = tomorrowsTransactionsCellId
tomorrowsTransactionsCellId = 
```
 and trigger digest of the days transactions into Billing DHT.

``` mermaid
  sequenceDiagram
    Nanogrid Client->>Energy DHT:Retrieve all transactions
    Nanogrid Client->>Nanogrid Client:Process transactions for each Supplier
    Nanogrid Client->>Billing DHT:Supplier digest
```

