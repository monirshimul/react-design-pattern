import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slices/playerSlice';
import queueReducer from './slices/queueSlice';

export default configureStore({
    reducer: {
        player: playerReducer,
        queue: queueReducer,
    },
});