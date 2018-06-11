import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { getBrands } from '../store/brand'

const Brands = ({ brands, user }) => {
  if (!brands.length) return null
  return (
    <div>
      <h3>Brands</h3>
      {user.isAdmin && (
        <NavLink to="/brands/add">
          <button type="button">Add Brand</button>
        </NavLink>
      )}
      {brands.map(brand => (
        <div key={brand.id}>
          <img src={brand.imageUrl} />
          <NavLink to={`/brands/${brand.id}`}>
            <h2>{brand.name}</h2>
          </NavLink>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = ({ brands, user }) => ({
  brands,
  user
})

const mapDispatchToProps = {
  getBrands
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Brands)
