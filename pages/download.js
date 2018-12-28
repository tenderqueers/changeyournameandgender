import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const pdfform = require('../lib/pdfform.js');

class Download extends Component {
  static mapStateToProps(state) {
    return {answers: {...state.answers}}
  }

  fillCM010(buf) {
    const saveAs = require('save-as')
    console.log('something with bif')
    var fields = {
      name_top: [this.props.answers.name],
      name_bottom: [this.props.answers.name],
      petition_for: ['Petition for Gender Change'],
      unlimited: [true],
      nonmonetary: [true],
      not_a_class_action_suit: [true],
      not_complex: [true],
      other_petition: [true]
    }

    var outBuf = pdfform.transform(buf, fields)
    var download = new Blob([outBuf], { type: 'text/pdf' })
    saveAs.saveAs(download, 'test_filled.pdf')
  }

  downloadCM010() {
    console.log(pdfform());
    console.log("download clicked")
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/static/forms/CM-010.pdf', true);
    xhr.responseType = 'arraybuffer';

    var self = this;
    xhr.onload = function() {
      if (this.status === 200) {
	self.fillCM010(this.response);
      } else {
	console.log('error downloading pdf')
      }
    };

    xhr.send();
  }

  render() {
    var answers = []

    for (var answer in this.props.answers) {
      answers.push(<li>{answer}: {this.props.answers[answer].toString()}</li>)
    }

    return (
      <div>
        <Button onClick={() => this.downloadCM010()}>CM-010</Button>
          <ul>
            {answers}
          </ul>
      </div>
    )
  }
}

export default connect(Download.mapStateToProps)(Download);
