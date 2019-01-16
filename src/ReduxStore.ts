import { Store, createStore } from "redux";
import rootReducer from "./RootReducer";

export async function createStore(): Store {
    const initialStoreYamlUrl: string = "http://blahblah.storeModel.yaml";
    const initialStore: IStoreModel = await fetchYamlAsInterface<IStoreModel>(initialStoreYamlUrl);

    return createStore(
        rootReducer,
        initialStore
    );
}