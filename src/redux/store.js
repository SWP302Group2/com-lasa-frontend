import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import { persistStore, persistReducer,createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import queryString from "query-string";

const transform = createTransform(
    (inboundState, key) => queryString.stringify(inboundState),
    (outboundState, key) => queryString.parse(outboundState)
);

const persistConfig = {
    key: 'root',
    storage,
    transforms: [transform]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const storeConfig = () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
}

export default storeConfig;