import React from 'react'

const EditRow = props => {
  const { name, description, imageUrl, label } = props
  return (
    <>
      <label>{label}</label>
      <input name={name} type="text" value={name} />
    </>
  )
}
