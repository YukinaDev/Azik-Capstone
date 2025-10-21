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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const ensurePlay = () =>
      video.play().catch(() => {
        video.muted = true;
        return video.play().catch(() => {});
      });

    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.playbackRate = 1;
    ensurePlay();

    return () => {
      video.pause();
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
