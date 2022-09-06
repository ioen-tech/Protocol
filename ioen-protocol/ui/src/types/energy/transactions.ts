

export interface RetailTransaction {
  supplyTime: number;
  consumerNanoGrid: string;
  amountSupplied: string;
  tariff: string;
}







export interface EcoGridTransaction {
  supplyTime: number;
  consumerNanoGrid: string;
  amountSupplied: string;
  supplierNanoGrid: string;
  tariff: string;
}