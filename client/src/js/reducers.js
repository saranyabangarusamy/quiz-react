import { LOGIN, LOGIN_SUCCESS,LOGOUT,
         ADD_USER,ADD_USER_SUCCESS, 
         ADD_QUESTION,ADD_QUESTION_SUCCESS, 
         UPDATE_SCORE,UPDATE_SCORE_SUCCESS,
         DELETE_USER,DELETE_USER_SUCCESS,
         FETCH_USERS, FETCH_USERS_SUCCESS,
         FETCH_QUESTIONS, FETCH_QUESTIONS_SUCCESS } from "./constants";

const initialState = {
  users: [],  userInfo :{},loggedin:false,
  isFetching: false  ,signedUp:false, questions:[]
};

function rootReducer(state = initialState, action) {
    
  switch (action.type) {   
    case LOGIN:
      return Object.assign({}, state, {
        loggedin: false,            
      });
    case LOGIN_SUCCESS:          
      return Object.assign({}, state, {
        userInfo: action.payload,
        loggedin: true        
      }); 
    case LOGOUT:      
      return Object.assign({}, state, {
        userInfo: null,
        loggedin: false        
      });  
    case FETCH_USERS:
      return Object.assign({}, state, {
        isFetching: true,
        users: []        
      });
    case FETCH_USERS_SUCCESS:       
      return Object.assign({}, state, {        
        users: action.payload.users,
        isFetching: false        
      });
      case FETCH_QUESTIONS:
      return Object.assign({}, state, {
        isFetching: true,
        questions: []        
      });
    case FETCH_QUESTIONS_SUCCESS:       
      return Object.assign({}, state, {        
        questions: action.payload.questions,
        isFetching: false        
      });   
    case ADD_USER:
      return Object.assign({}, state, {
        isAddingUser: true,            
      });
    case ADD_USER_SUCCESS:       
      return Object.assign({}, state, {
        users: action.payload,signedUp:true     
      });
      case ADD_QUESTION:
      return Object.assign({}, state, {
        
      });
    case ADD_QUESTION_SUCCESS:       
      return Object.assign({}, state, {
        isQuestionAddded : true
      });
      case UPDATE_SCORE:
      return Object.assign({}, state, {
        isAddingUser: true,            
      });
    case UPDATE_SCORE_SUCCESS:       
      return Object.assign({}, state, {
        users: action.payload,
        isAddingUser: false        
      });  
    case DELETE_USER:
      return Object.assign({}, state, {
        isDeleteUser: true,            
      });
    case DELETE_USER_SUCCESS:       
      return Object.assign({}, state, {
        users: action.payload,
        isDeleteUser: false        
      });    
    }  
    
  return state;
}
export default rootReducer;