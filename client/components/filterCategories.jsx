import React, { Component } from 'react'
import { connect } from 'react-redux'

class FilterByCategory extends Component {
  handleSubmit = () => {
    return 'hello'
  }
  render() {
    const { categories } = this.props
    return (
      this.props && (
        <div>
          <ul>
            {categories.map(category => (
              <li key={category.id}>{category.name}</li>
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
