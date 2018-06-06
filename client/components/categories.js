import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Categories = ({ categories }) => {
  if (categories) {
    return (
      <div>
        {categories.map(category => {
          return (
            <div key={category.id}>
              <NavLink to={`/category/${category.id}`}>
                <h2>{category.name}</h2>
              </NavLink>
            </div>
          )
        })}
      </div>
    )
  } else {
    return <div> Nothing </div>
  }
}

const mapStateToProps = ({ categories }) => ({
  categories
})

export default connect(mapStateToProps)(Categories)
