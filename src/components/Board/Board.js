import React from "react";
import boardProperties from "../../constants/BoardProperties"
import Go from "../../images/corners/jail.jpg"
import './Board.css'

const Property = ({property, colour})=> {
  const {title, price, position} = property;


  return (
    <div className="Board-prop property" style={position}>
      <div className={`colour ${colour}`}/>
      <div className="content">
        <p className="title">{title}</p>
        <p className="price">{price}</p>
      </div>
    </div>
  )
}

const Corner = ({property})=> {
  const {position, title, image} = property;

  return (
    <div className="Board-prop corner" style={position}>
      <div className="content">
        {/* <p className="title">{title}</p> */}
        <img className="corner-img" src={image}/>
      </div>
    </div>
  )
}

const Board = ()=> {
  return (
    <div className="BoardContainer">
      {
        boardProperties.map(prop => {
          if(prop.type == 'corner') {
            return prop.properties.map(item=> {
              return <Corner property={item}/>
            })
          }
          if(prop.type == 'property') {
            return prop.properties.map(item=> {
              return <Property property={item} colour={prop.colour}/>
            })
          }
        })
      }

    </div>
  )
}

export default Board