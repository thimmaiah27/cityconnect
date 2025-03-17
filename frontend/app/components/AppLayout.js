'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import { menuConfig } from '../config/menuConfig';
import styles from './AppLayout.module.css';

export default function AppLayout({ 
  children, 
  title,
  userType = 'official', // 'official' | 'citizen'
  department = 'trade',
  userName = 'John Doe',
  userRole = 'Officer'
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const storedUserType = localStorage.getItem('userType');
    const userDepartment = localStorage.getItem('department');

    if (!isAuthenticated || storedUserType !== userType || 
        (userType === 'official' && userDepartment !== department)) {
      router.push('/login');
    }
  }, [router, department, userType]);

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      
      
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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

  const getMenuItems = () => {
    const menuItems = userType === 'official' 
      ? menuConfig.official[department]
      : menuConfig.citizen.common;

    return menuItems.map(item => ({
      ...item,
      isActive: pathname === item.path,
      onClick: () => router.push(item.path)
    }));
  };

  const menuItems = getMenuItems();

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
        isCommandPaletteOpen={isCommandPaletteOpen}
        setIsCommandPaletteOpen={setIsCommandPaletteOpen}
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