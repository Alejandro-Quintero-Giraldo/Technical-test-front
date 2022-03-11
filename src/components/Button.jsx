import React from "react";
//import { signingWithGoogle } from '../functions/firebaseAuth';
//import { signOut } from "../functions/firebaseAuth";

export function Button({action}){

    return (
        <>
            <button className="css-button-fully-rounded--green" 
            // onClick={action === 'login' ? signingWithGoogle : signOut }
            >Iniciar sesión
                {/* {action === 'login' ? 'Iniciar sesión' : 'Cerrar sesión'} */}
                </button>
        </>

    );
}