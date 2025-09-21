import { useState } from "preact/hooks";
import styles from "./styles.module.css";
import Dialog from "@components/molecules/Dialog/Dialog";
import type { Guest } from "@models/types/guest";
import ConfirmModal from "@components/organisms/ConfirmModal/ConfirmModal";

type FloatProps = {
  guest: Guest;
};

export default function Float({ guest }: FloatProps) {
  const [state, setState] = useState<boolean>(false);

  function onToggle(): void {
    setState((previousState) => !previousState);
  }

  return (
    <>
      <button
        className={`${styles.host} font--body`}
        onClick={() => setState(true)}
      >
        <div className={styles.icon}>
          <img src="/icons/schedule.svg" width={24} height={24} />
        </div>
        <p className={styles.text}>
          <span className={styles.line}>Confirma</span>
          <span className={styles.line}>tu asistencia</span>
        </p>
      </button>

      {state && (
        <Dialog onToggle={onToggle}>
          <ConfirmModal guest={guest} setState={setState} />
        </Dialog>
      )}
    </>
  );
}

<style></style>;
