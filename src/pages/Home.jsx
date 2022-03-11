import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "../components/Button";
import { NavBar } from "../components/NavBar";
import { http } from '../environments/AXIOS_CONFIG';
import { urls } from '../environments/urls';
import { getFromLocal, saveToLocal } from '../functions/localStorage';

export const Home = () => {
    
    const history = useHistory();
   // const [user] = useAuthState(auth);
    const [user, setUser] = useState({});
    const [action, setAction] = useState({});
    const [typeAction, setTypeAction] = useState();
    const [languaje, setLanguaje] = useState('ESPANOL');
    const [message, setMessage] = useState('');

    useEffect(() => {
        setUser({
            id: "622a273c3a36a209edd6bf57",
            userName: "Alejandro Quintero Giraldo",
            email:"alejo@mail.com"
        })
        findUser();
    }, [])

    const findUser = () => {
        http.get(urls.findById("622a273c3a36a209edd6bf57"))
            .then((res) => {
                if (res.data) {
                    saveToLocal('UID', "622a273c3a36a209edd6bf57");
                    saveToLocal('PHOTO', "622a273c3a36a209edd6bf57");
                    history.push('/')
                };
            }).catch((error) => {
                createUser();
            })

    }

    const createUser = () => {
        http.post(urls.saveUser, {
            id: user?.uid,
            userName: user?.displayName,
            email: user?.email
        }).then((res) => {
            if (res.status === 200) {
                saveToLocal('UID', user?.uid);
                saveToLocal('PHOTO', user?.photoURL);
                history.push("/");
            }
        })
    }

    const generateMessage = () => {
        setAction({
           
        })
        http.get(urls.getMessage, {
            userId: getFromLocal('UID'),
            userName: "Alejandro Quintero Giraldo",
            languaje: languaje,
            typeAction: typeAction,
            message: ""
        })
        .then((res) => {
                if(res.data){
                    setMessage(res.data);
                }
            })
    }

    // if (user) {
    //     findUser();
    // }


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
                            <Button />
                        </div>

                        <div className="container-button">
                            <label htmlFor="name">Nombre: </label>
                            <input type="text" id="name" name="name" required autoFocus />
                        </div>
                        <div className="container-button">
                            <input type="radio" radioGroup="languaje" onChange={(e) => {
                                setLanguaje(e.target.value);
                            } } value="INGLES" /><p className="languaje">Ingles</p>
                            <input type="radio" radioGroup="languaje" onChange={(e) => setLanguaje(e.target.value)} value="ESPANOL" /><p className="languaje">Español</p>
                        </div>

                        <div className="container-button">
                            <button className="buttons" value="GREET" onClick={(e) => {
                                    setTypeAction(e.target.value)
                                    generateMessage();
                                }}>Saludar</button>
                            <button className="buttons" value="NAME" onClick={(e) =>{
                                setTypeAction(e.target.value);
                                generateMessage();
                            } }>Nombre</button>
                            <button className="buttons" value="GOODBYE" onClick={(e) => {
                                setTypeAction(e.target.value);
                                generateMessage();
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