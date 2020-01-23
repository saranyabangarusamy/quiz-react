import React, { Component } from "react";
import UsersTable from "./components/UsersTable";
import ManageQuiz from "./components/ManageQuiz";
import Admin from "./components/Admin";
import Quiz from "./components/Quiz";
import Signup from "./components/Signup";
import { connect } from "react-redux";
import { logout } from "./js/actions";
import LoginPage from "./components/LoginPage";
import {Grid} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ExitToApp from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';

class App extends Component{

  constructor(props) {
    super(props);
  }

  handleLogout = (event) => {         
      this.props.logout();
  }

  render()
  {   
    return (<BrowserRouter>
      <Grid container direction="column" justify="flex-start" alignItems="stretch">   
        <AppBar position="static">
          <Toolbar style={{backgroundColor:'#3f51b5'}}>  
            <Typography variant="h6" style={{flexGrow: 1}}>
              Quiz
            </Typography> 
           {
             (this.props.loggedin) &&
              (<Typography variant="h6">
              Welcome {this.props.userInfo.userName} ({this.props.userInfo.role})
            </Typography> ) 
           }   
           {
             (this.props.loggedin) && (<IconButton
              edge="end"
              aria-label="account of current user"              
              aria-haspopup="true"              
              color="inherit"
              onClick={this.handleLogout}
            >
              <ExitToApp />
        </IconButton> )
           }               
          </Toolbar>
        </AppBar>  
        <Switch>
                    <Route
                      exact
                      path="/"
                      render={(params) => {
                        return <LoginPage params={params} title="Login" />;
                      }}
                    />
                    <Route
                      exact
                      path="/admin"
                      render={(params) => {
                        return <Admin params={params} title="Admin" />;
                      }}
                    />
                    <Route
                      exact
                      path="/manageUsers"
                      render={(params) => {
                        return <UsersTable params={params} title="Manage Users" />;
                      }}
                    />
                    <Route
                      exact
                      path="/manageQuiz"
                      render={(params) => {
                        return <ManageQuiz params={params} title="Manage Quiz" />;
                      }}
                    />
                    <Route
                      exact
                      path="/signup"
                      render={(params) => {
                        return <Signup params={params} title="Signup" />;
                      }}
                    />
                    <Route
                      exact
                      path="/quiz"
                      render={(params) => {
                        return <Quiz params={params} title="Quiz" />;
                      }}
                    />
          </Switch> 
       </Grid>
       </BrowserRouter>)
  }
}

const mapStateToProps = state => {   
  return { userInfo: state.userInfo,
  loggedin:state.loggedin };
};

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())  
  };
}

const SampleApp = connect(
  mapStateToProps,
mapDispatchToProps
)(App);

export default SampleApp;