import React from 'react'
import { connect } from 'react-redux'
import DrinkProfile from './drinkProfile.jsx'
import { NavLink } from 'react-router-dom'

const SingleBrand = props => {
  const id = +props.match.params.id
  if (props.brands.length) {
    let brand = props.brands.find(item => {
      if (item.id === id) {
        return item
      }
    })
    const drinks = props.drinks.filter(drink => {
      if (drink.brandId === id) {
        return drink
      }
    })
    return (
      <div>
        <img src={brand.imageUrl} />
        <h2>{brand.name}</h2>
        <br />
        {brand.description}
        {drinks.map(drink => {
          return <DrinkProfile drink={drink} key={drink.id} />
        })}
        {props.user.googleId && (
          <NavLink to={`/brands/${id}/edit`}>
            <button type="button">Edit</button>
          </NavLink>
        )}
      </div>
    )
  } else {
    return <div>Nothing</div>
  }
}
const mapStateToProps = ({ brands, drinks, user }) => ({
  brands,
  drinks,
  user
})

export default connect(mapStateToProps)(SingleBrand)
