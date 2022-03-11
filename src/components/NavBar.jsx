import React, { useState } from "react";
import { urls } from '../environments/urls';
import { axios } from '../environments/AXIOS_CONFIG';
import { saveToLocal } from '../functions/localStorage';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
//import { useAuthState } from 'react-firebase-hooks/auth';
//import  { auth } from "../functions/firebaseAuth";


export const NavBar = () => {
  
    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Technical Test</a>

                    <form className="d-flex">
                        {/* {
                            user ? <div>
                                <p className="text text-info">{user?.displayName}</p>
                                <img src={user?.photoURL} />
                            </div>
                                : null
                        } */}
                    </form>
                </div>
            </nav>
        </>
    );
}