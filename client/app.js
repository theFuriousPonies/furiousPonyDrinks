import React from 'react'

import { Navbar } from './components'
import Routes from './routes'
import Bubbles from './components/bubbles.jsx'

const App = () => {
  return (
    <div id="hello">
      <Navbar />
      <div className="content">
        <Bubbles />
        <Routes />
      </div>
    </div>
  )
}

export default App
