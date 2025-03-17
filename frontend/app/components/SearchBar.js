'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SearchBar.module.css';
import { sampleLicenses } from '../Data/SearchData';

// Add status color mapping
const statusColors = {
  active: 'var(--success-color)',      // Green
  'auto renewal': 'var(--info-color)', // Sky blue
  'due renewal': 'var(--warning-color)', // Yellow
  cancelled: 'var(--error-color)',     // Red
  closed: 'var(--alert-color)'         // Orange
};

export default function SearchBar({ isOpen, onClose }) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Filter licenses based on search
  const filteredLicenses = sampleLicenses.filter(license => 
    license.licenseNo.toLowerCase().includes(search.toLowerCase()) ||
    license.applicantName.toLowerCase().includes(search.toLowerCase()) ||
    license.shopName.toLowerCase().includes(search.toLowerCase()) ||
    license.phoneNumber.includes(search)
  );

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(i => 
            i < filteredLicenses.length - 1 ? i + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(i => 
            i > 0 ? i - 1 : filteredLicenses.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredLicenses[selectedIndex]) {
            handleViewDetails(filteredLicenses[selectedIndex].licenseNo);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredLicenses, selectedIndex, onClose]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleViewDetails = (licenseNo) => {
    router.push(`/vyapara/view/${licenseNo}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by License No, Name, Shop or Phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
            autoFocus
          />
        </div>
        <div className={styles.results}>
          {filteredLicenses.map((license, index) => (
            <div
              key={license.licenseNo}
              className={`${styles.resultItem} ${index === selectedIndex ? styles.selected : ''}`}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className={styles.licenseInfo}>
                <div className={styles.primaryInfo}>
                
                  <span className={styles.licenseNo}>{license.licenseNo}</span>
                  <span>{license.applicantName}</span>
                  
                </div>
                <div className={styles.secondaryInfo}>
                <span 
                    className={styles.status}
                    style={{ 
                      backgroundColor: statusColors[license.status.toLowerCase()],
                      color: 'white'
                    }}
                  >
                    {license.status}
                  </span>
                  <span>{license.shopName}</span>
                  <span>•</span>
                  <span>{license.phoneNumber}</span>
                  <span>•</span>
                  <span>{license.tradeType}</span>
                </div>
              </div>
              <button 
                className={styles.viewButton}
                onClick={() => handleViewDetails(license.licenseNo)}
              >
                View
              </button>
            </div>
          ))}
          {filteredLicenses.length === 0 && (
            <div className={styles.noResults}>
              No licenses found matching your search
            </div>
          )}
        </div>
      </div>
    </>
  );
} 