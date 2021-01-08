import FBApp from './firebase';
import "firebase/firestore";

const db = FBApp.firestore();

db.enablePersistence().catch(function(err) {
  if (err.code == "failed-precondition") {
    console.log("failed-precondition");
  } else if (err.code == "unimplemented") {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
    console.log("unimplemented");
  }
});

export {db};