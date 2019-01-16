import { Store, createStore as createReduxStore, applyMiddleware } from "redux";
import rootReducer from "./RootReducer";
import Fetcher from "@Fetcher/Fetcher";
import IStoreModel from "@Redux/IModels";
import { composeWithDevTools } from "redux-devtools-extension";

export async function createStore(): Promise<Store> {
    const fetcher = new Fetcher();

    const initialStoreSlug: string = "configs/initialStore.yaml";
    const initialStore: IStoreModel = await fetcher.fetchYamlAsInterface<IStoreModel>(initialStoreSlug);

    return createReduxStore(
        rootReducer,
        initialStore,
        composeWithDevTools(applyMiddleware())
    );
}
