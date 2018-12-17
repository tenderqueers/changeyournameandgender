import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dispatchAnswer } from '../lib/store';
import Router from 'next/router';
import '../styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

class Index extends Component {
  constructor(props) {
    super(props)

    this.questions = Array(4).fill(null)
    this.questions[0] = <QuestionCalifornia dispatch={this.props.dispatch} />
    this.questions[1] = <QuestionName dispatch={this.props.dispatch} />
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

class QuestionCalifornia extends Component {
  answerYes() {
    const {dispatch} = this.props
    dispatchAnswer('california', true)(dispatch)
    Router.push({pathname: '/', query: { question: 1 }})
  }

  answerNo() {
    const {dispatch} = this.props
    Router.push({pathname: '/notAvailable'})
    dispatchAnswer('california', false)(dispatch)
  }

  render() {
    return (
      <div>
        <h1>Let's get started!</h1>
        <h2>Are you currently living in California?</h2>
        <Button color="danger" onClick={() => { this.answerNo() }}>No</Button>
        <Button color="success" onClick={() => { this.answerYes() }}>Yes</Button>
      </div>
    )
  }
}

class QuestionName extends Component {
  handleChange(event) {
    const {dispatch} = this.props
    dispatchAnswer('name', event.target.value)(dispatch)
  }

  answer() {
    Router.push({pathname: '/', query: { question: 2 }})
  }

  render() {
    return (
      <div>
        <h2>What's your full current legal name (the name on your Driver's License or Passport)</h2>
        <InputGroup>
          <Input placeholder="Miriam Maisel" value={this.props.name} ref="Name" onChange={(e) => this.handleChange(e)} />
          <InputGroupAddon addonType="append">
            <Button color="success" onClick={() => { this.answer() }}>Save</Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    )
  }
}

class QuestionHaveCaliforniaBirthCertificate extends Component {
  render() {
    return (
      <p>this is as far as I've gotten :)</p>
      // <div>
      //   <h2>Do you have a California Birth Certificate?</h2>
      //   <Button color="danger" onClick={() => this.props.onClick(false)}>No</Button>
      //   <Button color="success" onClick={() => this.props.onClick(true)}>Yes</Button>
      // </div>
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
