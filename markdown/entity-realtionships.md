

``` mermaid
  erDiagram
    FOOTBALL-CLUB ||--o{ ADMIN : has
    ADMIN ||--|{ MEMBERS : manages
    MEMBERS ||--|| ADMIN  : consent
    ADMIN ||--|{ MEMBER-DETAILS : provides
    FOOTBALL-CLUB ||--o{ ENERGY : retails
    ENERGY ||--o{ MEMBERS : buy
    MEMBERS ||--o{ MEMBERS : trade
    IOEN-WORLD }|--|{ MEMBER-DETAILS : uses
    ADMIN }|--|{ IOEN-WORLD : uses
    MEMBERS }|--|| IOEN-WORLD : includes
```

