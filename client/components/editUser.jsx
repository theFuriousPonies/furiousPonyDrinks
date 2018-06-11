import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateDrink } from '../store/drinks'

class EditUser extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      isAdmin: false,
      addressId: NaN
    }
  }

  static getDerivedStateFromProps(props) {
    if (props.users.length) {
      const userEdit = props.users.filter(user => {
        return +props.match.params.id === user.id
      })[0]
      const { name, email, isAdmin, addressId } = userEdit
      return {
        name,
        email,
        isAdmin,
        addressId
      }
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { name, email, isAdmin, addressId } = this.state
    return (
      <div>
        <form onSubmit={this.handleSumbit}>
          <label>Name</label>
          <input
            type="text"
            name={name}
            value={name}
            onChange={this.handleChange}
          />
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <select name="isAdmin" onChange={this.handleChange}>
            <option value="">...</option>
            <option value={false}>False</option>
            <option value={true}>True</option>
          </select>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users
})

export default connect(
  mapStateToProps,
  null
)(EditUser)
