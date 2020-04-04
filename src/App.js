import React, { useEffect, useState } from "react";
import uniqid from 'uniqid';
import store from 'store2';
import socketIOClient from "socket.io-client";
import Board from "./components/Board/Board"
import {JoinForm} from "./components/Form/Form"
import PlayersPanel from "./components/PlayersPanel/PlayersPanel"
import './App.css';

const defaultPlayer = {
  id: '',
  gameId: '',
  name: '',
  icon: '',
  status: '',
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
  const [games, setGames] = useState([])
  const [nameAndInitials, setNameAndInitials] = useState(null)
  const [players, setPlayers] = useState({})
  const [player, setPlayer] = useState(defaultPlayer)
  const [isJoinComplete, setIsJoinComplete] = useState(false)

  useEffect(() => {    
    getSavedPlayer()
    handleJoin()
  })

  const getSavedPlayer = ()=> {
    const savedPlayer = store('mono-player')

    if (player == defaultPlayer && savedPlayer) {
      console.log('savedPlayer', savedPlayer)
       const id = savedPlayer.id
      setPlayer(savedPlayer)
      setPlayers({[id]: savedPlayer})
      setIsJoinComplete(true)
    }
  }

  const handleJoin = ()=> {
    // create player
    if (nameAndInitials) {
      const {name, firstInital, lastInital} = nameAndInitials
      const updatePlayer = player;
      const updatePlayers = players || {};
      
      // random id
      const id = uniqid();

      // set offset
      // set position

      updatePlayer.id = id
      updatePlayer.name = name
      updatePlayer.initials = {firstInital, lastInital}

      setPlayer(updatePlayer)
      console.log('player', player)

      // save player to local storage
      store('mono-player', player)
      
      //save to players array 
      updatePlayers[id] = player
      setPlayers(updatePlayers)
      console.log('updatePlayers', players)

      //emit players array
      socket.emit('new player', player);

      socket.on('game update', function(state){
        console.log('state',state)
      });
      // socket.close()

      setIsJoinComplete(true)
    }
  }
  
  const emit = () => {
    // socket.emit('chat message', "init2");
  }

  return (
    <div className="App">
     {!isJoinComplete && 
      <JoinForm returnValues={setNameAndInitials}/>} 
     <PlayersPanel players={players}/>
     <Board />

      <p onClick={()=> emit()}>
        Socket <code>{socData}</code> 
      </p>
    </div>
  );
}

export default App;
