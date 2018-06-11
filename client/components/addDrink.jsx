import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateDrink } from '../store/drinks'

class AddDrink extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      flavor: '',
      price: 0,
      description: '',
      size: 0,
      tag: {},
      imageUrl: '',
      inventory: 0,
      brandId: 0
    }
  }

  static getDerivedStateFromProps(props) {
    if (props.drinks.length) {
      const drinkEdit = props.drinks.filter(drink => {
        return +props.match.params.id === drink.id
      })[0]
      const {
        name,
        flavor,
        price,
        description,
        size,
        tag,
        imageUrl,
        inventory,
        brandId
      } = drinkEdit
      return {
        name,
        flavor,
        price,
        description,
        size,
        tag,
        imageUrl,
        inventory,
        brandId,
        id: drinkEdit.id
      }
    }
  }

  handleChange = event => {
    console.log(event.target.name)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.updateDrink(this.state)
  }

  render() {
    const {
      name,
      flavor,
      price,
      description,
      size,
      tag,
      imageUrl,
      inventory,
      brandId
    } = this.state

    // for select form
    let brandOptions = []
    let firstBrand = {}
    if (this.props.brands.length) {
      brandOptions = this.props.brands.filter(brand => brand.id !== brandId)
      firstBrand = this.props.brands.filter(brand => brand.id === brandId)[0]
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            name="name"
            onChange={this.handleChange}
          />
          <label>Flavour</label>
          <input
            type="text"
            value={flavor}
            name="flavor"
            onChange={this.handleChange}
          />
          <label>Price</label>
          <input
            type="number"
            value={price}
            name="price"
            onChange={this.handleChange}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            name="description"
            onChange={this.handleChange}
          />
          <label>Size</label>
          <input
            type="number"
            name="size"
            value={size}
            onChange={this.handleChange}
          />
          <label>Image Url</label>
          <input
            type="text"
            name="imageUrl"
            value={imageUrl}
            onChange={this.handleChange}
          />
          <label>Inventory</label>
          <input
            type="number"
            name="inventory"
            value={inventory}
            onChange={this.handleChange}
          />
          {
            <select name="brandId" onChange={this.handleChange}>
              <option value={firstBrand}>
                {firstBrand ? firstBrand.name : ''}
              </option>
              {brandOptions.map(brand => {
                return (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                )
              })}
            </select>
          }

          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  drinks: state.drinks,
  brands: state.brands
})

const mapDispatchToProps = dispatch => ({
  updateDrink: drink => dispatch(updateDrink(drink))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDrink)
