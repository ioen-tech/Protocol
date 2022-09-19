// https://github.com/holochain/holochain/blob/develop/crates/types/src/dht_op.rs
export var DhtOpType;
(function (DhtOpType) {
    DhtOpType["StoreRecord"] = "StoreRecord";
    DhtOpType["StoreEntry"] = "StoreEntry";
    DhtOpType["RegisterAgentActivity"] = "RegisterAgentActivity";
    DhtOpType["RegisterUpdatedContent"] = "RegisterUpdatedContent";
    DhtOpType["RegisterUpdatedRecord"] = "RegisterUpdatedRecord";
    DhtOpType["RegisterDeletedBy"] = "RegisterDeletedBy";
    DhtOpType["RegisterDeletedEntryAction"] = "RegisterDeletedEntryAction";
    DhtOpType["RegisterAddLink"] = "RegisterAddLink";
    DhtOpType["RegisterRemoveLink"] = "RegisterRemoveLink";
})(DhtOpType || (DhtOpType = {}));
export function getDhtOpType(op) {
    return Object.keys(op)[0];
}
export function getDhtOpAction(op) {
    const opType = getDhtOpType(op);
    const action = Object.values(op)[0][1];
    if (opType === DhtOpType.RegisterAddLink) {
        return {
            type: "CreateLink",
            ...action,
        };
    }
    if (opType === DhtOpType.RegisterUpdatedContent ||
        opType === DhtOpType.RegisterUpdatedRecord) {
        return {
            type: "Update",
            ...action,
        };
    }
    if (action.author)
        return action;
    else {
        const actionType = Object.keys(action)[0];
        return {
            type: actionType,
            ...action[actionType],
        };
    }
}
export function getDhtOpEntry(op) {
    return Object.values(op)[0][2];
}
export function getDhtOpSignature(op) {
    return Object.values(op)[0][1];
}
//# sourceMappingURL=dht-ops.js.map