"use client";

import { setCurrentSong, setIsPlaying } from "@/app/redux/slices/playerSlice";
import { addToQueue } from "@/app/redux/slices/queueSlice";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
// Dummy song data (shared across components)
const songs = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  title: `Song ${i + 1}`,
  artist: `Artist ${i + 1}`,
  url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Public URL
}));

const SongRow = memo(({ index, style }) => {
  const song = songs[index];
  const dispatch = useDispatch();
  const currentSongId = useSelector((state) => state.player.currentSongId);
  const isPlaying = useSelector((state) => state.player.isPlaying);

  return (
    <div
      style={style}
      className={`p-2 flex justify-between items-center cursor-pointer hover:bg-gray-100 ${
        currentSongId === song.id ? "bg-blue-100" : ""
      }`}
      onClick={() => {
        dispatch(setCurrentSong(song.id));
        dispatch(setIsPlaying(true));
        dispatch(addToQueue(song.id));
      }}
      role="button"
      aria-label={`Play ${song.title} by ${song.artist}`}
    >
      <div>
        <span className="font-medium">{song.title}</span> - {song.artist}
      </div>
      <span>{isPlaying && currentSongId === song.id ? "▶ Playing" : ""}</span>
    </div>
  );
});

export default SongRow;
