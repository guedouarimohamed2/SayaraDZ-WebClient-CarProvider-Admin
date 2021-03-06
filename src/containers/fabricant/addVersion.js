import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import Chip from '@material-ui/core/Chip';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import CustomizedSnackbars from "./../../components/fabricant/snackBar";
import OptionsCheck from "./../../components/fabricant/mains/gestion/gestionVersion/optionsCheck";
import CouleursCheck from "./../../components/fabricant/mains/gestion/gestionVersion/couleursCheck";
import {addVersion} from "./../../actions/versionActions/addVersion";
import {resetAddVersion} from "./../../actions/versionActions/resetAddVersion";
import FichTech from "./../../components/fabricant/mains/gestion/gestionVersion/FichTechForm";
import { getFormValues} from 'redux-form'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import classNames from 'classnames';
import red from '@material-ui/core/colors/red';

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
        width : 1500, 
      },
      chip: {
        marginRight: theme.spacing.unit * 20,
      },
      chip2: {
        marginRight: theme.spacing.unit * 15,
      },
      fab: {
          position: 'fixed',
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

class AddVersion extends React.Component {
    constructor(props) {
        super(props);
        this.childRef=null;
        this.state = {
            open: false,
            name:'',
            url:'',
            code:'',
            options:[],
            couleurs:[],
            optionsChecked:[],
            couleursChecked:[],
            modele:'',
            file: null,
            finish:false,


            openAlert:false,
            messageAlert:""
        };
        this.input1 = React.createRef();
      }
      componentDidMount() {
        this.setState({ options: this.props.modeles.find(x => x.id === this.props.id).options });
        this.setState({ couleurs: this.props.modeles.find(x => x.id === this.props.id).couleurs });
        this.setState({ modele: this.props.id });
      }
    handleClickOpen = () => {
        console.log(this.props.modeles);
        
        this.setState({ open: true });
    };

    handleCloseA = () => {
        this.setState({ open: false });
        this.setState({ name: '' });
        this.setState({ url: '' });
        this.setState({ code: '' });
        this.setState({ file: null });
        this.setState({ optionsChecked: [] });
        this.setState({ couleursChecked: [] });
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

      validateFichTech(fiche_tech){
        let i = 0
        let j = 0
            if(fiche_tech!=undefined){
              for (i = 0; i < fiche_tech.fiche_tech.length; i++){
                if(i < fiche_tech.fiche_tech.length-1){
                  for (j = i+1; j < fiche_tech.fiche_tech.length; j++){
                    if(fiche_tech.fiche_tech[i].attr == fiche_tech.fiche_tech[j].attr){
                      this.setState({ openAlert: true }); 
                      this.setState({ messageAlert: "Dans la fiche technique l'option "+fiche_tech.fiche_tech[i].attr +" est dupliqué au rang" + (i+1) +" et "+(j+1) });        
                      return 0
                    }
                  }
                }
              }
          }
  
      }

    handleAdd = ()=>{
      this.input1.current.value = '';
      let fb = this.props.firebase;
      let fichTech = this.props.fichTech;

      let break1 = 1;
      break1 = this.validateFichTech(fichTech)
      if(break1 == 0){
        return
      }

      if(this.state.file == null){
        this.setState({ openAlert: true }); 
        this.setState({ messageAlert: "vous n'avez pas importer une image" });
        return
      }
      fb.storage().ref()
          .child('/images/versions/' + this.state.file.name)
          .put(this.state.file)
          .then(() => {
              fb.storage().ref()
                  .child('/images/versions/' + this.state.file.name)
                  .getDownloadURL()
                  .then((url) => {
                      this.setState({
                          url,
                          finish:false
                      });
                      if(this.state.modele != ''){
                        if(fichTech === undefined){
                            this.props.dispatch(addVersion(this.state.name,this.state.code,url,this.props.id,this.state.optionsChecked,this.state.couleursChecked,{}));
                        }else{
                            let obj={}
                            if(fichTech.fiche_tech.length > 0){
                                    let i=0;
                                    for(i=0 ; i<fichTech.fiche_tech.length;i++){
                                        obj[fichTech.fiche_tech[i].attr]=fichTech.fiche_tech[i].val;
                                    }
                                }
                            this.props.dispatch(addVersion(this.state.name,this.state.code,url,this.props.id,this.state.optionsChecked,this.state.couleursChecked,obj));
                        }
                        this.handleCloseA();
                    }else{
                        alert("error")
                    }
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

    handleModele= () =>{
        this.child.clearChecked()
        this.child2.clearChecked()
        setTimeout(()=>{this.handleOptions()},1000);
       this.setState({ optionsChecked: [] });
       this.setState({ couleursChecked: [] });
    };

    handleOptionsChecked= (array) =>{
        this.setState({ optionsChecked: array });
    };

    handleCouleursChecked= (array) =>{
        this.setState({ couleursChecked: array });
    };
    
    handleClick = () => {
        this.child.clearChecked()
        this.child2.clearChecked()
    };

    render() {
        const { classes } = this.props;
        let snack = null;
        if (this.props.add){
           if(!this.props.error){
               let msg = "Version " +this.state.name+" est ajouté avec success !\"";
               snack = <CustomizedSnackbars type='success' msg={msg} />
           }
           else {
               snack = <CustomizedSnackbars type='error' msg='Erreur, veuillez resseyer svp !'/>
           }
            this.props.dispatch(resetAddVersion())
        }
        return (
            <div >
                {snack}                
                <Fab  color="secondary" aria-label="Add" onClick={this.handleClickOpen} className={classes.fab} >
                    <AddIcon />
                </Fab>
                <Dialog
                    PaperProps={{ style: { maxWidth: 'none' } }}
                  //  className={classes.hh}
                    open={this.state.open}
               //     onClose={this.handleCloseA}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Ajouter un Version</DialogTitle>
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleAdd}
                        onError={errors => console.log(errors)}
                    >
                    <DialogContent>
                        <DialogContentText>
                            Veuillez introduire le nom du Version ainsi que l'url de sa photo
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
                             <br /><br /><br />
                            <Chip
                            color="primary"
                             label={<h3>choisir les options</h3>} 
                             variant="outlined" />
                            <DialogContent>
                               <OptionsCheck onRef={ref => (this.child = ref)} options={this.props.modeles.find(x => x.id === this.props.id).options} handleOptionsChecked={this.handleOptionsChecked} /> 
                            </DialogContent>
                            <br />
                            <br /><br /><br />
                            <Chip
                            color="primary"
                             label={<h3>choisir les couleurs</h3>} 
                             variant="outlined" />
                            <DialogContent>
                               <CouleursCheck onRef={ref => (this.child2 = ref)} couleurs={this.props.modeles.find(x => x.id === this.props.id).couleurs} handleCouleursChecked={this.handleCouleursChecked} /> 
                            </DialogContent>

                            <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Fiche technique : </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}> declarer les options</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
        
          <div className={clsx(classes.column, classes.helper)}>
             <FichTech />
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
        <Chip
          avatar={<Avatar>Rq</Avatar>}
          label="Chaque option doit avoir un nom du champ et la valeurs du champ"
          clickable
          className={classes.chip}
          color="primary"
          // onDelete={handleDelete}
          variant="outlined"
        />
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>                  
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseA} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
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

AddVersion.propTypes = {
    classes: PropTypes.object.isRequired,
  };

function mapStateToProps(state) {
    return {
        add : state.versionReducer.add,
        error : state.versionReducer.error,
        versions : state.versionReducer.versions, 
        modeles : state.gestionReducer.modeles,  
      //  checked: state.OptionsCheck.checked,     
        fichTech: getFormValues('FichTech')(state)
    };
}
function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
        addVersion
    });
    return { ...actions, dispatch };
}
export default connect(
    mapStateToProps,matchDispatchToProps
)(withStyles(styles)(AddVersion));