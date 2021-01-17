import FBApp from './firebase';
import "firebase/firestore";
import firebase from "firebase/app";

const db = FBApp.firestore();
const { Timestamp } = firebase.firestore;

export { db, Timestamp };