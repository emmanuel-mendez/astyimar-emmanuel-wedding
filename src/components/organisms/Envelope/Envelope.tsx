import type { Guest } from "@models/types/guest";
import { useEffect, useState } from "preact/hooks";
import styles from "./styles.module.css";
import MusicPlayer from "@components/atoms/MusicPlayer/MusicPlayer";

type EnvelopeProps = {
  guest: Guest;
};

export default function Envelope({ guest }: EnvelopeProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const body = document.body;
    if (open) {
      body.classList.remove("overflow-y--hidden");
    }
  }, [open]);

  function onOpen() {
    setOpen(true);
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  }

  return (
    <>
      {visible && (
        <div className={styles.host} onClick={onOpen}>
          <div
            className={
              open ? `${styles.seal} ${styles.open}` : `${styles.seal} `
            }
          >
            <span className={`${styles.sealText} font--heading`}>AyE</span>
          </div>
          <div
            className={open ? `${styles.top} ${styles.open}` : styles.top}
          ></div>
          <div
            className={
              open ? `${styles.topShadow} ${styles.open}` : styles.topShadow
            }
          ></div>
          <div className={open ? `${styles.body} ${styles.open}` : styles.body}>
            <div className={styles.content}>
              <p className={`${styles.from} font--heading`}>
                De: Astyimar y Emmanuel
              </p>
              <p className={`${styles.to} font--heading`}>Para: {guest.name}</p>
            </div>
          </div>
        </div>
      )}
      <MusicPlayer play={open} />
    </>
  );
}
