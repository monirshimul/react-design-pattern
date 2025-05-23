"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeList } from "react-window";

import {
  setCurrentSong,
  setCurrentTime,
  setDuration,
  setIsPlaying,
  setVolume,
} from "@/app/redux/slices/playerSlice";
import { toggleRepeat, toggleShuffle } from "@/app/redux/slices/queueSlice";
import SongRow from "./SongRow";

// Dummy song data (replace with Shadhin Music API)
const songs = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  title: `Song ${i + 1}`,
  artist: `Artist ${i + 1}`,
  url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Public URL
}));

export default function MusicPlayer() {
  const dispatch = useDispatch();
  const { currentSongId, isPlaying, currentTime, duration, volume } =
    useSelector((state) => state.player);
  const { queue, shuffle, repeat } = useSelector((state) => state.queue);
  const currentSong =
    songs.find((song) => song.id === currentSongId) || songs[0];
  const audioRef = useRef(null); // Initialize as null

  // Initialize Audio object client-side
  useEffect(() => {
    if (typeof window !== "undefined" && !audioRef.current) {
      audioRef.current = new Audio(currentSong.url); // Create Audio instance
    }
  }, []); // Run once on mount

  useEffect(() => {
    if (!audioRef.current) return; // Skip if Audio not initialized
    const audio = audioRef.current;
    audio.volume = volume;
    audio.src = currentSong.url;
    audio.loop = repeat;

    const updateProgress = () => {
      dispatch(setCurrentTime(audio.currentTime));
      dispatch(setDuration(audio.duration));
    };

    const handleEnded = () => {
      if (repeat) return;
      const currentIndex = queue.indexOf(currentSongId);
      if (currentIndex < queue.length - 1) {
        dispatch(setCurrentSong(queue[currentIndex + 1]));
        dispatch(setIsPlaying(true));
      } else {
        dispatch(setIsPlaying(false));
        dispatch(setCurrentTime(0));
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSongId, repeat, dispatch]);

  useEffect(() => {
    if (!audioRef.current) return; // Skip if Audio not initialized
    if (isPlaying) {
      audioRef.current
        .play()
        .catch((err) => console.error("Playback error:", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    dispatch(setIsPlaying(!isPlaying));
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    dispatch(setCurrentTime(newTime));
  };

  const handleVolume = (e) => {
    if (!audioRef.current) return;
    const newVolume = e.target.value;
    audioRef.current.volume = newVolume;
    dispatch(setVolume(newVolume));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shadhin Music Player</h1>
      <div className="mb-4 p-4 bg-gray-50 rounded shadow">
        <h2 className="text-lg font-semibold">{currentSong.title}</h2>
        <p className="text-gray-600">{currentSong.artist}</p>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={togglePlayPause}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            onClick={() => dispatch(toggleShuffle())}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            aria-label={shuffle ? "Disable Shuffle" : "Enable Shuffle"}
          >
            {shuffle ? "No Shuffle" : "Shuffle"}
          </button>
          <button
            onClick={() => dispatch(toggleRepeat())}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            aria-label={repeat ? "Disable Repeat" : "Enable Repeat"}
          >
            {repeat ? "No Repeat" : "Repeat"}
          </button>
        </div>
        <div className="mt-2">
          <label htmlFor="seek" className="sr-only">
            Seek
          </label>
          <input
            id="seek"
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full"
            aria-label={`Seek to ${formatTime(currentTime)} of ${formatTime(
              duration
            )}`}
          />
          <div className="text-sm text-gray-600">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
        <div className="mt-2">
          <label htmlFor="volume" className="sr-only">
            Volume
          </label>
          <input
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolume}
            className="w-full"
            aria-label={`Volume at ${Math.round(volume * 100)}%`}
          />
          <div className="text-sm text-gray-600">
            Volume: {Math.round(volume * 100)}%
          </div>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Queue ({queue.length} songs)</h3>
        <ul className="list-disc pl-5">
          {queue.map((songId) => {
            const song = songs.find((s) => s.id === songId);
            return (
              <li key={songId}>
                {song.title} - {song.artist}
              </li>
            );
          })}
        </ul>
      </div>
      <FixedSizeList
        height={400}
        width="100%"
        itemCount={songs.length}
        itemSize={50}
        className="border rounded"
      >
        {SongRow}
      </FixedSizeList>
    </div>
  );
}
