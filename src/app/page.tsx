// page.tsx

"use client";

import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Modal from './components/Modal';
import styles from './styles/Home.module.css';

import { useState } from 'react';


export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveMenu = (menuName: any) => {
    console.log(`Menu saved: ${menuName}`);
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      {/* <button onClick={handleOpenModal}>Add Menu</button> */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveMenu} />
      <Dashboard />
    </div>
  );
}
