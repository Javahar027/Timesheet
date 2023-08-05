import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext({});

const UserProvider = ({ children }) => {


    
    const [userData,setUserData] = useState(null);

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem("user")));
    },[]) 
   

    return (
        <UserContext.Provider
            value={{userData,setUserData}}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };