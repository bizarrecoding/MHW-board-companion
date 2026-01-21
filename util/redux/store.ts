import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, Reducer } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import characterSlice, { CharacterState } from "./CharacterSlice";
import huntSlice, { HuntState } from "./HuntSlice";
import rollSlice, { RollState } from "./RollSlice";

const persistConfig = <T = object>(key: string = `root`, slice: Reducer<T>) => {
  const baseConfig = {
    key,
    storage: AsyncStorage,
  };
  return persistReducer<T>(baseConfig, slice);
};

export const store = configureStore({
  reducer: {
    rolls: persistConfig<RollState>(`rolls`, rollSlice),
    character: persistConfig<CharacterState>(`character`, characterSlice),
    hunt: persistConfig<HuntState>(`hunt`, huntSlice),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
