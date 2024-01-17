import { configureStore } from "@reduxjs/toolkit";

import rollSlice from "./RollSlice";

export const store = configureStore({
  reducer: {
    rolls: rollSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
