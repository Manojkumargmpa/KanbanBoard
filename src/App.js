import React, { useEffect, useState } from 'react';
import axios from 'axios';
import KanbanBoard from './components/KanbanBoard';
import GroupSelector from './components/GroupSelector';
import SortSelector from './components/SortSelector';
import './styles/styles.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState('status'); // default grouping by status
  const [sortBy, setSortBy] = useState(null); // no sort initially

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

  return (
    <div className="App">
      {/* <h1>Kanban Board</h1> */}
      <div className="controls">
        <GroupSelector groupBy={groupBy} setGroupBy={setGroupBy} />
        <SortSelector sortBy={sortBy} setSortBy={setSortBy} />
      </div>
      <KanbanBoard tickets={tickets} users={users} groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
}

export default App;
