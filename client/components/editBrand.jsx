import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateBrand } from '../store/brand'

class EditBrand extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      imageUrl: ''
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.brands.length) {
      const brandEdit = this.props.brands.filter(brand => {
        return +this.props.match.params.id === brand.id
      })[0]
      console.log(brandEdit)
      const { name, description, imageUrl } = brandEdit
      this.setState({
        name,
        description,
        imageUrl,
        id: this.props.match.params.id
      })
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit = event => {
    event.preventDefault()
    console.log(this.state)
    this.props.updateBrand(this.state)
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
  updateBrand: brand => dispatch(updateBrand(brand))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditBrand)
