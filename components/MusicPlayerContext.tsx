'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import { songs } from '@/data/songs';

interface MusicPlayerContextValue {
  currentIndex: number;
  currentSong: (typeof songs)[number] | undefined;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  progress: number;
  duration: number;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsMuted: (isMuted: boolean) => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  nextSong: () => void;
  previousSong: () => void;
  stop: () => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextValue | undefined>(
  undefined,
);

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.6);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const savedVolume = Number(localStorage.getItem('ronald-volume'));
    if (Number.isFinite(savedVolume)) {
      window.setTimeout(
        () => setVolumeState(Math.min(1, Math.max(0, savedVolume))),
        0,
      );
    }
  }, []);

  const setVolume = (nextVolume: number) => {
    const safeVolume = Math.min(1, Math.max(0, nextVolume));
    setVolumeState(safeVolume);
    localStorage.setItem('ronald-volume', String(safeVolume));
    setIsMuted(safeVolume === 0);
  };

  const changeSong = (nextIndex: number) => {
    setCurrentIndex((nextIndex + songs.length) % songs.length);
    setProgress(0);
    setDuration(0);
    setIsPlaying(false);
  };

  const nextSong = () => changeSong(currentIndex + 1);
  const previousSong = () => changeSong(currentIndex - 1);
  const stop = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentIndex,
        currentSong: songs[currentIndex],
        isPlaying,
        isMuted,
        volume,
        progress,
        duration,
        setIsPlaying,
        setIsMuted,
        setVolume,
        setProgress,
        setDuration,
        nextSong,
        previousSong,
        stop,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error(
      'useMusicPlayer debe utilizarse dentro de MusicPlayerProvider',
    );
  }
  return context;
}