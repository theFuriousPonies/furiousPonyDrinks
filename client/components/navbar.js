import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%'
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
})

class Navbar extends Component {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { classes } = this.props
    const { anchorEl } = this.state

    return (
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="contrast"
            aria-owns={anchorEl ? 'navbar' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="navbar"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>
              <Link to="/drinks/">Drinks</Link>
            </MenuItem>
            <MenuItem onClick={this.handleClose}>
              <Link to="/brands">Brands</Link>
            </MenuItem>
            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
          </Menu>
          {/* </MenuIcon> */}
          <Typography className={classes.flex} type="title" color="inherit">
            <Link to="/">Furious Pony Drinks</Link>
          </Typography>
          <div>
            <IconButton color="contrast" onClick={this.props.login}>
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Navbar)
