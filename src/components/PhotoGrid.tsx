import { useState } from "react";

import type { Photo } from "../content";
import Lightbox from "./Lightbox";
import styles from "./PhotoGrid.module.css";

interface Props {
  photos: Photo[];
}

/** Photos in columns, keeping their proportions; a click opens them full size */
export default function PhotoGrid({ photos }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <ul className={styles.grid}>
        {photos.map((photo, index) => (
          <li key={photo.src} className={styles.item}>
            <button type="button" className={styles.button} onClick={() => setOpen(index)}>
              <img
                src={photo.thumb}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading={index < 3 ? "eager" : "lazy"}
                decoding="async"
              />
            </button>
            <p className={styles.caption}>{photo.caption}</p>
          </li>
        ))}
      </ul>
      {open !== null && <Lightbox photos={photos} index={open} onIndexChange={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
}
