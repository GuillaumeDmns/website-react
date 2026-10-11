import { Link } from "react-router-dom";

import { owner } from "../content";
import styles from "./Page.module.css";

export default function NotFound() {
  return (
    <>
      <title>{`Page introuvable · ${owner.name}`}</title>
      <header className={styles.header}>
        <h1>Page introuvable</h1>
        <p>
          Cette adresse ne mène nulle part. Retour à <Link to="/">l'accueil</Link>.
        </p>
      </header>
    </>
  );
}
