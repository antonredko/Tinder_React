// import { createContext, useContext } from "react";
import { db } from "./firebase";

// const DBContext = createContext();

// export function ProvideDB({ children }) {
//     const DB = useProvideDB()
//     return <DBContext.Provider value={DB}></DBContext.Provider>
// }

// export const useDB = () => {
//     return useContextDBContext()
// }

// function useProvideDB() {
//     const [error, setError] = useState(initialState)
// }

export function createUser(userData) {
    db.collection("users").doc(userData.uid).set(userData)
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });    
}