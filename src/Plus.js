import React, { Fragment, useState } from 'react'

export default function Plus({ maxPlus, idPrefix, children }) {
  const [elementKeys, setElementKeys] = useState([])

  const element = React.Children.only(children)

  const clone = (key, onRemove) => {
    return (
      <span key={key}>
        {React.cloneElement(element, { id: `${idPrefix}${key}` })}
        <button onClick={() => onRemove(key)}>x</button>
      </span>
    )
  }

  const remove = keyToRemove => {
    setElementKeys(elementKeys.filter(key => key !== keyToRemove))
  }

  const add = () => {
    const nextKey =
      elementKeys.length === 0 ? 1 : elementKeys[elementKeys.length - 1] + 1
    setElementKeys([...elementKeys, nextKey])
  }

  return (
    <Fragment>
      {element}
      {elementKeys.map(key => clone(key, remove))}
      {elementKeys.length < maxPlus ? <button onClick={add}>+</button> : null}
    </Fragment>
  )
}
