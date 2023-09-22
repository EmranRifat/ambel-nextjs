import { combineReducers } from "redux";
import auth from "./auth";
import activeUsers from "./activeUsers";
import business from "./business";
import department from "./department";
import emailFormat from "./emailFormat";
import onlineBooking from "./onlinebooking";
import ratings from "./ratings";
import scheduleSettings from "./schedulesettings";
import schedule from "./schedule";
import service from "./service";
import familyOrganization from "./familyOrganization";
import packageMembership from "./packageMembership";
import findProfessional from "./findProfessional";
import task from "./task";
import staff from "./staff";
import practitioner from "./practitioner";
import singleUser from "./singleUser";
import userFamilyOrg from "./userFamilyOrg";
import userReminder from "./userReminder";
import userNotification from "./usernotifications";
import user from "./user";
import wallet from "./wallet";
import tax from "./tax";
import videos from "./videos";
import playlist from "./playlist";
import fines from "./fines";
import { LOGIN_FAIL } from "../actions/types";

const appReducer = combineReducers({
  auth,
  business,
  emailFormat,
  onlineBooking,
  scheduleSettings,
  schedule,
  ratings,
  department,
  service,
  familyOrganization,
  packageMembership,
  findProfessional,
  task,
  staff,
  practitioner,
  singleUser,
  userFamilyOrg,
  userReminder,
  userNotification,
  user,
  wallet,
  tax,
  videos,
  playlist,
  fines,
  activeUsers
});
const rootReducer = (state, action) => {
  if (action.type === LOGIN_FAIL) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
