import React, { useEffect, useState } from "react";
import diceImg from "../../images/other/dice-icon.png";
import generateRandomNumber from "../../utils/generateRandomNumber"
import './controlPanel.css'

const DiceRoll = ({diceNumbers, close})=> {
  const [dice1, setDice1] = useState('ani');
  const [dice2, setDice2] = useState('ani');

  useEffect(() => {
    setTimeout(() => {
      setDice1(`d${diceNumbers[0]}`)
      setDice2(`d${diceNumbers[1]}`)
    }, 500);
  
    setTimeout(() => {
      close(false)
    }, 3000);
  })



  return (
    <div className="DiceRoll">
      <div className={`dice ${dice1}`}/>
      <div className={`dice ${dice2}`}/>
    </div>
  )
}

export const ControlPanel = ({player, handleDiceClick}) => {
  const [displayDiceRoll, setDisplayDiceRoll] = useState(false)
  const [diceNumbers, setDiceNumbers] = useState([])

  const handleClick = ()=> {
    const d1 = generateRandomNumber(6)+1
    const d2 = generateRandomNumber(6)+1

    setDiceNumbers([d1,d2])
    setDisplayDiceRoll(true)
    handleDiceClick(d1,d2)
  }

  return (
    <div>
      <div className="ControlPanel-container">
        <div className="cpStatus">
          <p>Status: ...</p>
        </div>
        <div className="cpSavedCards"><p>Saved Cards</p></div>
        <div className="cpMoney">
          <p>Money</p>
          <p>£{player && player.money}</p>
        </div>
        <div className="cpRollDice" onClick={()=> handleClick()}>
          <img src={diceImg} alt="dice"/>
        </div>
      </div>
      {displayDiceRoll && 
        <DiceRoll 
          diceNumbers={diceNumbers} 
          close={setDisplayDiceRoll} />}
    </div>
  )
};

export default ControlPanel
