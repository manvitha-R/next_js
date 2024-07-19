"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import Modal from './Modal';
import styles from '../styles/Sidebar.module.css';
import axios from 'axios';

// Define types for menu and submenu
interface SubMenu {
  name: string;
  href: string;
}

interface Menu {
  name: string;
  href: string;
  submenus: SubMenu[];
}

const Sidebar: React.FC = () => {
  const [fetchedMenus, setFetchedMenus] = useState<Menu[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: number]: boolean }>({});
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentMenuIndex, setCurrentMenuIndex] = useState<number | null>(null);
  const [isSubMenu, setIsSubMenu] = useState<boolean>(false);
  const [menus, setMenus] = useState<Menu[]>([
    { name: 'Use Case 1', href: '/useCase1', submenus: [] },
    { name: 'Use Case 2', href: '/useCase2', submenus: [] },
    { name: 'Use Case 3', href: '/useCase3', submenus: [] },
    { name: 'Use Case 4', href: '', submenus: [{ name: 'BSF 1', href: '/' }] }
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:1805/endpoint/get-menu")
      .then((result) => {
        const fetchedMenus: Menu[] = result.data.map((menu: any) => ({
          name: menu.menu_name,
          href: '',
          submenus: []
        }));
        setFetchedMenus(fetchedMenus);
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleDropdown = (index: number): void => {
    setDropdownOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const openModal = (index: number | null, isSubMenu: boolean = false): void => {
    setCurrentMenuIndex(index);
    setIsSubMenu(isSubMenu);
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setCurrentMenuIndex(null);
  };

  const addMenu = (menuName: string): void => {
    if (menuName) {
      setMenus((prevMenus) => {
        const newMenus = [...prevMenus];
        
        if (isSubMenu && currentMenuIndex !== null) {
          // Adding a submenu to an existing menu item
          const menuToUpdate = newMenus[currentMenuIndex];
          const updatedMenu = {
            ...menuToUpdate,
            submenus: [
              ...menuToUpdate.submenus,
              { name: menuName, href: '/' }
            ]
          };
          newMenus[currentMenuIndex] = updatedMenu;
        } else {
          // Adding a new top-level menu item
          newMenus.push({ name: menuName, href: '', submenus: [] });
        }
        
        return newMenus;
      });
    }
    
    // Close the modal after adding menu/submenu
    closeModal();
  };
  
  // Combine the initial menus with the fetched menus
  const combinedMenus = [...menus, ...fetchedMenus];

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>INDUSTRY</div>
      <nav className={styles.nav}>
        <ul>
          {combinedMenus.map((menu, index) => (
            <li key={index} className={styles.navItem}>
              {menu.href ? (
                <Link href={menu.href} style={{ color: "white" }}>{menu.name}</Link>
              ) : (
                <div onClick={() => toggleDropdown(index)} className={styles.navItemHeader}>
                  {menu.name} 
                </div>
              )}
              {dropdownOpen[index] && menu.submenus.length > 0 && (
                <ul className={styles.dropdown}>
                  {menu.submenus.map((submenu, subIndex) => (
                    <li key={subIndex} className={styles.dropdownItem}>
                      <Link href={submenu.href} style={{ color: "white" }}>{submenu.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li className={styles.navItem}>
            <button onClick={() => openModal(null, false)} className={styles.addMenuButton}>
              Add Menu <PlusIcon className={styles.icon} />
            </button>
          </li>
        </ul>
      </nav>
      <Modal isOpen={modalOpen} onClose={closeModal} onSave={addMenu} />
    </div>
  );
};

export default Sidebar;
