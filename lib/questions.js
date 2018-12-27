import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dispatchAnswer } from '../lib/store';
import Router from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

class California extends Component {
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

class Name extends Component {
  static mapStateToProps(state) {
    return { name: state.answers['name'] }
  }

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

class HaveCaliforniaBirthCertificate extends Component {
  answer(answer) {
    const {dispatch} = this.props
    dispatchAnswer('have_birth_certificate', answer)(dispatch)
    Router.push({pathname: '/', query: { question: 3 }})
  }

  render() {
    return (
      <div>
        <h2>Do you have a California Birth Certificate?</h2>
        <Button color="danger" onClick={() => this.answer(false)}>No</Button>
        <Button color="success" onClick={() => this.answer(true)}>Yes</Button>
      </div>
    )
  }
}

class NewCaliforniaBirthCertificate extends Component {
  answer(answer) {
    const {dispatch} = this.props
    dispatchAnswer('new_birth_certificate', answer)(dispatch)
    Router.push({pathname: '/', query: { question: 3 }})
  }

  render() {
    return (
      <div>
        <h2>Would you like to request a new Birth Certificate?</h2>
        <Button color="danger" onClick={() => this.answer(false)}>No</Button>
        <Button color="success" onClick={() => this.answer(true)}>Yes</Button>
      </div>
    )
  }
}

export let QuestionCalifornia = connect()(California);
export let QuestionName = connect(Name.mapStateToProps)(Name);
export let QuestionHaveCaliforniaBirthCertificate = connect()(HaveCaliforniaBirthCertificate);
export let QuestionNewCaliforniaBirthCertificate = connect()(NewCaliforniaBirthCertificate);

