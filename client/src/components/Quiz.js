import React from 'react'
import { connect } from "react-redux";
import {  updateScoreThunk, fetchQuestionsThunk } from "../js/actions";
import data from '../data/quiz.json';
import Question from './Question'
import { Redirect } from 'react-router-dom'
import {Button,TextField,Grid, Typography} from '@material-ui/core';

class QuizPage extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        quiz: {},
        index: 0,
        answers: []
      }
  }

  componentDidMount() {  
    this.props.fetchQuestionsThunk();   
    // this.setState({quiz: data})
    // $.getJSON('/src/data/quiz.json', function(result) {
    //   this.setState({quiz: result})
    // }.bind(this))
  }

  handleSubmit() {    
    if (this.state.index < this.props.questions.length) {   
     let completed = (this.state.index + 1 === this.props.questions.length)     
     let score = 0
    if (completed) {      
      this.state.answers.map((answer, i) => (
        score = score + this.props.questions[i].options[answer].is_right
      ))
      this.props.updateScoreThunk(this.props.userInfo,score)
    }
    
      this.setState({'index': this.state.index + 1})
    } else {     
      let score = this.state.score || 0
      this.state.answers.map((answer, i) => (
        score = score + this.props.questions[i].options[answer].is_right
      ))
      
      this.setState({'score': score})
    }
    
  }

  handleAnswerSelected(event) {
    let list = [...this.state.answers.slice(0, this.state.index),
                parseInt(event.target.value),
                ...this.state.answers.slice(this.state.index + 1)]
    this.setState({'answers': list})
  }

  render() {
    if (!this.props.loggedin) {
      return <Redirect to='/' />
    }

    const {
      quiz, index, answers
    } = this.state

    let completed = (this.props.questions && (index === this.props.questions.length)) ? true : false
    let numberOfQuestions = this.props.questions ? this.props.questions.length : 0
    let score = 0
    if (completed) {
      this.state.answers.map((answer, i) => (
        score = score + this.props.questions[i].options[answer].is_right
      ))
    }

    return (
      <div>
        <h1>React Quiz</h1>
        {completed ?
          <div>
            <p>Congratulation, you finished the quiz</p>
            Your score is {score}
          </div>
        :
          <Grid>
          <h2>Question {index + 1} of {numberOfQuestions}</h2>
          {this.props.questions && index < numberOfQuestions ?
            <Question
              question={this.props.questions[index]}
              index={index}
              onAnswerSelected={(event) => this.handleAnswerSelected(event)}
              onSubmit={() => this.handleSubmit()}
            />
          : ''}
          </Grid>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {   
  return { users: state.users ,loggedin:state.loggedin,
    questions:state.questions,
  userInfo:state.userInfo};
};

function mapDispatchToProps(dispatch) {
  return {
    fetchQuestionsThunk: () => dispatch(fetchQuestionsThunk()),  
    updateScoreThunk: (user,score) => dispatch(updateScoreThunk(user,score))    
  };
}

const Quiz = connect(mapStateToProps,mapDispatchToProps)(QuizPage);
export default Quiz;