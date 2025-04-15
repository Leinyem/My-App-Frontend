import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

const AuthContextWrapper = ({children})=> {
const [currentUser, setCurrentUser] = useState(null);
const [isLoading, setIsLoading] = useState(true);
const [isLoggedIn, setIsLoggedIn] = useState(false);

const nav = useNavigate()
//first GRAB TOKEN from LS and VERIFY
const authenticateUser = async () => {

const tokenFromLocalStorage = localStorage.getItem('authToken');
if(!tokenFromLocalStorage){

    setCurrentUser(null)
    setIsLoading(false)
    setIsLoggedIn(false)

} else{

    try{
        const responseFromVerifyRoute = await axios.get(`${import.meta.env.VITE_API_URL}/auth/verify`, {

            headers:{
              authorization: `Bearer ${tokenFromLocalStorage}`
            }
});

console.log ("authenticate user function", responseFromVerifyRoute);

setCurrentUser(responseFromVerifyRoute.data.payload)
setIsLoading(false)
setIsLoggedIn(true)

}catch (error) {
  
    console.log(error);
    setCurrentUser(null)
    setIsLoading(false)
    setIsLoggedIn(false)

    }
 }
};

//make useEFFECT so verify every reloadi of page
useEffect(() =>{

    authenticateUser()
}, []);

//LOGOUT user deleting token
function handleLogout(){

    localStorage.removeItem('authToken');

    authenticateUser()

    nav('/logIn')
}

return <AuthContext.Provider value={{currentUser, isLoading, isLoggedIn, authenticateUser, handleLogout }}>{children}</AuthContext.Provider>
};

export {AuthContext, AuthContextWrapper}