"use client"

import { useEffect, useState } from "react";
import axios from 'axios'
import { UserDetailContext } from "@/context/UserDetailContext";

function Provider({children}:any){
    const [userDetails,setUserDetails] = useState();

    useEffect(()=>{
        createNewUser();
    },[])

    const createNewUser = async ()=>{
        const result = await axios.post('/api/user',{});
        setUserDetails(result?.data);
    }
    return(

        <UserDetailContext.Provider value={{userDetails,setUserDetails}}>
            <div>{children}</div>
        </UserDetailContext.Provider>

    )
}

export default Provider