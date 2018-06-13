import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { getBrands } from '../store/brand'

const Brands = ({ brands, user }) => {
  return (
    <div>
      <h3>Brands</h3>
      {user.isAdmin && (
        <NavLink to="/brands/add">
          <button type="button">Add Brand</button>
        </NavLink>
      )}
      <div className="overflow-scroll">
        {brands &&
          brands.map(brand => (
            <div key={brand.id} className="brand">
              <img src={brand.imageUrl} />
              <NavLink to={`/brands/${brand.id}`}>
                <h2>{brand.name}</h2>
              </NavLink>
            </div>
          ))}
      </div>
      {!brands.length && <div>There are no brands Add SOME!</div>}
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
