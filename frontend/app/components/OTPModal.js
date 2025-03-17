'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './OTPModal.module.css';

export default function OTPModal({ 
  isOpen, 
  onClose, 
  onVerify, 
  title = "Verify OTP",
  message = "Please enter the OTP sent to your phone",
  otpLength = 6 
}) {
  const [otp, setOtp] = useState(new Array(otpLength).fill(''));
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isOpen) {
      setOtp(new Array(otpLength).fill(''));
      setError('');
      inputRefs.current[0]?.focus();
    }
  }, [isOpen, otpLength]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    setError(''); // Clear error when user starts typing
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to next input if current field is filled
    if (element.value && index < otpLength - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedArray = pastedData.slice(0, otpLength).split('');
    
    if (pastedArray.length === otpLength && pastedArray.every(char => !isNaN(char))) {
      setOtp(pastedArray);
      setError(''); // Clear error on paste
      inputRefs.current[otpLength - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length === otpLength) {
      if (otpString === '123456') {
        onVerify(otpString);
      } else {
        setError('Invalid OTP. Please try again.');
        setOtp(new Array(otpLength).fill(''));
        inputRefs.current[0]?.focus();
      }
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
            <div className={styles.otpContainer}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  className={`${styles.otpInput} ${error ? styles.error : ''}`}
                  required
                />
              ))}
            </div>

            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}

            <div className={styles.actions}>
              <button type="button" onClick={onClose} className={styles.cancelBtn}>
                Cancel
              </button>
              <button type="submit" className={styles.verifyBtn}>
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
} 