import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from '@material-ui/core/TextField';
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import {putModele} from "./../../../../../actions/modeleActions/putModele";
import {deleteModele} from "./../../../../../actions/modeleActions/deleteModele";
import { allModeles } from "./../../../../../actions/modeleActions/allModeles";
import { getVersionListOfModele } from "./../../../../../actions/versionActions/getVersionListOfModele";
import MyForm from './OptionsForm'
import CouleursForm from './CouleursForm'
import { getFormValues} from 'redux-form'
import AlertDialogSlide from './validateDelete'

const styles =  theme =>  ({

    actions:{
        textAlign:'center',
        display:'inline-block',
    },
    edit:{
        margin: 0,
        paddingBottom: 8
    },
    delete:{
        color:'#ff2b58',
    },
    brand:{
        textAlign:'center',
        display:'inline-block',
        margin:'auto',
        height:120,
        width:120,
        paddingBottom: 40
    },
    title:{
        textAlign:'center',
    },
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
        maxHeight : 200,
        minHeight : 200,
      //  maxWidth : 200,

      },
      button: {
        margin: theme.spacing.unit,
      },
      cardLeft:{
        width : 1500,
    //    marginLeft : -theme.spacing.unit * 50,
      },
      cardRight:{
        width : 1500,
        marginRight : -theme.spacing.unit * 50,
      },
      chip: {
        marginRight: theme.spacing.unit * 20,
      },
      chip2: {
        marginRight: theme.spacing.unit * 15,
      },
      cardaction: {
        
      },
});

class MediaCard extends Component {
    constructor(props)
    {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            open: false,
            snack:null,
            initialValues: null,
            initialValuesCouleurs: null,
            file:null,
        };
        this.input1 = React.createRef();
    }
    componentDidMount() {
        this.setState({ nom: this.props.nom });
        this.setState({ url: this.props.url });
        this.setState({ code: this.props.code }); 
    //    this.setState({ initialValues: {'options':[{'code':'Axl Rose', 'nom':'Brian Johnson'}]} });
        this.setState({ initialValues: {'options':this.props.options }})
        this.setState({ initialValuesCouleurs: {'couleurs':this.props.couleurs }})      
    };
    handleName= (e) =>{
        this.setState({ nom: e.target.value });
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
    handleoptions= (e) =>{
        this.setState({ initialValues: {'options':this.props.newoptions.options } });
        this.setState({ initialValuesCouleurs: {'couleurs':this.props.newCouleurs.couleurs }})  
    };
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleDelete(){
        this.props.dispatch(deleteModele(this.props.id));
        setTimeout(()=>{
          this.props.dispatch(allModeles());
        },5000);
        this.handleClose();
    };
    test = () => {
      this.props.dispatch(getVersionListOfModele(0,this.props.id));
  };

    handleUpdate(){

      this.handleoptions()
      let newoptions=this.props.newoptions
      let newCouleurs=this.props.newCouleurs
      this.input1.current.value = '';
      let fb = this.props.firebase;
      console.log(this.state.file)
      if(this.state.file != null)
       {
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
                          if(newoptions==undefined){
                              this.props.dispatch(putModele(this.props.id,this.state.nom,this.state.code,this.state.url,[],[]));
                          }else{
                              this.props.dispatch(putModele(this.props.id,this.state.nom,this.state.code,this.state.url,newoptions.options,newCouleurs.couleurs));
                          
                          }
                          setTimeout(()=>{
                            this.props.dispatch(allModeles());
                          },5000);

                      })
              });
       }else{
          if(this.props.newoptions==undefined){
              this.props.dispatch(putModele(this.props.id,this.state.nom,this.state.code,this.state.url,[],[]));
          }else{
              this.props.dispatch(putModele(this.props.id,this.state.nom,this.state.code,this.state.url,this.props.newoptions.options,this.props.newCouleurs.couleurs));
          
          }
       }
      this.handleClose();
  }

    render() {
        const { classes } = this.props;
        
          
        return (
            
            <Card className={classes.card}>
            
              <CardActionArea className={classes.cardaction} >
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  className={classes.media}
                  image={this.props.url}
                  title="Contemplative Reptile"
                  onClick={this.props.test.bind(this,this.props.code,this.props.nom,this.props.url,this.props.options,this.props.couleurs)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                  {this.props.nom}
                  </Typography>
                  <Typography component="p">
                    
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button component={Link} to={"/fabricant/gestion/versions/"+this.props.id+"/"+this.props.nom} onClick={this.test} size="small" variant="contained" color="secondary" className={classes.button}>
                   versions
                </Button>
                <Button size="small" variant="contained" color="secondary" className={classes.button} onClick={this.handleClickOpen}>
                   Modifier
                </Button>
                <AlertDialogSlide nom={this.props.nom} handleDelete={this.handleDelete} btn={0} />
              </CardActions>


              <Dialog
                        PaperProps={{ style: { maxWidth: 'none' } }}
                        className={classes.cardLeft}
                        open={this.state.open}
                        onClose={this.handleCloseA}
                        aria-labelledby="fo"     
                    >
                        <h2 style={styles.title}>Modifier Le modele {this.props.nom}</h2>

                        {/*<img src={this.props.url} alt="brand" style={styles.brand} height="200"/>*/}

                        <DialogContent>
                            <DialogContentText>
                                Veuillez modifier les information que vous voulez
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                
                                label="Name"
                                fullWidth
                                onChange={ this.handleName }
                                defaultValue={this.props.nom}
                            /><br />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="code"
                                
                                label="Code"
                                fullWidth
                                onChange={ this.handleCode }
                                defaultValue={this.props.code}
                            />
                            
                            <br/>
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
            <MyForm initialValues={this.state.initialValues}/>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
        <Chip
          avatar={<Avatar>Rq</Avatar>}
          label="Chaque option a un code d'option et le nom de l'option"
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
            <CouleursForm initialValues={this.state.initialValuesCouleurs} />
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
        <Chip
          avatar={<Avatar>Rq</Avatar>}
          label="Chaque Couleur a un code de couleur et le nom de la couleur"
          clickable
          className={classes.chip2}
          color="primary"
          // onDelete={handleDelete}
          variant="outlined"
        />
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div> 
                        </DialogContent>             
                        <DialogActions style={styles.actions}>
                            <Button onClick={this.handleClose} color="default">
                                Cancel
                            </Button>
                            <AlertDialogSlide handleDelete={this.handleDelete} btn={1} />
                            <Button onClick={this.handleUpdate} color="primary">
                                Modifier
                            </Button>
                        </DialogActions>
                    </Dialog>
            </Card>
        );
    }
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
function mapStateToProps(state) {
    return {
        err : state.gestionReducer.error,
        loading : state.gestionReducer.loading,
        update : state.gestionReducer.update,
        delete : state.gestionReducer.delete,
        newoptions: getFormValues('MyForm')(state),
        newCouleurs: getFormValues('CouleursForm')(state),
    };
}
function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
        putModele,deleteModele,allModeles,getVersionListOfModele
    });
    return { ...actions, dispatch };
}

export default connect(
    mapStateToProps,matchDispatchToProps
)(withStyles(styles)(MediaCard));