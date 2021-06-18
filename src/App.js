import './App.css';
import Home from './components/Home'
import Header from './components/Header'
import Login from './components/user/Login'
import Register from './components/user/Register'
import Dashboard from './components/Dashboard'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { AuthProvider } from './features/useAuth'

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>  
          <Header />
            <Switch>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
        </Router>
    </div>
    </AuthProvider>
  );
}

export default App;
