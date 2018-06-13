// import React, { Component } from 'react'
// import { connect } from 'react-redux'

// class EditDrink extends Component {
//   // handleChange = event => {
//   //   this.setState({[event.target.drink]: event.target.value})
//   // }

//   form = formName => {
//     return (
//       <>
//         <label>{formName}</label>
//         <input
//           name={formName}
//           type="text"
//           value={name}
//           onChange={this.handleChange}
//         />
//       </>
//     )
//   }

//   render() {
//     const drinks = this.props.drinks
//     return (
//       <div>
//         Editing
//         <form onSubmit={this.handleSubmit}>
//           {this.form(drinks.name)}
//           {this.form(drinks.flavor)}
//           {this.form(drinks.price)}
//           <label>description</label>
//           <textarea name="description" value={name} onChange={this.handleChange}></textarea>
//           {this.form(drinks.size)}
//           {this.form(drinks.tag)}
//           {this.form(drinks.description)}
//           {this.form(drinks.imageUrl)}
//           {this.form(drinks.inventory)}
//           {this.form(drinks.packageSize)}
//           {this.form(drinks.brandId)}
//           <button type="submit">
//             Submit Changes
//           </button>
//         </form>
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => {
//   return
// }

// export default connect(mapStateToProps, null)(EditDrink)
