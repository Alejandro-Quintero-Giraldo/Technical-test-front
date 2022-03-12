import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import  { auth } from "../functions/firebaseAuth";


export const NavBar = () => {
  
    const [user] = useAuthState(auth);


    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <p className="navbar-brand" >Technical Test</p>

                    <form className="d-flex">
                         {
                            user ? <div className="d-flex justify-content-between text-center">
                                <p className="username">{user?.displayName}</p>
                                <img className="image" alt="FOTO-CUENTA" src={user?.photoURL} />
                            </div>
                                : null
                        }
                    </form>
                </div>
            </nav>
        </>
    );
}