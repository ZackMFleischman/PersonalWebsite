import IStoreModel from "./IStoreModel";

const emptyStore: IStoreModel = {
    sectionsToRender: [],
    sections: {},
    socialMedia: {}
}

export default function rootReducer(
    store: IStoreModel = emptyStore,  // Initial reducer state
    action: IAnyAction
): IStoreModel {
    return store;
}