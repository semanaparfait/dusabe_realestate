// import React, { useState,useEffect,useContext } from 'react';
// import {auth} from '@/firebaseConfig';
// import { onAuthStateChanged } from 'firebase/auth';
// const AuthContext = React.createContext();

// export default AuthContext;
// export const useAuth = () => {
//     return useContext(AuthContext);
// };



// export const AuthProvider = ({children}: {children: React.ReactNode}) => {
//     const [currentUser, setCurrentUser] = useState(null);
//     const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
//     const [loading, setLoading] = useState<boolean>(true);
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, initializedUser)
//         return unsubscribe;

//     }, []);

//     async function initializedUser(user: any) {
//         if (user) {
//             setCurrentUser({...user});
//             setUserLoggedIn(true);
//         } else {
//             setCurrentUser(null);
//             setUserLoggedIn(false);
//         }
//         setLoading(false);
//     }

//     const value = {
//         currentUser,
//         userLoggedIn,
//         loading
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     );
// }