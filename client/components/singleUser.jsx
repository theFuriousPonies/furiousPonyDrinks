import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const SingleUser = props => {
  const id = +props.match.params.id
  let user = props.users.filter(userElem => userElem.id === id)[0]
  let name = ''
  let email = ''
  let isAdmin = false
  let addressId = NaN
  user ? ({ name, email, isAdmin, addressId } = user) : (user = false)
  return (
    <div>
      {user && (
        <>
          <div>SingleUser Page</div>
          <div>{name}</div>
          <div>{email}</div>
          {isAdmin && <div>Admin</div>}
        </>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  users: state.users
})

export default connect(
  mapStateToProps,
  null
)(SingleUser)
