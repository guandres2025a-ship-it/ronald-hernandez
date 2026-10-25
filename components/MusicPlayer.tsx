'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Music2,
  Pause,
  Play,
  Square,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useMusicPlayer } from './MusicPlayerContext';

export default function MusicPlayer() {
  const { t } = useLanguage();
  const player = useMusicPlayer();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { currentSong, isPlaying, setIsPlaying, nextSong } = player;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = player.volume;
    audio.muted = player.isMuted;
  }, [player.volume, player.isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;
    audio.load();
    if (isPlaying) {
      void audio.play().catch(() => setIsPlaying(false));
    }
  }, [currentSong, isPlaying, setIsPlaying]);

  // Try autoplay on page load. If the browser blocks sound, start playback
  // on the visitor's first interaction anywhere on the page (not only the music button).
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startOnFirstInteraction = () => {
      if (!audio.paused) return;
      void audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // The browser may still require an explicit press of the Play control.
      });
      window.removeEventListener('pointerdown', startOnFirstInteraction);
      window.removeEventListener('keydown', startOnFirstInteraction);
      window.removeEventListener('touchstart', startOnFirstInteraction);
    };

    window.addEventListener('pointerdown', startOnFirstInteraction);
    window.addEventListener('keydown', startOnFirstInteraction);
    window.addEventListener('touchstart', startOnFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', startOnFirstInteraction);
      window.removeEventListener('keydown', startOnFirstInteraction);
      window.removeEventListener('touchstart', startOnFirstInteraction);
    };
  }, [setIsPlaying]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        player.setIsPlaying(false);
      }
    } else {
      audio.pause();
    }
  };

  const stopPlayback = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    player.stop();
  };

  const toggleMute = () => {
    if (player.isMuted || player.volume === 0) {
      player.setIsMuted(false);
      player.setVolume(player.volume || 0.6);
    } else {
      player.setIsMuted(true);
    }
  };

  const formatTime = (time: number) => {
    if (!Number.isFinite(time)) return '0:00';
    return `${Math.floor(time / 60)}:${Math.floor(time % 60)
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="relative">
      <audio
        ref={audioRef}
        src={currentSong?.url}
        preload="metadata"
        onPlay={() => player.setIsPlaying(true)}
        onPause={() => player.setIsPlaying(false)}
        onLoadedMetadata={(event) =>
          player.setDuration(event.currentTarget.duration)
        }
        onTimeUpdate={(event) => {
          const audio = event.currentTarget;
          if (audio.duration) {
            player.setProgress((audio.currentTime / audio.duration) * 100);
          }
        }}
        onEnded={() => {
          player.setProgress(0);
          nextSong();
        }}
      />

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={`flex h-10 items-center gap-2 rounded-full border px-3 text-sm transition-all ${
          isOpen || player.isPlaying
            ? 'border-white/20 bg-white/10 text-white'
            : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
        }`}
        aria-label={t.music.title}
      >
        <Music2 size={16} className={player.isPlaying ? 'animate-pulse' : ''} />
        <span className="hidden lg:inline">{t.music.title}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-14 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-black/90 p-5 shadow-2xl backdrop-blur-2xl">
          <div className="mb-4 flex items-center gap-3">
            {currentSong?.cover && !currentSong.cover.includes('PLACEHOLDER') ? (
              <img
                src={currentSong.cover}
                alt=""
                className="h-12 w-12 rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--accent)]/15 text-[var(--accent)]">
                <Music2 size={20} />
              </div>
            )}
            <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
            {t.music.nowPlaying}
          </p>
          <p className="mt-1 truncate text-sm font-medium text-white">
            {currentSong?.title || t.music.track}
          </p>
          {currentSong?.artist && (
            <p className="truncate text-xs text-white/45">{currentSong.artist}</p>
          )}
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={player.progress}
            onChange={(event) => {
              const value = Number(event.target.value);
              player.setProgress(value);
              if (audioRef.current && player.duration) {
                audioRef.current.currentTime = (value / 100) * player.duration;
              }
            }}
            className="mt-4 h-1 w-full cursor-pointer accent-[var(--accent)]"
            aria-label={t.music.progress}
          />
          <div className="mt-1 flex justify-between text-[10px] text-white/30">
            <span>{formatTime((player.progress / 100) * player.duration)}</span>
            <span>{formatTime(player.duration)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2">
            <button type="button" onClick={player.previousSong} className="text-white/60 hover:text-white" aria-label={t.music.previous}>
              <ChevronLeft size={18} />
            </button>
            <button type="button" onClick={togglePlayback} className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black" aria-label={player.isPlaying ? t.music.pause : t.music.play}>
              {player.isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button type="button" onClick={stopPlayback} className="text-white/60 hover:text-white" aria-label={t.music.stop}>
              <Square size={16} />
            </button>
            <button type="button" onClick={player.nextSong} className="text-white/60 hover:text-white" aria-label={t.music.next}>
              <ChevronRight size={18} />
            </button>
            <button type="button" onClick={toggleMute} className="text-white/60 hover:text-white" aria-label={player.isMuted ? t.music.unmute : t.music.mute}>
              {player.isMuted || player.volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={player.isMuted ? 0 : player.volume}
              onChange={(event) => player.setVolume(Number(event.target.value))}
              className="h-1 min-w-0 flex-1 cursor-pointer accent-[var(--accent)]"
              aria-label={t.music.volume}
            />
          </div>
        </div>
      )}
    </div>
  );
}