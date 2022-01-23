import firebase from "./index";
import mainFirebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore();

export default db;
export const firestore = mainFirebase.firestore;
