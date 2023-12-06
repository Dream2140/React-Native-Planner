import { Action, combineReducers, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import userSlice from "./reducers/userSlice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import taskSlice from "./reducers/tasksReducer/taskSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user"]
};

const rootReducer = combineReducers({
  user: userSlice,
  tasks: taskSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ThunkDispatch<RootState, undefined, Action>;

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);
