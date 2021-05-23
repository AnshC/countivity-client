import {Link} from 'react-router-dom'

export default function Navigation(){
    return(
        <div className="navigation">
            <div className="brand">
                <h1 id="brand">Coun<span>+</span>ivity</h1>
            </div>
            <ul className="links">
                <Link className="React-Link" to="/"><li>HOME</li></Link>
                <Link className="React-Link" to="/dashboard"><li>DASHBOARD</li></Link>
                <Link className="React-Link" to="/leaderboard"><li>LEADERBOARD</li></Link>
            </ul>
        </div>
    )
}