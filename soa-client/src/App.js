import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import HomePage from './pages/home/home.page';
import LoginPage from './pages/login/login.page';
import RegisterPage from './pages/register/register.page';
import ProfilePage from './pages/profile/profile.page';
import DetailPage from './pages/detail/detail.page';
// import {MessagesView} from './pages/chat/chat.page';

import UserService from './services/user.service';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faUser,
  faUserPlus,
  faSignInAlt,
  faHome,
  faSignOutAlt, faNewspaper
} from '@fortawesome/free-solid-svg-icons';
import {User} from './models/user';
import CardPaymentPage from "./pages/payment/card-payment.page";
import BookLecturePage from "./pages/book lecture/book-lecture.page";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: createBrowserHistory(),
      currentUser: new User()
    };
  }

  componentDidMount() {
    UserService.currentUser.subscribe(data => {
      this.setState({currentUser: data});
    });
  }

  logout() {
    UserService.logOut(this.state.currentUser).then(data => {
      this.state.history.push('/home');
    }, error => {
      this.setState({
        errorMessage: "Unexpected error occurred."
      });
    });
  }

  render() {
    const {history, currentUser} = this.state;
    return (
      <Router history={history}>
        <div>
          {this.state.currentUser &&
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <a className="navbar-brand" href="/home">
                Book Store
              </a>
              <div className="navbar-nav ml-auto">
              <Link to="/home" className="nav-item nav-link">
                  <FontAwesomeIcon icon={faHome}/> Home
                </Link>
                <Link to="/profile" className="nav-item nav-link">
                  <FontAwesomeIcon icon={faUser}/> {currentUser.name}
                </Link>
                <Link to="/book-club" className="nav-item nav-link">
                  <FontAwesomeIcon icon={faNewspaper}/> Book club
                </Link>
                <a onClick={()=>this.logout()} className="nav-item nav-link">
                  <FontAwesomeIcon icon={faSignOutAlt}/> LogOut
                </a>
              </div>
            </nav>
          }
          {!this.state.currentUser &&
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <a className="navbar-brand" href="/home">
              Book Store
              </a>
              <div className="navbar-nav ml-auto">
              <Link to="/home" className="nav-item nav-link">
                  <FontAwesomeIcon icon={faHome}/> Home
                </Link>
                <Link to="/register" className="nav-item nav-link">
                  <FontAwesomeIcon icon={faUserPlus}/> Register
                </Link>
                <Link to="/login" className="nav-item nav-link">
                  <FontAwesomeIcon icon={faSignInAlt}/> Login
                </Link>
              </div>
            </nav>
          }
          <div className="container">
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/home" component={HomePage}/>
              <Route exact path="/login" component={LoginPage}/>
              <Route exact path="/register" component={RegisterPage}/>
              <Route exact path="/profile" component={ProfilePage}/>
              <Route exact path="/detail/:id" component={DetailPage}/>
              <Route exact path="/payment/:id" component={CardPaymentPage}/>
              <Route exact path="/book-club" component={BookLecturePage}/>
              {/*<Route exact path="/chat" component={MessagesView}/>*/}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
