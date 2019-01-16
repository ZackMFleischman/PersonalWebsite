import IStoreModel from "./IStoreModel";
import { AnyAction } from "redux";

const emptyStore: IStoreModel = {
    sectionsToRender: [],
    sections: {},
    socialMedia: {}
};

export default function rootReducer(
    store: IStoreModel = emptyStore,  // Initial reducer state
    action: AnyAction
): IStoreModel {
    console.log("Root Reducer called with action: %o", action);
    return store;
}
