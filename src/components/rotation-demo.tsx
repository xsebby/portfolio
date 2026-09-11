import { useState } from "react";
import styles from "@/styles/presentations.module.css";

const POSITIONS = [7, 6, 5, 4, 3, 2, 1, 0];

export function RotationDemo() {
  const [value, setValue] = useState(179);
  const [count, setCount] = useState(2);
  const bits = value.toString(2).padStart(8, "0");
  const amount = Math.abs(count) % 8;
  const right = count >= 0;
  const cut = right ? 8 - amount : amount;
  const result = amount === 0 ? bits : bits.slice(cut) + bits.slice(0, cut);
  const wrapped =
    amount === 0 ? "" : right ? bits.slice(cut) : bits.slice(0, cut);
  return (
    <section className={styles.demo} aria-labelledby="demo-heading">
      <p className={styles.eyebrow}>An 8-bit experiment</p>
      <h1 id="demo-heading">Where do the bits go?</h1>
      <p>
        Click a starting bit to flip it. Change the count to rotate the whole
        byte.
      </p>
      <div className={styles.demoControls}>
        <label>
          Decimal value
          <input
            type="number"
            min={0}
            max={255}
            value={value}
            onChange={(event) => {
              const n = event.target.valueAsNumber;
              if (Number.isInteger(n) && n >= 0 && n <= 255) setValue(n);
            }}
          />
        </label>
        <label>
          Signed rotation <span>{count}</span>
          <input
            type="range"
            min={-24}
            max={24}
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
          />
        </label>
        <button
          type="button"
          onClick={() => {
            setValue(179);
            setCount(2);
          }}
        >
          Reset example
        </button>
      </div>
      <div className={styles.bitLabels}>
        <span>Start</span>
        <span>bit 7 on the left · bit 0 on the right</span>
      </div>
      <div className={styles.bits}>
        {POSITIONS.map((position) => (
          <button
            type="button"
            key={position}
            aria-label={`Bit ${position}: ${bits[7 - position]}. Click to flip.`}
            aria-pressed={bits[7 - position] === "1"}
            data-wrap={
              amount > 0 && (right ? 7 - position >= cut : 7 - position < cut)
            }
            onClick={() => setValue(value ^ (1 << position))}
          >
            {bits[7 - position]}
          </button>
        ))}
      </div>
      <div className={styles.bitLabels}>
        <span>Result</span>
        <span>
          {right ? "Right" : "Left"} {Math.abs(count)} ={" "}
          {right ? "right" : "left"} {amount}
        </span>
      </div>
      <fieldset className={styles.bits} aria-label={`Result ${result}`}>
        {POSITIONS.map((position) => (
          <span
            key={position}
            data-wrap={
              amount > 0 &&
              (right ? 7 - position < amount : 7 - position >= 8 - amount)
            }
          >
            {result[7 - position]}
          </span>
        ))}
      </fieldset>
      <p className={styles.demoExplanation} aria-live="polite">
        {amount === 0
          ? "A whole number of turns leaves the byte unchanged."
          : `The highlighted group ${wrapped} wraps from the ${right ? "right" : "left"} end to the ${right ? "left" : "right"} end. Its bit order stays the same.`}{" "}
        Result in decimal: <strong>{Number.parseInt(result, 2)}</strong>.
      </p>
    </section>
  );
}
