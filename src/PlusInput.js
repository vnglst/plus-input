import React, { Fragment } from 'react'

export default function PlusInput({ maxPlus, values = [''], onAdd, children }) {
  // only single component can be 'plussed'
  const comp = React.Children.only(children)
  const updateValue = comp.props.onChange

  const add = e => {
    e.preventDefault()
    onAdd('') // add empty new phone number
  }

  const remove = (e, indexToRemove) => {
    e.preventDefault()
    // set value null when removing
    updateValue(indexToRemove, null)
  }

  const handleChange = e => {
    e.preventDefault()
    const { id, value } = e.target
    updateValue(Number(id), value)
  }

  const clone = (value, index) => {
    // do not render removed components
    if (value === null) return null

    return (
      <span key={index}>
        {React.cloneElement(comp, {
          onChange: handleChange,
          value: value || '', // controlled inputs cannot be undefined
          id: index
        })}
        {/* first component cannot be removed, don't render remove button */}
        {index !== 0 && <button onClick={e => remove(e, index)}>x</button>}
      </span>
    )
  }

  return (
    <Fragment>
      {values.map(clone)}
      {/* don't show Plus button when maximum is reached */}
      {values.length < maxPlus && <button onClick={add}>+</button>}
    </Fragment>
  )
}
