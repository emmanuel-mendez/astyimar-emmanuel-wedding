import { useEffect, useRef, useState } from "preact/hooks";
import styles from "./styles.module.css";

type MusicPlayerProps = {
  play: boolean;
};

export default function MusicPlayer({ play }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    if (play) {
      timer = window.setTimeout(() => setShowButton(true), 15000);
    } else {
      setShowButton(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [play]);

  useEffect(() => {
    if (play) {
      setIsPlaying(true);
    }
  }, [play]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  function onToggle() {
    setIsPlaying((prev) => !prev);
  }

  return (
    <div>
      <audio
        ref={audioRef}
        style={{ display: "none" }}
        loop
        src="/audio/music.mp3"
      />
      {showButton && (
        <button
          className={`${styles.host} ${isPlaying ? styles.playing : ""}`}
          onClick={onToggle}
          aria-label={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="6"
                y="5"
                width="4"
                height="14"
                rx="1"
                fill="currentColor"
              />
              <rect
                x="14"
                y="5"
                width="4"
                height="14"
                rx="1"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="8,5 20,12 8,19" fill="currentColor" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
