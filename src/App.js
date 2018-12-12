import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questionIndex: 0,
      answers: []
    }
  }

  saveAnswer(answer) {
    let newState = this.state
    newState.questionIndex++
    newState.answers.push(answer)
    this.setState(newState)
  }

  render() {
    const questions = Array(3).fill(null)
    questions[0] = <QuestionCalifornia onClick={(answer) => this.saveAnswer(answer)}/>
    questions[1] = <QuestionName onClick={(answer) => this.saveAnswer(answer)}/>

    var answers = []

    for (var answer in this.state.answers) {
      answers.push(<li>{answer}: {this.state.answers[answer].toString()}</li>)
    }

    return (
      <div>
        {questions[this.state.questionIndex]}
        <ul>
          {answers}
        </ul>
      </div>
    )
  }
}

class QuestionCalifornia extends Component {
  render() {
    return (
      <div>
        <h1>Let's get started!</h1>
        <h2>Are you currently living in California?</h2>
        <Button color="danger" onClick={() => this.props.onClick(false)}>No</Button>
        <Button color="success" onClick={() => this.props.onClick(true)}>Yes</Button>
      </div>
    )
  }
}

class QuestionName extends Component {
  constructor(props) {
    super(props)
    this.state = {name: ""}
  }

  handleChange(event) {
    this.setState({name: event.target.value})
  }

  render() {
    return (
      <div>
        <h2>What's your full current legal name (the name on your Driver's License or Passport)</h2>
        <InputGroup>
          <Input placeholder="Miriam Maisel" ref="Name" onChange={(e) => this.handleChange(e)} />
          <InputGroupAddon addonType="append">
            <Button color="success" onClick={() => this.props.onClick(this.state.name)}>Save</Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    )
  }
}

export default App;
