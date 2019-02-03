import React, { Fragment } from 'react'

export default function PlusInput({ maxPlus, values, children }) {
  // only single component can be 'plussed'
  const comp = React.Children.only(children)

  const firstId = comp.props.id
  const updateValue = comp.props.onChange
  // make sure keys always have at least the child component
  const keys = Object.keys(values).length ? Object.keys(values) : [firstId]

  const getNextKey = () => {
    // converts [ Phone: '...', Phone-2: '...', Phone-1: '...' ] to [0, 1, 2]
    const numbers = keys.map(key => Number(key.split('-')[1] || 0)).sort()
    const lastKeyNumber = numbers[numbers.length - 1]
    return `${firstId}-${lastKeyNumber + 1}`
  }

  const add = e => {
    e.preventDefault()
    const nextKey = getNextKey()
    updateValue(nextKey, '')
  }

  const remove = (e, keyToRemove) => {
    e.preventDefault()
    // set value null when removing
    updateValue(keyToRemove, null)
  }

  const handleChange = e => {
    e.preventDefault()
    const { id, value } = e.target
    updateValue(id, value)
  }

  const clone = key => {
    // do not render removed components
    if (values[key] === null) return null

    return (
      <span key={key}>
        {React.cloneElement(comp, {
          onChange: handleChange,
          value: values[key] || '', // controlled inputs cannot be undefined
          id: key
        })}
        {/* first component cannot be removed, don't render remove button */}
        {key !== firstId && <button onClick={e => remove(e, key)}>x</button>}
      </span>
    )
  }

  return (
    <Fragment>
      {keys.map(key => clone(key))}
      {/* don't show Plus button when maximum is reached */}
      {keys.length < maxPlus && <button onClick={add}>+</button>}
    </Fragment>
  )
}
