import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import navbarReducer  from './../../reducers/navbarReducer'
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import DataModele from './../../fichier_json/modele.json'
import DataVersion from './../../fichier_json/version.json'
import DataOption from './../../fichier_json/option.json'

import { BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import { Link } from 'react-router-dom'
const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  btn: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit *0.1,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  btns: {
    marginLeft: '5%',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class NavBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };
 /* getModel = () => {
    console.log(this.props.marques)
    let url = "https://us-central1-sayaradz-75240.cloudfunctions.net/sayaraDzApi/api/v1/marques?next=0&fbclid=IwAR0Vn2F_tAbL-kIIl0sT8OD8l-FqoTes1QaWkcCEGhr6fDow04EcaCIA_i0"
               const requestType = new Request(url, {
                    method: 'GET',
                });
                fetch(requestType)
                    .then(responseType => {
                    if (responseType.status < 200 || responseType.status >= 300) {
                        throw new Error(responseType.statusText);
                    }
                    return responseType.json();
                    })
                    .then((responseType) => {
                     //  console.log(responseType.data) 
                       this.props.dispatch({type : 'SELECT_MARQUES', payload: responseType.data})
                       console.log(this.props.marques)
                      // datas = Array.from(this.props.marques)
                  })
  }
*/

getModel = () => {
  this.props.dispatch({type : 'SELECT_MODELES', payload: DataModele.data})
  let datas = Array.from(DataModele.data)
  return datas
}
getVersion = () => {
  this.props.dispatch({type : 'SELECT_VERSIONS', payload: DataVersion.data})
  let datas = Array.from(DataVersion.data)
  return datas
}
getOption = () => {
  this.props.dispatch({type : 'SELECT_OPTIONS', payload: DataOption.data})
  let datas = Array.from(DataOption.data)
  return datas
}
menuGestionjson = () =>{
  this.getModel();
  this.getVersion();
  this.getOption();
}


  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
              <Link className={classes.btn} color="inherit" to="/fabricant/dashbord" onClick={this.menuDashbord}>Dashbord</Link>
            <div className={classes.btns}>
              <Link className={classes.btn} color="inherit" to="/fabricant/gestion/modele" onClick={this.menuGestionjson}>Gestion</Link>
              <Link className={classes.btn} color="inherit" to="/fabricant/gestion/stock" onClick={this.menuStock}>Stock</Link>
              <Link className={classes.btn} color="inherit" to="/fabricant/gestion/simulation" onClick={this.menuSimulation}>Simulation</Link>
              <Link className={classes.btn} color="inherit" to="/fabricant/gestion/commande" onClick={this.menuCommande}>Commande</Link>    
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  et:PropTypes.number
};

function mapStateToProps(state) {
  return {
    versions : state.gestionReducer.versions,
    modeles : state.gestionReducer.modeles
  };
}

function matchDispatchToProps(dispatch) {
  let actions =  bindActionCreators({
      navbarReducer
  });
  return { ...actions, dispatch };
}

export default connect(
  mapStateToProps,matchDispatchToProps
)(withStyles(styles)(NavBar));