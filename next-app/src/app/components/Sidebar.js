"use client"

// import { useState } from 'react';
// import styles from '../styles/Sidebar.module.css';
// import { Accordion, AccordionSummary, AccordionDetails,  List, ListItem, ListItemText} from '@mui/material';
// import { ExpandMore, Inbox, Mail } from '@mui/icons-material';
// import { useRouter } from 'next/router';


// const Sidebar = () => {
//   const router = useRouter();
//   const useCases = ['Use Case 1', 'Use Case 2', 'Use Case 3', 'Use Case 4'];
//   const subMenuItems = ['BCF 1'];

//    // Function to handle submenu item click
//    const handleSubMenuClick = (subText) => {
//     if (subText === 'BCF 1') {
//       router.push('/user');
//     }
//   };

//   return (
//     <div className={styles.sidebar}>
//       <h2>Industry</h2>
//       <List>
//         {useCases.map((text, index) => (
//           <Accordion key={text}>
//             <AccordionSummary
//             expandIcon={<ExpandMore/>}
//             aria-controls={`${text}-content`}
//             id={`${text}-header`}>

//               <ListItemText primary={text} />
//             </AccordionSummary>
//             <AccordionDetails>
//             {text === 'Use Case 4' && (
//                 <List>
//                   {subMenuItems.map((subText, subIndex) => (
//                     <ListItem button key={subText} onClick={() => handleSubMenuClick(subText)}>
//                       <ListItemText primary={subText} />
//                     </ListItem>
//                   ))}
//                 </List>
//               )}

//            </AccordionDetails>
//           </Accordion>

//         ))}
//       </List>
//     </div>
//   );
// };

// export default Sidebar;

// components/Sidebar.js
// components/Sidebar.js


import Link from 'next/link';
import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import Modal from './Modal';
import styles from '../styles/Sidebar.module.css';
import axios from 'axios';

const Sidebar = () => {
  const [fetchedMenus, setFetchedMenus] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMenuIndex, setCurrentMenuIndex] = useState(null);
  const [isSubMenu, setIsSubMenu] = useState(false);
  const [menus, setMenus] = useState([
    { name: 'Use Case 1', href: '/useCase1', submenus: [] },
    { name: 'Use Case 2', href: '/useCase2', submenus: [] },
    { name: 'Use Case 3', href: '/useCase3', submenus: [] },
    { name: 'Use Case 4', href: '', submenus: [{ name: 'BSF 1', href: '/' }] }
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:1805/endpoint/get-menu")
      .then((result) => {
        const fetchedMenus = result.data.map(menu => ({
          name: menu.menu_name,
          href: '',
          submenus: []
        }));
        setFetchedMenus(fetchedMenus);
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleDropdown = (index) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const openModal = (index, isSubMenu = false) => {
    setCurrentMenuIndex(index);
    setIsSubMenu(isSubMenu);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentMenuIndex(null);
  };

  const addMenu = (menuName) => {
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
