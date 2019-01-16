import { Store, createStore as createReduxStore, applyMiddleware } from "redux";
import rootReducer from "./RootReducer";
import Fetcher from "@Fetcher/Fetcher";
import IStoreModel from "src/ts/Redux/IStoreModel";
import { composeWithDevTools } from "redux-devtools-extension";

export async function createStore(): Promise<Store> {
    const fetcher = new Fetcher();
    const initialStoreSlug: string = "configs/initialStore.yaml";

    console.log("Fetching initial store...");
    const initialStore: IStoreModel = await fetcher.fetchYamlAsInterface<IStoreModel>(initialStoreSlug);
    console.log("Store fetched: %o", initialStore);

    return createReduxStore(
        rootReducer,
        initialStore,
        composeWithDevTools(applyMiddleware())
    );
}
