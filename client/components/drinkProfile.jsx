import React from 'react'
import { NavLink } from 'react-router-dom'

const drinkProfile = props => {
  const { name, imageUrl, id } = props.drink
  return (
    <div className="drink-profile">
      <NavLink to={`/drinks/${id}`}>
        <h2>{name}</h2>
        <img src={imageUrl} />
      </NavLink>
    </div>
  )
}

export default drinkProfile
