/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Pause, Play, RotateCcw, SkipBack, Volume2 } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

export function AudioPlayer({ data }: any) {
  const src = data?.src;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isDragging, setIsDragging] = useState(false);

  // Play/Pause button handler
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Time update for progress bar and current time
  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const updateTime = () => {
        setCurrentTime(audio.currentTime);
      };

      const setAudioDuration = () => {
        setDuration(audio.duration);
      };

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", setAudioDuration);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", setAudioDuration);
      };
    }
  }, []);

  const handleReset = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  // Kurangi 10 detik dari durasi saat ini
  const handleSubtractTenSeconds = () => {
    if (audioRef.current) {
      const newTime = Math.max(0, audioRef.current.currentTime - 10);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Seek in the audio (progress bar click)
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const width = e.currentTarget.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const newTime = (clickX / width) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Format time (seconds to minutes:seconds)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  // Handle mouse move to update the current time
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging && audioRef.current) {
        const progressBar = document.querySelector(
          ".progress-bar"
        ) as HTMLDivElement;
        const width = progressBar.clientWidth;
        const clickX = e.clientX - progressBar.getBoundingClientRect().left;
        const newTime = (clickX / width) * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
      }
    },
    [isDragging, duration]
  );

  // Attach mouse move and mouse up events
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove, isDragging]);

  return (
    <div>
      <audio ref={audioRef} src={src} />
      <div className="mt-4 bg-white border-slate-100 dark:bg-slate-800 dark:border-slate-500 border-b rounded-t-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-6 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8  items-center">
        <div className="space-y-2">
          <div className="relative">
            <div
              className="bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden progress-bar"
              onClick={handleProgressClick}
            >
              <div
                className="bg-cyan-500 dark:bg-cyan-400 h-2"
                role="progressbar"
                aria-label="music progress"
                aria-valuenow={progressPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ width: `${progressPercentage}%` }} // Dynamic width based on progress
              ></div>

              <div
                className="ring-cyan-500 dark:ring-cyan-400 ring-2 absolute top-1/2 w-4 h-4 -mt-2 flex items-center justify-center bg-white rounded-full shadow cursor-pointer"
                style={{ left: `${progressPercentage}%` }} // Position based on progress
              >
                <div className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5"></div>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-sm leading-6 font-medium tabular-nums">
            <div className="text-cyan-500 dark:text-slate-100">
              {formatTime(currentTime)}
            </div>
            <div className="text-slate-500 dark:text-slate-400">
              {formatTime(duration)}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-50 text-slate-500 dark:bg-slate-600 dark:text-slate-200 rounded-b-xl flex items-center">
        <div className="flex-auto flex items-center justify-evenly">
          <button
            type="button"
            aria-label="Rewind 10 seconds"
            onClick={handleReset}
          >
            <SkipBack width="24" height="24" />
          </button>
          <button type="button" aria-label="Rewind 10 seconds">
            <RotateCcw
              width="24"
              height="24"
              onClick={handleSubtractTenSeconds}
            />
          </button>
        </div>
        <button
          type="button"
          className="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
          aria-label="Pause"
          onClick={handlePlayPause}
        >
          {isPlaying ? (
            <Pause width={30} height={32} />
          ) : (
            <Play width={30} height={32} />
          )}
        </button>
        <div className="flex-auto flex items-center justify-evenly">
          <Volume2></Volume2>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            className="w-16 h-2"
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
}
