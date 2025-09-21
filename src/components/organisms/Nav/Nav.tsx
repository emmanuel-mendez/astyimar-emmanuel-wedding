import type { Guest } from "@models/types/guest";
import { useEffect, useRef, useState } from "preact/hooks";
import styles from "./styles.module.css";
import Dialog from "@components/molecules/Dialog/Dialog";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

interface Props {
  guest?: Guest;
}

type Link = {
  href: string;
  label: string;
  invited?: boolean;
};

type Cat = {
  iconSrc: string;
  imageSrc: string;
  alt: string;
  name: string;
};

export function Nav({ guest }: Props) {
  const navLinks: Link[] = [
    { href: "#guest", label: "Invitado", invited: guest ? true : false },
    { href: "#date", label: "Fecha" },
    { href: "#location", label: "Recepción" },
    { href: "#dress-code", label: "Código de vestimenta" },
    { href: "#timeline", label: "Itinerario" },
    { href: "#gifts", label: "Regalos" },
    {
      href: "#table",
      label: "Encuentra tu mesa",
      invited: guest ? true : false,
    },
  ];

  const cats: Cat[] = [
    {
      iconSrc: "/icons/lolo.svg",
      imageSrc: "/images/lolo.jpeg",
      alt: "Lolo",
      name: "Lolo",
    },
    {
      iconSrc: "/icons/michi.svg",
      imageSrc: "/images/michi.jpeg",
      alt: "Michi",
      name: "Michi",
    },
    {
      iconSrc: "/icons/escuichi.svg",
      imageSrc: "/images/escuichi.jpeg",
      alt: "Escuichi",
      name: "Escuichi",
    },
    {
      iconSrc: "/icons/bestia.svg",
      imageSrc: "/images/bestia.jpeg",
      alt: "Bestia",
      name: "Nene Bestia",
    },
  ];

  const tooltipMessages = [
    "¡Haz click en mi!",
    "¡Miau!",
    "¡Clickea en mi!",
    "¿Miau?",
  ];

  const [visible, setVisible] = useState<boolean>(false);
  const [catDialog, setCatDialog] = useState<boolean>(false);
  const [activeCat, setActiveCat] = useState<Cat | undefined>(undefined);
  const [tooltipCatIndex, setTooltipCatIndex] = useState<number | null>(null);
  const [tooltipMessageIndex, setTooltipMessageIndex] = useState<number>(0);
  const tooltipTimer = useRef<number | null>(null);

  const [confirmDialog, setConfirmDialog] = useState<boolean>(false);

  useEffect(() => {
    if (catDialog) {
      if (tooltipTimer.current) clearInterval(tooltipTimer.current);
      setTooltipCatIndex(null);
      return;
    }

    function showRandomTooltip(): void {
      let newCatIndex = Math.floor(Math.random() * cats.length);
      let newTooltipMessageIndex = Math.floor(
        Math.random() * tooltipMessages.length
      );

      if (
        tooltipMessages.length > 1 &&
        newTooltipMessageIndex === tooltipMessageIndex
      ) {
        newTooltipMessageIndex =
          (newTooltipMessageIndex + 1) % tooltipMessages.length;
      }

      if (cats.length > 1 && newCatIndex === tooltipCatIndex) {
        newCatIndex = (newCatIndex + 1) % cats.length;
      }

      setTooltipCatIndex(newCatIndex);
      setTooltipMessageIndex(newTooltipMessageIndex);
    }

    tooltipTimer.current = window.setInterval(showRandomTooltip, 2000);

    return () => {
      if (tooltipTimer.current) clearInterval(tooltipTimer.current);
    };
  }, [tooltipMessageIndex, catDialog]);

  useEffect(() => {
    const body = document.body;
    if (visible) {
      body.classList.toggle("overflow-y--hidden", visible);
    }
    return () => {
      body.classList.remove("overflow-y--hidden");
    };
  }, [visible]);

  function toggle(): void {
    setVisible(!visible);
  }

  function linkClick(): void {
    setVisible(false);
  }

  function onCatDialogToggle(): void {
    setCatDialog((previousState) => !previousState);
  }

  function selectCat(cat: Cat): void {
    setActiveCat(cat);
    onCatDialogToggle();
  }

  function onConfirmDialogToggle(): void {
    setConfirmDialog((previousState) => !previousState);
  }

  return (
    <div className={styles.host}>
      <button
        className={styles.toggle}
        aria-expanded={visible}
        onClick={toggle}
      >
        <div className={styles.icon}>
          <span
            className={styles["icon--menu"]}
            style={{
              visibility: visible ? "hidden" : "visible",
              opacity: visible ? 0 : 1,
            }}
          >
            <img src="/icons/menu.svg" alt="Menu" width={52} height={52} />
          </span>
          <span
            className={styles["icon--close"]}
            style={{
              visibility: visible ? "visible" : "hidden",
              opacity: visible ? 1 : 0,
            }}
          >
            <img src="/icons/close.svg" alt="Cerrar" width={52} height={52} />
          </span>
        </div>
      </button>
      <nav hidden={!visible} className={styles.nav}>
        <div className={styles.menu}>
          <div className={styles.list}>
            <ul className={styles.links}>
              {navLinks
                .filter((item) => item.invited !== false)
                .map((item) => (
                  <li key={item.href}>
                    <a
                      className={styles.link}
                      href={item.href}
                      onClick={linkClick}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
            </ul>
            {guest && (
              <>
                <button
                  className={`${styles.button} font--body`}
                  onClick={() => {
                    linkClick();
                    setConfirmDialog(true);
                  }}
                >
                  Confirma tu asistencia
                </button>

                {confirmDialog && (
                  <Dialog onToggle={onConfirmDialogToggle}>
                    <ConfirmModal guest={guest} setState={setConfirmDialog} />
                  </Dialog>
                )}
              </>
            )}
          </div>
          <div className={styles.cats}>
            {cats.map((cat, index) => (
              <div
                className={styles.cat}
                key={cat.alt}
                onClick={() => selectCat(cat)}
              >
                {tooltipCatIndex === index && (
                  <div className={styles.tooltip}>
                    {tooltipMessages[tooltipMessageIndex]}
                  </div>
                )}
                <img src={cat.iconSrc} alt={cat.alt} width={35} height={35} />
                <h2 className={styles.cat__name}>{cat.name}</h2>
              </div>
            ))}
          </div>
          {catDialog && activeCat && (
            <Dialog onToggle={onCatDialogToggle}>
              <div className={styles.catDialog}>
                <h2 className={`${styles.catDialog__name} font--heading`}>
                  {activeCat.name}
                </h2>
                <img
                  className={styles.catDialog__image}
                  src={activeCat.imageSrc}
                />

                <img
                  className={styles.catDialog__flower}
                  src="/images/flower--18.webp"
                  alt="Flower"
                />
              </div>
            </Dialog>
          )}
        </div>
      </nav>
    </div>
  );
}
