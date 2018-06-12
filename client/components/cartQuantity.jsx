import React, { Component } from 'react'

class CartQuantity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: ''
    }
  }

  onChange = evt => {
    this.setState({[evt.target.name]: evt.target.value})
  }

  render () {
    const { drink, show, optionsArr, handleChange } = this.props
    let drinkOption = false;
    return (
    <div>
    {show === drink.id ? (
      <form id="quantity" onSubmit={event => {
        handleChange(event, drink.id, this.state.quantity)
        this.setState({ quantity: '' })
      }
      }>
      <input name="quantity" type="number" min="0" max={drink.inventory} step="0" value={this.state.quantity} onChange={this.onChange} autoFocus />
      <button type="submit">Update</button>
      </form>
    ) : (
      <select onChange={event => handleChange(event, drink.id)} name="quantity" value={drink.quantity}>
      {optionsArr.map(option => {
        if (option === drink.quantity) drinkOption = true;
        if (option === 10) {
          return <option key={option} value="more">{option}+</option>
        }
        else {
          return <option key={option} value={option}>{option}</option>
        }
      })}
      {drinkOption ? '' : <option key={drink.quantity} value={drink.quantity}>{drink.quantity}</option>}
      </select>
    )}
    </div>
    )
  }
}

export default CartQuantity
