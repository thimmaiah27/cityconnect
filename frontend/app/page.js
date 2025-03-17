import styles from "./page.module.css";
import Image from 'next/image';
import ThemeToggle from './components/ThemeToggle';
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image 
            src="/city-logo.svg" 
            alt="City Connect Logo" 
            width={40} 
            height={40}
          />
          <h1>City Connect</h1>
        </div>
        <ThemeToggle />
      </header>
      
      <main className={styles.main}>
        <section className={styles.services}>
          <ul className={styles.list}>
            <li>
              <Image src="/tax2-icon.svg" alt="Property Tax" width={48} height={48} />
              <span>Property Tax</span>
            </li>
            <li>
              <Image src="/water-icon.svg" alt="Jalanidhi" width={48} height={48} />
              <span>Jalanidhi</span>
            </li>
            <li>
              <Image src="/business2-icon.svg" alt="Vyapara" width={48} height={48} />
              <span>Vyapara</span>
            </li>
            <li>
              <Image src="/ad-icon.svg" alt="Advertisement" width={48} height={48} />
              <span>AD</span>
            </li>
            <li>
              <Image src="/rent-icon.svg" alt="Rent" width={48} height={48} />
              <span>Rent</span>
            </li>
          </ul>
        </section>

        <section className={styles.login}>
          <div className={styles.card}>
            <h3>Citizen Portal</h3>
            <Image src="/citizen.svg" alt="Citizen" width={64} height={64} />
            <Link href="/login?type=citizen" className={styles.primaryBtn}>Login</Link>
            <span className={styles.divider}>or</span>
            <button className={styles.secondaryBtn}>Register</button>
          </div>
          
          <div className={styles.card}>
            <h3>Official Portal</h3>
            <Image src="/official-icon.svg" alt="Official" width={64} height={64} />
            <Link href="/login?type=official" className={styles.primaryBtn}>Login</Link>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2024 City Connect. All rights reserved.</p>
      </footer>
    </div>
  );
}

