import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import Link from 'next/link'
import { QuestionCalifornia, QuestionName, QuestionHaveCaliforniaBirthCertificate, QuestionNewCaliforniaBirthCertificate } from '../lib/questions';

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

    this.questions = Array(4).fill(null)
    this.questions[0] = <QuestionCalifornia key="california"/>
    this.questions[1] = <QuestionName key="name"/>
    this.questions[2] = <QuestionHaveCaliforniaBirthCertificate key="birthCert"/>
    this.questions[3] = <QuestionNewCaliforniaBirthCertificate key="newBirthCert"/>
    this.questions[4] = <GoToDownload key="download"/>

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
