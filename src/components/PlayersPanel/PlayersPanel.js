import React, { useState, useEffect } from "react";
import './playersPanel.css'

export const PlayersPanel = ({players}) => {
  const [displayPlayersPanel, setDisplayPlayersPanel] = useState(true)
  const displayIcon = displayPlayersPanel ? "<" : ">"
  const playersKeys = Object.keys(players)
  
  useEffect(() => {
    console.log('pp-players',players)
    console.log('pp-playersKeys',playersKeys)
  })

  return (
    <div className="playersPanel-container">
      {displayPlayersPanel && 
      <div className="">
        <h3 className="players-heading">Players</h3>
        <ul>
        {playersKeys.map(key => {
          const player = players[key]
          return (
            <li>
              <span className="name">{player.name} (status): </span> 
              <span className="money"> &nbsp; £{player.money} </span>
            </li>
          )}
        )}
        </ul>
      </div>}
      <div className="display-players" onClick={()=> setDisplayPlayersPanel(!displayPlayersPanel)}>
        <p>{displayIcon}</p>
      </div>
    </div>
  )
};

export default PlayersPanel
