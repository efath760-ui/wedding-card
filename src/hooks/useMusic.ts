import { useState, useEffect, useRef, useCallback } from 'react';
import { invitation } from '../config/invitation';

/**
 * useMusic hook for managing wedding invitation background audio.
 * Note: Changing the song = replace the file in public/music/ and edit invitation.music.src.
 */
export function useMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingBeforeHideRef = useRef(false);

  useEffect(() => {
    // Single HTMLAudioElement created once
    const audio = new Audio();
    audio.src = invitation.music.src;
    audio.loop = invitation.music.loop ?? true;
    audio.volume = invitation.music.volume ?? 0.7;
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Pause on visibilitychange (tab hidden) and resume only if it was playing before
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (!audio.paused) {
          wasPlayingBeforeHideRef.current = true;
          audio.pause();
        } else {
          wasPlayingBeforeHideRef.current = false;
        }
      } else {
        if (wasPlayingBeforeHideRef.current) {
          audio.play().catch(() => {
            // Autoplay might be restricted on return
          });
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  /**
   * Synchronously invokes audio.play() to satisfy browser user-gesture requirements
   * on iOS Safari and Android Chrome.
   */
  const startMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Playback prevented or audio file issue:', err);
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  return { isPlaying, togglePlay, startMusic };
}
