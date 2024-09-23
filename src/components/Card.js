import React from 'react';
import three_dot from "../assets/no_priority.svg";
const Card = ({ ticket,icons_priorities }) => {
  return (
    <div className="kanban-card">
        <h3 className="id">{ticket.id}</h3>
      <h3 className="title">{ticket.title}</h3>
      {/* <p>Priority: {ticket.priority}</p>
      <p>Status: {ticket.status}</p> */}
      <div className="tagAndDot">
      {/* <img src={three_dot} className='three_dot'></img>  */}
      <img src={icons_priorities[ticket.priority]} className='three_dot'></img>
      <div className="tag">
        <span className="dot"></span>{ticket.tag[0]}
      </div>
      </div>
    </div>
  );
};

export default Card;
