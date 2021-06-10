import { useContext, createContext, useState } from "react";
import { db } from "./firebase";

const DbContext = createContext();
export const useDb = () => useContext(DbContext);
export default function DbProvider({ children }) {
  const db = useDbProvider();
  return <DbContext.Provider value={db}>{children}</DbContext.Provider>
}

function useDbProvider() {
  const [error, setError] = useState(null)
  const [userData, setUserData] = useState(null)

  const createUser = (data) => {
    return db
      .collection("users")
      .doc(data.uid)
      .set(data)
      .then(() => {
        console.log("Document successfully written!");

        
        setError(null)
      })
      .catch((error) => {
        console.error("Error writing document: ", error);

        setError(error)
      });
  };

  const getUser = (data) => {
    return db
      .collection("users")
      .doc(data.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log("Document data:", doc.data());

          setUserData(doc.data())
        } else {
          console.log("No such document!");
        }

        setError(null)
      })
      .catch((error) => {
        console.log("Error getting document:", error);

        setError(error)
      });
  };

  const deleteUser = (data) => {
    return db
      .collection("users")
      .doc(data.uid)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");

        setError(null)
      })
      .catch((error) => {
        console.error("Error removing document: ", error);

        setError(error)
      });
  };

  return {
    error,
    userData,
    createUser,
    getUser,
    deleteUser
  };
}
