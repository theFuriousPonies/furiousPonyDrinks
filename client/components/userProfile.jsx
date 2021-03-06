import React from 'react'
import { NavLink } from 'react-router-dom'

const UserProfile = props => {
  const { name, email, isAdmin, id } = props.user
  return (
    <NavLink to={`/users/${id}`}>
      <div>{name}</div>
      <div>{email}</div>
      {isAdmin && <div>Admin</div>}
    </NavLink>
  )
}

export default UserProfile
