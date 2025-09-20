import { useState } from "preact/hooks";
import type { ComponentChildren } from "preact";
import styles from "./styles.module.css";

interface CopyProps {
  onToggle?: () => void;
  children: ComponentChildren;
}

export default function Dialog({ children, onToggle }: CopyProps) {
  return (
    <div className={styles.host}>
      <div className={styles.backdrop} onClick={onToggle}></div>
      <div className={styles.modal}>
        <img
          className={styles.close}
          src={"/icons/close.svg"}
          onClick={onToggle}
        />
        {children}
      </div>
    </div>
  );
}
