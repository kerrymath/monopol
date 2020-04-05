import React, { useState } from "react";
import uniqid from 'uniqid';
import store from 'store2';
import socket from "../../service/Socket/Socket"
import './form.css'

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

export const JoinForm = ({returnPlayer}) => {
  const [name, setName] = useState("");
  const [firstInital, setFirstInital] = useState("");
  const [lastInital, setLastInital] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  
  const handleChange = (e) => {
    const target = e.target;

    if (target.name == "name") setName(target.value);
    if (target.name == "firstInital") setFirstInital(target.value);
    if (target.name == "lastInital") setLastInital(target.value);

  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if(!name || !firstInital || !lastInital) setErrorMsg('You missed a couple field(s) 😅. Please fill them out.')
    else {
      // create player
      const player = defaultPlayer;

      // random id
      const id = uniqid();

      // set offset
      // set position

      player.id = id
      player.name = name
      player.initials = {firstInital, lastInital}

      returnPlayer(player)
      console.log('player', player)

      // save player to local storage
      store('mono-player', player)

      //emit players array
      socket.emit('player', player);

      // reset form values
      setErrorMsg('')
      setName('')
      setFirstInital('')
      setLastInital('')


    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={(e) => handleSubmit(e)}>
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
        <button type="submit">Join Game</button>
      </form>
    </div>
  );
};

export default { JoinForm };
