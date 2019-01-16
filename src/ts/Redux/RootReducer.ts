import IStoreModel, { emptyStore } from "./IModels";
import { AnyAction } from "redux";

export default function rootReducer(
    store: IStoreModel = emptyStore,  // Initial reducer state
    action: AnyAction
): IStoreModel {
    return store;
}
