'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './login.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userType, setUserType] = useState('citizen');
  const [formData, setFormData] = useState({
    department: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Set initial user type based on URL parameter
  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'official' || type === 'citizen') {
      setUserType(type);
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Dummy credentials for official login
    if (userType === 'official') {
      if (
        formData.email === 'trade@admin.com' && 
        formData.password === 'admin123' &&
        formData.department === 'trade'
      ) {
        // Store login state
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userType', 'official');
        localStorage.setItem('department', 'trade');
        
        // Redirect to trade dashboard
        router.push('/vyapara/dashboard');
      } else {
        setError('Invalid credentials. For demo, use trade@admin.com / admin123');
      }
    } else {
      // Handle citizen login (you can add this later)
      setError('Citizen login not implemented in demo');
    }
  };

  const handleTabChange = (type) => {
    setUserType(type);
    // Update URL without refreshing the page
    const newUrl = `/login?type=${type}`;
    window.history.pushState({}, '', newUrl);
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <Link href="/" className={styles.backLink}>
          ← Back to Home
        </Link>
        
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${userType === 'citizen' ? styles.active : ''}`}
            onClick={() => handleTabChange('citizen')}
          >
            Citizen Login
          </button>
          <button 
            className={`${styles.tab} ${userType === 'official' ? styles.active : ''}`}
            onClick={() => handleTabChange('official')}
          >
            Official Login
          </button>
        </div>

        <div className={styles.formContainer}>
          <Image 
            src={userType === 'citizen' ? "/citizen.svg" : "/official-icon.svg"} 
            alt="Login Type" 
            width={64} 
            height={64}
          />
          
          {error && <div className={styles.error}>{error}</div>}
          
          <form className={styles.form} onSubmit={handleSubmit}>
            {userType === 'official' && (
              <div className={styles.inputGroup}>
                <label htmlFor="department">Department</label>
                <select 
                  id="department" 
                  className={styles.select}
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="property">Property Tax</option>
                  <option value="trade">Trade</option>
                  <option value="water">Water Bill</option>
                  <option value="ad">Advertisement</option>
                  <option value="rent">Rent</option>
                </select>
              </div>
            )}

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required 
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Login
            </button>
          </form>

          {userType === 'citizen' && (
            <div className={styles.registerLink}>
              Don't have an account? <Link href="/register">Register here</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 