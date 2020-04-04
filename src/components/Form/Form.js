import React, { useState } from "react";
import './form.css'

export const JoinForm = ({returnValues}) => {
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
      returnValues({name, firstInital, lastInital})
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
