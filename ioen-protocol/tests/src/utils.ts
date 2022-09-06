import path from 'path'
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const nanogridDna = path.join(__dirname, "../../dnas/nanogrid/workdir/nanogrid.dna");
export const energyDna = path.join(__dirname, "../../dnas/energy/workdir/energy.dna");
export const billingDna = path.join(__dirname, "../../dnas/billing/workdir/billing.dna");



