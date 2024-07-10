// components/Modal.js
"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from '../styles/Modal.module.css';

const Modal = ({ isOpen, onClose, onSave }) => {
  const [menuName, setMenuName] = useState('');
  const router = useRouter();

  const handleSave = (event) => {
    event.preventDefault();

    axios.post("http://localhost:1805/endpoint/add-menu", {
      menu_name: menuName
    })
    .then(result => {
      console.log(result);
      alert("Menu added successfully");
      setMenuName('');
      onSave(menuName);
      router.push('/');
    })
    .catch(err => {
      console.log(err);
      alert("Menu failed");
    });
  };

  if (!isOpen) return null;

  return (
    <form onSubmit={handleSave}>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <h2>Add Menu Item</h2>
          <input
            type="text"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            placeholder="Enter menu name"
            className={styles.input}
            required
          />
          <div className={styles.buttons}>
            <button type="button" onClick={onClose} className={styles.button}>
              Cancel
            </button>&nbsp;&nbsp;
            <button type="submit" className={styles.button}>
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Modal;
