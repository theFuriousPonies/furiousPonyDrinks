import React, { Component } from 'react'
import { connect } from 'react-redux'
import DrinkProfile from './drinkProfile.jsx'
import { NavLink } from 'react-router-dom'
import { removeBrand } from '../store/brand'

class SingleBrand extends Component {
  handleDelete = () => {
    this.props.removeBrand(+this.props.match.params.id)
  }

  render() {
    const id = +this.props.match.params.id
    if (this.props.brands.length) {
      let brand = this.props.brands.find(item => {
        if (item.id === id) {
          return item
        }
      })
      const drinks = this.props.drinks.filter(drink => {
        if (drink.brandId === id) {
          return drink
        }
      })
      console.log('brand', brand)
      return (
        <div>
          {brand && (
            <div>
              <img src={brand.imageUrl} />
              <h2>{brand.name}</h2>
              <br />
              {brand.description}
              {drinks.map(drink => {
                return <DrinkProfile drink={drink} key={drink.id} />
              })}
              {this.props.user.isAdmin && (
                <>
                  <NavLink to={`/brands/${id}/edit`}>
                    <button type="button">Edit</button>
                  </NavLink>
                  <button type="button" onClick={this.handleDelete}>
                    Delete Me!
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )
    } else {
      return <div>Nothing</div>
    }
  }
}
const mapStateToProps = ({ brands, drinks, user }) => ({
  brands,
  drinks,
  user
})

const mapDispatchToProps = dispatch => ({
  removeBrand: id => dispatch(removeBrand(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleBrand)
