import React from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'


const Cart = (props) => {
  return (
    <div>
      {props}
    </div>
  )
}

export default connect ()(Cart);
