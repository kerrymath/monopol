import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import Board from "./components/Board/Board"
import {JoinForm} from "./components/Form/Form"
import './App.css';

const defaultPlayer = {
  id: '',
  gameId: '',
  name: '',
  initials: {},
  money: 1000,
  properties: [],
  playerOffset: {},
  playerPosition: {},
  isInJail: false,
}

const App = ()=> {
  const socket = socketIOClient('http://127.0.0.1:4001')
  const [socData, setSocData] = useState('hoya init')
  const [nameAndInitials, setNameAndInitials] = useState(null)
  const [players, setPlayers] = useState({})
  const [player, setPlayer] = useState(defaultPlayer)

  useEffect(() => {
    socket.on('chat message', (msg)=> setSocData(msg));
    handleJoin()
  })

  const handleJoin = ()=> {
    // create player
    if (nameAndInitials) {
      const {name, firstInital, lastInital} = nameAndInitials
      const updatePlayer = player;
      
      // random id
      const id = 1;

      updatePlayer.id = id
      updatePlayer.name = name
      updatePlayer.initials = {firstInital, lastInital}

      setPlayer(updatePlayer)
      console.log('player', player)

      // save player to local storage
      
      //save to players array 
      players[id] = player
      console.log('players', players)

      //emit players array
    }
  }
  
  
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
