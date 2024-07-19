"use client";

import { useState, ChangeEvent } from 'react';
import styles from '../styles/Dashboard.module.css';

interface Prompt {
  title: string;
  date: string;
  description: string;
}

const prompts: Prompt[] = [
  { title: 'Prompt 1', date: 'Jan 24, 2024', description: 'Identify the top 3 customers based on total Sale value across all locations.' },
  { title: 'Prompt 2', date: 'Jan 24, 2024', description: 'Analyze the monthly performance metrics of all departments.' },
  { title: 'Prompt 3', date: 'Jan 24, 2024', description: 'Compare the yearly revenue growth of different product lines.' },
  { title: 'Prompt 4', date: 'Jan 24, 2024', description: 'Evaluate the customer satisfaction survey results for Q1 2024.' },
  { title: 'Prompt 5', date: 'Jan 24, 2024', description: 'Generate a report on the inventory levels of all warehouses.' },
  { title: 'Prompt 6', date: 'Jan 24, 2024', description: 'Determine the ROI of the latest marketing campaigns.' },
  { title: 'Prompt 7', date: 'Jan 24, 2024', description: 'Assess the impact of the new pricing strategy on sales volume.' },
  { title: 'Prompt 8', date: 'Jan 24, 2024', description: 'Monitor the key performance indicators for the current fiscal year.' },
  { title: 'Prompt 9', date: 'Jan 24, 2024', description: 'Review the employee performance evaluations for 2023.' },
];

const Dashboard: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');

  // Function to handle search input change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(e.target.value);
  };

  // Filter prompts based on search input
  const filteredPrompts = prompts.filter(prompt => 
    prompt.title.toLowerCase().includes(searchInput.toLowerCase()) ||
    prompt.date.toLowerCase().includes(searchInput.toLowerCase()) ||
    prompt.description.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className={styles.dashboard}>
      <input 
        type="text" 
        placeholder="Search prompts" 
        className={styles.searchBar} 
        value={searchInput}
        onChange={handleSearchChange}
      />
      <div className={styles.board}>
        {filteredPrompts.map((prompt, index) => (
          <div key={index} className={styles.prompt}>
            <p>{prompt.title}</p>
            <p>{prompt.date}</p>
            <p>{prompt.description}</p>
            <div className="mt-4">
              <svg width="100" height="50" viewBox="0 0 100 50">
                <rect width="10" height="30" x="5" y="10" fill="#000" />
                <rect width="10" height="20" x="20" y="20" fill="#000" />
                <rect width="10" height="40" x="35" y="5" fill="#000" />
                <rect width="10" height="25" x="50" y="15" fill="#000" />
                <rect width="10" height="35" x="65" y="10" fill="#000" />
                <rect width="10" height="15" x="80" y="25" fill="#000" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
