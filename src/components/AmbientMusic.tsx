"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Music2, Volume2, VolumeX } from "lucide-react";

const VIDEO_ID = "pwVXI96HSs8";
const AMBIENT_VOLUME = 20; // Reduced volume: soft, relaxing ambient background (20%)

interface AmbientMusicProps {
  enabled: boolean | null;
  onToggle: () => void;
  onSelectChoice: (enable: boolean) => void;
}

export function AmbientMusic({ enabled, onToggle, onSelectChoice }: AmbientMusicProps) {
  const [hasMountedPlayer, setHasMountedPlayer] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const noMusicRef = useRef<HTMLButtonElement>(null);
  const hasTriggeredChoice = useRef(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sendCommand = (func: string, args: (string | number)[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "https://www.youtube.com"
    );
  };

  const applyVolumeAndPlay = () => {
    sendCommand("unMute");
    sendCommand("setVolume", [AMBIENT_VOLUME]);
    sendCommand("playVideo");
    setTimeout(() => sendCommand("setVolume", [AMBIENT_VOLUME]), 400);
    setTimeout(() => sendCommand("setVolume", [AMBIENT_VOLUME]), 1200);
  };

  useEffect(() => {
    if (enabled === true) setHasMountedPlayer(true);
  }, [enabled]);

  useEffect(() => {
    if (!hasMountedPlayer) return;
    if (enabled === true) {
      applyVolumeAndPlay();
    } else if (enabled === false) {
      setIsConnecting(false);
      sendCommand("pauseVideo");
    }
  }, [enabled, hasMountedPlayer]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (typeof event.origin === "string" && event.origin.includes("youtube.com")) {
        try {
          const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
          if (data && (data.event === "onReady" || data.event === "initialDelivery")) {
            sendCommand("setVolume", [AMBIENT_VOLUME]);
            setIsConnecting(false);
          }
        } catch {}
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    if (enabled !== true) return;
    const startAfterInteraction = () => {
      applyVolumeAndPlay();
      setIsConnecting(false);
    };
    document.addEventListener("pointerdown", startAfterInteraction, { once: true });
    document.addEventListener("keydown", startAfterInteraction, { once: true });
    return () => {
      document.removeEventListener("pointerdown", startAfterInteraction);
      document.removeEventListener("keydown", startAfterInteraction);
    };
  }, [enabled]);

  useEffect(() => {
    if (enabled !== null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onSelectChoice(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, onSelectChoice]);

  useEffect(() => {
    if (enabled !== null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      noMusicRef.current?.focus();
    }
    return () => { document.body.style.overflow = previousOverflow; };
  }, [enabled]);

  const handleSelectChoice = (choice: boolean) => {
    if (hasTriggeredChoice.current) return;
    hasTriggeredChoice.current = true;
    if (choice) {
      setIsConnecting(true);
      setTimeout(() => setIsConnecting(false), 3500);
    }
    onSelectChoice(choice);
  };

  return (
    <>
      {hasMountedPlayer && (
        <iframe
          ref={iframeRef}
          className="ambient-music-player"
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&loop=1&playlist=${VIDEO_ID}&controls=0&enablejsapi=1&playsinline=1`}
          title="Background music player"
          allow="autoplay; encrypted-media"
          tabIndex={-1}
          onLoad={() => {
            if (enabled === true) {
              applyVolumeAndPlay();
            }
          }}
        />
      )}

      {enabled === null && (
        <div
          className="music-choice-backdrop"
          role="presentation"
          onClick={(e) => { if (e.target === e.currentTarget) handleSelectChoice(false); }}
        >
          <section
            className="music-choice-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="music-choice-title"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="music-choice-kicker">SET THE MOOD</span>
            <h2 id="music-choice-title">Would you like some music?</h2>
            <p>Choose how you&apos;d like to explore the site.</p>
            <div className="music-choice-actions">
              <button
                ref={noMusicRef}
                type="button"
                className="music-choice-button liquid-glass-button"
                onClick={() => handleSelectChoice(false)}
              >
                <span className="music-choice-icon"><VolumeX aria-hidden="true" /></span>
                <strong>No Music</strong>
              </button>
              <button
                type="button"
                className="music-choice-button music-choice-button--play liquid-glass-button"
                onClick={() => handleSelectChoice(true)}
              >
                <span className="music-choice-icon"><Music2 aria-hidden="true" /></span>
                <strong>Play Soothing Music</strong>
                <span className="music-wave" aria-hidden="true"><i /><i /><i /><i /><i /></span>
              </button>
            </div>
          </section>
        </div>
      )}

      {enabled !== null && (
        <button
          type="button"
          className={`ambient-music-toggle liquid-glass-button ${enabled ? "is-playing" : ""} ${isScrolled ? "is-visible" : ""}`}
          onClick={onToggle}
          aria-pressed={enabled}
          aria-label={enabled ? "Turn off background music" : "Play background music"}
          title={enabled ? "Turn off background music" : "Play background music"}
        >
          {enabled ? (
            isConnecting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#254d31]" aria-hidden="true" />
            ) : (
              <Volume2 aria-hidden="true" />
            )
          ) : (
            <VolumeX aria-hidden="true" />
          )}
          <span>
            {enabled
              ? isConnecting
                ? "Starting music..."
                : "Turn off music"
              : "Play music"}
          </span>
        </button>
      )}
    </>
  );
}
