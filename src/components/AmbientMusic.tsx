"use client";

import { useEffect, useRef, useState } from "react";
import { Music2, Volume2, VolumeX } from "lucide-react";

const VIDEO_ID = "pwVXI96HSs8";

export function AmbientMusic() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const noMusicRef = useRef<HTMLButtonElement>(null);

  const sendCommand = (command: "playVideo" | "pauseVideo" | "unMute") => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: command, args: [] }),
      "https://www.youtube.com"
    );
  };

  useEffect(() => {
    if (enabled !== true) return;
    const startAfterInteraction = () => {
      sendCommand("unMute");
      sendCommand("playVideo");
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
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    noMusicRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [enabled]);

  const toggleMusic = () => {
    if (enabled === true) {
      sendCommand("pauseVideo");
      setEnabled(false);
      return;
    }
    setEnabled(true);
  };

  return (
    <>
      {enabled && (
        <iframe
          ref={iframeRef}
          className="ambient-music-player"
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&loop=1&playlist=${VIDEO_ID}&controls=0&enablejsapi=1&playsinline=1`}
          title="Background music player"
          allow="autoplay; encrypted-media"
          tabIndex={-1}
          onLoad={() => {
            sendCommand("unMute");
            sendCommand("playVideo");
          }}
        />
      )}

      {enabled === null ? (
        <div className="music-choice-backdrop">
          <section className="music-choice-modal" role="dialog" aria-modal="true" aria-labelledby="music-choice-title">
            <span className="music-choice-kicker">SET THE MOOD</span>
            <h2 id="music-choice-title">Would you like some music?</h2>
            <p>Choose how you&apos;d like to explore the site.</p>
            <div className="music-choice-actions">
              <button ref={noMusicRef} type="button" className="music-choice-button liquid-glass-button" onClick={() => setEnabled(false)}>
                <span className="music-choice-icon"><VolumeX aria-hidden="true" /></span>
                <strong>No Music</strong>
              </button>
              <button type="button" className="music-choice-button music-choice-button--play liquid-glass-button" onClick={() => setEnabled(true)}>
                <span className="music-choice-icon"><Music2 aria-hidden="true" /></span>
                <strong>Play Soothing Music</strong>
                <span className="music-wave" aria-hidden="true">
                  <i /><i /><i /><i /><i />
                </span>
              </button>
            </div>
          </section>
        </div>
      ) : (
        <button
          type="button"
          className={`ambient-music-toggle liquid-glass-button ${enabled ? "is-playing" : ""}`}
          onClick={toggleMusic}
          aria-pressed={enabled}
          aria-label={enabled ? "Turn background music off" : "Turn background music on"}
        >
          {enabled ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
          <span>Music {enabled ? "on" : "off"}</span>
        </button>
      )}
    </>
  );
}
