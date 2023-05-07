import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authReducer, messageReducer, reportReducer, petReducer } from "./reducer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducerReport = persistReducer(persistConfig, reportReducer);
const persistedReducerPet = persistReducer(persistConfig, petReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    report: persistedReducerReport,
    pet: persistedReducerPet,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
