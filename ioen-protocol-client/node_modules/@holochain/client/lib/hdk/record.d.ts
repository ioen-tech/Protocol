import { SignedActionHashed } from "./action.js";
import { Entry } from "./entry.js";
export declare type Record = {
    signed_action: SignedActionHashed;
    entry: RecordEntry;
};
export declare type RecordEntry = {
    Present: Entry;
} | {
    Hidden: void;
} | {
    NotApplicable: void;
} | {
    NotStored: void;
};
