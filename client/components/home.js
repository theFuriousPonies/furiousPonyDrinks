import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Home = () => {
  return (
    <body>
      <div className="section no-pad-bot" id="index-banner">
        <div className="container">
          <br/><br/>
            <h1 className="header center teal-text">Drinks, Pony Style</h1>
            <div className="row center">
              <h5 className="header col s12 light">Check out our selections!</h5>
            </div>
            <div className="row center">
              <a href="/drinks" id="drinks-button" className="btn-large waves-effect waves-light orange pulse">Drinks</a>
            </div>
            <div className="row center">
              <a href="/login" id="login-button" className="btn-small waves-effect waves-light orange">Login</a>
            </div>
          <br/><br/>
        </div>
      </div>
    </body>
        //     {/* <h3>Welcome, To Furious Pony Drinks</h3>
        // <h3>We sell Drinks that are as Furious as Ponies!!</h3>
        // <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLsRXJqV6QPRlDxwdwZUAn4MSi7JvIxP0cyyaNOuvRQx8ibd_3" /> */}


            )
          }

export default Home
