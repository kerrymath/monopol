import React from "react";
import './player.css'

export const Player = ({player}) => {
  
  const {name, playerPosition, playerOffset, initials, colour} = player;

  const style = {
    top: playerPosition.top,
    left: playerPosition.left,
    margin: playerOffset.margin,
    backgroundColor: colour,
  }

  return (
    <div className="Player-container" title={name} style={style}>
      <p className="initials">{initials.firstInital}.{initials.lastInital}</p>
    </div>
  )
};

export default Player
