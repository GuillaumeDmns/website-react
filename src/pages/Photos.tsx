import PhotoGrid from "../components/PhotoGrid";
import { owner, photos } from "../content";
import styles from "./Page.module.css";

export default function Photos() {
  return (
    <>
      <title>{`Photos · ${owner.name}`}</title>
      <header className={styles.header}>
        <h1>Photos</h1>
        <p>Quelques photos, de Paris à Malte.</p>
      </header>
      <PhotoGrid photos={photos} />
    </>
  );
}
