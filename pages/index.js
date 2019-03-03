import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import Link from 'next/link'
import { QuestionCalifornia, QuestionName, QuestionAddress, QuestionHaveCaliforniaBirthCertificate, QuestionNewCaliforniaBirthCertificate } from '../lib/questions';

class GoToDownload extends Component {
  render() {
    return (
      <Link href="/download">
        <Button>go to download</Button>
      </Link>
    )
  }
}

class Index extends Component {
  constructor(props) {
    super(props)

    this.questions = []
    this.questions.push(<QuestionCalifornia key="california" />)
    this.questions.push(<QuestionName key="name" />)
    // this.questions.push(<QuestionAddress key="address" />)
    this.questions.push(<QuestionHaveCaliforniaBirthCertificate key="birthCert" />)
    this.questions.push(<QuestionNewCaliforniaBirthCertificate key="newBirthCert" />)
    this.questions.push(<GoToDownload key="download" />)
  }

  render() {
    var question = this.props.currentQuestion;

    if (question === undefined) {
      question = 0
    }

    return (
      <div>
        <div>
          {this.questions[question]}
        </div>
      </div>
    )
  }
}

export default Index;
