'use client';
import Image from 'next/image';
import { useState } from 'react';
import styles from './DataTable.module.css';

export default function DataTable({ 
  headers, 
  data, 
  title,
  statusField = 'status' // field name that should be styled as status
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(row => 
    Object.values(row)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <section className={styles.tableSection}>
      <div className={styles.tableHeader}>
        <h2>{title}</h2>
        <div className={styles.searchContainer}>
          <Image 
            src="/search.svg"
            alt="Search"
            width={24}
            height={24}
            className={styles.searchIcon}
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>
      
      <div className={styles.table}>
        <div className={styles.tableHeaderRow}>
          {headers.map((header, index) => (
            <span key={index}>{header.label}</span>
          ))}
        </div>
        
        {filteredData.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.tableRow}>
            {headers.map((header, colIndex) => (
              <span 
                key={colIndex} 
                className={header.field === statusField ? styles.status : ''}
              >
                {row[header.field]}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
} 