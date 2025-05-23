import { createSlice } from '@reduxjs/toolkit';

const queueSlice = createSlice({
    name: 'queue',
    initialState: {
        queue: [1], // Initial song ID
        shuffle: false,
        repeat: false,
    },
    reducers: {
        addToQueue: (state, action) => {
            if (!state.queue.includes(action.payload)) {
                state.queue.push(action.payload);
            }
        },
        clearQueue: (state) => {
            state.queue = [state.queue[0]];
        },
        toggleShuffle: (state) => {
            state.shuffle = !state.shuffle;
            if (state.shuffle) {
                state.queue = [...state.queue].sort(() => Math.random() - 0.5);
            } else {
                state.queue = [state.queue[0]];
            }
        },
        toggleRepeat: (state) => {
            state.repeat = !state.repeat;
        },
    },
});

export const { addToQueue, clearQueue, toggleShuffle, toggleRepeat } = queueSlice.actions;
export default queueSlice.reducer;