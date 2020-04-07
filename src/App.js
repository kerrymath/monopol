import React, { useEffect, useState } from "react";
import store from 'store2';
import socket from "./service/Socket/Socket"
import Board from "./components/Board/Board"
import {JoinForm} from "./components/Form/Form"
import PlayersPanel from "./components/PlayersPanel/PlayersPanel"
import Player from "./components/Player/Player"
import ControlPanel from "./components/ControlPanel/ControlPanel"
import './App.css';

const initialDiceState = {
  numberOfConsecutiveDoubles: 0,
}

const App = ()=> {
  const [games, setGames] = useState([])
  const [players, setPlayers] = useState({}) // on init needs to be empty obj
  const [player, setPlayer] = useState(null)
  const [diceState, setDiceState] = useState(initialDiceState)  

  useEffect(() => {    
    getSavedPlayer()

    socket.on('game update', function(state){
      console.log('state',state.players)
      setPlayers(state.players)
    });
    
    return(
      socket.emit('offline', {player, players})
    )
  },[])

  const getSavedPlayer = ()=> {
    const savedPlayer = store('mono-player')

    if (!player && savedPlayer) {
      setPlayer(savedPlayer)
      socket.emit('player', savedPlayer);
    }
  }

  const handleDiceClick = (d1,d2)=> {
    const isDouble = d1 == d2 ? true : false
    console.log('click', d1,d2, isDouble)

      // if it's not doubles
      if (!isDouble) {
        // update dice numbers
        setDiceState(diceState)
        // update player position
        // update player state
        // emit to player to server
        // update and emit status
      }
      else {
        setDiceState(diceState)
      }
  }

  const playersKey = Object.keys(players)

  return (
    <div className="App">
     {!player && 
      <JoinForm 
        returnPlayer={setPlayer}
      />} 
      <PlayersPanel players={players}/>
      <ControlPanel  
        player={player} 
        diceState={diceState}
        handleDiceClick={handleDiceClick}
        />
      <div className="activeBoard">
        {players && 
            playersKey.map((key)=>{
              const player = players[key]
              
              return <Player player={player}/>
            })
          }
        <Board />
      </div>
    </div>
  );
}

export default App;
