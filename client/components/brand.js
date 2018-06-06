import React from 'react'
import { connect } from 'react-redux'

const Brand = props => {
  if (props.brands.length) {
    let brand = props.brands.find(item => {
      if (item.id === +props.match.params.id) {
        return item
      }
    })
    return (
      <div>
        <img src={brand.imageUrl} />
        {brand.name}
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
