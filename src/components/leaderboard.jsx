export default function Leaderboard(){
    return(
        <div className="leaderboard">
            <h1 className="head">Leaderboard</h1>
            <div className="chart-container">
                <div className="bars">
                    <div className="bar" id="third">Random User</div>
                    <div className="bar" id="first">Ansh Chauhan</div>
                    <div className="bar" id="second">John Doe</div>
                </div>
                <div className="line"></div>
            </div>
        </div>
    )
}