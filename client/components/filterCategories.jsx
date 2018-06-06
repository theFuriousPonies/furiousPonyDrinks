import React, { Component } from 'react'
import { connect } from 'react-redux'

class FilterByCategory extends Component {
  render() {
    const { categories } = this.props
    return (
      this.props && (
        <div className="filter-category-containter">
          <ul>
            {categories.map(category => (
              <li key={category.id}>
                <label>
                  <input
                    type="checkbox"
                    onChange={this.props.handleChange}
                    value={category.id}
                  />
                  {category.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories
})

export default connect(
  mapStateToProps,
  null
)(FilterByCategory)
