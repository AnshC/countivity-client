/* Dashboard Component */
import {useEffect, useState} from 'react';
import axios from 'axios'
import Tilty from 'react-tilty';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSyncAlt, faRocket, faClock, faCalculator, faMedal, faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import LoadingComponent from './loading';

export default function Dashboard(){
    const [Quote, setQuote] = useState("");
    const [TotalActivities, setTA]= useState("");
    const [TotalHours, setHours] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [activityList, setAL] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true)
        axios.get('https://countivityserver.herokuapp.com/auth/check')
        .then((response)=>{
            if(response.data.loginState === false){
                window.location.replace("/")
            }
            getUserData(); 
        })
        getQuote();
        async function getQuote(){
            const quotes = await (await fetch("https://type.fit/api/quotes")).json()
            const arrayLength =  quotes.length;
            setQuote(quotes[Math.floor(Math.random() * arrayLength + 1)].text); 
        }
        // eslint-disable-next-line
    }, [])

    function Logout(){
        axios.get('https://countivityserver.herokuapp.com/signout')
        .then(()=>{
            window.location.replace("/")
        })
    }
    function getUserData(){
        axios.get('https://countivityserver.herokuapp.com/user/data')
        .then((response)=>{
            setTA(response.data.userData.activities);
            setHours(response.data.userData.hours);
            setEmail(response.data.userData.email);
            setUsername(response.data.userData.username);
            getActivities();
        })
        .catch((err)=>{
            console.log(err)
        })
        setAL([])
    }
    function getActivities(){
        axios.get('https://countivityserver.herokuapp.com/activities')
        .then((response)=>{
            const randomArray = [];
            for (var i = 0; i<3; i++){
                const length = response.data.activities.length;
                randomArray.push(response.data.activities[Math.floor(Math.random()*length)])
            }
            setAL(randomArray)
            setLoading(false)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    function clearActivity(name){
        axios.get(`https://countivityserver.herokuapp.com/add/${name}`)
        .then(()=>{
            getUserData();
            getActivities();
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    if(loading === true){
        return(
            <LoadingComponent/>
        )
    }
    return(
        <div className="dashboard">
            <div className="main">
                <div className="tiles">
                    <div className="row">
                        <Tilty className="tile tile1">
                            <div className="head">
                                <FontAwesomeIcon icon={faRocket} className="icon"/>
                                <h1>Total Activities</h1>
                            </div>
                            <div className="stats">
                                {TotalActivities}
                            </div>
                        </Tilty>
                        <Tilty className="tile tile2">
                            <div className="head">
                                <FontAwesomeIcon icon={faClock} className="icon"/>
                                <h1>Total Hours</h1>
                            </div>
                            <div className="stats">
                                {TotalHours}
                            </div>
                        </Tilty>
                    </div>
                    <div className="row">
                    <Tilty className="tile tile3">
                        <div className="head">
                                <FontAwesomeIcon icon={faCalculator} className="icon"/>
                                <h1>Total Score</h1>
                            </div>
                            <div className="stats">
                                {TotalActivities !== 0 || TotalHours !== 0 ? Math.round((TotalActivities / TotalHours)*100 + (10)):0}
                            </div>
                    </Tilty>
                    <Tilty className="tile tile4">
                        <div className="head">
                                <FontAwesomeIcon icon={faMedal} className="icon"/>
                                <h1>World Rank</h1>
                            </div>
                            <div className="stats">
                                TBD
                            </div>
                    </Tilty>
                    </div>
                </div>
                <div className="user">
                    <div className="top">
                        <h1 className="name">@{username}</h1>
                        <h2 className="email">{email}</h2>
                    </div>
                    <div className="bottom">
                        <h1 className="select-activity"><FontAwesomeIcon icon={faRocket} className="icon"/> Select an Activity to do!</h1>
                        <div className="activities">
                            <ul className="activities-list">
                                {activityList.map((activity)=>{
                                    return(
                                        <li className="activity" onClick={()=>{clearActivity(activity.name)}}><FontAwesomeIcon icon={faCheckCircle} className="check-icon"/>{activity.fname}</li>
                                    )
                                })}
                            </ul>
                            <span className="refresh" onClick={getActivities}>
                                <FontAwesomeIcon icon={faSyncAlt} />
                            </span>
                        </div>
                        <div className="line"></div>
                        <div className="quote">
                            <h1>{Quote}</h1>
                        </div>
                        <span className="logout" onClick={Logout}>Logout</span>
                    </div>
                </div>
            </div>
        </div>
    )
}