'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import styles from './DashboardLayout.module.css';

export default function DashboardLayout({ 
  children, 
  title,
  department = 'trade',
  userName = 'John Doe',
  userRole = 'Officer'
}) {
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userType = localStorage.getItem('userType');
    const userDepartment = localStorage.getItem('department');

    if (!isAuthenticated || userType !== 'official' || userDepartment !== department) {
      router.push('/login');
    }
  }, [router, department]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarCollapsed(true);
        setIsSidebarActive(false);
      } else {
        setIsSidebarCollapsed(false);
        setIsSidebarActive(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarActive(!isSidebarActive);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    localStorage.removeItem('department');
    router.push('/');
  };

  const menuItems = [
    {
      icon: '/dashboard.svg',
      label: 'Dashboard',
      isActive: true,
      onClick: () => router.push(`/vyapara/dashboard`)
    },
    {
      icon: '/new1.svg',
      label: 'New',
      onClick: () => router.push(`/vyapara/new`)
    },
    {
      icon: '/update.svg',
      label: 'Update',
      onClick: () => router.push(`/vyapara/update`)
    },
    {
      icon: '/cancel.svg',
      label: 'Cancel',
      onClick: () => router.push(`/vyapara/cancel`)
    },
    {
      icon: '/reports.svg',
      label: 'Reports',
      onClick: () => router.push(`/vyapara/reports`)
    }
  ];

  return (
    <div className={styles.container}>
      <div 
        className={`${styles.overlay} ${isSidebarActive ? styles.active : ''}`} 
        onClick={toggleSidebar}
      ></div>
      
      <div className={styles.hamburgerMenu} onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        isActive={isSidebarActive}
        userName={userName}
        userRole={userRole}
        menuItems={menuItems}
        onLogout={handleLogout}
      />

      <main className={`
        ${styles.mainContent} 
        ${isSidebarCollapsed ? styles.sidebarCollapsed : ''}
        ${isSidebarActive ? styles.sidebarActive : ''}
      `}>
        <header className={styles.mainNav}>
          <h1>{title}</h1>
        </header>

        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
} 