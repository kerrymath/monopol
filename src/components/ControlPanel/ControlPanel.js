import React, { useState } from "react";
import diceImg from "../../images/other/dice-icon.png";
import './controlPanel.css'

export const ControlPanel = ({player}) => {
  const [displayControlPanel, setDisplayControlPanel] = useState(true)

  return (
    <div className="ControlPanel-container">
      <div className="cpStatus">
        <p>Status: ...</p>
      </div>
      <div className="cpSavedCards"><p>Saved Cards</p></div>
      <div className="cpMoney">
        <p>Money</p>
        <p>£{player && player.money}</p>
      </div>
      <div className="cpRollDice">
        <img src={diceImg} alt="dice"/>
      </div>
    </div>
  )
};

export default ControlPanel
