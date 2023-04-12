import React, {useEffect, useState} from 'react';
import "../styles/login.scss";
import Axios from "axios";
import {Link} from "react-router-dom";
import Video from "../assets/leaves.mp4";
import Logo from "../assets/logo.png";
import {FaUserShield} from "react-icons/fa";
import {BsFillShieldLockFill} from "react-icons/bs";
import {AiOutlineSwapRight} from "react-icons/ai";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [statusHolder, setStatusHolder] = useState("");

    const login = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/login", {
            username: username,
            password: password,
        }).then((response) => {
            if(response.data.message){
                setLoginStatus(response.data.message);
            }else{
                setLoginStatus(response.data[0].email);
            }
        })
    }

    useEffect(()=>{
        if (loginStatus !== ""){
            setStatusHolder("show-message")
            setTimeout(()=>{
                setStatusHolder("message")
            },4000)
        }
    },[loginStatus])


    return (
       <div className="login__container flex">
           <div className="container flex">
               <div className="video__container">
                   <video src={Video} autoPlay muted loop></video>

                   <div className="text__container">
                       <h2 className="title"> Vásároljon rendkívüli termékeket! </h2>
                       <p> Fogadja el a természet békéjét! </p>
                   </div>

                   <div className="footer__container flex">
                       <span className="text"> Nincs még fiókja? </span>
                       <Link to="/register"><button className="btn"> Regisztráljon </button></Link>
                   </div>
               </div>

               <div className="form__container flex">
                   <div className="header">
                       <img src={Logo} alt="logo"/>
                       <h3> Üdvözlet! </h3>
                   </div>

                   <form className="form grid">
                       <span className={statusHolder}> {loginStatus} </span>
                       
                       <div className="input__container">
                           <label htmlFor="username"> Felhasználónév </label>

                           <div className="input flex">
                               <FaUserShield className="icon"/>
                               <input type="text" id="username" placeholder="Felhasználónév" onChange={(e) =>
                               {setUsername(e.target.value)}} required/>
                           </div>
                       </div>

                       <div className="input__container">
                           <label htmlFor="password"> Jelszó </label>

                           <div className="input flex">
                               <BsFillShieldLockFill className="icon"/>
                               <input type="password" id="password" placeholder="Jelszó" onChange={(e) =>
                               {setPassword(e.target.value)}} required/>
                           </div>
                       </div>

                       <button type="submit" className="btn flex" onClick={login}>
                           <span> Bejelentkezés </span>
                           <AiOutlineSwapRight className="icon"/>
                       </button>
                   </form>
               </div>

           </div>
       </div>
    );
};

export default Login;