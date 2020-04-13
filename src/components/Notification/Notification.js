import React, { useState } from "react";
import './notification.css'


export const Notification = ({message, duration}) => {
  const [display, handleDisplay] = useState({})
  const timeout = duration || 2000

  setTimeout(() => {
    handleDisplay({display: 'none'})
  }, timeout);

  return (
    <div className={`NotificationContainer`} style={display}>
      <div>{message}</div>
    </div>
  );
};

export default Notification;
