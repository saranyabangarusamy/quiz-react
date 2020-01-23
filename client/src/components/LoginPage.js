import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../js/actions";
import {Button,TextField,Grid, Typography} from '@material-ui/core';
import { Redirect } from 'react-router-dom'

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userName: "", password:"",
        signupClicked:false
    };   
  }

  handleUserNameChange = (event) => {    
    this.setState({ userName: event.target.value });
  }

  handlePasswordChange = (event) => {    
    this.setState({ password: event.target.value });
  }

  handleLogin = (event) => {     
    if(this.state.userName !== "" && this.state.password != "") 
      this.props.login({userName:this.state.userName, password:this.state.password});
    else
      alert("Please fill the required fields")
    this.setState({ userName : "", password:"" });
  }

  handleSignup = (event) => {         
    this.setState({ signupClicked : true });
  }

  render() {      
    if (this.props.loggedin && this.props.userInfo.role === "admin") {
      return <Redirect to='/admin' />
    }
    else if (this.props.loggedin && this.props.userInfo.role === "user") {      
      return <Redirect to='/quiz' />
    }
    else if (this.state.signupClicked) {
      return <Redirect to='/signup' />
    }
    return (    
      <div style={{marginTop:100, marginBottom:40}}>                 
          <Grid container direction="column" justify="center"
          alignItems="center" justifyContent='center' > 
            <Typography style={{fontSize:20, fontWeight:'bold'}}>Login</Typography>                       
            <TextField color="primary"         
              label= 'User Name' style={{marginTop:30}}
            value={this.state.userName}
            onChange={this.handleUserNameChange}
            />  
              <TextField  style={{marginTop:30}}         
            label= 'Password' color="primary" type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            />    
            <Grid container direction="row" justify="center"
            alignItems="center" style={{margin:20}}>            
          <Button variant="contained" color="primary" 
          style={{marginLeft:20,marginTop:50}}
          onClick={this.handleLogin}>LOGIN</Button>                    
          <Button variant="contained" color="primary" 
          style={{marginLeft:20,marginTop:50}}
          onClick={this.handleSignup}>SIGNUP</Button>  
          </Grid> 
              </Grid>           
      </div>
    );
    
  }
}

const mapStateToProps = state => {   
  return { userInfo: state.userInfo,
  loggedin:state.loggedin };
};

function mapDispatchToProps(dispatch) {
    return {
      login: user => dispatch(login(user))         
    };
  }

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
 
export default Login;