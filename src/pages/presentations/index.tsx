import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/presentations.module.css";

export default function Presentations() {
  return (
    <main className={styles.hub}>
      <Head>
        <title>presentations · sebby</title>
        <meta
          name="description"
          content="CS 211 recitation slides and interactive examples for Computer Architecture at Rutgers."
        />
        <link rel="canonical" href="https://sebby.dev/presentations" />
      </Head>
      <nav className={styles.hubNav} aria-label="Main navigation">
        <Link href="/">sebby</Link>
        <span>teaching at rutgers</span>
      </nav>
      <header className={styles.hubHeader}>
        <p className={styles.eyebrow}>Student resources</p>
        <h1>presentations</h1>
        <p>
          Recitation slides, worked examples, and a little room to experiment.
        </p>
      </header>
      <section aria-labelledby="course-title">
        <div className={styles.courseHeading}>
          <h2 id="course-title">Computer Architecture</h2>
          <span>CS 211 / Fall 2026</span>
        </div>
        <article className={styles.recitation}>
          <span className={styles.recitationNumber}>01</span>
          <div>
            <p className={styles.eyebrow}>Recitation 01</p>
            <h3>
              <Link href="/presentations/cs211-recitation-01">
                Bits, rotations &amp; iLab
              </Link>
            </h3>
            <p>
              The HW1 reminder, connecting through SSH, and the bitwise
              operations behind HW2.
            </p>
            <div className={styles.resourceLinks}>
              <Link href="/presentations/cs211-recitation-01">
                Open slides <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/presentations/cs211-recitation-01#demo">
                Try the rotation demo
              </Link>
              <a href="/presentations/cs211-recitation-01.pptx" download>
                Download PowerPoint
              </a>
            </div>
          </div>
        </article>
        <article className={styles.recitation}>
          <span className={styles.recitationNumber}>03</span>
          <div>
            <p className={styles.eyebrow}>Recitation 03</p>
            <h3>
              <Link href="/presentations/cs211-recitation-03">
                Floating point numbers
              </Link>
            </h3>
            <p>
              Build and decode normal and subnormal values in a small floating
              point format, with practice, worked answers, and an HW3 preview.
            </p>
            <div className={styles.resourceLinks}>
              <Link href="/presentations/cs211-recitation-03">
                Open slides <span aria-hidden="true">↗</span>
              </Link>
              <a href="/presentations/CS211_Recitation_3.pptx" download>
                Download PowerPoint
              </a>
            </div>
          </div>
        </article>
      </section>
      <footer className={styles.hubFooter}>
        Course deadlines and submission details live on Canvas.
      </footer>
    </main>
  );
}
