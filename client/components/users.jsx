import React, { Component } from 'react'
import { connect } from 'react-redux'
import DrinkProfile from './drinkProfile.jsx'
import FilterByCategory from './filterCategories.jsx'
import Bubbles from './bubbles.jsx'
import UserProfile from './userProfile.jsx'

const Users = props => {
  return (
    <div>
      {props.users.length &&
        props.users.map(user => <UserProfile key={user.id} user={user} />)}
    </div>
  )
}

const mapStateToProps = state => ({
  users: state.users
})

export default connect(
  mapStateToProps,
  null
)(Users)
