import VideoEmbed from "../components/VideoEmbed";
import { owner, videos } from "../content";
import styles from "./Page.module.css";

export default function Videos() {
  return (
    <>
      <title>{`Vidéos · ${owner.name}`}</title>
      <header className={styles.header}>
        <h1>Vidéos</h1>
        <p>Des aftermovies d'événements étudiants, de 2017 à 2019.</p>
      </header>
      <ul className={styles.videos}>
        {videos.map((video) => (
          <li key={video.id}>
            <VideoEmbed video={video} />
            <h2>{video.title}</h2>
            <p>{video.year}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
