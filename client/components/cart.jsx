import React from 'react'
import { connect } from 'react-redux'

const Cart = props => {
  const drinks = props.order.drinks
  return (
    <div>
      {drinks && (
        <div>
          {drinks.map(drink => {
            return (
              <div key={drink.id}>
                <h3>{drink.name}</h3>
                <h3>{drink.item.quanity}</h3>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = ({ order, user }) => ({
  order,
  user
})

const mapDispatchToProps = dispatch => {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)
