import React, {useEffect, useState} from 'react';
import "../styles/register.scss";
import Axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Video from "../assets/leaves.mp4";
import Logo from "../assets/logo.png";
import {FaUserShield} from "react-icons/fa";
import {BsFillShieldLockFill} from "react-icons/bs";
import {AiOutlineSwapRight} from "react-icons/ai";
import {MdMarkEmailRead} from "react-icons/md";

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");
    const [statusHolder, setStatusHolder] = useState("");
    const navigateTo = useNavigate();

    const register = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/register", {
            email: email,
            username: username,
            password: password,
        }).then((response) => {
            // setRegisterStatus(response);
            // console.log(response);
            if(response.data.message){
                setRegisterStatus(response.data.message);
            }else{
                setRegisterStatus("Felhasználó létrehozva");
                navigateTo("/")
            }
        })
    }

    useEffect(()=>{
        if (registerStatus !== ""){
            setStatusHolder("show-message")
            setTimeout(()=>{
                setStatusHolder("message")
            },4000)
        }
    },[registerStatus])


    return (
        <div className="register__container flex">
            <div className="container flex">

                <div className="video__container">
                    <video src={Video} autoPlay muted loop></video>

                    <div className="text__container">
                        <h2 className="title"> Vásároljon rendkívüli termékeket! </h2>
                        <p> Fogadja el a természet békéjét! </p>
                    </div>

                    <div className="footer__container flex">
                        <span className="text"> Van már fiókja? </span>
                        <Link to="/"><button className="btn"> Lépjen be </button></Link>
                    </div>
                </div>

                <div className="form__container flex">
                    <div className="header">
                        <img src={Logo} alt="logo"/>
                        <h3> Segítsen, hogy megismerhessük! </h3>
                    </div>

                    <form className="form grid">
                        <span className={statusHolder}> {registerStatus} </span>

                        <div className="input__container">
                            <label htmlFor="email"> Email </label>

                            <div className="input flex">
                                <MdMarkEmailRead className="icon"/>
                                <input type="email" id="email" placeholder="Email" onChange={(e) =>
                                {setEmail(e.target.value)}} required/>
                            </div>
                        </div>

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

                        <button type="submit" className="btn flex" onClick={register}>
                            <span> Regisztrálás </span>
                            <AiOutlineSwapRight className="icon"/>
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Register;