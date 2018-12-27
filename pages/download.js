import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const pdfform = require('pdfform.js');

class Download extends Component {
  static mapStateToProps(state) {
    return {answers: {...state.answers}}
  }

  fillCM010(buf) {
    const saveAs = require('save-as')
    console.log('something with bif')

    var outBuf = pdfform.transform(buf, {'name_top': ['test name is really really long it will eventually get super duper cut off by the renderer'], 'street_address': ['some street usa']})
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

    // var blob = new Blob([filled_pdf], {type: 'application/pdf'});
		// saveAs(blob, 'pdfform.js_generated.pdf');
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
