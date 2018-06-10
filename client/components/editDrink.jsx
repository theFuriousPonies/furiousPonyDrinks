import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateDrink } from '../store/drinks'

class EditDrink extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      flavor: '',
      price: NaN,
      description: '',
      size: NaN,
      tag: {},
      imageUrl: '',
      inventory: NaN,
      brandId: NaN
    }
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

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input type="text" value={name} name="name" />
          <label>Flavour</label>
          <input type="text" value={flavor} name="flavor" />
          <label>Price</label>
          <input type="number" value={price} name="price" />
          <label>Description</label>
          <input type="text" value={description} name="description" />
          <label>Size</label>
          <input type="number" name="size" value={size} />
          <label>Image Url</label>
          <input type="text" name="imageUrl" value={imageUrl} />
          <label>Inventory</label>
          <input type="number" name="inventory" value={inventory} />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  drinks: state.drinks
})

const mapDispatchToProps = dispatch => ({
  updateDrink: drink => dispatch(updateDrink(drink))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditDrink)
