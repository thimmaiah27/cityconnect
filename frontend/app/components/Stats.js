'use client';
import styles from './Stats.module.css';

export default function Stats({ stats }) {
  return (
    <div className={styles.stats}>
      {stats.map((stat, index) => (
        <div key={index} className={styles.statCard}>
          <h3>{stat.title}</h3>
          <span className={styles.statNumber}>{stat.value}</span>
        </div>
      ))}
    </div>
  );
} 