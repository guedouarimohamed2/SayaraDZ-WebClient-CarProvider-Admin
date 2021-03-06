import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import Avatar from '@material-ui/core/Avatar';
import CustomizedSnackbars from "./../../components/fabricant/snackBar";
import {addModele} from "./../../actions/modeleActions/addModele";
import {resetAddModele} from "./../../actions/modeleActions/resetAddModele";
import OptionsForm from "./../../components/fabricant/mains/gestion/gestionModele/OptionsForm";
import CouleursForm from "./../../components/fabricant/mains/gestion/gestionModele/CouleursForm";
import { getFormValues} from 'redux-form'
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import zIndex from '@material-ui/core/styles/zIndex';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import classNames from 'classnames';
import red from '@material-ui/core/colors/red';
import Slide from '@material-ui/core/Slide';

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
      hh:{
       // width : 1500,
        
      },
      chip: {
        marginRight: theme.spacing.unit * 20,
      },
      chip2: {
        marginRight: theme.spacing.unit * 15,
      },
      fab: {
        position:'fixed',
        bottom: theme.spacing.unit * 2,
        left:'95%',
        zIndex : '9999 !important'
      },

      margin: {
        margin: theme.spacing.unit,
      },
      cssRoot: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[700],
        '&:hover': {
          backgroundColor: red[900],
        },
      },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AddModele extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name:'',
      url:'',
      code:'',
      file: null,
      finish:false,

      openAlert:false,
      messageAlert:""
    };
    this.input1 = React.createRef();
}

    handleClickOpen = () => {
       this.setState({ open: true });       
    };

    handleCloseA = () => {
        this.setState({ open: false });
        this.setState({ name: '' });
        this.setState({ url: '' });
        this.setState({ code: '' });
        this.setState({ file: null });
    };

    handleClickOpenAlert = () => {
      this.setState({ openAlert: true });       
   };

   handleCloseAlert = () => {
    this.setState({ openAlert: false }); 
   };
   
   

    alertError(message){
      const { classes } = this.props;
      return(
        <Dialog
          open={this.state.openAlert}
          onClose={this.handleCloseAlert}
        >

          <DialogTitle id="alert-dialog-slide-title">
            {"Erreur !"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" className={classNames(classes.margin, classes.cssRoot)} onClick={this.handleCloseAlert}  >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      )
    }


    validateOptions(options){
      let i = 0
      let j = 0
          if(options!=undefined){
            for (i = 0; i < options.options.length; i++){
              if(i < options.options.length-1){
                for (j = i+1; j < options.options.length; j++){
                  if(options.options[i].nom == options.options[j].nom){
                    this.setState({ openAlert: true }); 
                    this.setState({ messageAlert: "le nom d'option :"+options.options[i].nom +" est dupliqué au rang" + (i+1) +" et "+(j+1) }); 
                    return 0
                  }
                }
              }
            }
            for (i = 0; i < options.options.length; i++){
              if(i < options.options.length-1){
                for (j = i+1; j < options.options.length; j++){
                  if(options.options[i].code == options.options[j].code){
                    this.setState({ openAlert: true }); 
                    this.setState({ messageAlert: "le code d'option "+options.options[i].code +" est dupliqué au rang" + (i+1) +" et "+(j+1) });        
                    return 0
                  }
                }
              }
            }
        }

    }

    validateCouleurs(couleurs){
      let i = 0
      let j = 0
          if(couleurs != undefined){
            for (i = 0; i < couleurs.couleurs.length; i++){
              if(i < couleurs.couleurs.length-1){
                for (j = i+1; j < couleurs.couleurs.length; j++){
                  if(couleurs.couleurs[i].nom == couleurs.couleurs[j].nom){
                    this.setState({ openAlert: true }); 
                    this.setState({ messageAlert: "le nom de couleur "+couleurs.couleurs[i].nom +" est dupliqué au rang" + (i+1) +" et "+(j+1) }); 
                    return 0
                  }
                }
              }
            }


            for (i = 0; i < couleurs.couleurs.length; i++){
              if(i < couleurs.couleurs.length-1){
                for (j = i+1; j < couleurs.couleurs.length; j++){
                  if(couleurs.couleurs[i].code == couleurs.couleurs[j].code){
                    this.setState({ openAlert: true }); 
                    this.setState({ messageAlert: "le code de couleur "+couleurs.couleurs[i].code +" est dupliqué au rang" + (i+1) +" et "+(j+1) }); 
                    
                    return 0
                  }
                }
              }
            }

            console.log(couleurs)
            for (i = 0; i < couleurs.couleurs.length; i++){
              if(couleurs.couleurs[i].color == undefined){
                this.setState({ openAlert: true }); 
                this.setState({ messageAlert: "vous devez préciser la couleur du "+couleurs.couleurs[i].nom + " au rang " + (i+1) });
                return 0
              }
            }
        }
    }
    
    handleAdd = ()=>{
      this.input1.current.value = '';
      let fb = this.props.firebase;
      let bool = 0
      let options = this.props.options;
      let couleurs = this.props.couleurs;
      let break1 = 1;
      let break2 = 1;

      break1 = this.validateOptions(options)
      break2 = this.validateCouleurs(couleurs)

      if(break1 == 0 || break2 ==0){
        return
      }

      if(this.state.file == null){
        this.setState({ openAlert: true }); 
        this.setState({ messageAlert: "vous n'avez pas importer une image" });
        return
      }
      fb.storage().ref()
          .child('/images/modeles/' + this.state.file.name)
          .put(this.state.file)
          .then(() => {
              fb.storage().ref()
                  .child('/images/modeles/' + this.state.file.name)
                  .getDownloadURL()
                  .then((url) => {
                      this.setState({
                          url,
                          finish:false
                      });
                      if(options === undefined && couleurs === undefined)
                      {
                        this.props.dispatch(addModele(this.state.name,url,this.state.code,[],[]));
                      }
                      else if(options != undefined && couleurs === undefined)
                      {
                        this.props.dispatch(addModele(this.state.name,url,this.state.code,options.options,[]));
                      }
                      else if(options === undefined && couleurs != undefined)
                      {
                        this.props.dispatch(addModele(this.state.name,url,this.state.code,[],couleurs.couleurs));
                      }else
                      {
                        this.props.dispatch(addModele(this.state.name,url,this.state.code,options.options,couleurs.couleurs));
                      }
                    setTimeout(()=>{
                      this.handleCloseA();
                    },1000);
                  })
          });
          this.setState({ open: false });  
    };
    handleName= (e) =>{
        this.setState({ name: e.target.value });
    };
    handleCode= (e) =>{
        this.setState({ code: e.target.value });
    };
    handleUrl = (e) => {
      if (e.target.files[0]){
          this.setState({
              finish : true,
              file : e.target.files[0]
          });
      }
  };
    render() {
        const { classes } = this.props;
        let snack = null;
        if (this.props.add){
           if(!this.props.error){
               let msg = "Modele " +this.state.name+" est ajouté avec success !\"";
               snack = <CustomizedSnackbars type='success' msg={msg} />
           }
           else {
               snack = <CustomizedSnackbars type='error' msg='Erreur, veuillez resseyer svp !'/>
           }
            this.props.dispatch(resetAddModele())
        }
        return (
            <div >
              
                {snack}
                <Fab  color="secondary" aria-label="Add" onClick={this.handleClickOpen} className={classes.fab}  >
                    <AddIcon />
                </Fab>           
                <Dialog
                PaperProps={{ style: { maxWidth: 'none' } }}
                className={classes.hh}
                    open={this.state.open}
              //      fullWidth={true}
              //      maxWidth = {'md'}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Ajouter un Modele</DialogTitle>
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleAdd}
                        onError={errors => console.log(errors)}
                    >
                    <DialogContent>
                        <DialogContentText>
                            Veuillez introduire le nom du Modele ainsi que l'url de sa photo
                        </DialogContentText>
                        <TextValidator
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            fullWidth
                            value={this.state.name}
                            onChange={this.handleName}
                            validators={['required','matchRegexp:[A-Za-z0-9_*-]']}
                            errorMessages={['Ce champ est obligatoire', 'Vous devez saisir un nom valide']}
                        />
                        <TextValidator
                            margin="dense"
                            id="code"
                            label="Code"
                            fullWidth
                            value={this.state.code}
                            onChange={this.handleCode}
                            validators={['required', 'matchRegexp:[A-Za-z0-9_*-]']}
                            errorMessages={['Ce champ est obligatoire', 'Vous devez saisir un code valide']}
                        />
                        <input
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                            style={{display: 'none'}}
                            onChange={this.handleUrl}
                            ref={this.input1}
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" component="span" style={
                                {
                                    justifyContent: 'center',
                                    marginLeft: '34%',
                                    marginTop: '10%',
                                    padding:5,
                                    backgroundColor: '#3EB741',
                                    color: '#FFF',
                                }
                            }>
                                Upload Photo
                            </Button>
                        </label>
<div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>OPTIONS : </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}> declarer les options</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={clsx(classes.column, classes.helper)}>
              <OptionsForm />
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
        <Chip
          avatar={<Avatar>Rq</Avatar>}
          label="Chaque option doit avoir un code d'option et le nom de l'option"
          clickable
          className={classes.chip}
          color="primary"
          // onDelete={handleDelete}
          variant="outlined"
        />
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>              
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Couleurs : </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}> declarer les couleurs</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={clsx(classes.column, classes.helper)}>
          <CouleursForm />
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
        <Chip
          avatar={<Avatar>Rq</Avatar>}
          label="Chaque Couleur doit avoir un code de couleur et le nom de la couleur"
          clickable
          className={classes.chip2}
          color="primary"
          // onDelete={handleDelete}
          variant="outlined"
        />
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>   
                        <hr />
                    </DialogContent>
                    <DialogActions >
                        <Button onClick={this.handleCloseA} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" >
                            Add
                        </Button>
                    </DialogActions>
                    </ValidatorForm>
                </Dialog>
                {this.alertError(this.state.messageAlert)}
            </div>
        );
    }
}

AddModele.propTypes = {
    classes: PropTypes.object.isRequired,
  };

function mapStateToProps(state) {
    return {
        add : state.gestionReducer.add,
        error : state.gestionReducer.error,
        options: getFormValues('OptionsForm')(state),
        couleurs: getFormValues('CouleursForm')(state),
    };
}
function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
        addModele
    });
    return { ...actions, dispatch };
}
export default connect(
    mapStateToProps,matchDispatchToProps
)(withStyles(styles)(AddModele));
