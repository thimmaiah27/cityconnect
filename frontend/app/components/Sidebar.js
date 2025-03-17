'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CommandPalette from './CommandPalette';
import SearchBar from './SearchBar';
import styles from './AppLayout.module.css';


export default function Sidebar({ 
  isCollapsed,
  isActive,
  userName,
  userRole,
  menuItems,
  onLogout,
  isCommandPaletteOpen,
  setIsCommandPaletteOpen
}) {
  const router = useRouter();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchActive(true);
    setIsCommandPaletteOpen(true);
  };

  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <aside className={`
        ${styles.sidebar} 
        ${isCollapsed ? styles.collapsed : ''} 
        ${isActive ? styles.active : ''}
      `}>
        <div className={styles.profile}>
          <Image 
            src="/official-icon.svg" 
            alt="Profile" 
            width={64} 
            height={64}
          />
          <div className={styles.name}>
            <h3>{userName}</h3>
            <span>{userRole}</span>
          </div>
        </div>
        
        <nav className={styles.nav}>
          <button 
            className={`${styles.searchContainer} ${isSearchActive ? styles.active : ''}`}
            onClick={handleSearchClick}
          >
            <Image 
              src="/search.svg"
              alt='Search'
              width={24}
              height={24}
            />
            <span className={styles.searchPlaceholder}>
              Search Licenses... (Press ⌘K)
            </span>
          </button>

         

          {menuItems.map((item, index) => (
            <button 
              key={index}
              className={`${styles.navButton} ${item.isActive ? styles.active : ''}`}
              onClick={item.onClick}
            >
              <Image 
                src={item.icon}
                alt={item.label}
                width={24}
                height={24}
                className={styles.menuIcon}
              />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button 
            onClick={() => router.push('/profile')} 
            className={styles.sidebarProfile}
          >
            <Image 
              src="/profile.svg"
              alt='Profile'
              width={24}
              height={24}
              className={styles.sidebarIcon}
            />
            <span>My Profile</span>
          </button>
          
          <button 
            onClick={onLogout} 
            className={styles.sidebarLogout}
          >
            <Image 
              src="/logout.svg"
              alt='Logout'
              width={24}
              height={24}
              className={styles.sidebarIcon}
            />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      
      
      <SearchBar 
        isOpen={isCommandPaletteOpen}
        onClose={() => {
          setIsCommandPaletteOpen(false);
          setIsSearchActive(false);
        }}
      />
    </>
  );
} 