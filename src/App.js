import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import Board from "./components/Board/Board"
import {JoinForm} from "./components/Form/Form"
import './App.css';



function App() {
  const socket = socketIOClient('http://127.0.0.1:4001')
  const [socData, setSocData] = useState('hoya init')
  const [nameAndInitials, setNameAndInitials] = useState(null)

  useEffect(() => {
    socket.on('chat message', (msg)=> setSocData(msg));
  })
  
  const emit = () => {
    socket.emit('chat message', "init2");
  }

  return (
    <div className="App">
     {!nameAndInitials && <JoinForm returnValues={setNameAndInitials}/>}
     <Board />
      <p onClick={()=> emit()}>
        Socket <code>{socData}</code> 
      </p>
    </div>
  );
}

export default App;
