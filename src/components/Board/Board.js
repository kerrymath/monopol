import React, { useState } from "react";
import boardProperties from "../../constants/BoardProperties"
import './Board.css'

const Property = ({property, colour, type})=> {
  const {id, title, price, position, image} = property;
  const displayColour = type === "property"? true : false;
  // const displayImg = image == "utility"? true : false;

  return (
    <div className="Board-prop property" style={position} data-id={id}>
      {displayColour && <div className={`colour ${colour}`}/>}
      <div className="content">
        <p className="title">{title}</p>
        {image && <img className="property-img" src={image}/>}
        <p className="price">{price}</p>
      </div>
    </div>
  )
}

const Corner = ({property})=> {
  const {id, position, title, image} = property;

  return (
    <div className="Board-prop corner" style={position} data-id={id}>
      <div className="content">
        {/* <p className="title">{title}</p> */}
        <img className="corner-img" src={image}/>
      </div>
    </div>
  )
}

const MiddleCards = ({property, handleCardClick})=> {
  const {id, position, image} = property;
  const card = {type: 'middle', id}

  return (
    <div className="Board-prop middle" style={position} data-id={id} onClick={()=>handleCardClick(card)}>
      <div className="content">
        <img className="corner-img" src={image}/>
      </div>
    </div>
  )
}

const Board = ({handleCardClick})=> {
  
  return (
    <div className="BoardContainer">
      {
        boardProperties.map(prop => {
          if(prop.type == 'middleCard') {
            return prop.properties.map(item=> {
              return <MiddleCards handleCardClick={handleCardClick} property={item}/>
            })
          }
          else if(prop.type == 'corner') {
            return prop.properties.map(item=> {
              return <Corner handleCardClick={handleCardClick} property={item}/>
            })
          }
          else {
            return prop.properties.map(item=> {
              return <Property handleCardClick={handleCardClick} property={item} colour={prop.colour} type={prop.type}/>
            })
          }
        })
      }

    </div>
  )
}

export default Board