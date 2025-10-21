"use client";

import { useEffect, useRef } from "react";

type VideoBackgroundProps = {
  src?: string;
  poster?: string;
};

export function VideoBackground({
  src = "/assets/background.mp4",
  poster,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const directionRef = useRef<"forward" | "backward">("forward");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const ensurePlay = () =>
      video.play().catch(() => {
        video.muted = true;
        return video.play().catch(() => {});
      });

    const playForward = () => {
      directionRef.current = "forward";
      video.playbackRate = 1;
      if (video.currentTime <= 0.1) {
        video.currentTime = 0.1;
      }
      ensurePlay();
    };

    const playBackward = () => {
      if (!Number.isFinite(video.duration) || video.duration === 0) {
        playForward();
        return;
      }
      directionRef.current = "backward";
      video.playbackRate = -1;
      if (video.currentTime >= video.duration - 0.1) {
        video.currentTime = Math.max(video.duration - 0.1, 0);
      }
      ensurePlay();
    };

    const handleEnded = () => {
      playBackward();
    };

    const handleTimeUpdate = () => {
      if (directionRef.current === "backward" && video.currentTime <= 0.15) {
        playForward();
      }
    };

    video.loop = false;
    video.muted = true;
    video.playsInline = true;
    video.playbackRate = 1;
    playForward();

    video.addEventListener("ended", handleEnded);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.pause();
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020912]/92 via-[#033150]/55 to-[#021019]/92" />
    </div>
  );
}
