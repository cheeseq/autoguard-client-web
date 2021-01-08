import FBApp from './firebase';
import "firebase/firestore";

const db = FBApp.firestore();


export {db};