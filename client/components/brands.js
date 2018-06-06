import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getBrands } from '../store/brand'

class Brands extends Component {
  componentDidMount() {
    this.props.getBrands()
  }
  render() {
    const { brands } = this.props.brands
    if (!brands.length) return null
    return (
      <div>
        {brands.map(brand => (
          <div key={brand.id}>
            <img src={brand.imageUrl} />
            <Link to={`/brands/${brand.id}`}>
              <h2>{brand.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({ brands }) => ({
  brands
})

const mapDispatchToProps = {
  getBrands
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Brands)
