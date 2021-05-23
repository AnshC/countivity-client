/* Home Component */
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignInAlt, faPlusCircle, faArrowCircleUp, faHeart} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import LoadingComponent from './loading';

export default function Home(){
    const [UserEmail, setUserEmail] = useState("");
    const [UserPassword, setUserPassword] = useState("");
    const [Loading, setLoading] = useState(false)
    function SignIN(){
        setLoading(true);
        axios.get(`/api/signin/${UserEmail},${UserPassword}`)
        .then((response)=>{
            setLoading(false);
            if (response.data.loginState === true){
                window.location.replace("/dashboard")
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    function SignUP(){
        setLoading(true);
        axios.get(`/api/signup/${UserEmail},${UserPassword}`)
        .then((response)=>{
            console.log(response)
            window.location.replace("/auth/username")
            setLoading(false);
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    if(Loading === true){
        return(
            <LoadingComponent />
        )
    }

    return(
        <div className="home">
            <div className="main">
                <div className="content">
                    <h1 className="head">Coun+ivity</h1>
                    <p className="description">Counting, and connecting you with positive activities everyday!</p>
                    <p>At what cost? Free! It's completely free and motivates you to become a better version of yourself</p>
                    <section className="auth">
                        <label htmlFor="email" id="email_label">Email</label>
                        <input id="email" type="text" className="input" placeholder="you@yourdomain.com" onInput={(e)=>{setUserEmail(e.target.value)}}/>
                        <label htmlFor="pass" id="pass_label">Password</label>
                        <input id="pass" type="password" className="input" placeholder="Something Secret" onInput={(e)=>{setUserPassword(e.target.value)}}/>
                        <div className="buttons">
                            <div className="signupbutton" onClick={SignUP}>Sign Up Today!</div>
                            <div className="signinbutton" onClick={SignIN}><FontAwesomeIcon icon={faSignInAlt} className="icon"/>Sign In</div>
                        </div>
                    </section>
                </div>
                <img src="/img/svg/home3.png" alt="Self Care" className="img"/>
            </div>
            <section className="about">
                    <h2 className="about">How Coun+ivity Works</h2>
                    <div className="xyz">
                        <div className="tiles">
                            <div className="row">
                                <div className="tile">
                                    <FontAwesomeIcon icon={faPlusCircle} className="icon"/>
                                    <h2>Do Positive Activities!</h2>
                                </div>
                                <div className="tile">
                                    <FontAwesomeIcon icon={faArrowCircleUp} className="icon"/>
                                    <h2>Increase your score</h2>
                                </div>
                                <div className="tile">
                                    <FontAwesomeIcon icon={faHeart} className="icon" />
                                    <h2 style={{paddingBottom: '20px'}}>Feel Better.</h2>
                                </div>
                            </div>
                        </div>
                        <p className="description">Once you're all signed up, to get a score, you will need to complete new activities. The score is calculated based off both the Total Activities Completed and the Total Hours done. You can choose through a variety of activities.</p>
                    </div>
            </section>
            <section className="footer">
                <h1>Website by <a href="https://anshc.netlify.app">Ansh C</a></h1>
            </section>
        </div>
    )
}