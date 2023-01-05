import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {userReducer} from './slices/usersSlice';
import { albumsApi } from "./APIs/albumsApi";

export const store = configureStore({
    reducer: {
        users: userReducer,
        [albumsApi.reducerPath]: albumsApi.reducer
    },
    middleware: getDefaultMidleware => {
        return getDefaultMidleware()
            .concat(albumsApi.middleware);
    }
});

setupListeners(store.dispatch);

export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';
export { useFetchAlbumsQuery } from './APIs/albumsApi';