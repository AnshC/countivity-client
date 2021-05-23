import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/home';
import Dashboard from './components/dashboard';
import Navigation from './components/navigation';
import Username from './components/username';
import Leaderboard from './components/leaderboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Route component={Navigation} />
        <Switch>
          <Route component={Home} path="/" exact/>
          <Route component={Dashboard} path="/dashboard" />
          <Route component={Username} path="/auth/username" />
          <Route component={Leaderboard} path="/leaderboard" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
