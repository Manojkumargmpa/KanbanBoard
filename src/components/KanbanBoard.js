import React from 'react';
import Card from './Card';
import plus from "../assets/add.svg";
import actual_three_dot from "../assets/3_dot_menu.svg";
import Backlog from "../assets/Backlog.svg";
import Cancelled from "../assets/Cancelled.svg";
import Done from "../assets/Done.svg";
import In_progress from "../assets/in-progress.svg";
import Todo from "../assets/To-do.svg";
import HighPriority from "../assets/high_priority.svg"; // Add priority icons
import LowPriority from "../assets/low_priority.svg";
import MediumPriority from "../assets/medium_priority.svg";
import NoPriority from "../assets/no_priority.svg";
import UrgentPriority from "../assets/urgent_priority.svg";

const KanbanBoard = ({ tickets, users, groupBy, sortBy }) => {

  // Mappings for icons
  const icons_statuses = {
    Backlog: Backlog,
    Todo: Todo,
    "In progress": In_progress,
    Done: Done,
    Cancelled: Cancelled
  };

  const icons_priorities = [
    NoPriority,
    LowPriority,
    MediumPriority,
    HighPriority,
    UrgentPriority
    
   
   
  ];

  // Group tickets based on 'status', 'user', or 'priority'
  const groupTickets = (tickets, groupBy) => {
    if (groupBy === 'status') {
      return groupByProperty(tickets, 'status');
    } else if (groupBy === 'user') {
      return groupByProperty(tickets, 'userId', users);
    } else if (groupBy === 'priority') {
      return groupByProperty(tickets, 'priority');
    }
  };

  const groupByProperty = (tickets, property, userList) => {
    const groups = {};

    for (let ticket of tickets) {
      let key = ticket[property];

      if (property === 'userId') {
        const user = userList.find(user => user.id === ticket.userId);
        key = user ? user.name : 'Unknown User';
      }

      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(ticket);
    }

    return groups;
  };

  // Sorting based on the 'priority' or 'title'
  const sortTickets = (tickets, sortBy) => {
    if (sortBy === 'priority') {
      return tickets.sort((a, b) => b.priority - a.priority);
    } else if (sortBy === 'title') {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  // Predefined statuses for Kanban columns
  const statuses = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
const priorityNum_title={
"0":"No-Priority",
"1":"Low",
"2":"Medium",
"3":"High",
"4":"Urgent"
}
  // Add remaining status columns
  const addRemainingCols = (groupedTickets) => {
    if (groupBy === 'status') {
      for (let status of statuses) {
        if (groupedTickets[status] === undefined) {
          groupedTickets[status] = [];
        }
      }
    }
  };

  const groupedTickets = groupTickets(tickets, groupBy);
  addRemainingCols(groupedTickets, groupBy);

  return (
    <div className="kanban-board">
      {Object.entries(groupedTickets).map(([group, tickets]) => {
        const sortedTickets = sortTickets(tickets, sortBy);

        // Determine the icon based on the groupBy
        let groupIcon;
        if (groupBy === 'status') {
          groupIcon = icons_statuses[group];
        } else if (groupBy === 'priority') {
          groupIcon = icons_priorities[group];
          // console.log(priorityNum_title[`${group}`]);
          group=priorityNum_title[group];
          
        }

        return (
          <div key={group} className="kanban-column">
            <div className="column-details">
              {/* Display icon if available */}
              {groupIcon && <img src={groupIcon} alt={`${group} icon`} className="group-icon" />}
              <span className="group">{group}</span>
              <span className="count">{tickets.length}</span>
              <img src={plus} alt="add item" />
              <img src={actual_three_dot} alt="more options" />
            </div>
            {sortedTickets.map(ticket => (
              <Card key={ticket.id} ticket={ticket} icons_priorities={icons_priorities}/>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
