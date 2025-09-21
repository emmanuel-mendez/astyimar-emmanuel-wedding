import { h } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";
import styles from "./styles.module.css";
import Dialog from "@components/molecules/Dialog/Dialog";
import type { Guest } from "@models/types/guest";

type ConfirmDialogProps = {
  guest: Guest;
  setState: (state: boolean) => void;
};

type FormData = {
  name: string;
  guestName: string;
  guestLastName: string;
};

export default function confirmDialog({ guest, setState }: ConfirmDialogProps) {
  // Ref to store the timeout ID
  const closeTimeoutRef = useRef<number | null>(null);
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbwCR3ezgz93qOndhhSUF8sFVNRvTF8ig-FravpoIzGeEvoei2uLAlCRXKlJ5ODf_ScXqg/exec";

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: guest.name,
    guestName: "",
    guestLastName: "",
  });

  function onInputChange(
    inputEvent: h.JSX.TargetedEvent<HTMLInputElement, Event>
  ) {
    const { name, value } = inputEvent.currentTarget;
    setFormData((prevFormData: FormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function onFormSubmit(
    formEvent: h.JSX.TargetedEvent<HTMLFormElement, Event>
  ) {
    formEvent.preventDefault();
    setIsSubmitting(true);

    const response = await fetch(scriptURL, {
      method: "POST",
      body: new FormData(formEvent.currentTarget),
    });

    if (response.ok) {
      setFormData({
        name: guest.name,
        guestName: "",
        guestLastName: "",
      });
      setIsSubmitting(false);

      setSuccess(true);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      closeTimeoutRef.current = window.setTimeout(() => {
        setSuccess(false);
        setState(false);
        closeTimeoutRef.current = null;
      }, 8000);
    }
  }

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    };
  }, []);

  return (
    <form
      id="submit-to-google-sheet"
      className={styles.form}
      onSubmit={onFormSubmit}
    >
      {!success ? (
        <>
          <div className={styles.formBody}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="name">
                Nombre:
              </label>
              <input
                className={`${styles.formControl} font--body`}
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                required
                value={formData.name}
                onInput={onInputChange}
              />
            </div>

            {guest.coupon && (
              <>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="guestName">
                    Nombre de tu invitado:
                  </label>
                  <input
                    className={`${styles.formControl} font--body`}
                    type="text"
                    name="guestName"
                    id="guestName"
                    placeholder="Nombre de tu invitado"
                    required
                    value={formData.guestName}
                    onInput={onInputChange}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="guestLastName">
                    Apellido de tu invitado:
                  </label>
                  <input
                    className={`${styles.formControl} font--body`}
                    type="text"
                    name="guestLastName"
                    id="guestLastName"
                    placeholder="Apellido de tu invitado"
                    required
                    value={formData.guestLastName}
                    onInput={onInputChange}
                  />
                </div>
              </>
            )}
          </div>

          <button
            type="submit"
            className={`${styles.button} ${styles.buttonSecondary} font--body`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
        </>
      ) : (
        <div className={styles.success}>
          <h2 className={`${styles.successTitle} font--heading`}>
            ¡Gracias, <span className={styles.successName}>{guest.name}</span>!
          </h2>
          <div>
            <p className={`${styles.successDescription}`}>
              Hemos recibido tu confirmación.
            </p>
            <p className={`${styles.successDescription}`}>
              Nos alegra que puedas acompañarnos en este día tan especial.
            </p>
          </div>
          <img className={styles.successIcon} src="/icons/success.svg" />
        </div>
      )}
    </form>
  );
}
