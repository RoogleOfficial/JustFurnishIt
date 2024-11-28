declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    auth: import("../Slicer/AuthSlice").AuthState;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        auth: import("../Slicer/AuthSlice").AuthState;
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
