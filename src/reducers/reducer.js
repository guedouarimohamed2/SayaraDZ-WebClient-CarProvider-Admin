import {combineReducers} from 'redux'
import fireSignIn from './fireSignIn'
import gestionReducer from './gestionReducer'
import versionReducer from './versionReducer'
import marquesListReducer from "./marquesListReducer";
import fabAdminListReducer from "./fabAdminListReducer";
import showDialogReducer from "./showDialogReducer";
import commandesReducer from "./commandesReducer";
import modeleListReducer from "./modeleListReducer";
import versionListReducer from "./versionListReducer";
import optionsColorsReducer from "./optionsColorsReducer";

const AllReducers = combineReducers({
    signInReducer,
    marquesListReducer,
    fabAdminListReducer,
    showDialogReducer,
    gestionReducer,
    versionReducer,
    commandesReducer,
    modeleListReducer,
    versionListReducer,
    optionsColorsReducer
});

export default AllReducers;