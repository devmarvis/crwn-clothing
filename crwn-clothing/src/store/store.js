import { 
    compose, 
    createStore, 
    applyMiddleware
} from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';

import { rootReducer } from './root-reducer';

const persistConfig = {
    key: 'root',//-this says you want to persist the whole thing, from the root level
    storage,//where you store in(localStorage default in most browsers)
    whitelist: ['cart'],//blacklist any reducer value you don't want to persist. whiltelist is the particular one you want to persist.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'development' && logger, thunk].filter(Boolean);//so our middleware only applies during development

const composeEhancer = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);