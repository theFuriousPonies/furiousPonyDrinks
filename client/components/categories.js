import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Categories = ({ categories }) => {
  if (categories) {
    return (
      <div>
        {categories.map(category => {
          return (
            <div key={category.id}>
              <Link to={`/category/${category.id}`}>
                <h2>{category.name}</h2>
              </Link>
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
