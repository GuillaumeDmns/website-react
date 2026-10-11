import { Link } from "react-router-dom";

import { links, owner, photos, projects, videos } from "../content";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <title>{owner.name}</title>

      <section className={styles.intro}>
        <h1>{owner.name}</h1>
        <p>{owner.intro}</p>
      </section>

      <section className={styles.section} aria-labelledby="projects">
        <h2 id="projects">Projets</h2>
        {projects.map((project) => (
          <article key={project.name} className={styles.project}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <ul className={styles.details}>
              {project.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            <a href={project.url}>{project.urlLabel}</a>
          </article>
        ))}
      </section>

      <section className={styles.section} aria-labelledby="photos">
        <div className={styles.heading}>
          <h2 id="photos">Photos</h2>
          <Link to="/photos">Toutes les photos ({photos.length})</Link>
        </div>
        <ul className={styles.strip}>
          {photos.slice(0, 3).map((photo) => (
            <li key={photo.src}>
              <Link to="/photos">
                <img src={photo.thumb} alt={photo.alt} width={photo.width} height={photo.height} decoding="async" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="videos">
        <div className={styles.heading}>
          <h2 id="videos">Vidéos</h2>
          <Link to="/videos">Voir les vidéos</Link>
        </div>
        <ul className={styles.list}>
          {videos.map((video) => (
            <li key={video.id}>
              {video.title} <span className={styles.year}>{video.year}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="contact">
        <h2 id="contact">Contact</h2>
        <p className={styles.contact}>
          Sur <a href={links.linkedin}>LinkedIn</a>, et mon code sur <a href={links.github}>GitHub</a>.
        </p>
      </section>
    </>
  );
}
