import {  LOGIN,
          LOGIN_SUCCESS,LOGOUT,
          ADD_USER,
          ADD_USER_SUCCESS, 
          ADD_QUESTION,
          ADD_QUESTION_SUCCESS,
          UPDATE_SCORE,
          UPDATE_SCORE_SUCCESS, 
          DELETE_USER,
          DELETE_USER_SUCCESS, 
          FETCH_USERS,
          FETCH_USERS_SUCCESS,
          FETCH_QUESTIONS,
          FETCH_QUESTIONS_SUCCESS
} from "./constants";
import store from "../js/store.js";
import apiHelper from "../helpers/apiHelper";

export const login = user => {  
  store.dispatch(loginUser());
  return function(dispatch, getState) {
      apiHelper.login(user).then(resp =>{             
      if(resp.errorMessage === undefined)
      {
        dispatch(loginSuccess(resp));
      }        
      else
        alert(resp.errorMessage)
       });      
  };
};

export const loginUser = () => {
  return {
    type: LOGIN
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const loginSuccess = userInfo => { 
  return {
    type: LOGIN_SUCCESS,
    payload: userInfo.user
  };
};

export const fetchUsers = () => {
  return {
    type: FETCH_USERS
  };
};

export const fetchUsersSuccess = users => { 
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  };
};

export const fetchUsersThunk = () => {  
  store.dispatch(fetchUsers());
  return function(dispatch, getState) {
      apiHelper.getGraphQlData().then(resp =>{                 
        dispatch(fetchUsersSuccess(resp));
       });         
  };
};

export const fetchQuestions = () => {
  return {
    type: FETCH_QUESTIONS
  };
};

export const fetchQuestionsSuccess = questions => { 
  return {
    type: FETCH_QUESTIONS_SUCCESS,
    payload: questions
  };
};

export const fetchQuestionsThunk = () => {  
  store.dispatch(fetchQuestions());
  return function(dispatch, getState) {
      apiHelper.getQuestions().then(resp =>{    
        console.log("Resp Ques")             
        console.log(resp)             
        dispatch(fetchQuestionsSuccess(resp));
       });    
      //  apiHelper.getQuestions().then(resp =>{  
      //    console.log(resp)  ;                     
      //  });    
  };
};

export const addUser = () => {
  return {
    type: ADD_USER
  };
};

export const addUserSuccess = users => {
  return {
    type: ADD_USER_SUCCESS,
    payload: users
  };
};

export const addUserThunk = user => {  
  store.dispatch(addUser());
  return function(dispatch, getState) {
      apiHelper.addUser(user).then(resp =>{        
      if(resp.errorMessage === undefined)
        dispatch(addUserSuccess(resp));
      else
        alert(resp.errorMessage)
       });      
  };
};

export const addQuestion = () => {
  return {
    type: ADD_QUESTION
  };
};

export const addQuestionSuccess = question => {
  return {
    type: ADD_QUESTION_SUCCESS,
    payload: question
  };
};

export const addQuestionThunk = user => {  
  store.dispatch(addQuestion());
  return function(dispatch, getState) {
      apiHelper.addQuestion(user).then(resp =>{        
      if(resp.errorMessage === undefined)
        dispatch(addQuestionSuccess(resp));
      else
        alert(resp.errorMessage)
       });      
  };
};

export const updateScore = () => {
  return {
    type: UPDATE_SCORE
  };
};

export const updateScoreSuccess = users => {
  return {
    type: UPDATE_SCORE_SUCCESS,
    payload: users
  };
};

export const updateScoreThunk = (user,score) => {   
  store.dispatch(updateScore());
  return function(dispatch, getState) {
      apiHelper.updateScore(user,score).then(resp =>{            
      if(resp.errorMessage === undefined)
        dispatch(updateScoreSuccess(resp));
      else
        alert(resp.errorMessage)
       });      
  };
};

export const deleteUser = () => {
  return {
    type: DELETE_USER
  };
};

export const deleteUserSuccess = users => {
  return {
    type: DELETE_USER_SUCCESS,
    payload: users
  };
};

export const deleteUserThunk = user => {  
  store.dispatch(deleteUser());
  return async function(dispatch, getState) {
    let resp = await apiHelper.deleteUser(user);   
    console.log(resp) ;
    dispatch(deleteUserSuccess(resp));         
  };
};

