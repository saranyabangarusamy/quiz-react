import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../js/actions";
import {Button,TextField,Grid, Typography} from '@material-ui/core';
import { Redirect } from 'react-router-dom'

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {       
    };   
  }
  
  handleManageUsersClick = (event) => {     
    this.setState({ manageUsersClicked : true });
  }

  handleManageQuestionsClick = (event) => {         
    this.setState({ manageQuestionsClicked : true });
  }

  render() {   
    if (!this.props.loggedin) {      
        return <Redirect to='/' />
      }   
    else if (this.state.manageQuestionsClicked) {
    return <Redirect to='/manageQuiz' />
    } 
    else if (this.state.manageUsersClicked) {
    return <Redirect to='/manageusers' />
    } 
    else if (this.props.loggedin && this.props.userInfo.role === "admin") {
        return (    
            <div style={{marginTop:100, marginBottom:40}}>                 
                <Grid container direction="column" justify="center"
                alignItems="center" justifyContent='center' > 
                  <Typography style={{fontSize:20, fontWeight:'bold'}}>Admin</Typography>              
                  <Grid container direction="row" justify="center"
                  alignItems="center" style={{margin:20}}>            
                      <Button variant="contained" color="primary" 
                      style={{marginLeft:20,marginTop:50}}
                      onClick={this.handleManageUsersClick}>Manage Users</Button>                    
                      <Button variant="contained" color="primary" 
                      style={{marginLeft:20,marginTop:50}}
                      onClick={this.handleManageQuestionsClick}>Manage Questions</Button>  
                  </Grid> 
                 </Grid>           
            </div>
          );
      }                   
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

const Admin = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage);
 
export default Admin;