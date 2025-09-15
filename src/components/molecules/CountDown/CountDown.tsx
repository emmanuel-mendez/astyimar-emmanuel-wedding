import { useEffect, useState } from "preact/hooks";
import styles from "./styles.module.css";
import flower17Image from "@public/images/flower--17.png";

type CountDownProps = {
  target: Date;
};

type CountDownBlocksProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type CountDownBlockProps = {
  value: number;
  label: string;
};

function getTimeRemaining(target: Date) {
  const now = new Date();
  const total = target.getTime() - now.getTime();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds };
}

export default function CountDown({ target }: CountDownProps) {
  const [time, setTime] = useState(getTimeRemaining(target));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeRemaining(target));
    }, 1000);
    return () => clearInterval(timer);
  }, [target]);

  const now = new Date();
  const targetDate = new Date(target);
  const totalPassed = now.getTime() - targetDate.getTime();
  const isPassed = time.total <= 0;
  const values = isPassed
    ? {
        days: Math.floor(totalPassed / (1000 * 60 * 60 * 24)),
        hours: Math.floor((totalPassed / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((totalPassed / 1000 / 60) % 60),
        seconds: Math.floor((totalPassed / 1000) % 60),
      }
    : time;

  return (
    <div class={styles.host}>
      <h2 class={styles.title}>{isPassed ? "Ya han pasado:" : "Faltan:"}</h2>
      <div class={styles.content}>
        <img
          class={`${styles.flower} ${styles.flowerLeft}`}
          src={flower17Image.src}
          alt={"Flower"}
        />
        <CountDownBlocks {...values} />
        <img
          class={`${styles.flower} ${styles.flowerRight}`}
          src={flower17Image.src}
          alt={"Flower"}
        />
      </div>
    </div>
  );
}

function CountDownBlocks({
  days,
  hours,
  minutes,
  seconds,
}: CountDownBlocksProps) {
  const blocks = [
    { value: days, label: "Días" },
    { value: hours, label: "Horas" },
    { value: minutes, label: "Minutos" },
    { value: seconds, label: "Segundos" },
  ];

  return (
    <div class={styles.blocks}>
      {blocks.map(({ value, label }) => (
        <CountDownBlock key={label} value={value} label={label} />
      ))}
    </div>
  );
}

function CountDownBlock({ value, label }: CountDownBlockProps) {
  const displayValue = value < 10 ? `0${value}` : value;

  return (
    <div class={styles.block}>
      <span class={styles.value}>{displayValue}</span>
      <div class={styles.label}>{label}</div>
    </div>
  );
}
