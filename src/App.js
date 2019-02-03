import React, { useState, Fragment } from 'react'
import PlusInput from './PlusInput'
import './App.css'

function Phone({ onChange, id, value }) {
  return (
    <Fragment>
      {/* TODO: id's are currently index numbers */}
      <label htmlFor={id}>Phone {id}:</label>
      <input id={id} value={value} type="tel" onChange={onChange} />
    </Fragment>
  )
}

function App() {
  // some numbers already filled, e.g. from backend
  const [phoneNumbers, setPhoneNumbers] = useState([
    '0681824931',
    '06123456789'
  ])

  const updatePhoneNumber = (index, updatedNumber) => {
    console.log(index, updatedNumber)
    setPhoneNumbers(
      phoneNumbers.map((old, i) => (index === i ? updatedNumber : old))
    )
  }

  const addPhoneNumber = newNumber => {
    setPhoneNumbers([...phoneNumbers, newNumber])
  }

  return (
    <div className="App">
      <form
        className="App-header"
        onSubmit={e => {
          e.preventDefault()
          console.log('submitting', phoneNumbers)
        }}
      >
        {/* ---implementation--- */}
        <PlusInput maxPlus={5} values={phoneNumbers} onAdd={addPhoneNumber}>
          <Phone id="Phone" onChange={updatePhoneNumber} />
        </PlusInput>
        {/* ---implementation--- */}
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default App
