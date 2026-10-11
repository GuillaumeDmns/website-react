import { legal, owner } from "../content";
import styles from "./Page.module.css";

export default function Legal() {
  return (
    <>
      <title>{`Mentions légales · ${owner.name}`}</title>
      <header className={styles.header}>
        <h1>Mentions légales</h1>
      </header>
      <div className={styles.text}>
        <h2>Éditeur</h2>
        <p>{legal.publisher}</p>
        <p>
          Contact : <a href={`mailto:${legal.contact}`}>{legal.contact}</a>
        </p>
        <h2>Hébergeur</h2>
        <p>{legal.host}</p>
        <h2>Données personnelles</h2>
        {legal.privacy.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>
          L'app de mobilité a les siennes : <a href={legal.app.url}>{legal.app.label}</a>.
        </p>
      </div>
    </>
  );
}
