import React, { Fragment, useState } from 'react'

export default function Plus({ maxPlus, idPrefix, children }) {
  // every 'plussed' component, get a number as key
  const [keys, setKeys] = useState([0])

  // only 1 component can be 'plussed'
  const comp = React.Children.only(children)

  const add = () => {
    const nextKey = keys[keys.length - 1] + 1
    setKeys([...keys, nextKey])
  }

  const remove = keyToRemove => {
    setKeys(keys.filter(key => key !== keyToRemove))
  }

  const clone = key => {
    return (
      <span key={key}>
        {React.cloneElement(comp, { id: `${idPrefix}${key}` })}
        {/* first component cannot be removed */}
        {key !== 0 && <button onClick={() => remove(key)}>x</button>}
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
