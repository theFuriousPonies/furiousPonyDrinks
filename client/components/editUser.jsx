import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateUser } from '../store/users'

class EditUser extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      isAdmin: false,
      addressId: 0,
      address: {}
    }
  }

  static getDerivedStateFromProps(props) {
    if (props.users.length) {
      const userEdit = props.users.filter(user => {
        return +props.match.params.id === user.id
      })[0]
      const { name, email, isAdmin, addressId, address } = userEdit
      return {
        name,
        email,
        isAdmin,
        addressId,
        address
      }
    }
    return null
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSumbit = event => {
    const id = +this.props.match.params.id
    event.preventDefault()
    this.props.updateUser({ ...this.state, id })
  }

  render() {
    // this is so false or true loads correctly
    const isAdminOption = this.props.users.filter(user => {
      return +this.props.match.params.id === user.id
    })[0]
    let option1 = false
    let option2 = false
    let isAdmin

    if (isAdminOption) {
      isAdmin = isAdminOption.isAdmin
      option1 = isAdmin ? 'True' : 'False'
      option2 = isAdmin ? 'False' : 'True'
    }

    const { name, email, addressId, address } = this.state
    return isAdminOption ? (
      <div>
        {console.log(address)}
        <form onSubmit={this.handleSumbit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
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
            <option value={isAdmin}>{option1}</option>
            <option value={!isAdmin}>{option2}</option>
          </select>
          {address ? <div>There is an address </div> : <div>No Address</div>}
          <button type="submit">Submit</button>
        </form>
      </div>
    ) : (
      <div>Loading</div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users
})

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(updateUser(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser)
