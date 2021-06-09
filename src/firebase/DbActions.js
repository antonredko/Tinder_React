import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { db } from "./firebase";

export default function DbActions() {
  const [userData, setUserData] = useState(null);
  const auth = useAuth()

  const createUser = (uData) => {
    return db
      .collection("users")
      .doc(uData.uid)
      .set(uData)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  const getUser = (uData) => {
    return db
      .collection("users")
      .doc(uData.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUserData(doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  const deleteUser = (uData) => {
    return db
      .collection("users")
      .doc(uData.uid)
      .delete()
      .then(() => {
        auth.signout()
        setUserData(null)
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return {
    userData,
    createUser,
    getUser,
    deleteUser
  };
}
