import React, { Component } from 'react'
import { connect } from 'react-redux'
import DrinkProfile from './drinkProfile.jsx'
import FilterByCategory from './filterCategories.jsx'
import Bubbles from './bubbles.jsx'
import UserProfile from './userProfile.jsx'
import { getUsers } from '../store/users'

class Users extends Component {
  componentDidMount() {
    if (this.props.user && this.props.user.isAdmin) this.props.getAllUsers()
  }
  render() {
    const props = this.props
    return (
      <div>
        {props.users.length &&
          props.user &&
          props.users.map(user => <UserProfile key={user.id} user={user} />)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch(getUsers())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
