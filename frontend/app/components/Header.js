'use client';
import ThemeToggle from './ThemeToggle';
import styles from './Header.module.css';

export default function Header() {
  return (
    <div className={styles.themeContainer}>
      <ThemeToggle />
    </div>
  );
} 