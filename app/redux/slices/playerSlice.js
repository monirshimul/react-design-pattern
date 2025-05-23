import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
    name: 'player',
    initialState: {
        currentSongId: 1,
        isPlaying: false,
        currentTime: 0,
        duration: 0,
        volume: 1,
    },
    reducers: {
        setCurrentSong: (state, action) => {
            state.currentSongId = action.payload;
            state.currentTime = 0;
        },
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        setCurrentTime: (state, action) => {
            state.currentTime = action.payload;
        },
        setDuration: (state, action) => {
            state.duration = action.payload;
        },
        setVolume: (state, action) => {
            state.volume = action.payload;
        },
    },
});

export const { setCurrentSong, setIsPlaying, setCurrentTime, setDuration, setVolume } = playerSlice.actions;
export default playerSlice.reducer;