 'use client';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './FetchLicenseModal.module.css'; // Ensure you have the styles

export default function FetchLicenseModal({ 
  isOpen, 
  onClose, 
  onFetch, 
  title = "Fetch License Details",
  message = "Please enter the license number to fetch details."
}) {
  const [licenseNo, setLicenseNo] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setLicenseNo('');
      setError('');
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setLicenseNo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/vyapara/licenses/?license_no=${licenseNo}`);
      if (response.data.length > 0) {
        onFetch(response.data[0].id); // Pass the license ID to the parent component
        onClose(); // Close the modal
      } else {
        setError('No license found with that number.');
      }
    } catch (err) {
      console.error('Error fetching license:', err);
      setError('Failed to fetch license data.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <div className={styles.content}>
          <h2>{title}</h2>
          <p>{message}</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="license_no" className={styles.label}>License Number</label>
              <input
                id="license_no"
                name="license_no"
                type="text"
                value={licenseNo}
                onChange={handleChange}
                ref={inputRef}
                className={styles.inputField}
                required
              />
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <div className={styles.actions}>
              <button type="button" onClick={onClose} className={styles.cancelBtn}>
                Cancel
              </button>
              <button type="submit" className={styles.verifyBtn}>
                Fetch License
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}