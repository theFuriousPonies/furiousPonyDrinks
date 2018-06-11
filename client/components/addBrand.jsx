import React, { Component } from 'react'
import { connect } from 'react-redux'
import { newBrand } from '../store/brand'

class AddBrand extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      imageUrl: ''
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit = event => {
    event.preventDefault()

    this.props.newBrand(this.state)
    this.setState({
      name: '',
      description: '',
      imageUrl: ''
    })
  }

  render() {
    const { name, description, imageUrl } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={this.handleChange}
        />
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={this.handleChange}
        />
        <label>Image Url</label>
        <input
          type="text"
          name="imageUrl"
          value={imageUrl}
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  brands: state.brands
})

const mapDispatchToProps = dispatch => ({
  newBrand: brand => dispatch(newBrand(brand))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBrand)
