import { db } from "./firebase";

export function createUser(userData) {
    db.collection("users").doc(userData.uid).set(userData)
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });    
}