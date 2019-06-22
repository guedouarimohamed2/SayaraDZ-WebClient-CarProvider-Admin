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

//import FieldArraysForm from './FieldArraysForm'
import MediaCard from './cardVersion'
/*import MediaCard2 from './cardModele2'
import MyForm from './FieldArraysForm'
*/

import CircularProgress from '@material-ui/core/CircularProgress';
import {Waypoint} from "react-waypoint";
import CustomizedSnackbars from "./../../../snackBar";


import AddVersion from './../../../../../containers/fabricant/addVersion'
import {getVersionsList} from './../../../../../actions/versionActions/getVersionList'
import {resetUpdateVersion} from "./../../../../../actions/versionActions/resetUpdateVersion";
import {resetDeleteVersion} from "./../../../../../actions/versionActions/resetDeleteVersion";
import ShowVersion from './showVersion'

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

class Versions extends Component {
  constructor(props)
    {
        super(props);
        this.fetchData = this.fetchData.bind(this);
        this.state = {
          open: false,
          nom:'',
          code:'',
          url:'',
          options:[],
          couleurs:[],
          fiche_tech:[]
        };
    }

    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

    test = (code,nom,url,options,couleurs,fich)=>{

    //  let obj = this.props.fiche_tech
        //find(x => x.id === this.state.modele).options
        var result = Object.keys(fich).map(function(key) {
          return  {attr:key ,  val: fich[key]}; 
        });


      this.setState({ open: true });
      this.setState({ code: code });
      this.setState({ nom: nom });
      this.setState({ url: url });
      this.setState({ options: options });
      this.setState({ couleurs: couleurs });    
      this.setState({ fiche_tech: result });    
    };

  _renderItems(){
    console.log(this.props.versions)
    return (
      <Grid container spacing={24}>
          {this.props.versions.map( (version,index) =>
            <Grid item xs={12} md={3} sm={6}>
              
             <MediaCard test={this.test} nom={version.nom} url={version.url} id={version.id} code={version.code} options={version.options} couleurs={version.couleurs} fiche_tech={version.fiche_tech} idModele={version.id_modele} />
             </Grid>
          )}
          <ShowVersion
       open={this.state.open} handleClickOpen={this.handleClickOpen} handleClose={this.handleClose}
       code={this.state.code} nom={this.state.nom} url={this.state.url} 
       options={this.state.options} couleurs={this.state.couleurs} fiche_tech={this.state.fiche_tech}
       />
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
              <h1>{this.props.match.params.nom}</h1>
              <AddVersion id={this.props.match.params.id} />
              {snack}
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

Versions.propTypes = {
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
  )(withStyles(styles)(Versions));