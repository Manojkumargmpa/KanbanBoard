import React, { useEffect, useState } from 'react';
import axios from 'axios';
import KanbanBoard from './components/KanbanBoard';
import DropDown from './assets/down.svg';
import './styles/styles.css';
import Display from './assets/Display.svg';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status'); // load from localStorage
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority'); // load from localStorage
  const [isDropdownOpen, setDropdownOpen] = useState(false); // manage dropdown visibility

  useEffect(() => {
    // Fetch data from API
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => {
        const { tickets, users } = response.data;
        setTickets(tickets);
        setUsers(users);
      })
      .catch((error) => {
        console.error("There was an error fetching the tickets!", error);
      });
  }, []);

  // Save groupBy and sortBy values to localStorage when they change
  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
  }, [groupBy]);

  useEffect(() => {
    localStorage.setItem('sortBy', sortBy);
  }, [sortBy]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="App">
      <div className="display-button-total">
        {/* Display Button */}
        <button className="display-button" onClick={toggleDropdown}>
          <img src={Display} alt="display button" />
          <span>Display</span>
          <img src={DropDown} alt="dropdown" />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="controls">
            <div className="dropdown-item">
              <label>Grouping</label>
              <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-item">
              <label>Ordering</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="">None</option>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <KanbanBoard tickets={tickets} users={users} groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
}

export default App;
