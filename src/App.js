import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import logo from './logo.svg';
import './App.css';


function App() {
  const socket = socketIOClient('http://127.0.0.1:4001')
  const [socData, setSocData] = useState('hoya init')

  useEffect(() => {
    socket.on('chat message', (msg)=> setSocData(msg));
  })
  
  const emit = () => {
    socket.emit('chat message', "init2");
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={()=> emit()}>
          Socket <code>{socData}</code> 
        </p>
      
      </header>
    </div>
  );
}

export default App;
