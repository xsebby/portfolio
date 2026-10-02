import { useState } from "react";
import styles from "@/styles/presentations.module.css";

function cleanHex(value: string) {
  return value
    .replace(/^0x/i, "")
    .replace(/[^0-9a-f]/gi, "")
    .slice(0, 2);
}

export function BaseConverterDemo() {
  const [hex, setHex] = useState("FF");
  const binary = (hex || "0")
    .split("")
    .map((digit) => Number.parseInt(digit, 16).toString(2).padStart(4, "0"))
    .join(" ");
  const decimal = Number.parseInt(hex || "0", 16);

  return (
    <section className={styles.demo} aria-labelledby="converter-heading">
      <p className={styles.eyebrow}>Binary ↔ hex</p>
      <h1 id="converter-heading">One hex digit, four bits</h1>
      <p>
        Type a hexadecimal value. Each digit expands into one four-bit group.
      </p>
      <div className={styles.demoControls}>
        <label>
          Hex value
          <span className={styles.hexInputPrefix}>0x</span>
          <input
            className={styles.converterInput}
            value={hex}
            inputMode="text"
            aria-label="Hexadecimal value"
            onChange={(event) =>
              setHex(cleanHex(event.target.value).toUpperCase())
            }
          />
        </label>
        <button type="button" onClick={() => setHex("FF")}>
          Reset example
        </button>
      </div>
      <div className={styles.conversionResult} aria-live="polite">
        <span>Hex</span>
        <strong>0x{hex || "0"}</strong>
        <span>Binary</span>
        <strong>{binary}</strong>
        <span>Decimal check</span>
        <strong>{decimal}</strong>
      </div>
      <p className={styles.demoExplanation}>
        To convert back, group binary from the right in sets of four and replace
        each group with its hex digit.
      </p>
    </section>
  );
}
