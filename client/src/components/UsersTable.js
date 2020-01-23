import React, { Component } from "react";
import { connect } from "react-redux";
import MaterialTable from 'material-table';
import {addUserThunk, deleteUserThunk, updateScoreThunk,fetchUsersThunk } from "../js/actions";
import { Typography, Grid } from "@material-ui/core";
import { Redirect } from 'react-router-dom';

const columns = [
    { title: 'User Name', field: 'userName'},
    { title: 'Email', field: 'email' }, 
    { title: 'Contact No', field: 'contactno'},
    { title: 'Score', field: 'score' },    
  ];  

  class ConnectedTable extends Component {    

    componentDidMount()
    {   
      this.props.fetchUsersThunk();         
    }

      render()
      {       

        if (!this.props.loggedin) {
          return <Redirect to='/' />
        }

          return((<Grid container direction="column" justify="center"
          alignItems="center" style={{margin:20}}>
              <Typography style={{marginTop:10,marginBottom:30, fontSize:14, fontWeight:'bold'}} >Users List</Typography>
              <MaterialTable style={{minWidth:500}}
            title = " " 
            options={{
                paging: false,
                headerStyle: {
                    backgroundColor: '#3f51b5',
                    color: '#FFF', padding:5
                  }
              }}
            columns = {columns}
            data={this.props.users}
            editable={{                            
              onRowDelete: user => new Promise(resolve => {
                setTimeout(() => {
                    resolve();                    
                    this.props.deleteUserThunk(user)
                    }, 600);
                  }),        
            }}       
          />
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
      updateScoreThunk: (user,score) => dispatch(updateScoreThunk(user,score)),
      deleteUserThunk: user => dispatch(deleteUserThunk(user))            ,
      fetchUsersThunk: () => dispatch(fetchUsersThunk())      
    };
  }

const UsersTable = connect(mapStateToProps,mapDispatchToProps)(ConnectedTable);
export default UsersTable;