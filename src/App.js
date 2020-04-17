import React, { useEffect, useState} from "react";
import store from 'store2';
import socket from "./service/Socket/Socket"
import Board from "./components/Board/Board"
import {JoinForm} from "./components/Form/Form"
import PlayersPanel from "./components/PlayersPanel/PlayersPanel"
import Player from "./components/Player/Player"
import ControlPanel from "./components/ControlPanel/ControlPanel"
import notify from './utils/notify';
import MiddleCards from './constants/Cards';
import './App.css';

const initialDiceState = {
  numberOfConsecutiveDoubles: 0,
}

const MiddleCard = ({setDisplayCard, middleCardContent, handleUserAction})=> {
  const {title, type, item, from} = middleCardContent
  const render =()=> {
    // handle chance & community card types
    switch (type) {
      case 'receive':
        const action = {type: 'receive', item, from}
        return (<button onClick={()=>{handleUserAction(action); setDisplayCard(false)}}>Collect your money!</button>)
        
        default:
          return (<button onClick={()=>{setDisplayCard(false)}}>Close</button>)
    }
  }

  return (
    <div className="formContainer">
      <div className="container">
        <p>{title}</p>
        {render()}
      </div>
    </div>
  )
}

const App = ()=> {
  const [games, setGames] = useState([])
  const [players, setPlayers] = useState({}) // on init needs to be empty obj
  const [player, setPlayer] = useState(null)
  const [diceState, setDiceState] = useState(initialDiceState)
  const [displayCard, setDisplayCard] = useState(false)
  const [middleCardContent, setMiddleCardContent] = useState(null)


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

  const handleCardClick = (deck)=> {
    // handle all card clicks - middle, utilise, props, corners
    switch (deck.type) {
      case 'middle':
        const cards = deck.id == "chance" ? MiddleCards.chance : MiddleCards.community;
        //get random card
        const card = cards[3]
        setMiddleCardContent(card)
        setDisplayCard(true)
        socket.emit('notify everyone', `${player.name} drew this ${deck.id} card: ${card.title}`);
        break;
    
      default:
        break;
    }
  }

  const handleUserAction = (action)=> {
    // handle all actions that will affect game play
    switch (action.type) {
      case "receive":
        const notification = `${player.name} has collected £${action.item}`
        // get monies from bank or person
        player.money += action.item
        setPlayer(player)
        // post to server
        socket.emit('update player', {player, notification});
        // send update state && status
        break;
    
      default:
        break;
    }
  }

  return (
    <div className="App">
      <div className="notificationContainer"/>
      {displayCard && 
        <MiddleCard setDisplayCard={setDisplayCard} middleCardContent={middleCardContent} handleUserAction={handleUserAction} />
      }

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
        <Board handleCardClick={handleCardClick}/>
      </div>
    </div>
  );
}

export default App;
