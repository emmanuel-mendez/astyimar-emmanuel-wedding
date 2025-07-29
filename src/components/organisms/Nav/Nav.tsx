import { useState } from "preact/hooks";
import styles from "./styles.module.css";

type Link = {
  href: string;
  label: string;
};

type Cat = {
  src: string;
  alt: string;
  name: string;
};

export function Nav() {
  const [visible, setVisible] = useState<boolean>(false);

  const navLinks: Link[] = [
    { href: "#guest", label: "Invitado" },
    { href: "#date", label: "Fecha" },
    { href: "#location", label: "Lugar" },
    { href: "#dress-code", label: "Código de vestimenta" },
    { href: "#timeline", label: "Itinerario" },
    { href: "#gifts", label: "Regalos" },
    { href: "#table", label: "Encuentra tu mesa" },
  ];

  const cats: Cat[] = [
    { src: "/icons/lolo.svg", alt: "Lolo", name: "Lolo" },
    { src: "/icons/michi.svg", alt: "Michi", name: "Michi" },
    { src: "/icons/escuichi.svg", alt: "Escuichi", name: "Escuichi" },
    { src: "/icons/bestia.svg", alt: "Bestia", name: "Nene Bestia" },
  ];

  function toggle(): void {
    setVisible(!visible);
  }

  function linkClick(): void {
    setVisible(false);
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
            <ul>
              {navLinks.map((item) => (
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
            <a href="#" className={styles.button} onClick={linkClick}>
              Confirma tu asistencia
            </a>
          </div>
          <div className={styles.cats}>
            {cats.map((cat) => (
              <div className={styles.cat} key={cat.alt}>
                <img src={cat.src} alt={cat.alt} width={35} height={35} />
                <h2 className={styles.cat__name}>{cat.name}</h2>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
