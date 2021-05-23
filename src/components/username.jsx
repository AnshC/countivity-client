import axios from 'axios';
import {useState, useEffect} from 'react';

export default function Username(){
    const [Username, setUsername] = useState("")
    const [InvalidUsr, setValidity] = useState(false)

    useEffect(()=>{
        axios.get('https://countivityserver.herokuapp.com/auth/check')
        .then((response)=>{
            if(response.data.loginState === false){
                window.location.replace("/")
            }
        })
    }, [])

    function check_user(){
        axios.get(`https://countivityserver.herokuapp.com/auth/username/${Username}`)
        .then((response)=>{
            if(response.data.userCreated === true){
                setValidity(true)
            } else if(response.data.userCreated === false){
                setValidity(false)
                window.location.replace("/dashboard")
            }
        })
    }
    return(
        <div className="username">
            <h1 className="head">Enter a unique username.</h1>
            {InvalidUsr ? 
            <p className="error">Username's already been taken</p> 
            : 
            null}
            <input type="text" className="input" placeholder="notjohndoe" onInput={(e)=>{setUsername(e.target.value)}}/>
            <span className="submit" onClick={check_user}>Create User</span>
        </div>
    )
}