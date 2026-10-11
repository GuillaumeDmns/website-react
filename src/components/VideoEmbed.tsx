import { useState } from "react";

import type { Video } from "../content";
import styles from "./VideoEmbed.module.css";

const players = {
  // No cookie before playing
  youtube: { name: "YouTube", url: (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0` },
  vimeo: { name: "Vimeo", url: (id: string) => `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1` },
};

/** Nothing is loaded from the video host until the visitor asks to play the video */
export default function VideoEmbed({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  const player = players[video.provider];

  return (
    <div className={styles.frame}>
      {playing ? (
        <iframe src={player.url(video.id)} title={video.title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
      ) : (
        <button
          type="button"
          className={styles.poster}
          onClick={() => setPlaying(true)}
          aria-label={`Lire « ${video.title} » (chargée depuis ${player.name})`}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.play}>
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
          <span>Lire la vidéo</span>
          <span className={styles.note}>Chargée depuis {player.name}</span>
        </button>
      )}
    </div>
  );
}
