import React, {Component} from 'react';
import './../../../../../styles/signInInfo.css'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
//import PostData from './testjson'
import SimpleModal from './../../modal'
import versionReducer  from './../../../../../reducers/versionReducer'
import {connect} from 'react-redux';
import {bindActionCreators} from "redux"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import image from './../../../../../images/renault-logo.jpg';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { getFormValues} from 'redux-form'

import SimpleCardVersion from './simpleCardVersion'


import CircularProgress from '@material-ui/core/CircularProgress';
import {Waypoint} from "react-waypoint";
import CustomizedSnackbars from "./../../../snackBar";


import AddVersion from './../../../../../containers/fabricant/addVersion'
import {getVersionsList} from './../../../../../actions/versionActions/getVersionList'
import {resetUpdateVersion} from "./../../../../../actions/versionActions/resetUpdateVersion";
import {resetDeleteVersion} from "./../../../../../actions/versionActions/resetDeleteVersion";


const styles = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 3,
      },
      card: {
        width:'100%',
        maxWidth: 345,
        
      },
      media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
      },
      button: {
        margin: theme.spacing.unit,
      },
});

class Version extends Component {
  constructor(props)
    {
        super(props);
        this.fetchData = this.fetchData.bind(this);
    }
  _renderItems(){
    console.log(this.props.versions)
    return (
      <Grid container spacing={24}>
          {this.props.versions.map( (version,index) =>
            <Grid item xs={12} md={3} sm={6}>
             <SimpleCardVersion nom={version.nom} url={version.url} id={version.id} code={version.code} options={version.options} couleurs={version.couleurs} fiche_tech={version.fiche_tech} idModele={version.id_modele} />
             </Grid>
          )}
       </Grid>
    );
}
fetchData(){
 // this.props.dispatch(getVersionsList(this.props.next));

};
_renderWaypoint(){
  if (this.props.loading){
      return (
          <Waypoint
              onEnter={this.fetchData}
          />
      );
  }
}

    render() {
      
        const { classes } = this.props;
        const datas = this.props.versions;
        let snack = null;
        if (this.props.update){
            if(!this.props.error){
                let msg = "Version " +this.props.nom+" est modifié avec success !\"";
                snack = <CustomizedSnackbars type='success' msg={msg} />
            }
            else {
                snack = <CustomizedSnackbars type='error' msg='Erreur, veuillez resseyer svp !'/>
            }
             this.props.dispatch(resetUpdateVersion())
         }
         if (this.props.delete){
            if(!this.props.error){
                let msg = "Version " +this.props.nom+" est supprimé avec success !\"";
                snack = <CustomizedSnackbars type='success' msg={msg} />
            }
            else {
                snack = <CustomizedSnackbars type='error' msg='Erreur, veuillez resseyer svp !'/>
            }
             this.props.dispatch(resetDeleteVersion())
         }
         let stProgresse = {marginLeft:'45%',marginTop:'15%',height:100,width:100};
        return (

          <Grid item xs={12}>
          <div className={classes.root}>

            <CircularProgress style={this.props.loading ? {display:'none'}  : stProgresse} />
            {
              this._renderItems()
            }<br /><br />
            {this._renderWaypoint()}
        {/*    <CircularProgress style={this.props.next==null||this.props.next===0 ? {display:'none'}  : {marginLeft:'48%'} } />
          */}
          </div>
          </Grid>
        );
    }
}

Version.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  function mapStateToProps(state) {
    return {
      versions : state.versionReducer.versions,
      options : state.versionReducer.options,
      loading : state.versionReducer.loading,
      error : state.versionReducer.error,
      next : state.versionReducer.next,
      update : state.versionReducer.update,
      delete : state.versionReducer.delete,
    //  opts: getFormValues('MyForm')(state)
    };
  }

  function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
      getVersionsList
    });
    return { ...actions, dispatch };
  }
  export default connect(
    mapStateToProps,matchDispatchToProps
  )(withStyles(styles)(Version));