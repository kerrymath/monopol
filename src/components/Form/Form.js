import React, { useState } from "react";
import uniqid from 'uniqid';
import store, { set } from 'store2';
import socket from "../../service/Socket/Socket"
import generateRandomNumber from "../../utils/generateRandomNumber"
import './form.css'

const defaultPlayer = {
  id: '',
  gameId: '',
  boardId: 'b1',
  name: '',
  icon: '',
  status: '',
  colour: '',
  initials: {},
  money: 1000,
  properties: [],
  playerOffset: {},
  playerPosition: {top: '1278px', left: '1278px'},
  isInJail: false,
  isHost: false,
}

const defaultGameState = {
  gameId: '',
  whosTurn: '',
  completedTurns: 0,
  board: null,
  status: 'init',
  hostId: '',
}

const randomColour = ()=> {
  const colours = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF']

  const max = colours.length 
  const randomNumber = generateRandomNumber(max)

  return colours[randomNumber]
}

const randomOffset = ()=> {
  const vertical = generateRandomNumber(130)
  const horizontal = generateRandomNumber(60)

  const offset = {margin: `${vertical}px ${horizontal}px` }
  return offset
}

export const JoinForm = ({returnStates}) => {
  const [player, setPlayer] = useState(defaultPlayer);
  const [name, setName] = useState("");
  const [firstInital, setFirstInital] = useState("");
  const [lastInital, setLastInital] = useState("");
  const [gameId, setGameId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [formToDisplay, setFormToDisplay] = useState("");
  const [isHost, setIsHost] = useState(false);

  
  const handleChange = (e) => {
    const target = e.target;

    if (target.name == "name") setName(target.value);
    if (target.name == "firstInital") setFirstInital(target.value);
    if (target.name == "lastInital") setLastInital(target.value);
    if (target.name == "gameId") setGameId(target.value);

  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if(!name || !firstInital || !lastInital || (!isHost && !gameId)) setErrorMsg('You missed a couple field(s) 😅. Please fill them out.')
    else if (isHost) {
      setGameId(uniqid());
      setFormToDisplay("host")
      player.isHost = true
      setPlayer(player)
      setIsHost(false)
    }
    else {
      player.id = uniqid();
      player.gameId = gameId
      player.name = name
      player.initials = {firstInital, lastInital}
      player.colour = randomColour()
      player.playerOffset = randomOffset()
      
      setPlayer(player)
      
      // return states
      const gameState = defaultGameState
      gameState.gameId = gameId
      if (player.isHost) {
        gameState.hostId = player.id
      }

      // return states
      returnStates({player, gameState})

      // save player to local storage
      store('mono-player', player)

      //emit players array
      socket.emit('join game', player);

      // reset form values
      setErrorMsg('')
      setName('')
      setFirstInital('')
      setLastInital('')
      setGameId('')
    }
  };

  const handleRender = ()=> {
    switch (formToDisplay) {
      case 'host':
        return (
          <div className="container">
            <h2>Please share this code with your friends so they can join your game</h2>
            <p>Code: <i className="gameId">{gameId}</i></p>
            <button onClick={(e)=>handleSubmit(e)}>Play!</button>
          </div>
        )

      case 'register':
        return (
          <form className="container" onSubmit={(e) => handleSubmit(e)}>
            <p className="errorMsg">{errorMsg}</p>
            <label>
              <span className="label">Name:</span>
              <input
                name="name"
                type="text"
                placeholder="Kerrynator"
                value={name}
                onChange={(e) => handleChange(e)}
                maxLength="30"
              />
            </label>
            <label>
              <span className="label">Initials:</span>
              <div className="initialsContainer">
                <input
                  name="firstInital"
                  type="text"
                  placeholder="k"
                  value={firstInital}
                  onChange={(e) => handleChange(e)}
                  maxLength="1"
                />
                <input
                  name="lastInital"
                  type="text"
                  placeholder="M"
                  value={lastInital}
                  onChange={(e) => handleChange(e)}
                  maxLength="1"
                />
              </div>
            </label>
            {!isHost && <label>
              <span className="label">Game Code:</span>
                <input
                  name="gameId"
                  type="text"
                  placeholder="...k344y"
                  value={gameId}
                  onChange={(e) => handleChange(e)}
                  maxLength="8"
                />
            </label>}
            <button type="submit">{(isHost && `Next`) || `Play!`}</button>
          </form>
        )    
      default:
        return (
          <div className="container">
            <h2>Welcome Friend! What would you like to do?</h2>
            <div>
              <button onClick={()=>{setFormToDisplay("register"); setIsHost(true)}}>Host Game</button>
              <button onClick={()=>setFormToDisplay("register")}>Join Game</button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="formContainer">
      {handleRender()}
    </div>
  );
};

export default { JoinForm };
