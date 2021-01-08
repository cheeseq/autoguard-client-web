import FBApp from './firebase';
import 'firebase/auth';
import * as firebaseui from "firebaseui/dist/npm__ru";
import "firebaseui/dist/firebaseui.css";

const FBAuth = FBApp.auth();
const FBAuthUI = new firebaseui.auth.AuthUI(FBAuth);

export {FBAuth, FBAuthUI};