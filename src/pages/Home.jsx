import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "../components/Button";
import { NavBar } from "../components/NavBar";
import { http } from '../environments/AXIOS_CONFIG';
import { urls } from '../environments/urls';
import { getFromLocal, saveToLocal } from '../functions/localStorage';
import { auth } from '../functions/firebaseAuth';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Home = () => {
    
    const history = useHistory();
    const [user] = useAuthState(auth);
    const [newUser, setNewUser] = useState({});
    const [typeAction, setTypeAction] = useState();
    const [languaje, setLanguaje] = useState('ESPANOL');
    const [message, setMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [countFind, setCountFind] = useState(0);

    const findUser = () => {
        http.get(urls.findById(user?.uid))
            .then((res) => {
                if (res.data && res.status === 200) {
                    saveToLocal('UID', user?.uid);
                    saveToLocal('PHOTO', user?.photoURL);
                    history.push('/')
                };
            }).catch((error) => {
                createUser();
            })

    }

    const createUser = () => {
        setNewUser({
            id: user?.uid,
            userName: user?.displayName,
            email: user?.email
        })
        http.post(urls.saveUser, newUser).then((res) => {
            if (res.status === 200) {
                saveToLocal('UID', user?.uid);
                saveToLocal('PHOTO', user?.photoURL);
                history.push("/");
            }
        })
    }

    const generateMessage = () => {
            console.log(typeAction, ' ', languaje, ' ', userName, ' ', getFromLocal('UID'),)
            http.get(urls.getMessage(getFromLocal('UID'),userName,typeAction,languaje))
            .then((res) => {
                if(res.status === 200 && res.data){
                    console.log('Pasa al log');
                    setMessage(res.data);
                   
                }
            });
    }

    setTimeout(() => {
        setCountFind(0);
    }, 10000)

    if(typeAction !== undefined && typeAction !== null){
        generateMessage();
       // setTypeAction(null);
    }

    if (user && countFind === 0) {
        findUser();
        setCountFind(countFind+1);
    }


    return (
        <div>
            <NavBar />


            <div className="col-auto">
                <div className="card d-flex flex-column justify-content-around">
                    <div className="card-header d-flex justify-content-center">
                        <p className="title">Prueba técnica</p>
                    </div>
                    <div className="card-body">
                        
                        <div className="container-button">
                            { user ? (<Button action={'signout'} />) : (<Button action={'login'}/>) }
                        </div>

                        <div className="container-button">
                            <label htmlFor="name">Nombre: </label>
                            <input type="text" id="name" name="name" onChange={(e) => {
                                e.preventDefault();
                                setUserName(e.target.value)
                            }} required autoFocus />
                        </div>
                        <div className="container-button">
                            <input type="radio" radioGroup="languaje" onChange={(e) => {
                                setLanguaje(e.target.value);
                            } } value="INGLES" /><p className="languaje">Ingles</p>
                            <input type="radio" radioGroup="languaje" onChange={(e) => setLanguaje(e.target.value)} value="ESPANOL" /><p className="languaje">Español</p>
                        </div>

                        <div className="container-button">
                            <button className="buttons" value="GREET" onClick={(e) => {
                                    setTypeAction(e.target.value);
                                }}>Saludar</button>
                            <button className="buttons" value="NAME" onClick={(e) =>{
                                setTypeAction(e.target.value);
                            } }>Nombre</button>
                            <button className="buttons" value="GOODBYE" onClick={(e) => {
                                setTypeAction(e.target.value);
                            } }>Despedir</button>
                        </div>
                        <div className="container-button">
                            { message }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}