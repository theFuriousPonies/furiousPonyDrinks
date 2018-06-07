import React, { Component } from 'react'
import { connect } from 'react-redux'

class FilterByCategory extends Component {
  render() {
    const { categories } = this.props
    return (
      this.props && (
        <div className="filter-category-containter">
          <ul>
            <h2>FILTERS</h2>
            <hr />
            {categories.map(category => (
              <li key={category.id}>
                <label>
                  <input
                    type="checkbox"
                    onChange={this.props.handleChange}
                    value={category.id}
                  />
                  <span className="checkmark" />
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
