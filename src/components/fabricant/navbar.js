import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Car from './../../assets/logoWhite.svg'
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {getModelesList} from "./../../actions/modeleActions/getModelesList";
import { Link } from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import classNames from 'classnames';

const drawerWidth = 240;
const styles = theme => ({
    root: {
        display: 'flex',
    },
    grow: {
        flexGrow: 1,
        marginLeft:'24%'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
  //  icon:{
    //    marginTop:10
   // },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginLeft: 12,
        marginRight: 36,
      },
      hide: {
        display: 'none',
      },
      icon: {
        height: 35,
        width: 35,
    },
    toolbar: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
var request = require('./../../actions/api/service');
class NavBar extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
        value: localStorage.getItem('value'),
    };
    componentDidMount() {
        this.props.dispatch(getModelesList('0'));
    };
    fetchData(){
        this.props.dispatch(getModelesList(this.props.next));
    };
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    handleChange = (event, value) => {
      this.setState({ value });
    };
    handleSignOut = () => {
        this.handleClose();
        localStorage.clear();
        window.location.reload();
    };
    render() {
        const { classes } = this.props;
        const { auth, anchorEl, value } = this.state;
        const open = Boolean(anchorEl);
        return (
                <AppBar position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.props.openMenu,
          })}>
                
                    <Toolbar disableGutters={!this.props.openMenu}>
                        
                        <Tabs value={value} onChange={this.handleChange}>
                          <Tab value="one" label="Dashbord" component={Link} to="/fabricant/dashbord" onClick={this.menuDashbord} />
                          <Tab value="two" label="Gestion" component={Link} to="/fabricant/gestion/modele" />
                          <Tab value="three" label="Stock" component={Link} to="/fabricant/stock" />
                          <Tab value="four" label="Simulation" to="/fabricant/simulation" />
                          <Tab value="five" label="Commande" component={Link} to="/fabricant/commande" />
                        </Tabs>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                        {/*  <Car className={classes.icon} /> Sayara */}    
                        </Typography>     

                        {auth && (
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleClose}>Mon Compte</MenuItem>
                                    <MenuItem onClick={this.handleSignOut}>Déconnecter</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
        );
    }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  et:PropTypes.number
};

function mapStateToProps(state) {
  return {
    versions : state.versionReducer.versions,
    modeles : state.gestionReducer.modeles
  };
}

function matchDispatchToProps(dispatch) {
  let actions =  bindActionCreators({
      
  });
  return { ...actions, dispatch };
}

export default connect(
  mapStateToProps,matchDispatchToProps
)(withStyles(styles)(NavBar));
