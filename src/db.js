import firebase from 'firebase/app';
import 'firebase/firestore';
// Get a Firestore instance
export const db = firebase
  .initializeApp({ projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID })
  .firestore();

db
    .enablePersistence()
    .catch(function(err) {
        if (err.code == 'failed-precondition') {
            console.log('failed-precondition');
        } else if (err.code == 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
            console.log('unimplemented');
        }
    });
  

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore
export { TimeStamp, GeoPoint }

// // if using Firebase JS SDK < 5.8.0
// db.settings({ timestampsInSnapshots: true })