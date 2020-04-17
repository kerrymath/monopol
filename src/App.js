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
  const {title, type, item, from, to} = middleCardContent
  const render =()=> {
    // handle chance & community card types
    let action;
    switch (type) {
      case 'receive':
        action = {type: 'receive', item, from}
        return (<button onClick={()=>{handleUserAction(action); setDisplayCard(false)}}>Collect your money!</button>)
      case 'pay':
        action = {type: 'pay', item, to}
        return (<button onClick={()=>{handleUserAction(action); setDisplayCard(false)}}>Pay!</button>)
        
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
      if (store('mono-player')) {
        const tempPlayer = store('mono-player')
        store.remove('mono-player')
        store('mono-player', states.players[tempPlayer.id])
      }
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
        const card = cards[1]
        setMiddleCardContent(card)
        setDisplayCard(true)
        socket.emit('notify everyone', `${player.name} drew this ${deck.id} card: ${card.title}`);
        break;
    
      default:
        break;
    }
  }

  const handleMoney = (personId, payOrCollect, fromOrTo, amount)=> {
    const collector = players[personId]
    let notification;

    if (payOrCollect == "collect") {
      if (fromOrTo == "bank" || fromOrTo == undefined) {
        collector.money += amount
        setPlayer(player)

        notification = `${collector.name} has collected £${amount} from the bank.`
         // post to server & notify players
        socket.emit('update player', {collector, notification});
      }
      else if (fromOrTo == "everyone") {
        let moneyForCollector = 0
        // add fn if debtor goes bankrupt and can't pay in full
        // they need to trade property

        // map through players in the game and take money
        playersKeyInMyGame.map(key => {
          const debtor = getPlayersInMyGame()[key]
          if (debtor.isInGame) {
            debtor.money -= amount
            debtor.isInGame = debtor.money < 0? false : true
            players[debtor.id] = debtor
            setPlayers(debtor)

            moneyForCollector += amount
          }
        })
        // get total players and * by amount
        collector.money += moneyForCollector
        players[collector.id] = collector
        setPlayer(collector)
        setPlayers(players)
        
        notification = `${collector.name} has collected £${amount} from everyone.`
        // post to server & notify players
        socket.emit('update players', {players, notification});
      }
      else {
        // individual
        const debtor = players[fromOrTo]
        if (debtor.isInGame) {
          // take money from them
          debtor.money -= amount
          debtor.isInGame = debtor.money < 0? false : true
          players[debtor.id] = debtor
          // add fn if debtor goes bankrupt and can't pay in full
          // they need to trade property
          //add money to collector
          collector.money += amount
          players[collector.id] = collector
          // set players & notify
          setPlayer(collector)
          setPlayers(players)
          notification = `${collector.name} has collected £${amount} from ${debtor.name}.`
          socket.emit('update players', {players, notification});
        }
      }
    }
    else {
      // payOrCollect == "pay"
      if (fromOrTo == "bank" || fromOrTo == undefined) {
        player.money -= amount
        setPlayer(player)

        notification = `${collector.name} has payed £${amount} to the bank.`
         // post to server & notify players
         socket.emit('update player', {player, notification});
      }
      else if (fromOrTo == "everyone") {
        
        notification = `${collector.name} has payed £${amount} to everyone.`
      }
      else {
        // individual
      }
    }

   
  }

  const handleUserAction = (action)=> {
    // handle all actions that will affect game play
    switch (action.type) {
      case "receive":
          handleMoney(player.id, 'collect', action.from, action.item)
        break;
      case "pay":
          handleMoney(player.id, 'pay', action.to , action.item)
        break;
    
      default:
        break;
    }
  }

  return (
    <div className="App">
    <div onClick={()=>handleMoney(player.id, 'collect', 'k964w34w' , 50)}>give money to me from kerry 1</div>
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
