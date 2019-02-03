import React, { useState } from 'react'
import PlusInput from './PlusInput'
import './App.css'

function App() {
  // some values already filled, e.g. from backend
  const [values, setValues] = useState({
    Phone: '0681824931',
    'Phone-2': '06123456789'
  })

  const updateValue = (id, value) => {
    setValues({ ...values, [id]: value })
  }

  return (
    <div className="App">
      <form
        className="App-header"
        onSubmit={e => {
          e.preventDefault()
          console.log('submitting', values)
        }}
      >
        <PlusInput maxPlus={5} values={values}>
          <input id="Phone" type="phone" onChange={updateValue} />
        </PlusInput>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default App
