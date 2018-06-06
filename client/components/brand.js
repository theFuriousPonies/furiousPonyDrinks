import React from 'react'
import { connect } from 'react-redux'
import DrinkProfile from './drinkProfile.jsx'

const Brand = props => {
  if (props.brands.length) {
    let brand = props.brands.find(item => {
      if (item.id === +props.match.params.id) {
        return item
      }
    })
    console.log(brand)
    return (
      <div>
        <img src={brand.imageUrl} />
        <h2>{brand.name}</h2>
        <br />
        {brand.description}
        {brand.drinks.map(drink => {
          return (
            <DrinkProfile drink={drink} key={drink.id} />
          )
        })}
      </div>
    )
  } else {
    return <div>Nothing</div>
  }
}
const mapStateToProps = ({ brands }) => ({
  brands
})

export default connect(mapStateToProps)(Brand)
