import Head from "next/head";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import slides from "@/data/recitation-03.json";
import styles from "@/styles/presentations.module.css";

function SlideContent({
  index,
  reading = false,
}: {
  index: number;
  reading?: boolean;
}) {
  const slide = slides[index];
  return (
    <article
      className={`${styles.slide} ${index === 0 ? styles.cover : ""}`}
      id={reading ? `reading-${index + 1}` : undefined}
      aria-label={`Slide ${index + 1} of ${slides.length}`}
    >
      <p className={styles.eyebrow}>{slide.section}</p>
      {reading ? <h2>{slide.title}</h2> : <h1>{slide.title}</h1>}
      <div className={styles.slideColumns}>
        <div className={styles.slideLead}>
          {slide.lead.split("\n\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <pre className={styles.example}>{slide.example}</pre>
      </div>
      {slide.caption && <p className={styles.caption}>{slide.caption}</p>}
      {slide.source && (
        <a
          className={styles.source}
          href={slide.source}
          target="_blank"
          rel="noreferrer"
        >
          {slide.sourceLabel ?? "Source lecture"} ↗
        </a>
      )}
    </article>
  );
}

export default function Recitation03() {
  const [index, setIndex] = useState(0);
  const [reading, setReading] = useState(false);
  const [fullscreenError, setFullscreenError] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const go = useCallback((next: number) => {
    const bounded = Math.max(0, Math.min(slides.length - 1, next));
    setIndex(bounded);
    window.history.replaceState(null, "", `#slide-${bounded + 1}`);
  }, []);

  useEffect(() => {
    const fromHash = () => {
      const match = /^#slide-(\d+)$/.exec(window.location.hash);
      if (match)
        setIndex(
          Math.max(0, Math.min(slides.length - 1, Number(match[1]) - 1)),
        );
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (
        reading ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      )
        return;
      if (
        event.target instanceof HTMLElement &&
        event.target.closest(
          "input, select, textarea, [contenteditable]:not([contenteditable=false])",
        )
      )
        return;
      if (
        event.key === " " &&
        event.target instanceof HTMLElement &&
        event.target.closest("button, a")
      )
        return;
      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        go(index + 1);
      }
      if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        go(index - 1);
      }
      if (event.key === "Home") {
        event.preventDefault();
        go(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        go(slides.length - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, reading, go]);

  async function fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (root.current?.requestFullscreen)
        await root.current.requestFullscreen();
      else
        setFullscreenError(
          "Use your browser’s fullscreen control on this device.",
        );
    } catch {
      setFullscreenError(
        "Fullscreen is unavailable. Use your browser’s fullscreen control.",
      );
    }
  }

  return (
    <div ref={root} className={`${styles.viewer} ${styles.recitationThree}`}>
      <Head>
        <title>Floating point and assembly · CS 211 · sebby</title>
        <meta
          name="description"
          content="CS 211 recitation 03: worked floating point examples, x86-64 assembly, stack frames, and arrays from lectures 6–8."
        />
        <link
          rel="canonical"
          href="https://sebby.dev/presentations/cs211-recitation-03"
        />
      </Head>
      <header className={styles.toolbar}>
        <Link href="/presentations">← Presentations</Link>
        <div className={styles.viewerTools}>
          <button
            type="button"
            onClick={() => {
              setReading(!reading);
              go(index);
            }}
            aria-pressed={reading}
          >
            {reading ? "Slide view" : "Reading view"}
          </button>
          <button type="button" onClick={fullscreen}>
            Fullscreen
          </button>
          <a href="/presentations/CS211_Recitation_3.pptx" download>
            PowerPoint ↓
          </a>
        </div>
      </header>
      {fullscreenError && (
        <output className={styles.fullscreenError}>{fullscreenError}</output>
      )}
      <main className={reading ? styles.reading : styles.stage}>
        {reading ? (
          slides.map((slide, i) => (
            <SlideContent key={slide.title} index={i} reading />
          ))
        ) : (
          <SlideContent index={index} />
        )}
      </main>
      <footer className={styles.controls}>
        <span className={styles.keyHint}>
          {reading ? "Scroll to read every slide" : "← / → to change slides"}
        </span>
        <label className={styles.jumpLabel}>
          Slide
          <select
            aria-label="Jump to slide"
            value={index}
            onChange={(event) => {
              setReading(false);
              go(Number(event.target.value));
              event.currentTarget.blur();
            }}
          >
            {slides.map((slide, i) => (
              <option key={slide.title} value={i}>
                {String(i + 1).padStart(2, "0")} · {slide.title}
              </option>
            ))}
          </select>
        </label>
        <div className={styles.paging}>
          <button
            type="button"
            aria-label="Previous slide"
            disabled={index === 0 && !reading}
            onClick={() => {
              setReading(false);
              go(index - 1);
            }}
          >
            ←
          </button>
          <span aria-live="polite">
            {index + 1} / {slides.length}
          </span>
          <button
            type="button"
            aria-label="Next slide"
            disabled={index === slides.length - 1 && !reading}
            onClick={() => {
              setReading(false);
              go(index + 1);
            }}
          >
            →
          </button>
        </div>
      </footer>
    </div>
  );
}
