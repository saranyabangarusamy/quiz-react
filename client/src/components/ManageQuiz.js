import React, { Component } from "react";
import { connect } from "react-redux";
import MaterialTable from 'material-table';
import {addUserThunk, deleteUserThunk, updateScoreThunk,fetchUsersThunk, addQuestionThunk } from "../js/actions";
import { Typography, Grid, TextField, Button } from "@material-ui/core";
import { Redirect } from 'react-router-dom';


  class ManageQuizPage extends Component {    

    constructor(props) {
      super(props);
      this.state = {
        question: "",
        option1:"",option2:"",option3:"",option4:"",
        correctoption:false
      };   
    }

    handleChange = prop => (event) => {       
      this.setState({ [prop]: event.target.value});
    }
  
    handleSubmit = (event) => {
      event.preventDefault();      
      if(this.state.question !== "") 
        {
          this.props.addQuestionThunk({question:this.state.question, 
            option1:this.state.option1, 
            option2:this.state.option2,
            option3:this.state.option3,
            option4:this.state.option4});        
        }
      else
        alert("Please fill the required fields")      
    }
      render()
      {       

        if (!this.props.loggedin) {
          return <Redirect to='/' />
        }

          return((<Grid container direction="column" justify="center"
          alignItems="center" style={{margin:20}}>
              <Typography style={{marginTop:10,marginBottom:30, fontSize:14, fontWeight:'bold'}} >Quiz</Typography>              
              <TextField   color="primary"         
                   label= 'Question' style={{margin:20}}
                  value={this.state.question}
                  onChange={this.handleChange("question")}
                  />  
                   <TextField style={{margin:20}}                         
                  label= 'Option 1' color="primary" 
                  value={this.state.option1}                  
                  onChange={this.handleChange("option1")}
                  />                                  
                   <TextField style={{margin:20}}                         
                  label= 'Option 2' color="primary" 
                  value={this.state.option2}                  
                  onChange={this.handleChange("option2")}
                  /> 
                   <TextField style={{margin:20}}                         
                  label= 'Option 3' color="primary" 
                  value={this.state.option3}                  
                  onChange={this.handleChange("option3")}
                  /> 
                   <TextField style={{margin:20}}                         
                  label= 'Option 4' color="primary" 
                  value={this.state.option4}                  
                  onChange={this.handleChange("option4")}
                  />   
                  <Button variant="contained" color="primary" onClick={this.handleSubmit}>Post Question</Button>        
          </Grid>));
      }      
  }

const mapStateToProps = state => {   
    return { users: state.users ,loggedin:state.loggedin,
    userInfo:state.userInfo};
};

function mapDispatchToProps(dispatch) {
    return {      
      addUserThunk: newUser => dispatch(addUserThunk(newUser)),
      addQuestionThunk: question => dispatch(addQuestionThunk(question)),
      updateScoreThunk: (user,score) => dispatch(updateScoreThunk(user,score)),
      deleteUserThunk: user => dispatch(deleteUserThunk(user))            ,
      fetchUsersThunk: () => dispatch(fetchUsersThunk())      
    };
  }

const ManageQuiz = connect(mapStateToProps,mapDispatchToProps)(ManageQuizPage);
export default ManageQuiz;