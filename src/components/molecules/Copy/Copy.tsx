import { useRef, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";
import styles from "./styles.module.css";

interface CopyProps {
  value: string;
  children: ComponentChildren;
}

export default function Copy(props: CopyProps) {
  const { value, children } = props;
  const [copied, setCopied] = useState<boolean>(false);
  const timeoutRef = useRef<number | null>(null);

  function handleCopy(): void {
    navigator.clipboard.writeText(value);
    setCopied(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(function () {
      setCopied(false);
    }, 1200);
  }

  return (
    <span
      className={styles.host}
      tabIndex={0}
      role="button"
      aria-label="Copiar"
      onClick={handleCopy}
    >
      {children}

      <div
        className={styles.copied__feedback}
        style={{ display: copied ? "inline" : "none" }}
      >
        <span>✓</span>
      </div>
    </span>
  );
}
