import React from 'react'

import { Navbar } from './components'
import Routes from './routes'
import Bubbles from './components/bubbles.jsx'

const App = () => {
  return (
    <div id="hello">
      <Navbar />
      <Bubbles />
      <Routes />
      <footer class="page-footer">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">Website by the Furious Ponies</h5>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
            © 2018 Fullstack Academy
            <a class="grey-text text-lighten-4 right" href="/"><i className="small material-icons">home</i></a>
            </div>
          </div>
        </footer>
    </div>
  )
}

export default App
