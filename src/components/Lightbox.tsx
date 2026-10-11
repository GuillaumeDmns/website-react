import { useEffect, useRef } from "react";

import type { Photo } from "../content";
import styles from "./Lightbox.module.css";

interface Props {
  photos: Photo[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

/**
 * A photo full size in a modal dialog: Escape closes it (native), the arrow keys and buttons go through the photos,
 * a click outside the photo closes it.
 */
export default function Lightbox({ photos, index, onIndexChange, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const photo = photos[index];
  const previous = () => onIndexChange((index + photos.length - 1) % photos.length);
  const next = () => onIndexChange((index + 1) % photos.length);

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-label={photo.caption}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          dialog.current?.close();
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") previous();
        if (event.key === "ArrowRight") next();
      }}
    >
      <figure className={styles.figure}>
        <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} />
        <figcaption>
          {photo.caption}
          <span className={styles.count}>
            {index + 1} / {photos.length}
          </span>
        </figcaption>
      </figure>
      <div className={styles.controls}>
        <button type="button" onClick={previous}>
          ← Précédente
        </button>
        <button type="button" onClick={next}>
          Suivante →
        </button>
        <button type="button" onClick={() => dialog.current?.close()} autoFocus>
          Fermer
        </button>
      </div>
    </dialog>
  );
}
