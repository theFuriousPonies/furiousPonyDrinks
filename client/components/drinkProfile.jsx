import React from 'react'
import { NavLink } from 'react-router-dom'

const drinkProfile = props => {
  const { name, imageUrl, id } = props.drink
  return (
    <NavLink to={`/drinks/${id}`}>
      <h2>{name}</h2>
      <img src={imageUrl} />
    </NavLink>
  )
}

export default drinkProfile
