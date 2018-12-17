import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import { QuestionCalifornia, QuestionName, QuestionHaveCaliforniaBirthCertificate } from '../lib/questions';

class Index extends Component {
  constructor(props) {
    super(props)

    this.questions = Array(4).fill(null)
    this.questions[0] = <QuestionCalifornia />
    this.questions[1] = <QuestionName />
    this.questions[2] = <QuestionHaveCaliforniaBirthCertificate />
    // this.questions[3] = <QuestionNewCaliforniaBirthCertificate onClick={(answer) => this.saveAnswer(answer)}/>

  }

  getInitialProps(props) {
    console.log(props)
    return {}
  }

  render() {
    var answers = []

    for (var answer in this.props.answers) {
      answers.push(<li>{answer}: {this.props.answers[answer].toString()}</li>)
    }

    var question = this.props.currentQuestion;

    if (question === undefined) {
      question = 0
    }

    return (
      <div>
        <div>
          {this.questions[question]}
          <ul>
            {answers}
          </ul>
        </div>
      </div>
    )
  }
}

class QuestionNewCaliforniaBirthCertificate extends Component {
  render() {
    return (
      <div>
        <h2>Would you like to request a new Birth Certificate?</h2>
        <Button color="danger" onClick={() => this.props.onClick(false)}>No</Button>
        <Button color="success" onClick={() => this.props.onClick(true)}>Yes</Button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {answers: {...state.answers}}
}

export default connect(mapStateToProps)(Index);
