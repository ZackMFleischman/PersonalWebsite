import { Store, createStore as createReduxStore } from "redux";
import rootReducer from "./RootReducer";
import Fetcher from "@Fetcher/Fetcher";
import IStoreModel from "src/ts/Redux/IStoreModel";

export async function createStore(): Promise<Store> {
    const fetcher = new Fetcher();
    const initialStoreSlug: string = "configs/initialStore.yaml";
    const initialStore: IStoreModel = await fetcher.fetchYamlAsInterface<IStoreModel>(initialStoreSlug);

    return createReduxStore(
        rootReducer,
        initialStore
    );
}
