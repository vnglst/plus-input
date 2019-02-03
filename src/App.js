import React, { Component } from 'react'
import Plus from './Plus'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Plus maxPlus={5} idPrefix="Phone-">
            <input />
          </Plus>
        </header>
      </div>
    )
  }
}

export default App
