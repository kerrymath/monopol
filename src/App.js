import React, { useEffect, useState} from "react";
import store from 'store2';
import socket from "./service/Socket/Socket"
import Board from "./components/Board/Board"
import {JoinForm} from "./components/Form/Form"
import PlayersPanel from "./components/PlayersPanel/PlayersPanel"
import Player from "./components/Player/Player"
import ControlPanel from "./components/ControlPanel/ControlPanel"
import notify from './utils/notify';
import './App.css';

const initialDiceState = {
  numberOfConsecutiveDoubles: 0,
}

const App = ()=> {
  const [games, setGames] = useState([])
  const [players, setPlayers] = useState({}) // on init needs to be empty obj
  const [player, setPlayer] = useState(null)
  const [diceState, setDiceState] = useState(initialDiceState)

  const playersKey = Object.keys(players)

  useEffect(() => {    
    getSavedPlayer()

    socket.on('game update', function(states){
      console.log('states',states)
      setPlayers(states.players)
      setGames(states.allGames)
      notify(states.message)
    });
    
    socket.on('join game status', function (obj) {
      const storePlayer = store('mono-player')
      if (storePlayer && storePlayer.id == obj.id && obj.status == false) {
        // display message
        notify(obj.message)
        store.remove('mono-player')
        setPlayer(null)
      }
    })

    socket.on('notification', function (note) {
      if (player && player.id == note.recipient || note.recipient == 'all') {
        // display message
        notify(note.message, 5000)
      }
    })
    
  },[])

  const getSavedPlayer = ()=> {
    const savedPlayer = store('mono-player')

    if (!player && savedPlayer) {
      setPlayer(savedPlayer)
      socket.emit('join game', savedPlayer);
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

  const handleStatesFromLogin = (states)=> {
    setPlayer(states.player)
    // emit games state to server
    if (states.player.isHost) {
      socket.emit('host game', states.gameState);
    }
  }

  const getPlayersInMyGame = ()=> {
    let playersOnlyInMyGame = {}

    if (players) {
      playersKey.forEach((id) =>{
        if(players[id].gameId == player.gameId)
          playersOnlyInMyGame[id] = players[id]
      })
      
      return playersOnlyInMyGame
    }

    return {}
  }

  const playersKeyInMyGame = Object.keys(getPlayersInMyGame())

  const getMyGameState = ()=> {
    if (player && games.hasOwnProperty(player.gameId)) {
      return games[player.gameId]
    }
  }

  return (
    <div className="App">
      <div className="notificationContainer">
    </div>

     {!player && 
      <JoinForm 
        returnStates={handleStatesFromLogin}
      />} 
      <PlayersPanel players={getPlayersInMyGame()} gameState={getMyGameState()}/>
      <ControlPanel  
        player={player} 
        diceState={diceState}
        handleDiceClick={handleDiceClick}
        gameState={getMyGameState()}
        />
      <div className="activeBoard">
        {players && 
          playersKeyInMyGame.map((key)=>{
            const p = players[key]
            return <Player player={p}/>
            })
          }
        <Board />
      </div>
    </div>
  );
}

export default App;
